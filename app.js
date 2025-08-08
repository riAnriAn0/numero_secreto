responsiveVoice.init();

let listaDeNumerossorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let numeroLimite;

function gerarNumeroAleatorio(){

    let tamanhoLista = listaDeNumerossorteados.length;
    if(tamanhoLista >= 10){
        listaDeNumerossorteados = [];
    }

    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    if(listaDeNumerossorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerossorteados.push(numeroEscolhido);
        console.log(listaDeNumerossorteados);
        return numeroEscolhido;
    }
}   

function exibirTexto(tag, texto){
    let campoTexto = document.querySelector(tag);
    campoTexto.innerHTML = texto;
    responsiveVoice.speak(texto,"Brazilian Portuguese Female");
}

function exibirMensagemInicial(){
    exibirTexto("h1", "Jogo do número secreto");
    exibirTexto("p", "Escolha um número entre 1 e 10.");
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagem =  "O número secreto era " + numeroSecreto + " com " + tentativas + " " + palavraTentativa + "."
        exibirTexto("h1", "Você acertou!");
        exibirTexto("p", mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute < numeroSecreto){
            exibirTexto("p", "O número secreto é maior.");
        }else{
            exibirTexto("p", "O número secreto é menor.");
        }
        limparCampo();
        tentativas++;
    }
}  

function limparCampo(){
    let input = document.querySelector('input');
    input.value = "";
    input.focus();
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}