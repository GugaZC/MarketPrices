document.addEventListener("deviceready", onDeviceReady, false);

const submitName = (name) => {
    let client;
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

    // <img src="./img/${product.name}.jpg" alt="${product.name}" />
       

        QRScanner.show();
        // // Be sure to make any opaque HTML elements transparent here to avoid
        // // covering the video
        // // 
        QRScanner.scan(displayContents);
     
        function displayContents(err, text){
            if(err){
                console.log('erro');
                alert("deu erro ao ler o qrcode");
            } else {
                // QRScanner.classList.add("hidden");
                QRScanner.destroy();
                document.getElementById("body").classList.add("default");
                // The scan completed, display the contents of the QR code:
                getProduct(text, client);
                // alert('alo');
                // alert(`O produto escolhido é ${product.name}, o seu valor normal é de ${product.value} e o valor com desconto para você é de ${discountedValue}`);
                // const mainDiv = document.getElementById('app');
                
                // const content = `<div class="card-wrapper">
                // <div class="card-container">
                // <div class="img">
                
                // </div>
                // <div class="old-price">
                // <p>De: R$ 50</p>
                // </div>
                // <div class="new-price">
                // <p>Por: R$ 300</p>
                // </div>
                // <div class="button-confirm">
                // <button>Confirmar</button>
                // </div>
                // </div>
                // </div>`
                
                // mainDiv.innerHTML = content;    
            }
            // QRScanner.hide( status => alert(status));
        }

    // Make the webview transparent so the video preview is visible behind it.

};

// function prepareQRcode() {
//     window.plugin.CanvasCamera.initialize(document.getElementById("canvas"));
//     var optionsQRCODE = {
//         cameraPosition: "back",
//         width: 352,
//         height: 288,
//         canvas: {
//             width: 352,
//             height: 288,
//         },
//         capture: {
//             width: 352,
//             height: 288,
//         },
//         fps: 30,
//         use: "file",
//         flashMode: false,
//         thumbnailRatio: 1 / 6,
//         onBeforeDraw: function (frame) {
//             // do something before drawing a frame
//         },
//         onAfterDraw: function (frame) {
//             var c = document.getElementById("canvas");
//             if (contador == 10) {
//                 alert('alo');
//                 const code = jsQR(
//                     c.getContext("2d").getImageData(0, 0, c.width, c.height)
//                         .data,
//                     c.width,
//                     c.height
//                 );
//                 if (code) {
//                     window.plugin.CanvasCamera.stop();
//                     displayContents(null, code.data);
//                 }
//                 contador = 0;
//             } else contador++;
//         },
//     };
//     const button = document.getElementById("buttonName");

//     button.addEventListener("click", () => {
//         window.plugin.CanvasCamera.start(optionsQRCODE);
//     });
// }

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
                const content = `<div class="card-wrapper">

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
                <button>Confirmar</button>
                </div>
                </div>
                </div>`

                mainDiv.insertAdjacentHTML("afterend", content);
            
            },
            function (response) {
                $("#teste").html(`<h1>${response.error} </h1>`);
                console.log(response.error);
                // prints 403
            }
        );
    } catch (error) {
        console.log(error);
    }
    

};


function onDeviceReady() {
    const button = document.getElementById("buttonName");
    // prepareQRcode()

    button.addEventListener("click", () => {
        const input = document.getElementById("inputName");
        input.classList.add("hidden")
        submitName(input.value);
        button.classList.add('hidden');
    });
}
