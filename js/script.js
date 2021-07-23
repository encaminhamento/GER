function formatar() {
    var encaminhamento = document.getElementById("primeiro").value;
    var importante = document.getElementById("ponto").value;
    var ReuniaoData = document.getElementById("data").value;
    var gerencia = document.getElementById("gerencia").value;



    var usuario = document.getElementById("NomeUsuario").value;
    if (ReuniaoData === "" | gerencia === "" | usuario === "") {
        popup("Algum campo obrigatorio foi deixado em branco(*)")


    }
    else {
        if (encaminhamento === "" & importante === "") {
            popup("encaminhamentos ou Informações está vazio");
        }
        else {
            document.getElementById("segundo").value = "";
            var texto = document.getElementById("primeiro").value;
            var vetorString = texto.split("\n");
            var tamanho = vetorString.length;

            var teste = document.querySelector('input[name="inlineRadioOptions"]:checked').value;

            if (teste === "1") {
                document.getElementById("segundo").value += "*Ponto de Controle " + document.getElementById("data").value + "*\n";
            }
            else {
                document.getElementById("segundo").value += "*Reunião " + document.getElementById("data").value + "*\n";
            }

            if (encaminhamento !== "") {

                document.getElementById("segundo").value += "\n*Encaminhamentos:*\n";
                for (var i = 0; i < tamanho; i++) {
                    var aux = vetorString[i];
                    var posicao = aux.indexOf("#");
                    if (posicao > -1) {
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


                        /////////////////////////////////////
                        parte2 = aux.slice(posicao + 1);
                        var posicao = parte2.indexOf("#");
                        if (posicao > -1) {
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




            if (document.getElementById("ponto").value != "") {
                document.getElementById("segundo").value += "\n*Informações Importantes:*\n";
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


function popup(texto) {
    alert(texto);
}

function copiar() {
    const texto = document.getElementById('segundo');
    texto.select();
    document.execCommand('copy');
    alert("Texto Copiado");

}
function limpar() {
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

function datas() {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    dataAtual = dia + "/" + mes;
    document.getElementById("data").value += " - " + dataAtual;
}

function escreve() {
    var texto = document.getElementById("reuniao").value;


    if (texto === '1') {
        document.getElementById("data").value = '';
    }
    else {
        document.getElementById("data").value = texto;
    }

}

function envio() {

    var texto = document.getElementById("segundo").value;
    if (texto === "") {
        popup("ERRO, 'Texto Formatado' encontra-se em branco");
    }
    else {
        texto = window.encodeURIComponent(texto);
        window.open("https://api.whatsapp.com/send?1=pt_BR&text=" + texto, "_blank");
    }

}

function habilita() {
    document.getElementById("NomeUsuario").disabled = false;
    document.getElementById("reuniao").disabled = false;
    document.getElementById("data").disabled = false;
    document.getElementById("primeiro").disabled = false;
    document.getElementById("ponto").disabled = false;
    document.getElementById("segundo").disabled = false;


}

