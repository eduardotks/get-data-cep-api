
//Função principal 
async function pegarDados(cep) {
    
    //verifica se válido
    if (cep.length != 9) {
        mensagemRetorno("error", "Informação: " + cep + ", não corresponde como CEP!")
        limpaForm();
        return false
    }
    const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/")
    const respostaData = await resposta.json()

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep.replace("-", "")) && respostaData.cep != null && cep.length == 9) {
        populaCampos(respostaData)
        mensagemRetorno("success", "CEP " + cep + " encontrado no banco de informações!")
    }
    else {
        //cep é inválido.
        limpaForm();
        mensagemRetorno("error", "CEP " + cep + " não encontrado no banco de informações!")
    }

}

//----------------------------------------------------------
//Se tecla enter pressionada
document.getElementById('inputCep').addEventListener('keypress', function tecla(e) {
    if (e.key == "Enter") {
        pegarDados(e.path[0].value)
    }
})

//----------------------------------------------------------
//Add hifen no cep
const inputValue = document.querySelector("#inputCep");
let zipCode = "";
inputValue.addEventListener("keyup", () => {
    zipCode = inputValue.value;

    if (zipCode)
        if (zipCode.length === 8) {
            inputValue.value = `${zipCode.substring(0, 5)}-${zipCode.substring(5, 9)}`;
            console.log("Cep >> " + zipCode);
        }
});

//Filtra input para aceitar somente números
function onlynumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

//----------------------------------------------------------
//Limpa valores do formulário de cep.
function limpaForm() {
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
    document.getElementById('ibge').value = ("");
    document.getElementById('inputCep').value = ("");
}

//Preenche os campos input do HTML
function populaCampos(obj) {
    document.getElementById('rua').value = obj.logradouro;
    document.getElementById('bairro').value = obj.bairro;
    document.getElementById('cidade').value = obj.localidade;
    document.getElementById('uf').value = obj.uf;
    document.getElementById('ibge').value = obj.ibge;
}

//----------------------------------------------------------
//Mostra uma mensagem personalizada de sucesso ou erro.
function mensagemRetorno(iconTxt, titleTxt) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: iconTxt,
        title: titleTxt
    })
}