from seguranca import (
    cifra_substituicao, gerar_hash_simples, criar_hash_seguro,
    verificar_senha, simular_ataque_dicionario, simular_forca_bruta
)

def menu():
    print("""
========== CYBERSAFE | LABORATÓRIO DIGITAL ==========
1. Criptografar mensagem
2. Descriptografar mensagem
3. Gerar hash SHA-256
4. Criar cadastro com senha protegida
5. Testar login
6. Simular ataque de dicionário (local)
7. Simular força bruta (local e limitada)
0. Sair
""")

def executar():
    cadastro = None
    while True:
        menu()
        opcao = input("Escolha: ").strip()

        if opcao in ("1", "2"):
            texto = input("Mensagem: ")
            try:
                chave = int(input("Deslocamento (número inteiro): "))
                if opcao == "2":
                    chave = -chave
                print("Resultado:", cifra_substituicao(texto, chave))
            except ValueError:
                print("Informe um número inteiro.")

        elif opcao == "3":
            texto = input("Texto para gerar hash: ")
            print("SHA-256:", gerar_hash_simples(texto))
            print("Hash não é criptografia: não foi feito para ser revertido.")

        elif opcao == "4":
            if cadastro is not None:
                print("Já existe um cadastro nesta execução.")
            else:
                usuario = input("Nome de usuário: ").strip()
                senha = input("Senha fictícia para o exercício: ")
                if usuario and senha:
                    cadastro = (usuario, criar_hash_seguro(senha))
                    print("Cadastro criado. A senha não foi guardada em texto puro.")
                else:
                    print("Os campos não podem ficar vazios.")

        elif opcao == "5":
            if cadastro is None:
                print("Crie um cadastro primeiro (opção 4).")
            else:
                usuario = input("Usuário: ").strip()
                senha = input("Senha: ")
                if usuario == cadastro[0] and verificar_senha(senha, cadastro[1]):
                    print("Acesso permitido!")
                else:
                    print("Usuário ou senha incorretos.")

        elif opcao == "6":
            alvo = input("Senha fictícia (1 a 4 letras minúsculas): ")
            if not (1 <= len(alvo) <= 4 and alvo.isascii() and alvo.isalpha() and alvo.islower()):
                print("Use de 1 a 4 letras minúsculas (a-z).")
            else:
                palavras = ["gato", "senha", "python", "luna", "amor", "teste", "abc", alvo]
                print("Resultado:", simular_ataque_dicionario(alvo, palavras) or "Não encontrada.")

        elif opcao == "7":
            alvo = input("Senha fictícia (1 a 3 letras minúsculas): ")
            if not (1 <= len(alvo) <= 3 and alvo.isascii() and alvo.isalpha() and alvo.islower()):
                print("Use de 1 a 3 letras minúsculas (a-z).")
            else:
                encontrada, tentativas = simular_forca_bruta(alvo)
                print(f"Senha de teste encontrada: {encontrada}")
                print(f"Combinações verificadas: {tentativas}")

        elif opcao == "0":
            print("Até a próxima! Proteja seus dados.")
            break
        else:
            print("Opção inválida.")

if __name__ == "__main__":
    executar()
