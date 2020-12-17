# MarketPrices

## Resumo do projeto

<p align="justify">Este projeto é uma aplicação mobile para a checagem de preços e compra de produtos a partir de QR-Codes. </p>

<p align="justify"> O usuário loga-se no aplicativo, e após a confirmação de seu login, ele poderá escanear um QR-Code de um respectivo produto para saber o seu valor e eventualmente comprar tal produto. Cada usuário pode ter um fator de desconto, que será aplicado ao valor inicial do produto caso o atributo de desconto for de fato. O usuário pode escanear outros códigos após verificar o preço do produto de interesse e/ou comprar o produto de interesse.</p>

## Funcionamento do projeto

Para o funcionamento pleno do projeto, é necessário:

<ul>
<li> Instalar o Cordova e suas dependências: <ul>
  <li> <b>Android SDK </b></li>
  <li> <b>JAVA SDK</b></li>
  <li><b>advanced-http</b></li>
  <li> <b>plugin-file</b></li>
  <li> <b>qrscanner</b></li>
  <li> <b>sqlite-storage</b></li> </ul> </li>
<li> Instalar o Node.js e suas dependências: <ul>
  <li><b>cors</b></li>
  <li><b>express</b></li>
  <li><b>method-override</b></li>
  <li><b>sqlite</b></li>
  <li><b>sqlite3</b></li> </ul> </li>
<li> Adicionar na pasta do projeto uma pasta "db" para que os esquemas e tabelas do projeto sejam executados (lembre-se de comentar as funções de banco após a população". </li>
<li> Para popular o banco de dados basta descomentar as funções "createTables", "insertProducts" e "insertClients". </li>
<li> Para as requisições, é necessário substituir o endereço IP do "index.js" pelo seu endereço IPV6 da sua máquina. </li>
  </ul>
  
  ## Execução do projeto

Para a execução do projeto, é necessário:


<ul>
<li> Inicializar o servidor com nodemon (se você mudar a porta no servidor, lembre-se de mudar no index.js também </li>
  <li> Iniciar a emulação ANDROID (ou submeter o APK no seu dispositivo móvel) </li>
  </ul>


