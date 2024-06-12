let page = 1;
let activeFilter;
let activePage;
let filtrated = [];
const categories = document.querySelector('.categories');
categories.innerHTML = `<div class="loader"></div>`;
let url = `https://energyflow.b.goit.study/api/exercises?limit=12&page=${page}`;
const svg = document.querySelector('.burger svg use').href.baseVal.split('#');
import { error, success, defaultModules } from '/node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '/node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
 
defaultModules.set(PNotifyMobile, {});

export default async function exercises() {
  document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector('.rating-backdrop').classList.add("visibility");
    document.querySelector(".backdrop").classList.remove("visibility");
  });

  localStorage.setItem('arr', JSON.stringify([]));
  const search = document.querySelector('.searchbar svg');
  search.addEventListener('click', request);

  async function request() {
    document.querySelector(".pagination").style.display = "none";
    document.querySelector(".filters").firstElementChild.style.pointerEvents = "none";
    search.style.pointerEvents = "none";
    categories.innerHTML = `<div class="loader"></div>`;

    const props = document
      .querySelector('.searchbar input')
      .value.toLocaleLowerCase()
      .trim();
    page = 1;
    document.querySelector('.active-page').textContent = page;
    if (props != '') {
      filtrated = [];
      const bodyParts = [];
      const muscles = [];
      const equipment = [];
      await fetch(
        `https://energyflow.b.goit.study/api/filters?filter=Muscles&page=1&limit=64`
      )
        .then(val => val.json())
        .then(val => {
          for (let i of val.results) {
            muscles.push(i.name);
          }
        });
      await fetch(
        `https://energyflow.b.goit.study/api/filters?filter=Body%20parts&page=1&limit=64`
      )
        .then(val => val.json())
        .then(val => {
          for (let i of val.results) {
            bodyParts.push(i.name);
          }
        });
      await fetch(
        `https://energyflow.b.goit.study/api/filters?filter=Equipment&page=1&limit=64`
      )
        .then(val => val.json())
        .then(val => {
          for (let i of val.results) {
            equipment.push(i.name);
          }
        });
      const filtrationMuscles = [];
      const filtrationBodyParts = [];
      const filtrationEquipment = [];
      for (let i of muscles) {
        if (i.includes(props)) {
          filtrationMuscles.push(i);
        }
      }
      for (let i of bodyParts) {
        if (i.includes(props)) {
          filtrationBodyParts.push(i);
        }
      }
      for (let i of equipment) {
        if (i.includes(props)) {
          filtrationEquipment.push(i);
        }
      }
      const ids = [];
      for (let i of filtrationMuscles) {
        await fetch(
          `https://energyflow.b.goit.study/api/exercises?muscles=${i}&page=1&limit=1024`
        )
          .then(val => val.json())
          .then(val => {
            for (let j of val.results) {
              ids.push(j._id);
              filtrated.push(j);
            }
          });
      }
      for (let i of filtrationBodyParts) {
        await fetch(
          `https://energyflow.b.goit.study/api/exercises?bodyParts=${i}&page=1&limit=1024`
        )
          .then(val => val.json())
          .then(val => {
            for (let j of val.results) {
              if (!ids.includes(j._id)) {
                filtrated.push(j);
                ids.push(j._id);
              }
            }
          });
      }
      for (let i of filtrationEquipment) {
        await fetch(
          `https://energyflow.b.goit.study/api/exercises?equipment=${i}&page=1&limit=1024`
        )
          .then(val => val.json())
          .then(val => {
            for (let j of val.results) {
              if (!ids.includes(j._id)) {
                filtrated.push(j);
                ids.push(j._id);
              }
            }
          });
      }
      console.log(filtrated);
      render(filtrated);
    } else {
      state = false;
      url = `https://energyflow.b.goit.study/api/exercises?muscles=${props}&page=${page}&limit=12`;
      await renderExercises();
    }
    document.querySelector('.filters').firstElementChild.style.pointerEvents = 'all';
    search.style.pointerEvents = 'all';
    document.querySelector('.pagination').style.display = 'flex';
    document.querySelector('.searchbar input').value = '';
  }

  document
    .querySelector('.filters')
    .children[0].addEventListener('click', async e => {
      categories.innerHTML = `<div class="loader"></div>`;
      maxCurrent = 2;
      page = 1;
      document.querySelector('.active-page').textContent = page;
      activeFilter.classList.remove('active-filter');
      e.target.classList.add('active-filter');
      activeFilter = e.target;
      categories.classList.remove('bodyParts');
      categories.classList.add('muscles');
      document.querySelector('.searchbar').classList.add('visibility');
      await renderMuscles();
      document.querySelector('.loader').remove();
    });
  document
    .querySelector('.filters')
    .children[1].addEventListener('click',async e => {
      categories.innerHTML = `<div class="loader"></div>`;
      maxCurrent = 99;
      state = false;
      page = 1;
      document.querySelector('.active-page').textContent = page;
      activeFilter.classList.remove('active-filter');
      e.target.classList.add('active-filter');
      activeFilter = e.target;
      categories.classList.remove('muscles');
      categories.classList.add('bodyParts');
      document.querySelector('.searchbar').classList.remove('visibility');
      url = `https://energyflow.b.goit.study/api/exercises?limit=12&page=${page}`;
      await renderExercises();
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
        categories.innerHTML = `<div class="loader"></div>`;
        page = 1;
        document.querySelector('.active-page').textContent = page;
        url = `https://energyflow.b.goit.study/api/exercises?muscles=${e.currentTarget.querySelector('h3').textContent
          }&page=${page}&limit=12`;
        page = 1;
        state = false;
        activeFilter.classList.remove('active-filter');
        document
          .querySelector('.filters')
          .children[1].classList.add('active-filter');
        activeFilter = document.querySelector('.filters').children[1];
        categories.classList.remove('muscles');
        categories.classList.add('bodyParts');
        document.querySelector('.searchbar').classList.remove('visibility');
        renderExercises();
      });
    }
  }
  async function renderExercises() {
    const tempArr = [];
    await fetch(url)
      .then(val => val.json())
      .then(val => {
        const tempArr = [];
        if (val.results.length != 0) {
          for (let i of val.results) {
            tempArr.push(i);
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
        } else {
          categories.innerHTML = `<p class="nothing">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</p>`;
        }
        document.querySelector('.loader').remove();
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
            const favArray = JSON.parse(localStorage.getItem('arr'));
            if (favArray.find(obj => obj._id == tempArr[i]._id)) {
              backdrop.querySelector(".favorite-button").textContent = backdrop.querySelector(".favorite-button").textContent.replace("Add to", "Remove from");
              backdrop.querySelector(".favorite-button").insertAdjacentHTML("beforeend", `<svg><use href="${svg[0]}#heart"></use></svg>`);
              backdrop.querySelector(".favorite-button svg").style.fill = "#fff"; 

              backdrop
                .querySelector('.favorite-button')
                .addEventListener('click', e => {
                  backdrop.classList.add('visibility');
                  const favArr = JSON.parse(localStorage.getItem('arr'));
                  console.log(favArr);
                  favArr.splice(favArr.findIndex(obj => obj._id == tempArr[i]._id), 1);
                  localStorage.setItem('arr', JSON.stringify(favArr));
                  e.currentTarget.replaceWith(e.currentTarget.cloneNode(true));
                });
              
            }
            else {
              backdrop.querySelector(".favorite-button").textContent = backdrop.querySelector(".favorite-button").textContent.replace("Remove from", "Add to");
              backdrop.querySelector(".favorite-button").insertAdjacentHTML("beforeend", `<svg><use href="${svg[0]}#heart"></use></svg>`);
              backdrop.querySelector(".favorite-button svg").style.fill = "#0000"; 
      
              backdrop
              .querySelector('.favorite-button')
                .addEventListener('click', e => {
                backdrop.classList.add('visibility');
                const favArr = JSON.parse(localStorage.getItem('arr'));
                console.log(favArr);
                favArr.push(tempArr[i]);
                localStorage.setItem('arr', JSON.stringify(favArr));
                e.currentTarget.replaceWith(e.currentTarget.cloneNode(true));
              });
            }
            backdrop.querySelector(".rating-button").addEventListener("click", (e) => {
              // e.currentTarget.replaceWith(e.currentTarget.cloneNode(true));
              document.querySelector('.rating-backdrop').classList.remove("visibility");
              console.log(tempArr[i]);
              backdrop.classList.add("visibility");
              const ratingStars = document.querySelectorAll(".rating-backdrop ul svg");
              for (let s of ratingStars) {
                s.style.fill = 'rgba(27, 27, 27, 0.20)';
              }
              document.querySelector('.rating-backdrop ul span').textContent = "0.0";
              document.querySelector('.rating-backdrop ul div').addEventListener("click", (e) => {
                e.currentTarget.replaceWith(e.currentTarget.cloneNode(true));
              });
              document.querySelector('.rating-backdrop ul div').addEventListener("mousemove", (mouse) => {
                const pos = mouse.offsetX - 26;
                console.log(pos);
                const quantity = Math.floor(pos / 28);
                const gradient = Math.min(((pos - quantity * 28) / 24 * 100), 100) / 100;
                console.log(parseFloat((gradient / 100).toFixed(1)));
                document.querySelector(".rating-backdrop ul span").textContent = (quantity + gradient).toFixed(1) > 0 ? `${(quantity + gradient).toFixed(1)}` : `0.0`;
                for (let s of ratingStars) {
                  s.style.fill = 'rgba(27, 27, 27, 0.20)';
                }
                for (let star = 0; star <= quantity; star++){
                  ratingStars[star].style.fill = '#EEA10C';
                }
                
              });
              
              document.querySelector('.rating-backdrop button').addEventListener("click", (e) => {
                e.preventDefault();
                e.currentTarget.replaceWith(e.currentTarget.cloneNode(true));
                const data = {
                  rate : parseInt(document.querySelector('.rating-backdrop ul span').textContent),
                  email : document.querySelectorAll('.rating-backdrop input')[0].value.trim(),
                  review : document.querySelectorAll('.rating-backdrop input')[1].value.trim()
                };
                if (data.rate != "0.0" && data.email != "" && data.review != "") {
                  const options = {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  };
                  fetch(`https://energyflow.b.goit.study/api/exercises/${tempArr[i]._id}/rating`, options);
                  success({ text: "Review was successfully added!" });
                  document.querySelector('.rating-backdrop').classList.add("visibility");
                  document.querySelector(".backdrop").classList.remove("visibility");
                  document.querySelectorAll('.rating-backdrop input')[0].value = ""; 
                  document.querySelectorAll('.rating-backdrop input')[1].value = ""; 
                }
                else {
                  error({text: "All fields must be filled!"})
                }
              });

            });
            document.querySelector('.modal > svg').addEventListener('click', () => {backdrop.classList.add('visibility')});
            backdrop.querySelector('.image').style = `background: linear-gradient(0deg, rgba(27, 27, 27, 0.20) 0%, rgba(27, 27, 27, 0.20) 100%), url(${tempArr[i].gifUrl}) lightgray -7.072px -25.893px / 107.482% 121.729% no-repeat;`;
            backdrop.querySelector('h3').textContent = `${tempArr[i].name[0].toUpperCase() + tempArr[i].name.slice(1)}`;
            const info = backdrop.querySelectorAll('.info li b');
            info[0].textContent = `${tempArr[i].target[0].toUpperCase() + tempArr[i].target.slice(1)}`;
            info[1].textContent = `${tempArr[i].bodyPart[0].toUpperCase() +tempArr[i].bodyPart.slice(1)}`;
            info[2].textContent = `${tempArr[i].equipment[0].toUpperCase() +tempArr[i].equipment.slice(1)}`;
            info[3].textContent = `${tempArr[i].popularity}`;
            info[4].textContent = `${tempArr[i].burnedCalories}/3 mins`;
            backdrop.querySelector('.description').textContent = `${tempArr[i].description}`;
            backdrop.querySelector('.wrapper > span').textContent = `${tempArr[i].rating}`;
            backdrop.querySelector('.wrapper > span').appendChild(ratingList);
          });
        }
      });
    
  }
  activeFilter = document.querySelector('.filters').children[0];
  await renderMuscles();
  document.querySelector(".loader").remove();
  const left = document.querySelector(".pagination").children[0];
  const right = document.querySelector('.pagination').children[2];
  let func;
  left.addEventListener("click", () => {
    page--;
    if (page < 1) {
      page = 1;
    }
    document.querySelector(".active-page").textContent = page;
    const activeBlock = document.querySelector(".active-filter").textContent;
    if (activeBlock == "Muscles") {
      categories.innerHTML = "";
      renderMuscles();
    }
    else if (activeBlock == "Body parts") {
      categories.innerHTML = "";
      if (!state) {
        const temp = url.split("&");
        temp[1] = `page=${page}`;
        const fin = temp.join("&");
        url = fin;
        renderExercises();
      }
      else {
        current--;
        if (current < 1) {
          current = 1;
        }
        render(filtrated);
      }
    }
  });
  right.addEventListener("click", () => {
    page++;
    if (page > maxCurrent) {
      page = maxCurrent;
    }
    document.querySelector('.active-page').textContent = page;
    const activeBlock = document.querySelector(".active-filter").textContent;
    if (activeBlock == "Muscles") {
      categories.innerHTML = "";
      renderMuscles();
    }
    else if (activeBlock == "Body parts") {
      categories.innerHTML = "";
      if (!state) {
        const temp = url.split("&");
        temp[1] = `page=${page}`;
        const fin = temp.join("&");
        url = fin;
        renderExercises();
      }
      else {
        current++;
        if (current > maxCurrent) {
          current = maxCurrent;
        }
        render(filtrated);
      }
    }
  });
  let maxCurrent = 2;
  let current = 1;
  let state;
  function render(val) {
    state = true;
    const tempArr = [];
    const amount = Math.ceil(val.length / 12);
    maxCurrent = amount;
    let endPoint = current * 12;
    if (endPoint > val.length) {
      endPoint = val.length;
    }
    categories.innerHTML = "";
    if (val.length != 0) {
      for (let i = (current - 1) * 12; i < endPoint; i++) {
        tempArr.push(val[i]);

        categories.insertAdjacentHTML('beforeend',
          `<div class="exercises-card">
                <div class="top">
                    <h3>WORKOUT</h3>
                    <span>${val[i].rating}<svg><use href="${svg[0]}#star"></use></svg></span>
                    <p>Start<svg><use href="${svg[0]}#arrow"></use></svg></p>
                </div>
                <p><span><svg><use href="${svg[0]}#human"></use></svg></span>${val[i].name[0].toUpperCase() + val[i].name.slice(1)}</p>
                <ul>
                    <li>Burned calories: <b>${val[i].burnedCalories}/3 min</b></li>
                    <li>Body part: <b>${val[i].bodyPart[0].toUpperCase() + val[i].bodyPart.slice(1)}</b></li>
                    <li>Target: <b>${val[i].target[0].toUpperCase() + val[i].target.slice(1)}</b></li>
                </ul>
              </div>`);
      }
    } else {
      categories.innerHTML = `<p class="nothing">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</p>`;
    }
    const start = document.querySelectorAll('.exercises-card .top p');
    for (let i = 0; i < start.length; i++) {
      start[i].addEventListener('click', () => {
        const favArray = JSON.parse(localStorage.getItem("arr"));
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
        if (favArray.find(obj => obj._id == tempArr[i]._id)) {
          backdrop.querySelector(".favorite-button").textContent = backdrop.querySelector(".favorite-button").textContent.replace("Add to", "Remove from");
          backdrop.querySelector(".favorite-button").insertAdjacentHTML("beforeend", `<svg><use href="${svg[0]}#heart"></use></svg>`);
          backdrop.querySelector(".favorite-button svg").style.fill = "#fff"; 
          backdrop
            .querySelector('.favorite-button')
            .addEventListener('click', e => {
              backdrop.classList.add('visibility');
              const favArr = JSON.parse(localStorage.getItem('arr'));
              console.log(favArr);
              favArr.splice(favArr.findIndex(obj => obj._id == tempArr[i]._id),1);
              localStorage.setItem('arr', JSON.stringify(favArr));
              e.currentTarget.replaceWith(e.currentTarget.cloneNode(true));
            });
        } else {
          backdrop.querySelector(".favorite-button").textContent = backdrop.querySelector(".favorite-button").textContent.replace("Remove from", "Add to");
          backdrop.querySelector(".favorite-button").insertAdjacentHTML("beforeend", `<svg><use href="${svg[0]}#heart"></use></svg>`);
          backdrop.querySelector(".favorite-button svg").style.fill = "#0000"; 
          backdrop
            .querySelector('.favorite-button')
            .addEventListener('click', e => {
              backdrop.classList.add('visibility');
              const favArr = JSON.parse(localStorage.getItem('arr'));
              console.log(favArr);
              favArr.push(tempArr[i]);
              localStorage.setItem('arr', JSON.stringify(favArr));
              e.currentTarget.replaceWith(e.currentTarget.cloneNode(true));
            });
        }
        document.querySelector('.modal > svg').addEventListener('click', () => {
          backdrop.classList.add('visibility');
        });
        backdrop.querySelector(
          '.image'
        ).style = `background: linear-gradient(0deg, rgba(27, 27, 27, 0.20) 0%, rgba(27, 27, 27, 0.20) 100%), url(${tempArr[i].gifUrl}) lightgray -7.072px -25.893px / 107.482% 121.729% no-repeat;`;
        backdrop.querySelector('h3').textContent = `${tempArr[i].name[0].toUpperCase() + tempArr[i].name.slice(1)
          }`;
        const info = backdrop.querySelectorAll('.info li b');
        info[0].textContent = `${tempArr[i].target[0].toUpperCase() + tempArr[i].target.slice(1)
          }`;
        info[1].textContent = `${tempArr[i].bodyPart[0].toUpperCase() + tempArr[i].bodyPart.slice(1)
          }`;
        info[2].textContent = `${tempArr[i].equipment[0].toUpperCase() + tempArr[i].equipment.slice(1)
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
}
