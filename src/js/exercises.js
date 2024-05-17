let page = 1;
let activeFilter;

export default async function exercises() {
    document.querySelector(".filters").children[0].addEventListener("click", (e) => {
        page = 1;
        document.querySelector(".categories").innerHTML = "";
        activeFilter.classList.remove("active-filter");
        e.target.classList.add("active-filter");
        activeFilter = e.target;
        renderMuscles();
        renderPages(2);
    });
    document.querySelector(".filters").children[1].addEventListener("click", (e) => {
        page = 1;
        document.querySelector(".categories").innerHTML = "";
        activeFilter.classList.remove("active-filter");
        e.target.classList.add("active-filter");
        activeFilter = e.target;
        renderExercises();
        renderPages(3);
    });
    async function renderMuscles() {
        await fetch(`https://energyflow.b.goit.study/api/filters?filter=Muscles&page=${page}&limit=12`).then(val => val.json()).then(val => {
            for (let i of val.results) {
                const url = i.imgUrl;
                document.querySelector('.categories').insertAdjacentHTML(
                'beforeend',
                `<li class="muscle-card" style='background: linear-gradient(0deg, rgba(16, 16, 16, 0.70) 0%, rgba(16, 16, 16, 0.70) 100%), url(${url}) lightgray -16.825px -9.156px / 128.765% 116.922% no-repeat;'>
                    <h3>${i.name}</h3>
                    <p>Muscles</p>
                </li>`
                );
            }
        });
    } 
    async function renderExercises() {

    }
    renderMuscles();
    renderPages(2);
}

function renderPages(num) {
    document.querySelector('.pagination').innerHTML = "";
    for (let i = 0; i < num;i++) {
        document.querySelector(".pagination").insertAdjacentHTML("beforeend", `<li>${i+1}</li>`);
    }
    document.querySelector(".pagination").firstElementChild.classList.add("active-page");
}