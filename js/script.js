function formatar() { //Função responsavel por fazer a formatação do texto e escrever no texto formatado
    // Declaração de variaveis para validação

    var encaminhamento = document.getElementById("primeiro").value;
    var importante = document.getElementById("ponto").value;
    var ReuniaoData = document.getElementById("data").value;
    var gerencia = document.getElementById("gerencia").value;
    var usuario = document.getElementById("NomeUsuario").value;

    if (ReuniaoData === "" | gerencia === "" | usuario === "") {//Validação de campos em branco
        popup("Algum campo obrigatorio foi deixado em branco(*)")


    }
    else {
        if (encaminhamento === "" & importante === "") {//Validação de campos em branco
            popup("encaminhamentos ou Informações está vazio");
        }
        else {
            document.getElementById("segundo").value = "";
            var texto = document.getElementById("primeiro").value;
            var vetorString = texto.split("\n");
            var tamanho = vetorString.length;

            var teste = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
            //Verificação se é ou nao ponto de controle
            if (teste === "1") {
                document.getElementById("segundo").value += "*Ponto de Controle " + document.getElementById("data").value + "*\n";
            }
            else {
                document.getElementById("segundo").value += "*Reunião " + document.getElementById("data").value + "*\n";
            }

            if (encaminhamento !== "") {//verificação

                document.getElementById("segundo").value += "\n*Encaminhamentos:*\n"; //escreve na saida
                for (var i = 0; i < tamanho; i++) { //For principal que faz a varredura do da String
                    var aux = vetorString[i];

                    //primeira parte do texto - encaminhamentos escreve "- TEXTO. *"
                    var posicao = aux.indexOf("#"); //Busca a posição do primeiro '#' caso nao encontra retorna -1
                    if (posicao > -1) { // verifica se a posição é valida
                        //validações de espaços e "." para escrever no mesmo padrao na saida
                        if (aux[posicao - 1] === " ") {
                            if (aux[posicao - 2] === ".") {
                                document.getElementById("segundo").value += "- " + aux.substr(0, posicao) + "*";
                            }
                            else {
                                document.getElementById("segundo").value += "- " + aux.substr(0, posicao - 1) + ". *";

                            }
                        }
                        else {
                            if (aux[posicao - 1] === ".") {
                                document.getElementById("segundo").value += "- " + aux.substr(0, posicao) + " *";

                            }
                            else {
                                document.getElementById("segundo").value += "- " + aux.substr(0, posicao) + ". *";
                            }
                        }
                        //segunda parte do texto, responsavel. Escreve "RESPONSAVEL. Prazo: DATA"
                        parte2 = aux.slice(posicao + 1);
                        var posicao = parte2.indexOf("#"); //Busca ca posição do segundo "#" caso nao encontra retorna -1
                        if (posicao > -1) {// verifica se a posição é valida
                            //validações de espaços e ponto para escrever no mesmo padrao na saida
                            if (parte2[0] === " ") {
                                document.getElementById("segundo").value += parte2.substr(1, posicao - 1);
                            }

                            else {
                                document.getElementById("segundo").value += parte2.substr(0, posicao);
                            }

                            document.getElementById("segundo").value += ". Prazo: " + parte2.substr(posicao + 1) + "*";

                        }
                        else {
                            document.getElementById("segundo").value += parte2 + "*";
                        }

                    }
                    else {
                        document.getElementById("segundo").value += "- " + aux;
                    }
                    document.getElementById("segundo").value += "\n";

                }
            }




            if (document.getElementById("ponto").value != "") {//Verifica se escreveu algo no segundo quadrao
                document.getElementById("segundo").value += "\n*Informações Importantes:*\n"; //Caso sim, escreve o titulo e dps "- TEXTO"
                texto = document.getElementById("ponto").value;
                vetorString = texto.split("\n");
                tamanho = vetorString.length;
                for (var i = 0; i < tamanho; i++) {

                    document.getElementById("segundo").value += "- " + vetorString[i] + "\n";

                }
            }


        }
    }
}


function popup(texto) { //função popup de aviso na tela
    alert(texto);
}

function copiar() { //função copiar
    const texto = document.getElementById('segundo');
    texto.select();
    document.execCommand('copy');
    alert("Texto Copiado");

}
function limpar() { //função limpar tela onde reseta os valores e desativas os quadros novamente
    document.getElementById("gerencia").value = "";
    document.getElementById("NomeUsuario").value = "";
    document.getElementById("primeiro").value = "";
    document.getElementById("ponto").value = "";
    document.getElementById("segundo").value = "";
    document.getElementById("data").value = "";
    document.getElementById("reuniao").value = "";

    document.getElementById("NomeUsuario").disabled = true;
    document.getElementById("reuniao").disabled = true;
    document.getElementById("data").disabled = true;
    document.getElementById("primeiro").disabled = true;
    document.getElementById("ponto").disabled = true;
    document.getElementById("segundo").disabled = true;



}

