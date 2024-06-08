import headerFunc from './header';
headerFunc();
const categories = document.querySelector('.favorites .categories');
const favArr = [];
const info = JSON.parse(localStorage.getItem('arr'));
const notFound = document.querySelector('.favorites__no-add-ex');
const secFav = document.querySelector(`.favorites`);
const title = document.querySelector('.favorites__title');

if (info.length === 0) {
  title.style.display = 'none';
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
              <span><button class="card-btn"><svg><use href="${
                svg[0]
              }#trash"></use></svg></button></span>
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
  setTimeout(() => {
    const bins = document.querySelectorAll('.card-btn');
    console.log(bins);
    for (let i = 0; i < bins.length; i++) {
      bins[i].style.backgroundColor = '#fff';
      bins[i].style.borderStyle = 'none';
      bins[i].addEventListener('click', event => {
        event.preventDefault();
        const favorArr = JSON.parse(localStorage.getItem('arr'));
        console.log(favorArr);
        favorArr.splice(i, 1);
        console.log(favorArr);
        localStorage.setItem('arr', JSON.stringify(favorArr));
        bins[i].closest('.exercises-card').remove();
      });

    }
  }, 200);
}
