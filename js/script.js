function formatar() {
    var encaminhamento = document.getElementById("primeiro").value;
    var importante = document.getElementById("ponto").value;
    if (encaminhamento === "" & importante === "") {
        popup("Impossivel fazer formatação sem texto");
    }
    else {
        document.getElementById("segundo").value = "";
        var texto = document.getElementById("primeiro").value;
        var vetorString = texto.split("\n");
        var tamanho = vetorString.length;

        var teste = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
        if (teste === "1") {
            document.getElementById("segundo").value += "*Ponto de Controle " + document.getElementById("data").value + "*";
        }
        else {
            document.getElementById("segundo").value += "*Reunião " + document.getElementById("data").value + "*";
        }
        if (encaminhamento !== "") {

            document.getElementById("segundo").value += "\n\n*Encaminhamentos*\n";
            for (var i = 0; i < tamanho; i++) {
                var aux = vetorString[i];
                var tamanhoAux = aux.length;
                for (var j = 0; j < tamanhoAux; j++) {
                    if (j === 0) {
                        document.getElementById("segundo").value += "- ";
                        document.getElementById("segundo").value += aux[j];
                    }
                    else {
                        if (aux[j] === "#") {
                            if (aux[j - 1] === " ") {
                                if (aux[j - 2] === ".") {
                                    document.getElementById("segundo").value += "*";
                                }
                                else {
                                    document.getElementById("segundo").value += ". *";

                                }
                            }
                            else {
                                if (aux[j - 1] === ".") {
                                    document.getElementById("segundo").value += " *";

                                }
                                else {
                                    document.getElementById("segundo").value += ". *";
                                }
                            }
                            if (aux[j + 1] === " ") {
                                j = j + 2;
                                document.getElementById("segundo").value += aux[j];
                            }
                        }


                        else {

                            document.getElementById("segundo").value += aux[j];
                        }
                    }
                }
                document.getElementById("segundo").value += "*\n";
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


function popup(texto) {
    alert(texto);
}

function copiar() {
    const textInput = document.getElementById('segundo');
    const copyButton = document.getElementById('botao');

    copyButton.addEventListener('click', () => {
        textInput.select();
        document.execCommand('copy');
    });
}
function limpar() {
    document.getElementById("primeiro").value = "";
    document.getElementById("ponto").value = "";
    document.getElementById("segundo").value = "";
    document.getElementById("data").value = "";
    document.getElementById("reuniao").value = "";
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
    texto = window.encodeURIComponent(texto);

    window.open("https://api.whatsapp.com/send?&text=" + texto, "_blank");
}