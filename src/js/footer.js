export default function func() {
    document.addEventListener("DOMContentLoaded", function () {
        const btn = document.querySelector(".button-registration-footer");
        const input = document.querySelector(".input-registration-footer");
        
        btn.addEventListener("click", function() {
            const email = input.value.trim();
            const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            
            if (emailPattern.test(email)) {
                let emails = JSON.parse(localStorage.getItem('emails')) || [];
                emails.push(email);
                localStorage.setItem('emails', JSON.stringify(emails));

                showNotification("Ваш електронний адрес успішно збережено!", "success");
                console.log('Збережені email:', emails);
            } else {
                showNotification("Будь ласка, введіть дійсну адресу електронної пошти.", "error");
            }
        });
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 3000);
}
