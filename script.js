const $ = (id) => document.getElementById(id);

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".tool-panel").forEach((panel) => {
      panel.hidden = true;
      panel.classList.remove("active");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    const panel = $("panel-" + tab.dataset.tab);
    panel.hidden = false;
    panel.classList.add("active");
  });
});

function cifraCesar(texto, deslocamento) {
  const shift = ((Number(deslocamento) % 26) + 26) % 26;
  return [...texto].map((caractere) => {
    const codigo = caractere.charCodeAt(0);
    if (codigo >= 65 && codigo <= 90) return String.fromCharCode(((codigo - 65 + shift) % 26) + 65);
    if (codigo >= 97 && codigo <= 122) return String.fromCharCode(((codigo - 97 + shift) % 26) + 97);
    return caractere;
  }).join("");
}
function executarCifra(inverso = false) {
  const texto = $("cifra-texto").value;
  const deslocamento = Number($("deslocamento").value) || 0;
  $("cifra-resultado").textContent = texto ? cifraCesar(texto, inverso ? -deslocamento : deslocamento) : "Digite uma mensagem primeiro.";
}
$("cifrar").addEventListener("click", () => executarCifra(false));
$("decifrar").addEventListener("click", () => executarCifra(true));

$("gerar-hash").addEventListener("click", async () => {
  const texto = $("hash-texto").value;
  if (!texto) { $("hash-resultado").textContent = "Digite um texto primeiro."; return; }
  if (!window.crypto?.subtle) { $("hash-resultado").textContent = "Web Crypto não está disponível neste navegador/contexto."; return; }
  const bytes = new TextEncoder().encode(texto);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  $("hash-resultado").textContent = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
});

let cadastroAtual = null;
const encoder = new TextEncoder();
async function derivarSenha(senha, salt) {
  const material = await crypto.subtle.importKey("raw", encoder.encode(senha), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({name:"PBKDF2", salt, iterations:150000, hash:"SHA-256"}, material, 256);
  return [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
$("cadastrar").addEventListener("click", async () => {
  const usuario = $("usuario").value.trim();
  const senha = $("senha").value;
  if (!usuario || !senha) { $("login-resultado").textContent = "Preencha usuário e senha."; return; }
  if (!crypto?.subtle) { $("login-resultado").textContent = "Web Crypto não está disponível neste navegador."; return; }
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivarSenha(senha, salt);
  cadastroAtual = {usuario, salt, hash};
  $("login-resultado").textContent = `Cadastro demonstrativo criado para "${usuario}". O hash foi armazenado apenas nesta sessão.`;
});
$("entrar").addEventListener("click", async () => {
  const usuario = $("usuario").value.trim();
  const senha = $("senha").value;
  if (!cadastroAtual) { $("login-resultado").textContent = "Crie um cadastro antes de testar o login."; return; }
  if (!usuario || !senha) { $("login-resultado").textContent = "Preencha usuário e senha."; return; }
  const hash = await derivarSenha(senha, cadastroAtual.salt);
  $("login-resultado").textContent = usuario === cadastroAtual.usuario && hash === cadastroAtual.hash
    ? "Login autorizado! As credenciais correspondem ao cadastro."
    : "Acesso negado. Confira o usuário e a senha.";
});

const palavrasComuns = ["123456","senha","password","admin","gato","gatos","12345","abc123","qwerty","brasil","amor","12345678"];
$("dicionario").addEventListener("click", () => {
  const alvo = $("senha-teste").value;
  if (!alvo) { $("ataque-resultado").textContent = "Digite uma senha fictícia para testar."; return; }
  const tentativa = palavrasComuns.find((palavra) => palavra === alvo);
  $("ataque-resultado").textContent = tentativa
    ? `Senha encontrada: "${tentativa}". Ela estava na lista de palavras comuns (${palavrasComuns.length} tentativas no máximo).`
    : `Senha não encontrada na lista de ${palavrasComuns.length} palavras. Isso não significa que seja invulnerável.`;
});
$("forca").addEventListener("click", () => {
  const alvo = $("senha-teste").value;
  if (!alvo) { $("ataque-resultado").textContent = "Digite uma senha fictícia para testar."; return; }
  if (!/^[a-z]{1,3}$/.test(alvo)) { $("ataque-resultado").textContent = "Para esta demonstração, use apenas 1 a 3 letras minúsculas (a-z)."; return; }
  const alfabeto = "abcdefghijklmnopqrstuvwxyz";
  let tentativas = 0;
  for (let tamanho = 1; tamanho <= 3; tamanho++) {
    const limite = 26 ** tamanho;
    for (let n = 0; n < limite; n++) {
      let numero = n, tentativa = "";
      for (let pos = 0; pos < tamanho; pos++) { tentativa = alfabeto[numero % 26] + tentativa; numero = Math.floor(numero / 26); }
      tentativas++;
      if (tentativa === alvo) {
        $("ataque-resultado").textContent = `Senha encontrada: "${tentativa}" após ${tentativas.toLocaleString("pt-BR")} tentativas.`;
        return;
      }
    }
  }
  $("ataque-resultado").textContent = `Não encontrada no espaço de busca (até 3 letras). ${tentativas.toLocaleString("pt-BR")} combinações testadas.`;
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = $(button.dataset.copy).textContent;
    try { await navigator.clipboard.writeText(value); button.textContent = "Copiado!"; }
    catch { button.textContent = "Copie manualmente"; }
    setTimeout(() => { button.textContent = "Copiar"; }, 1600);
  });
});
