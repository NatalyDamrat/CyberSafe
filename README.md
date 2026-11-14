# 🔐 CyberSafe — Laboratório de Segurança Digital

Projeto educativo em Python inspirado na unidade **Proteção de informações: criptografia e hash com Python**, da Alura Start.

## Como executar
1. Instale o Python 3.
2. Abra esta pasta no VS Code ou terminal.
3. Execute `python main.py` (no Windows, também pode funcionar `py main.py`).

Não é necessário instalar bibliotecas externas.

## Funcionalidades
1. Criptografar mensagens com cifra de César.
2. Descriptografar mensagens com o deslocamento inverso.
3. Gerar hash SHA-256.
4. Criar cadastro com salt aleatório e PBKDF2-HMAC-SHA256.
5. Simular login verificando o hash da senha.
6. Simular ataque de dicionário contra uma senha fictícia local.
7. Simular força bruta com letras minúsculas e limite de três caracteres.

## Relação com as aulas
| Conteúdo | Aplicação |
|---|---|
| Criptografia por substituição | `cifra_substituicao()` |
| Tabela ASCII | `ord()` e `chr()` |
| Strings e laços | Percorrer caracteres da mensagem |
| Funções | Funções em `seguranca.py` |
| Hash | `hashlib.sha256()` |
| Hash com salt | `secrets.token_bytes()` e PBKDF2 |
| Autenticação | `criar_hash_seguro()` e `verificar_senha()` |
| Combinações | `itertools.product()` |
| Força bruta | Simulação local limitada |

## Fluxograma simplificado
```text
             INÍCIO
                |
          Exibir o menu
                |
          Escolher opção
                |
       +--------+---------+
       |        |         |
  Cifra/decifra Hash   Cadastro/login
       |        |         |
       +--------+---------+
                |
        Simulações locais
       (dicionário/força bruta)
                |
          Voltar ao menu
                |
           Sair? ---- não ---> Menu
             |
            sim
             |
            FIM
```

## Conceitos
- **Criptografia:** transforma uma mensagem para que possa ser recuperada com uma chave ou regra.
- **Hash:** resumo de tamanho definido; não funciona como mensagem criptografada reversível.
- **Salt:** valor aleatório que diferencia registros de senhas iguais.
- **Força bruta:** testa combinações possíveis.
- **Ataque de dicionário:** testa palavras prováveis.

## Aviso de segurança
A cifra de César e o SHA-256 simples não devem proteger informações reais. O cadastro didático usa PBKDF2-HMAC-SHA256 com salt aleatório. O cadastro existe apenas enquanto o programa está aberto. As simulações de ataques atuam somente sobre uma senha fictícia informada localmente: não fazem conexões de rede nem tentam acessar contas ou sistemas.
