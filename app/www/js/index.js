document.addEventListener("deviceready", onDeviceReady, false);

// const submitName = async (name) => {
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("teste").innerHTML = this.responseText;
//         }
//     };
//     xhttp.open("GET", `http://localhost:7000/client/${name}`);

//     xhttp.send();
// };

function postAjax(url, data) {
    var xhr = new XMLHttpRequest();

    if (xhr) {
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }
}

const submitName = (name) => {
    // try {
    //     $.ajax({
    //         url: `http://10.0.0.108:7000/client/${name}`,
    //         success: function (result) {
    //             alert(result);
    //             $("#teste").html(`<p>${result}</p>`);
    //         },

    //     });
    // } catch (error) {
    //     alert(error);
    // }

    // $("#teste").html(`<h1>oiiiii</h1>`);
    const options = {
        type: "get",
    };
    try {
        cordova.plugin.http.sendRequest(
            `http://192.168.0.105/client/${name}`,
            options,
            function (response) {
                // prints 200
                $("#teste").html(`<h1>${response.data}</h1>`);
            },
            function (response) {
                $("#teste").html(`<h1>${response.error} </h1>`);
                console.log(response.error);
                // prints 403
            }
        );
    } catch (error) {}

    // $.ajax({
    //     url: `http://localhost:7000/client/${name}`,
    //     type: "GET",
    //     success: function (result) {
    //         $("#teste").html(`<h1>${result}</h1>`);
    //         console.log(result);
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {
    //         console.log(textStatus + jqXHR.responseText);
    //     },
    // });
    // postAjax(`http://10.0.0.108:7000/client/${name}`);
};

function onDeviceReady() {
    const button = document.getElementById("buttonName");

    button.addEventListener("click", () => {
        const input = document.getElementById("inputName").value;
        submitName(input);
    });
}
