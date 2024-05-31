export default function footerFunc() {
    const btn = document.querySelector(".button-registration-footer");
    
    btn.addEventListener("click", function() {
        const input = document.querySelector(".input-registration-footer").value;
        const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (emailPattern.test(input)) {
            
            alert("Ваш електронний лист успішно надіслано!");
        } else {
            alert("Будь ласка, введіть дійсну адресу електронної пошти.");
        }
    })
}

