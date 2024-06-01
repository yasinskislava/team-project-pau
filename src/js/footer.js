// export default function footerFunc() {
  
//     document.addEventListener("DOMContentLoaded", function() {
       

//         const btn = document.querySelector(".button-registration-footer");

//         if (!btn) {
//             console.error("Кнопка с классом 'button-registration-footer' не найдена");
//             return;
//         }

//         btn.addEventListener("click", function() {
            

//             const inputElement = document.querySelector(".input-registration-footer");

//             if (!inputElement) {
//                 console.error("Поле ввода с классом 'input-registration-footer' не найдено");
//                 return;
//             }

//             const input = inputElement.value;
//             const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//             if (emailPattern.test(input)) {
             

//                 const data = { email: input };

//                 fetch('src/json/footer.json', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(data),
//                 })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Сетевая ошибка');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     alert("Ваш электронный адрес успешно отправлен!");
//                     console.log('Успех:', data);
//                 })
//                 .catch(error => {
                    
//                     console.error('Ошибка:', error);
//                     alert("Произошла ошибка при отправке электронного письма.");
//                 });

//                 const jsonData = { email: input };
//                 const jsonContent = JSON.stringify(jsonData, null, 2);
//                 const blob = new Blob([jsonContent], { type: 'application/json' });
//                 const url = URL.createObjectURL(blob);

//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'footer.json';
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//                 URL.revokeObjectURL(url);
//             } else {
//                 alert("Пожалуйста, введите действительный адрес электронной почты.");
//             }
//         });
//     });
// }

// footerFunc();


