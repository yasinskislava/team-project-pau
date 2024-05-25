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

  export default function headerFunc() {
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
  }

