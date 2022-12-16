// document.getElementById("runaway-btn").onclick = function() {
//     //validate nameInput, emailInput, and messageInput
//     let nameInput = document.getElementById("nameInput");
//     let emailInput = document.getElementById("emailInput");
//     let messageInput = document.getElementById("messageInput");
//     let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//     if(!nameInput.value){nameInput.classList.add("is-invalid");}
//     if(!emailInput.value || !emailRegex.test(emailInput.value)){emailInput.classList.add("is-invalid");}
//     if(!messageInput.value){messageInput.classList.add("is-invalid");}
// }

["click", "input"].forEach(function (el) {
//document.getElementById("nameInput") event when user starts typing in the input field
document.getElementById("nameInput").addEventListener(el, function(event) {
    //validate nameInput
    document.getElementById("nameInput").classList.add("is-invalid");
    let nameInput = document.getElementById("nameInput");
    if(nameInput.value){nameInput.classList.remove("is-invalid");}
    fulVal();
});

document.getElementById("emailInput").addEventListener(el, function(event) {
    //validate emailInput
    document.getElementById("emailInput").classList.add("is-invalid");
    let emailInput = document.getElementById("emailInput");
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(emailInput.value && emailRegex.test(emailInput.value)){emailInput.classList.remove("is-invalid");}
    fulVal();
});

document.getElementById("messageInput").addEventListener(el, function(event) {
    //validate messageInput
    document.getElementById("messageInput").classList.add("is-invalid");
    let messageInput = document.getElementById("messageInput");
    if(messageInput.value){messageInput.classList.remove("is-invalid");}
    fulVal();
});
});

function fulVal(){
    document.getElementById("runaway-btn").classList.remove("text-success");
    if(!document.getElementById("nameInput").classList.contains("is-invalid") && !document.getElementById("emailInput").classList.contains("is-invalid") && !document.getElementById("messageInput").classList.contains("is-invalid")) {
        document.getElementById("runaway-btn").classList.add("text-success");
    }
}

    