function datas() { //Pega a data atual no formato DD/MM
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    dataAtual = dia + "/" + mes;
    document.getElementById("data").value += " - " + dataAtual;
}

function escreve() { //Escreve na tela "Projeto - Data" o projeto seleciado e a data
    var texto = document.getElementById('reuniao').options[document.getElementById('reuniao').selectedIndex].innerText;


    if (texto === 'Outra') { //caso o projeto seja 'outra' esreve somente '- DATA'
        document.getElementById("data").value = '';
    }
    else {
        document.getElementById("data").value = texto;
    }

}

function envio() { //Função de enviar via whatsapp

    var texto = document.getElementById("segundo").value;
    if (texto === "") {
        popup("ERRO, 'Texto Formatado' encontra-se em branco");
    }
    else {
        texto = window.encodeURIComponent(texto);
        window.open("https://api.whatsapp.com/send?1=pt_BR&text=" + texto, "_blank");
    }

}

function habilita() { //funçao para habilitar os quadros na tela inicial
    document.getElementById("NomeUsuario").disabled = false;
    document.getElementById("reuniao").disabled = false;
    document.getElementById("data").disabled = false;
    document.getElementById("primeiro").disabled = false;
    document.getElementById("ponto").disabled = false;
    document.getElementById("segundo").disabled = false;


}

function MudaSelect() {//troca os projetos de acordo com a gerencia

    var select = document.getElementById('gerencia');
    var selectSetor = document.getElementById('reuniao');

    var value = select.options[select.selectedIndex].value;

    //remove itens
    var length = selectSetor.options.length;
    var i;
    for (i = selectSetor.options.length - 1; i >= 0; i--) {
        selectSetor.remove(i);
    }


    if (value == '1') {

        var inicial = document.createElement('option');
        inicial.value = "";
        inicial.text = "--Selecione o Projeto--";

        var option = document.createElement('option');
        option.value = "1";
        option.text = "Agricultura do futuro+5G";

        var option2 = document.createElement('option');
        option2.value = "2";
        option2.text = "Cidades inteligentes";

        var option3 = document.createElement('option');
        option3.value = "3";
        option3.text = "Convênio";

        var option4 = document.createElement('option');
        option4.value = "4";
        option4.text = "Detran";

        var option5 = document.createElement('option');
        option5.value = "5";
        option5.text = "ERP";

        var option6 = document.createElement('option');
        option6.value = "6";
        option6.text = "Expresso";

        var option7 = document.createElement('option');
        option7.value = "7";
        option7.text = "Gomapp";

        var option8 = document.createElement('option');
        option8.value = "8";
        option8.text = "Monitora";

        var option9 = document.createElement('option');
        option9.value = "9";
        option9.text = "Musical";

        var option10 = document.createElement('option');
        option10.value = "10";
        option10.text = "Orquestra";

        var option11 = document.createElement('option');
        option11.value = "11";
        option11.text = "Painéis Bi";

        var option12 = document.createElement('option');
        option12.value = "12";
        option12.text = "Reforma basileu";

        var option13 = document.createElement('option');
        option13.value = "13";
        option13.text = "SEDI";

        var option14 = document.createElement('option');
        option14.value = "14";
        option14.text = "Telas";

        var option15 = document.createElement('option');
        option15.value = "15";
        option15.text = "Vacina";

        var option16 = document.createElement('option');
        option16.value = "16";
        option16.text = "Vapt-Vupt";

        var option17 = document.createElement('option');
        option17.value = "17";
        option17.text = "Zoox";

        var option18 = document.createElement('option');
        option18.value = "18";
        option18.text = "Outra";


        selectSetor.add(inicial);
        selectSetor.add(option);
        selectSetor.add(option2);
        selectSetor.add(option3);
        selectSetor.add(option4);
        selectSetor.add(option5);
        selectSetor.add(option6);
        selectSetor.add(option7);
        selectSetor.add(option8);
        selectSetor.add(option9);
        selectSetor.add(option10);
        selectSetor.add(option11);
        selectSetor.add(option12);
        selectSetor.add(option13);
        selectSetor.add(option14);
        selectSetor.add(option15);
        selectSetor.add(option16);
        selectSetor.add(option17);
        selectSetor.add(option18);




    }

    if (value == '2') {

        var option3 = document.createElement('option');
        option3.value = '1';
        option3.text = 'SEM OPÇÕES';


        selectSetor.add(option3);

    }

    if (value == '3') {

        var option5 = document.createElement('option');
        option5.value = '1';
        option5.text = 'SEM OPÇÕES';

        selectSetor.add(option5);

    }

}

