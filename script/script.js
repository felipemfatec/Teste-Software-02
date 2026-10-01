function validarEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function validarNome(nome) {
    return nome.length >= 3;
}

function validarSenha(senha) {
    return senha.length >= 6 && /\d/.test(senha);
}

function mostrarMensagem(msg, cor) {
    const el = document.getElementById("mensagem");
    el.textContent = msg;
    el.style.color = cor;
}

function mostrarAba(aba) {
    document.getElementById('formCadastro').style.display = aba === 'cadastro' ? 'block' : 'none';
    document.getElementById('formLogin').style.display = aba === 'login' ? 'block' : 'none';
    
    const botoes = document.querySelectorAll('.tab-btn');
    botoes[0].classList.toggle('active', aba === 'cadastro');
    botoes[1].classList.toggle('active', aba === 'login');
    
    mostrarMensagem("", ""); 
}

function cadastrar() {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmar = document.getElementById("confirmar");
    let valido = true;

    document.querySelectorAll("#formCadastro input").forEach(i => {
        i.classList.remove("erro", "sucesso");
    });

    if (!validarNome(nome.value.trim())) {
        nome.classList.add("erro");
        valido = false;
    } else nome.classList.add("sucesso");

    if (!validarEmail(email.value.trim())) {
        email.classList.add("erro");
        valido = false;
    } else email.classList.add("sucesso");

    if (!validarSenha(senha.value)) {
        senha.classList.add("erro");
        valido = false;
    } else senha.classList.add("sucesso");

    if (senha.value !== confirmar.value || confirmar.value === "") {
        confirmar.classList.add("erro");
        valido = false;
    } else confirmar.classList.add("sucesso");

    if (!valido) {
        mostrarMensagem("❌ Verifique os campos obrigatórios e as regras!", "#ff4757");
        return;
    }

    const usuario = {
        nome: nome.value.trim(),
        email: email.value.trim(),
        senha: senha.value 
    };

    localStorage.setItem("gamebreakers_user", JSON.stringify(usuario));
    mostrarMensagem("✅ Cadastro realizado com sucesso! Faça seu login.", "#2ed573");
    
    setTimeout(() => mostrarAba('login'), 2000);
}

function fazerLogin() {
    const emailLogin = document.getElementById("loginEmail").value.trim();
    const senhaLogin = document.getElementById("loginSenha").value;
    
    const usuarioSalvo = JSON.parse(localStorage.getItem("gamebreakers_user"));

    if (!usuarioSalvo) {
        mostrarMensagem("❌ Nenhum usuário cadastrado encontrado no sistema.", "#ff4757");
        return;
    }

    if (emailLogin === usuarioSalvo.email && senhaLogin === usuarioSalvo.senha) {
        mostrarMensagem(`🎮 Bem-vindo(a) de volta, ${usuarioSalvo.nome}! Login realizado com sucesso.`, "#2ed573");
    } else {
        mostrarMensagem("❌ E-mail ou senha inválidos.", "#ff4757");
    }
}

console.assert(validarEmail("player@epic.com") === true, "Teste Email Válido falhou");
console.assert(validarEmail("player@") === false, "Teste Email Inválido falhou");
console.assert(validarNome("Gamer") === true, "Teste Nome Válido falhou");
console.assert(validarNome("Al") === false, "Teste Nome Inválido falhou");
console.assert(validarSenha("senha123") === true, "Teste Senha Forte falhou");
console.assert(validarSenha("fraca") === false, "Teste Senha Fraca falhou");

console.log("🚀 Todos os testes de unidade da GameBreakers passaram com sucesso!");