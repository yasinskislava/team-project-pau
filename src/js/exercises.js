
let page = 1;
let activeFilter;
let activePage;
const categories = document.querySelector('.categories');
let url = `https://energyflow.b.goit.study/api/exercises?page=${page}&limit=12`;

export default async function exercises() {
  localStorage.setItem("arr", JSON.stringify([]));
  const search = document.querySelector('.searchbar svg');
  search.addEventListener('click', request);

  function request() {
    const props = document
      .querySelector('.searchbar input')
      .value.toLocaleLowerCase()
      .trim();
    document.querySelector('.searchbar input').value = '';
    page = 1;
    url = `https://energyflow.b.goit.study/api/exercises?muscles=${props}&page=${page}&limit=12`;
    categories.innerHTML = '';
    renderExercises();
  }

  document
    .querySelector('.filters')
    .children[0].addEventListener('click', e => {
      page = 1;
      categories.innerHTML = '';
      activeFilter.classList.remove('active-filter');
      e.target.classList.add('active-filter');
      activeFilter = e.target;
      categories.classList.remove('bodyParts');
      categories.classList.add('muscles');
      document.querySelector('.searchbar').classList.add('visibility');
      renderMuscles();
      renderPages(2);
    });
  document
    .querySelector('.filters')
    .children[1].addEventListener('click', e => {
      page = 1;
      categories.innerHTML = '';
      activeFilter.classList.remove('active-filter');
      e.target.classList.add('active-filter');
      activeFilter = e.target;
      categories.classList.remove('muscles');
      categories.classList.add('bodyParts');
      document.querySelector('.searchbar').classList.remove('visibility');
      url = `https://energyflow.b.goit.study/api/exercises?page=${page}&limit=12`;
      renderExercises();
      renderPages(3);
    });
  async function renderMuscles() {
    await fetch(
      `https://energyflow.b.goit.study/api/filters?filter=Muscles&page=${page}&limit=12`
    )
      .then(val => val.json())
      .then(val => {
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
    const cards = document.querySelectorAll('.muscle-card');
    for (let i of cards) {
      i.addEventListener('click', e => {
        page = 1;
        url = `https://energyflow.b.goit.study/api/exercises?muscles=${
          e.currentTarget.querySelector('h3').textContent
        }&page=${page}&limit=12`;
        page = 1;
        categories.innerHTML = '';
        activeFilter.classList.remove('active-filter');
        e.target.classList.add('active-filter');
        activeFilter = e.target;
        categories.classList.remove('muscles');
        categories.classList.add('bodyParts');
        document.querySelector('.searchbar').classList.remove('visibility');
        renderExercises();
        renderPages(3);
      });
    }
  }
  async function renderExercises() {
    const tempArr = [];
    await fetch(url)
      .then(val => val.json())
      .then(val => {
          if (val.results.length != 0) {
              for (let i of val.results) {
                  tempArr.push(i);
                  const svg = document
                      .querySelector('.burger svg use')
                      .href.baseVal.split('#');
                  categories.insertAdjacentHTML(
                      'beforeend',
                      `<div class="exercises-card">
                <div class="top">
                    <h3>WORKOUT</h3>
                    <span>${i.rating}<svg><use href="${svg[0]}#star"></use></svg></span>
                    <p>Start<svg><use href="${svg[0]}#arrow"></use></svg></p>
                </div>
                <p><span><svg><use href="${svg[0]}#human"></use></svg></span>${i.name[0].toUpperCase() + i.name.slice(1)}</p>
                <ul>
                    <li>Burned calories: <b>${i.burnedCalories}/3 min</b></li>
                    <li>Body part: <b>${i.bodyPart[0].toUpperCase() + i.bodyPart.slice(1)}</b></li>
                    <li>Target: <b>${i.target[0].toUpperCase() + i.target.slice(1)}</b></li>
                </ul>
              </div>`
                  );
              }
          }
            else {
                categories.innerHTML = `<p class="nothing">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</p>`;
            }
      });
    const start = document.querySelectorAll('.exercises-card .top p');
    for (let i = 0; i < start.length; i++) {
      start[i].addEventListener('click', () => {
        const backdrop = document.querySelector('.backdrop');
        const ratingList = backdrop.querySelector('.wrapper > span ul');
        const stars = ratingList.querySelectorAll('svg');
        for (let j = 0; j < 5; j++) {
          stars[j].classList.remove('rated');
        }
        for (let j = 0; j < Math.floor(tempArr[i].rating); j++) {
          stars[j].classList.add('rated');
        }
        backdrop.classList.remove('visibility');
        backdrop.querySelector(".favorite-button").addEventListener("click", (e) => {
            const favArr = JSON.parse(localStorage.getItem("arr"));
            console.log(favArr);
            favArr.push(tempArr[i]);
            localStorage.setItem("arr", JSON.stringify(favArr));
            var el = e.currentTarget, elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);
          });
        document.querySelector('.modal > svg').addEventListener('click', () => {
          backdrop.classList.add('visibility');
        });
        backdrop.querySelector(
          '.image'
        ).style = `background: linear-gradient(0deg, rgba(27, 27, 27, 0.20) 0%, rgba(27, 27, 27, 0.20) 100%), url(${tempArr[i].gifUrl}) lightgray -7.072px -25.893px / 107.482% 121.729% no-repeat;`;
        backdrop.querySelector('h3').textContent = `${
          tempArr[i].name[0].toUpperCase() + tempArr[i].name.slice(1)
        }`;
        const info = backdrop.querySelectorAll('.info li b');
        info[0].textContent = `${
          tempArr[i].target[0].toUpperCase() + tempArr[i].target.slice(1)
        }`;
        info[1].textContent = `${
          tempArr[i].bodyPart[0].toUpperCase() + tempArr[i].bodyPart.slice(1)
        }`;
        info[2].textContent = `${
          tempArr[i].equipment[0].toUpperCase() + tempArr[i].equipment.slice(1)
        }`;
        info[3].textContent = `${tempArr[i].popularity}`;
        info[4].textContent = `${tempArr[i].burnedCalories}/3 mins`;
        backdrop.querySelector(
          '.description'
        ).textContent = `${tempArr[i].description}`;
        backdrop.querySelector(
          '.wrapper > span'
        ).textContent = `${tempArr[i].rating}`;
        backdrop.querySelector('.wrapper > span').appendChild(ratingList);
      });
    }
  }
  activeFilter = document.querySelector('.filters').children[0];
  renderMuscles();
  renderPages(2);

  function renderPages(num) {
    document.querySelector('.pagination').innerHTML = '';
    for (let i = 0; i < num; i++) {
      document
        .querySelector('.pagination')
        .insertAdjacentHTML('beforeend', `<li>${i + 1}</li>`);
    }
    activePage = document.querySelector('.pagination').firstElementChild;
    document
      .querySelector('.pagination')
      .firstElementChild.classList.add('active-page');
    const pages = document.querySelectorAll('.pagination li');
    for (let i of pages) {
      i.addEventListener('click', e => {
        page = parseInt(e.target.textContent);
        categories.innerHTML = '';
        if (num == 2) {
          renderMuscles();
        } else if (num == 3) {
          renderExercises();
        }
        activePage.classList.remove('active-page');
        e.target.classList.add('active-page');
        activePage = e.target;
      });
    }
  }
}
