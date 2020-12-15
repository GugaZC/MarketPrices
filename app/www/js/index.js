const api = "../../services";

document.addEventListener("deviceready", onDeviceReady, false);

const submitName = async (name) => {
    const client = await api.get(`/client/${name}`);

    alert("oi");
};

function onDeviceReady() {
    const button = document.getElementById("buttonName");

    button.addEventListener("click", () => {
        const input = document.getElementById("inputName").value;
        submitName(input);
    });
}
