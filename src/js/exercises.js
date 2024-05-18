let page = 1;
let activeFilter;
let activePage;
const categories = document.querySelector(".categories");

export default async function exercises() {
    document.querySelector(".filters").children[0].addEventListener("click", (e) => {
        page = 1;
        categories.innerHTML = "";
        activeFilter.classList.remove("active-filter");
        e.target.classList.add("active-filter");
        activeFilter = e.target;
        renderMuscles();
        renderPages(2);
    });
    document.querySelector(".filters").children[1].addEventListener("click", (e) => {
        page = 1;
        categories.innerHTML = "";
        activeFilter.classList.remove("active-filter");
        e.target.classList.add("active-filter");
        activeFilter = e.target;
        renderExercises();
        renderPages(3);
    });
    let exercisesUrl = `https://energyflow.b.goit.study/api/exercises?page=1&limit=12`;
    async function renderMuscles() {
        await fetch(`https://energyflow.b.goit.study/api/filters?filter=Muscles&page=${page}&limit=12`).then(val => val.json()).then(val => {
            for (let i of val.results) {
                const url = i.imgUrl;
                categories.insertAdjacentHTML(
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
        await fetch(exercisesUrl).then(val => val.json()).then(val => {
            for (let i of val.results) {
                console.log(i);
                const svg = document.querySelector(".burger svg use").href.baseVal.split("#");
                categories.insertAdjacentHTML(
                  'beforeend',
                  `<div class="exercises-card">
        <div class="top">
            <h3>WORKOUT</h3>
            <span>${i.rating}<svg><use href="${svg[0]}#star"></use></svg></span>
            <p>Start<svg><use href="${svg[0]}#arrow"></use></svg></p>
        </div>
        <p><svg><use href="${svg[0]}#human"></use></svg>${i.name[0].toUpperCase() + i.name.slice(1)}</p>
        <ul>
            <li>Burned calories: <b>${i.burnedCalories}</b></li>
            <li>Body part: <b>${i.bodyPart[0].toUpperCase() + i.bodyPart.slice(1)}</b></li>
            <li>Target: <b>${i.target[0].toUpperCase() + i.target.slice(1)}</b></li>
        </ul>
    </div>`
                );
            }
        });
    }
    activeFilter = document.querySelector('.filters').children[0];
    renderMuscles();
    renderPages(2);

    function renderPages(num) {
        document.querySelector('.pagination').innerHTML = "";
        for (let i = 0; i < num;i++) {
            document.querySelector(".pagination").insertAdjacentHTML("beforeend", `<li>${i+1}</li>`);
        }
        activePage = document.querySelector('.pagination').firstElementChild;
        document.querySelector(".pagination").firstElementChild.classList.add("active-page");
        const pages = document.querySelectorAll(".pagination li");
        for (let i of pages) {
            i.addEventListener("click", (e) => {
                page = parseInt(e.target.textContent);
                categories.innerHTML = "";
                if (num == 2) {
                    renderMuscles(); 
                }
                else if (num == 3) {
                    renderExercises();
                }
                activePage.classList.remove("active-page");
                e.target.classList.add("active-page");
                activePage = e.target;
            });
        }
    }

}

