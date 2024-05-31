fetch('https://energyflow.b.goit.study/api/quote').then(val => val.json()).then(val => {
    console.log(val);
    const text = document.querySelector(".quote p");
    const author = document.querySelector(".quote h3");
    text.textContent = val.quote;
    author.textContent = val.author;
});