document.addEventListener("DOMContentLoaded", function() {
    const btn = document.querySelector(".button-registration-footer");
    const input = document.querySelector(".input-registration-footer");
    
    btn.addEventListener("click", function() {
        const email = input.value.trim();
        const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        
        if (emailPattern.test(email)) {
            let emails = JSON.parse(localStorage.getItem('emails')) || [];
            emails.push(email);
            localStorage.setItem('emails', JSON.stringify(emails));

            alert("Ваш электронный адрес успешно сохранен!");
            console.log('Сохраненные email:', emails);
        } else {
            alert("Пожалуйста, введите действительный адрес электронной почты.");
        }
    });
});