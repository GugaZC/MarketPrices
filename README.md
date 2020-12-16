# MarketPrices

## Resumo do projeto

Este projeto é uma aplicação mobile para a checagem de preços e compra de produtos a partir de QR-Codes.

O usuário loga-se no aplicativo, e após a confirmação de seu login, ele poderá escanear um QR-Code de um respectivo produto para saber o seu valor e eventualmente comprar tal produto. Cada usuário pode ter um fator de desconto, que será aplicado ao valor inicial do produto caso o atributo de desconto for de fato. O usuário pode escanear outros códigos após verificar o preço do produto de interesse e/ou comprar o produto de interesse.

## Funcionamento do projeto

Para o funcionamento pleno do projeto, é necessário:

<ul>
<li> Instalar o Cordova e suas dependências (Android SDK, JAVA SDK, cordova-plugin-advanced-http, cordova-plugin-file, cordova-plugin-qrscanner e cordova-sqlite-storage). </li>
<li> Adicionar na pasta do projeto uma pasta "db" para que os esquemas e tabelas do projeto sejam executados (lembre-se de comentar as funções de banco após a população". </li>
<li> Para popular o banco de dados basta descomentar as funções "createTables", "insertProducts" e "insertClients". </li>
<li> Para as requisições, é necessário substituir o endereço IP do "index.js" pelo seu endereço IPV6 da sua máquina. </li>
  </ul>


