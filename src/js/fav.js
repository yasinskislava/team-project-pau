// document.addEventListener("DOMContentLoaded", ()=>{
import headerFunc from "./header";
headerFunc();
  const categories = document.querySelector('.favorites .categories');
  const favArr = [];
  const info = JSON.parse(localStorage.getItem('arr'));
  const notFound = document.querySelector('.favorites__no-add-ex');
  const secFav = document.querySelector(`.favorites`);
  const title = document.querySelector(".favorites__title")
 
    if (info.length === 0) {
      title.style.display = "none";
      const noFoundFav = document.createElement('div');
      noFoundFav.className = 'favorites__no-add-ex';
      noFoundFav.innerHTML = `
        <h2 class="favorites__no-add-title">Favorites</h2>
        <div class="favorites__no-add-img"></div>
        <p class="favorites__no-add-text">
          It appears that you haven't added any exercises to your favorites yet. To
          get started, you can add exercises that you like to your favorites for
          easier access in the future.
        </p>`;
      categories.appendChild(noFoundFav);
    } else {
      for (let i of info) {
        favArr.push(i);
        const svg = document
          .querySelector('.burger svg use')
          .href.baseVal.split('#');
        categories.insertAdjacentHTML(
          'beforeend',
          `<div class="exercises-card">
              <div class="top">
              <h3>WORKOUT</h3>
              <span>${i.rating}<svg><use href="${
                svg[0]
          }#trash"></use></svg></span>
              <p>Start<svg><use href="${svg[0]}#arrow"></use></svg></p>
              </div>
              <p><span><svg><use href="${svg[0]}#human"></use></svg></span>${
            i.name[0].toUpperCase() + i.name.slice(1)
          }</p>
              <ul>
              <li>Burned calories: <b>${i.burnedCalories}/3 min</b></li>
              <li>Body part: <b>${
                i.bodyPart[0].toUpperCase() + i.bodyPart.slice(1)
              }</b></li>
              <li>Target: <b>${
                i.target[0].toUpperCase() + i.target.slice(1)
              }</b></li>
              </ul>
              </div>`
        );
      }
      const start = document.querySelectorAll(
        '.favorites .exercises-card .top p'
      );
      for (let i = 0; i < start.length; i++) {
        start[i].addEventListener('click', () => {
          const backdrop = document.querySelector('.backdrop');
          const ratingList = backdrop.querySelector('.wrapper > span ul');
          const stars = ratingList.querySelectorAll('svg');
          for (let j = 0; j < 5; j++) {
            stars[j].classList.remove('rated');
          }
          console.log(favArr);
          for (let j = 0; j < Math.floor(favArr[i].rating); j++) {
            stars[j].classList.add('rated');
          }
          backdrop.classList.remove('visibility');
          document.querySelector('.modal > svg').addEventListener('click', () => {
            backdrop.classList.add('visibility');
          });
          backdrop.querySelector(
            '.image'
          ).style = `background: linear-gradient(0deg, rgba(27, 27, 27, 0.20) 0%, rgba(27, 27, 27, 0.20) 100%), url(${favArr[i].gifUrl}) lightgray -7.072px -25.893px / 107.482% 121.729% no-repeat;`;
          backdrop.querySelector('h3').textContent = `${
            favArr[i].name[0].toUpperCase() + favArr[i].name.slice(1)
          }`;
          const info = backdrop.querySelectorAll('.info li b');
          info[0].textContent = `${
            favArr[i].target[0].toUpperCase() + favArr[i].target.slice(1)
          }`;
          info[1].textContent = `${
            favArr[i].bodyPart[0].toUpperCase() + favArr[i].bodyPart.slice(1)
          }`;
          info[2].textContent = `${
            favArr[i].equipment[0].toUpperCase() + favArr[i].equipment.slice(1)
          }`;
          info[3].textContent = `${favArr[i].popularity}`;
          info[4].textContent = `${favArr[i].burnedCalories}/3 mins`;
          backdrop.querySelector(
            '.description'
          ).textContent = `${favArr[i].description}`;
          backdrop.querySelector(
            '.wrapper > span'
          ).textContent = `${favArr[i].rating}`;
          backdrop.querySelector('.wrapper > span').appendChild(ratingList);
        });
      }
    }

// })
