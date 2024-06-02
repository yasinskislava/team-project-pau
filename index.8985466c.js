!function(){let e,t=1,r=[];const s=document.querySelector(".categories");s.innerHTML='<div class="loader"></div>';let n=`https://energyflow.b.goit.study/api/exercises?limit=12&page=${t}`;!function(){const e=document.querySelector("header > button"),t=document.querySelector(".menu");e.addEventListener("click",(r=>{var s,n;r.preventDefault(),document.querySelector(".title").style.color=`${s=document.querySelector(".title").style.color,console.log(s),"rgb(0, 0, 0)"==s?"white":"white"==s?"black":"black"==s?"white":void 0}`,t.style.transform=`translateY(${n=t.style.transform.slice(-4,-3),1==n?"0%":"("==n?"-110%":void 0})`,e.classList.toggle("burger"),e.classList.toggle("cross"),e.innerHTML=`${function(e){const t=e.split("#"),r=t[1].split('"');return"burger"==r[0]?`${t[0]}#cross"${r[1]}`:`${t[0]}#burger"${r[1]}`}(e.innerHTML)}`}))}(),async function(){localStorage.setItem("arr",JSON.stringify([]));const o=document.querySelector(".searchbar svg");async function i(){await fetch(`https://energyflow.b.goit.study/api/filters?filter=Muscles&page=${t}&limit=12`).then((e=>e.json())).then((e=>{for(let t of e.results){const e=t.imgUrl;s.insertAdjacentHTML("beforeend",`<li class="muscle-card" style='background: linear-gradient(0deg, rgba(16, 16, 16, 0.70) 0%, rgba(16, 16, 16, 0.70) 100%), url(${e}) lightgray -16.825px -9.156px / 128.765% 116.922% no-repeat;'>\n                    <h3>${t.name}</h3>\n                    <p>Muscles</p>\n                </li>`)}}));const r=document.querySelectorAll(".muscle-card");for(let o of r)o.addEventListener("click",(r=>{s.innerHTML='<div class="loader"></div>',t=1,n=`https://energyflow.b.goit.study/api/exercises?muscles=${r.currentTarget.querySelector("h3").textContent}&page=${t}&limit=12`,t=1,u=!1,e.classList.remove("active-filter"),document.querySelector(".filters").children[1].classList.add("active-filter"),e=document.querySelector(".filters").children[1],s.classList.remove("muscles"),s.classList.add("bodyParts"),document.querySelector(".searchbar").classList.remove("visibility"),l()}))}async function l(){await fetch(n).then((e=>e.json())).then((e=>{const t=[];if(0!=e.results.length)for(let r of e.results){t.push(r);const e=document.querySelector(".burger svg use").href.baseVal.split("#");s.insertAdjacentHTML("beforeend",`<div class="exercises-card">\n                <div class="top">\n                    <h3>WORKOUT</h3>\n                    <span>${r.rating}<svg><use href="${e[0]}#star"></use></svg></span>\n                    <p>Start<svg><use href="${e[0]}#arrow"></use></svg></p>\n                </div>\n                <p><span><svg><use href="${e[0]}#human"></use></svg></span>${r.name[0].toUpperCase()+r.name.slice(1)}</p>\n                <ul>\n                    <li>Burned calories: <b>${r.burnedCalories}/3 min</b></li>\n                    <li>Body part: <b>${r.bodyPart[0].toUpperCase()+r.bodyPart.slice(1)}</b></li>\n                    <li>Target: <b>${r.target[0].toUpperCase()+r.target.slice(1)}</b></li>\n                </ul>\n              </div>`)}else s.innerHTML='<p class="nothing">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</p>';document.querySelector(".loader").remove();const r=document.querySelectorAll(".exercises-card .top p");for(let e=0;e<r.length;e++)r[e].addEventListener("click",(()=>{const r=document.querySelector(".backdrop"),s=r.querySelector(".wrapper > span ul"),n=s.querySelectorAll("svg");for(let e=0;e<5;e++)n[e].classList.remove("rated");for(let r=0;r<Math.floor(t[e].rating);r++)n[r].classList.add("rated");r.classList.remove("visibility"),r.querySelector(".favorite-button").addEventListener("click",(r=>{const s=JSON.parse(localStorage.getItem("arr"));console.log(s),s.push(t[e]),localStorage.setItem("arr",JSON.stringify(s));var n=r.currentTarget,o=n.cloneNode(!0);n.parentNode.replaceChild(o,n)})),document.querySelector(".modal > svg").addEventListener("click",(()=>{r.classList.add("visibility")})),r.querySelector(".image").style=`background: linear-gradient(0deg, rgba(27, 27, 27, 0.20) 0%, rgba(27, 27, 27, 0.20) 100%), url(${t[e].gifUrl}) lightgray -7.072px -25.893px / 107.482% 121.729% no-repeat;`,r.querySelector("h3").textContent=`${t[e].name[0].toUpperCase()+t[e].name.slice(1)}`;const o=r.querySelectorAll(".info li b");o[0].textContent=`${t[e].target[0].toUpperCase()+t[e].target.slice(1)}`,o[1].textContent=`${t[e].bodyPart[0].toUpperCase()+t[e].bodyPart.slice(1)}`,o[2].textContent=`${t[e].equipment[0].toUpperCase()+t[e].equipment.slice(1)}`,o[3].textContent=`${t[e].popularity}`,o[4].textContent=`${t[e].burnedCalories}/3 mins`,r.querySelector(".description").textContent=`${t[e].description}`,r.querySelector(".wrapper > span").textContent=`${t[e].rating}`,r.querySelector(".wrapper > span").appendChild(s)}))}))}o.addEventListener("click",(async function(){document.querySelector(".pagination").style.display="none",document.querySelector(".filters").firstElementChild.style.pointerEvents="none",o.style.pointerEvents="none",s.innerHTML='<div class="loader"></div>';const e=document.querySelector(".searchbar input").value.toLocaleLowerCase().trim();if(t=1,""!=e){r=[];const t=[],s=[],n=[];await fetch("https://energyflow.b.goit.study/api/filters?filter=Muscles&page=1&limit=64").then((e=>e.json())).then((e=>{for(let t of e.results)s.push(t.name)})),await fetch("https://energyflow.b.goit.study/api/filters?filter=Body%20parts&page=1&limit=64").then((e=>e.json())).then((e=>{for(let r of e.results)t.push(r.name)})),await fetch("https://energyflow.b.goit.study/api/filters?filter=Equipment&page=1&limit=64").then((e=>e.json())).then((e=>{for(let t of e.results)n.push(t.name)}));const o=[],i=[],l=[];for(let t of s)t.includes(e)&&o.push(t);for(let r of t)r.includes(e)&&i.push(r);for(let t of n)t.includes(e)&&l.push(t);const a=[];for(let e of o)await fetch(`https://energyflow.b.goit.study/api/exercises?muscles=${e}&page=1&limit=1024`).then((e=>e.json())).then((e=>{for(let t of e.results)a.push(t._id),r.push(t)}));for(let e of i)await fetch(`https://energyflow.b.goit.study/api/exercises?bodyParts=${e}&page=1&limit=1024`).then((e=>e.json())).then((e=>{for(let t of e.results)a.includes(t._id)||(r.push(t),a.push(t._id))}));for(let e of l)await fetch(`https://energyflow.b.goit.study/api/exercises?equipment=${e}&page=1&limit=1024`).then((e=>e.json())).then((e=>{for(let t of e.results)a.includes(t._id)||(r.push(t),a.push(t._id))}));console.log(r),g(r)}else u=!1,n=`https://energyflow.b.goit.study/api/exercises?muscles=${e}&page=${t}&limit=12`,await l();document.querySelector(".filters").firstElementChild.style.pointerEvents="all",o.style.pointerEvents="all",document.querySelector(".pagination").style.display="flex",document.querySelector(".searchbar input").value=""})),document.querySelector(".filters").children[0].addEventListener("click",(async r=>{s.innerHTML='<div class="loader"></div>',d=2,t=1,document.querySelector(".active-page").textContent=t,e.classList.remove("active-filter"),r.target.classList.add("active-filter"),e=r.target,s.classList.remove("bodyParts"),s.classList.add("muscles"),document.querySelector(".searchbar").classList.add("visibility"),await i(),document.querySelector(".loader").remove()})),document.querySelector(".filters").children[1].addEventListener("click",(async r=>{s.innerHTML='<div class="loader"></div>',d=99,u=!1,t=1,document.querySelector(".active-page").textContent=t,e.classList.remove("active-filter"),r.target.classList.add("active-filter"),e=r.target,s.classList.remove("muscles"),s.classList.add("bodyParts"),document.querySelector(".searchbar").classList.remove("visibility"),n=`https://energyflow.b.goit.study/api/exercises?limit=12&page=${t}`,await l()})),e=document.querySelector(".filters").children[0],await i(),document.querySelector(".loader").remove();const a=document.querySelector(".pagination").children[0],c=document.querySelector(".pagination").children[2];a.addEventListener("click",(()=>{t--,t<1&&(t=1),document.querySelector(".active-page").textContent=t;const e=document.querySelector(".active-filter").textContent;if("Muscles"==e)s.innerHTML="",i();else if("Body parts"==e)if(s.innerHTML="",u)p--,p<1&&(p=1),g(r);else{const e=n.split("&");e[1]=`page=${t}`;const r=e.join("&");n=r,l()}})),c.addEventListener("click",(()=>{t++,t>d&&(t=d),document.querySelector(".active-page").textContent=t;const e=document.querySelector(".active-filter").textContent;if("Muscles"==e)s.innerHTML="",i();else if("Body parts"==e)if(s.innerHTML="",u)p++,p>d&&(p=d),g(r);else{const e=n.split("&");e[1]=`page=${t}`;const r=e.join("&");n=r,l()}}));let u,d=2,p=1;function g(e){u=!0;const t=[],r=Math.ceil(e.length/12);d=r;let n=12*p;if(n>e.length&&(n=e.length),s.innerHTML="",0!=e.length)for(let r=12*(p-1);r<n;r++){t.push(e[r]);const n=document.querySelector(".burger svg use").href.baseVal.split("#");s.insertAdjacentHTML("beforeend",`<div class="exercises-card">\n                <div class="top">\n                    <h3>WORKOUT</h3>\n                    <span>${e[r].rating}<svg><use href="${n[0]}#star"></use></svg></span>\n                    <p>Start<svg><use href="${n[0]}#arrow"></use></svg></p>\n                </div>\n                <p><span><svg><use href="${n[0]}#human"></use></svg></span>${e[r].name[0].toUpperCase()+e[r].name.slice(1)}</p>\n                <ul>\n                    <li>Burned calories: <b>${e[r].burnedCalories}/3 min</b></li>\n                    <li>Body part: <b>${e[r].bodyPart[0].toUpperCase()+e[r].bodyPart.slice(1)}</b></li>\n                    <li>Target: <b>${e[r].target[0].toUpperCase()+e[r].target.slice(1)}</b></li>\n                </ul>\n              </div>`)}else s.innerHTML='<p class="nothing">Unfortunately, <span>no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</p>';const o=document.querySelectorAll(".exercises-card .top p");for(let e=0;e<o.length;e++)o[e].addEventListener("click",(()=>{const r=document.querySelector(".backdrop"),s=r.querySelector(".wrapper > span ul"),n=s.querySelectorAll("svg");for(let e=0;e<5;e++)n[e].classList.remove("rated");for(let r=0;r<Math.floor(t[e].rating);r++)n[r].classList.add("rated");r.classList.remove("visibility"),r.querySelector(".favorite-button").addEventListener("click",(r=>{const s=JSON.parse(localStorage.getItem("arr"));console.log(s),s.push(t[e]),localStorage.setItem("arr",JSON.stringify(s));var n=r.currentTarget,o=n.cloneNode(!0);n.parentNode.replaceChild(o,n)})),document.querySelector(".modal > svg").addEventListener("click",(()=>{r.classList.add("visibility")})),r.querySelector(".image").style=`background: linear-gradient(0deg, rgba(27, 27, 27, 0.20) 0%, rgba(27, 27, 27, 0.20) 100%), url(${t[e].gifUrl}) lightgray -7.072px -25.893px / 107.482% 121.729% no-repeat;`,r.querySelector("h3").textContent=`${t[e].name[0].toUpperCase()+t[e].name.slice(1)}`;const o=r.querySelectorAll(".info li b");o[0].textContent=`${t[e].target[0].toUpperCase()+t[e].target.slice(1)}`,o[1].textContent=`${t[e].bodyPart[0].toUpperCase()+t[e].bodyPart.slice(1)}`,o[2].textContent=`${t[e].equipment[0].toUpperCase()+t[e].equipment.slice(1)}`,o[3].textContent=`${t[e].popularity}`,o[4].textContent=`${t[e].burnedCalories}/3 mins`,r.querySelector(".description").textContent=`${t[e].description}`,r.querySelector(".wrapper > span").textContent=`${t[e].rating}`,r.querySelector(".wrapper > span").appendChild(s)}))}}()}();
//# sourceMappingURL=index.8985466c.js.map
