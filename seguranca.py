"""Funções didáticas de criptografia, hash e autenticação."""
import hashlib
import hmac
import itertools
import secrets
import string

def cifra_substituicao(texto, deslocamento):
    """Cifra de César: desloca letras, preservando maiúsculas e pontuação."""
    resultado = []
    for caractere in texto:
        if "a" <= caractere <= "z":
            resultado.append(chr((ord(caractere) - ord("a") + deslocamento) % 26 + ord("a")))
        elif "A" <= caractere <= "Z":
            resultado.append(chr((ord(caractere) - ord("A") + deslocamento) % 26 + ord("A")))
        else:
            resultado.append(caractere)
    return "".join(resultado)

def gerar_hash_simples(texto):
    """Gera um resumo SHA-256 para demonstrar o conceito de hash."""
    return hashlib.sha256(texto.encode("utf-8")).hexdigest()

def criar_hash_seguro(senha):
    """Cria registro PBKDF2 com salt aleatório; adequado para demonstração."""
    salt = secrets.token_bytes(16)
    iteracoes = 200_000
    resumo = hashlib.pbkdf2_hmac("sha256", senha.encode("utf-8"), salt, iteracoes)
    return f"pbkdf2_sha256${iteracoes}${salt.hex()}${resumo.hex()}"

def verificar_senha(senha_digitada, registro):
    """Confere senha usando comparação em tempo constante."""
    try:
        algoritmo, iteracoes_txt, salt_hex, hash_salvo = registro.split("$")
        if algoritmo != "pbkdf2_sha256":
            return False
        tentativa = hashlib.pbkdf2_hmac(
            "sha256", senha_digitada.encode("utf-8"),
            bytes.fromhex(salt_hex), int(iteracoes_txt)
        ).hex()
        return hmac.compare_digest(tentativa, hash_salvo)
    except (ValueError, TypeError):
        return False

def simular_ataque_dicionario(senha_teste, palavras):
    """Testa uma lista pequena contra senha fictícia, sem rede ou serviços externos."""
    hash_alvo = gerar_hash_simples(senha_teste)
    for palavra in palavras:
        if hmac.compare_digest(gerar_hash_simples(palavra), hash_alvo):
            return palavra
    return None

def simular_forca_bruta(senha_teste):
    """Testa a-z com até 3 caracteres, somente contra senha fictícia local."""
    hash_alvo = gerar_hash_simples(senha_teste)
    tentativas = 0
    for tamanho in range(1, 4):
        for combinacao in itertools.product(string.ascii_lowercase, repeat=tamanho):
            tentativa = "".join(combinacao)
            tentativas += 1
            if hmac.compare_digest(gerar_hash_simples(tentativa), hash_alvo):
                return tentativa, tentativas
    return None, tentativas
