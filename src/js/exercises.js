export default async function exercises() {
    let page = 1;
    document.querySelector(".filters").children[0].addEventListener("click", () => {
        page = 1;
        document.querySelector(".categories").innerHTML = "";
        renderMuscles();
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
    renderMuscles();
}