(()=>{"use strict";var e="",t=0,n=0,c=3,o=1,u=document.querySelector(".output"),r=document.querySelector(".form"),i=document.querySelector(".input"),a=document.querySelector(".content__title"),l=document.querySelector(".content__subtitle");document.addEventListener("keyup",(function(r){"Escape"===r.key&&(l.textContent="",u.innerHTML="",e="",t=0,n=0,c=3,o=1,i.value="",a.textContent="Угадай число",v("Введите ваше имя"))}));var d=function(e,t){var n=e%10;return e>10&&[11,12,13,14].includes(e%100)?"".concat(e," ").concat(t[2]):1==n?"".concat(e," ").concat(t[0]):[2,3,4].includes(n)?"".concat(e," ").concat(t[1]):[5,6,7,8,9,0].includes(n)?"".concat(e," ").concat(t[2]):void 0};function v(e){var t=document.createElement("li");t.textContent=e,u.appendChild(t)}function f(){for(var e=0;e<u.children.length;e++)u.removeChild(u.firstChild)}v("Введите ваше имя"),i.focus(),r.addEventListener("submit",(function(r){r.preventDefault(),function(){if(i.value){if(!e)return e=i.value,f(),l.textContent='Чтобы начать занова нажмите "Esc"',void v("Здравстуй ".concat(i.value,'. Это игра "Угадай число". Тебе необходимо сначала ввести максимальное число для установки диапозона. Например 10. Тогда диапозон будет 1-10. Далее тебе нужно будет угадать случайное число из этого диапозона. Каждые 3 неверные попытки я буду тебе подсказывать в каком направлении двигаться. Удачи!!!\n    Введите число для установки диапозона. Не более 10000'));var r=Number(i.value);if(0===t)return Number.isNaN(r)||r<10||r>1e4?(f(),void v("Для того чтобы задать дапозон нужно ввести число больше или равное 10, но не более 10000")):(n=r,a.textContent="Угадай число в диапазоне от 1 до ".concat(n),t=Math.floor(Math.random()*Number(i.value)),console.log(t),f(),void v("Введите число чтобы начать угадывать"));if(r===t)v("Поздравляю. Ты угадал число. Это была цифра ".concat(r,". Тебе на это понадобилось ").concat(d(o,["попытка","попытки","попыток"]))),i.style.display="none";else{if(u.children.length>10&&f(),r<=0||r>n||Number.isNaN(r))return void v("Вы ввели число вне диапазона или не число. Введите число");if(o+=1,c>0?c-=1:c=2,0===c){if(r>t)return void v("Вы не угадали. Загаданное число меньше");if(r<t)return void v("Вы не угадали. Загаданное число больше")}v("Вы не угадали. Чтобы появилась подсказка осталось ошибиться ".concat(d(c,["раз","раза","раз"]),". Продолжайте угадывать"))}}}(),i.value=""}))})();