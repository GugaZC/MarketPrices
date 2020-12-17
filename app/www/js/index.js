document.addEventListener("deviceready", onDeviceReady, false);

let client;
const submitName = (name) => {
    const options = {
        type: "get",
    };
    try {

        cordova.plugin.http.sendRequest(
            `http://192.168.0.105:7000/client/${name}`,
            options,
            function (response) {
                // prints 200
                $("#teste").html(`<h1>${response.data}</h1>`);
                client = JSON.parse(response.data);
                const mainDiv = document.getElementById('app');
                mainDiv.innerHTML = `<p class="clientName">Olá ${client.name}</p>`                
            },
            function (response) {
                $("#teste").html(`<h1>${response.error} </h1>`);
                console.log(response.error);
                // prints 403
            }
        );
    } catch (error) {}

    QRScanner.show();
    QRScanner.scan(displayContents);
    
    function displayContents(err, text){
        if(err){
            alert("Erro na leitura do QRCode!!!");
        } else {
            QRScanner.destroy();
            document.getElementById("body").classList.add("default");
            getProduct(text, client);
        } 
    }              
};


function getProduct (id, client) {
   
    const options = {
        type: "get",
    };
    try {
        cordova.plugin.http.sendRequest(
            `http://192.168.0.105:7000/product/${Number(id)}`,
            options,
            function (response) {
                // prints 200 
                const product = JSON.parse(response.data);
                const discountedValue = (Number(product.value) * (1-Number(client.discount)/100)).toFixed(2);
                const mainDiv = document.getElementById('app');
                const content = `
                <div class="card-wrapper">
                    <div class="card-container">
                        <div class="img">
                            <img src="./img/${product.id}.jpg" alt="${product.name}" />
                        </div>
                        <div class="old-price">
                            <p>De: R$ ${product.value}</p>
                        </div>
                        <div class="new-price">
                            <p>Por: R$${discountedValue}</p>
                        </div>
                        <div class="button-confirm">
                            <button id='backButton' class="back">X</button>
                            <button id='confirmButton' >Confirmar</button>
                        </div>
                    </div>
                </div>`;
                mainDiv.insertAdjacentHTML("afterend", content);
                document.getElementById('confirmButton').addEventListener('click', handleConfirmClick);
                document.getElementById('backButton').addEventListener('click', handleCancelClick);

            },
            function (response) {
                console.log(response.error);
                // prints 403
            }
            
        );
    } catch (error) {
        console.log(error);
    }
    

};
const handleCancelClick = () =>{
    document.getElementById("body").classList.remove("default");
    submitName();
    document.getElementsByClassName('card-wrapper')[0].classList.add('hidden');
}

const handleConfirmClick = () => {
    document.getElementById("body").classList.remove("default");
    submitName();
    document.getElementsByClassName('card-wrapper')[0].classList.add('hidden');

    const options = {
        type: "get",
    };
                    
                                     
    cordova.plugin.http.sendRequest(
    `http://192.168.0.105:7000/client/update/${client.name}`,
    options,
    function (response) {
        // prints 200
        client = JSON.parse(response.data);
     
    },
    function (response) {
        console.log(response.error);
        // prints 403
    }   
    )
}

function onDeviceReady() {
    const button = document.getElementById("buttonName");

    button.addEventListener("click", () => {
        const input = document.getElementById("inputName");
        input.classList.add("hidden");
        submitName(input.value);
        button.classList.add('hidden');
    });
}
