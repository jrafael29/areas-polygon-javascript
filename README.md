**Requerimentos** 

Para rodar esta aplicação você vai precisar:
* Criar um arquivo .env, apartir do .env-copy, com os campos preenchidos.
* Node18 +
* Mysql 

Dentro do client do mysql, conectado no banco de dados, 
execute as instruções contidas no arquivo /server/src/infra/schema.db 
para criar a tabela que irá armazenar as areas de polygono.
(OBS: caso queira alterar o nome da tabela, deve-se alterar a constante `AREA_TABLE_NAME`
      no arquivo /server/src/data/polygonData.js)


Essa aplicação utiliza as seguintes dependencias OPEN-SOURCE:

* [Leaflet.js](https://leafletjs.com/)
* [Turf.js](https://turfjs.org/)
* [OpenRouteService](https://openrouteservice.org/)
* [Mysql2](https://www.npmjs.com/package/mysql2)
* [Express](https://www.npmjs.com/package/express)
* [Bootstrap](https://getbootstrap.com/)


(obs: O OpenRouteService tem um limite de 500 requisições por dia, para utilizar esse serviço, cria uma conta no site; ao fazer login será possivel obter uma API_KEY, após obtido, coloque-a no .env em OPEN_ROUTE_API_KEY)

**Instalando a executando a aplicação**

Rode o seguinte comando no terminal:
'npm ci --silent && npm start'
isso vai fazer com que instale as dependencias e inicie a aplicação.

**-**
Essa aplicação tem o intuito de salvar areas de poligonos com valor.
O projeto está dividido em duas partes: 

#Server - Contem toda a API e parte de interação com o banco de dados.
#Client - Contem toda a parte de visualização e interação com a api

**Exemplo para inserção de dados via cURL**

// buscar areas example
    ```curl -X GET -H "Content-Type: application/json"  http://127.0.0.1:3005/get-polygon-value-areas```

// criar area example 
    ```curl -X POST -H "Content-Type: application/json" -d '{"area": [{"lat":9.814623,"lng":-0.453186},{"lat":9.814623,"lng":-0.453186},{"lat":9.818682,"lng":-0.324097},{"lat":9.818682,"lng":-0.324097},{"lat":9.698228,"lng":-0.328217},{"lat":9.698228,"lng":-0.328217},{"lat":9.690106,"lng":-0.458679},{"lat":9.690106,"lng":-0.458679},{"lat":9.749663,"lng":-0.395508},{"lat":9.749663,"lng":-0.395508},{"lat":9.814623,"lng":-0.453186}],"description": "descrição teste","valueArea": "7.50","colorArea": "#f3f0f3" }' http://127.0.0.1:3005/store-polygon-value-area```

// excluir area example
    ```curl -X POST -H "Content-Type: application/json" http://127.0.0.1:3005/delete-polygon-value-area/1```

// atualizar area example
    ```curl -X POST -H "Content-Type: application/json" -d '{"area": [{"lat":9.814623,"lng":-0.453186},{"lat":9.814623,"lng":-0.453186},{"lat":9.818682,"lng":-0.324097},{"lat":9.818682,"lng":-0.324097},{"lat":9.698228,"lng":-0.328217},{"lat":9.698228,"lng":-0.328217},{"lat":9.690106,"lng":-0.458679},{"lat":9.690106,"lng":-0.458679},{"lat":9.749663,"lng":-0.395508},{"lat":9.749663,"lng":-0.395508},{"lat":9.814623,"lng":-0.453186}],"description": "descrição teste alterada","valueArea": "7.50","colorArea": "#f3f0f3" }' http://127.0.0.1:3005/update-polygon-value-area/1```



__*Desenvolvido por José Rafael © 2023*__