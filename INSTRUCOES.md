# CyberSafe — página para GitHub Pages

## O que fazer
1. Baixe/extraia este ZIP.
2. Copie `index.html`, `style.css` e `script.js` para a pasta principal do repositório `CyberSafe`.
3. **Não apague** `main.py`, `seguranca.py`, `requirements.txt` nem o README atual. A página web complementa o projeto Python.
4. Faça commit/push dos três arquivos novos para a branch `main`.
5. Em GitHub → Settings → Pages, confira se a publicação está configurada para `Deploy from a branch`, branch `main`, pasta `/(root)`.
6. Abra `https://natalydamrat.github.io/CyberSafe/`. Se continuar mostrando a versão antiga, atualize com Ctrl + F5 ou aguarde alguns minutos.

## Ferramentas incluídas
- Cifra de César: criptografar e descriptografar texto.
- Hash SHA-256: gera hash no navegador usando Web Crypto.
- Cadastro/login demonstrativo: PBKDF2-HMAC-SHA256 com salt aleatório, apenas em memória.
- Simulação de dicionário e força bruta limitada a 3 letras minúsculas.

## Observações
- O site é uma interface didática em HTML, CSS e JavaScript. Ele não executa Python no navegador.
- Os arquivos Python originais continuam no repositório e podem ser executados no terminal com `python main.py`.
- Não use senhas reais. Os cadastros da página são apagados ao recarregar e não são enviados a servidor.
- A cifra de César é didática e fraca; SHA-256 simples não é adequado para armazenamento real de senhas.
