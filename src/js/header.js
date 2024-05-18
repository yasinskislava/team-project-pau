function scaling(num) {
    if (num == 1) {
        return "0%";
    }
    else if (num == "(") {
        return "-110%";
    }
}
function coloring(color) {
    console.log(color);
    if (color == "rgb(0, 0, 0)") {
        return "white";
    }
    if (color == "white") {
        return "black";
    }
    else if (color == "black") {
        return "white";
    }
}
function svg(value) {
    const parts = value.split("#");
    const parts1 = parts[1].split('"');
    if (parts1[0] == "burger") {
        return `${parts[0]}#cross"${parts1[1]}`;
    }
    else {
        return `${parts[0]}#burger"${parts1[1]}`;
    }
}

function paddingSize() {
    if (document.body.clientWidth >= 768) {
        return '16px';
    }
    else {
        return '20px';
    }
}
document.querySelector('.home').style.left = paddingSize();

  export default function headerFunc() {
    const pages = document.querySelectorAll('header > .pages li');
    const block = document.querySelector('header > .pages .block');
    block.style.width = '84px';
    block.style.left = '10px';
    pages[1].addEventListener('click', () => {
      pages[0].firstElementChild.classList.remove('active');
      pages[1].firstElementChild.classList.add('active');
      block.style.width = '105px';
      block.style.left = '96px';
      document.querySelector('.favorites').style.left = paddingSize();
      document.querySelector('.home').style.left = '-100%';
    });
    pages[0].addEventListener('click', () => {
      pages[1].firstElementChild.classList.remove('active');
      pages[0].firstElementChild.classList.add('active');
      block.style.width = '84px';
      block.style.left = '10px';
      document.querySelector('.favorites').style.left = '130%';
      document.querySelector('.home').style.left = paddingSize();
    });
    const trigger = document.querySelector('header > button');
    const menu = document.querySelector('.menu');
    trigger.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('.title').style.color = `${coloring(
        document.querySelector('.title').style.color
      )}`;
      menu.style.transform = `translateY(${scaling(
        menu.style.transform.slice(-4, -3)
      )})`;
      trigger.classList.toggle('burger');
      trigger.classList.toggle('cross');
      trigger.innerHTML = `${svg(trigger.innerHTML)}`;
    });
    const mobilePages = menu.querySelectorAll('.pages li');
    const mobileBlock = menu.querySelector('.mobile-block');
    mobilePages[1].addEventListener('click', () => {
      mobileBlock.style.top = '46px';
      mobilePages[0].firstElementChild.classList.remove('active');
      mobilePages[1].firstElementChild.classList.add('active');
      document.querySelector('.favorites').style.left = paddingSize();
      document.querySelector('.home').style.left = '-100%';
    });
    mobilePages[0].addEventListener('click', () => {
      mobileBlock.style.top = '0px';
      mobilePages[1].firstElementChild.classList.remove('active');
      mobilePages[0].firstElementChild.classList.add('active');
      document.querySelector('.favorites').style.left = '130%';
      document.querySelector('.home').style.left = paddingSize();
    });
  }

