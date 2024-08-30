# SMARTMETER-API

A SMARTMETER-API foi projetada para gerenciar a leitura individualizada de consumo de água e gás, utilizando inteligência artificial (IA) para facilitar a coleta de dados através da análise de fotos dos medidores. Este serviço permite que usuários enviem imagens de seus medidores de água e gás, e a IA integrada na API processa essas imagens para extrair automaticamente as leituras de consumo.

># Como Rodar o Projeto

## Pré-requisitos
Para rodar o projeto, é necessário ter o Docker instalado em sua máquina.

Este projeto utiliza o GEMINI para extração de valores de medidas das imagens, sendo necessário possuir uma API Key do GEMINI.

## Passos para Rodar o Projet
### 1. Clone o Repositório
```bash 
git clone https://github.com/gervasioartur/smartmeter-api.git
```
### 2. Navegue até o Diretório do Projeto
```bash 
cd smartmeter
```
### 3. Crie as Variáveis de Ambiente .env
```bash 
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### 3. Execute o Comando Docker
```bash 
docker compose up -d
```

Após seguir os passos acima, você pode testar os endpoints utilizando o Swagger ou qualquer ferramenta de simulação de requisições.

## Testando Endpoints
### Usando Swagger
```bash 
http://localhost:8080/swagger-ui/index.html#/
```

### Usando Outras Ferramentas de Simulação de Requisições
```bash 
http://localhost:8080/
```

#### NOTE
    Além da variável GEMINI_API_KEY, existem outras variáveis de ambiente, como PORT, HOST, e DATABASE_URL. A diferença é que essas variáveis já vêm com valores predefinidos no arquivo docker-compose.yml. Elas podem ser alteradas no arquivo .env ou diretamente no arquivo docker-compose.yml.

    - PORT (opcional): Refere-se à porta onde a aplicação está rodando.
    - HOST (opcional): Refere-se ao host onde a aplicação está.
    - DATABASE_URL (requerida): Refere-se à URL do banco de dados MongoDB.


# Endppoins

## ``POST /upload``
Responsável por receber uma imagem em base64, consultar o GEMINI e retornar a medida lida pela API.

### Açoes:
- Valida o tipo de dados dos parâmetros enviados (inclusive o base64)
- Verifica se já existe uma leitura no mês naquele tipo de leitura.
- Integra com uma API de LLM para extrair o valor da imagem

### Retorno:
- Link temporário da imagem
- O GUID
- O valor numérico reconhecido pela LLM


#### Request Body
```bash
{
 "image": "base64",
 "customer_code": "string",
 "measure_datetime": "datetime",
 "measure_type": "WATER" ou "GAS"
}
```

## ``PATCH /confirm``
Responsável por confirmar ou corrigir o valor lido pelo LLM,

### Ações:
- Valida o tipo de dados dos parâmetros enviados
- Verifica se o código de leitura informado existe
- Verifica se o código de leitura já foi confirmado
- Salva no banco de dados o novo valor informado

#### Request Body
```bash
{
 "measure_uuid": "string",
 "confirmed_value": integer
}
```

## ``GET /<customer_code>/list``
Responsável por listar as medidas realizadas por um determinado cliente

### Ações:
- Recebe o código do cliente e filtra as medidas realizadas por ele
- Ele opcionalmente pode receber um query parameter ``measure_type``, que deve ser ``WATER`` ou ``GAS``
- A validação é ``CASE INSENSITIVE``
- Se o parâmetro for informado, filtra apenas os valores do tipo
especificado. Senão, retorna todos os tipos. Ex.
  ``{base url}/<customer code>/list?measure_type=WATER``

### Retorno:
- Uma lista com todas as leituras realizadas.

```bash
{
 “customer_code”: string,
 “measures”: [
 {
 “measure_uuid”: string,
 “measure_datetime”: datetime,
 “measure_type”: string,
 “has_confirmed”:boolean,
 “image_url”: string
 },
 {
 “measure_uuid”: string,
 “measure_datetime”: datetime,
 “measure_type”: string,
 “has_confirmed”:boolean,
 “image_url”: string
 }
 ]
}
 ```