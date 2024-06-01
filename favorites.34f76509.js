fetch("https://energyflow.b.goit.study/api/quote").then((t=>t.json())).then((t=>{console.log(t);const e=document.querySelector(".quote p"),o=document.querySelector(".quote h3");e.textContent=t.quote,o.textContent=t.author}));
//# sourceMappingURL=favorites.34f76509.js.map
