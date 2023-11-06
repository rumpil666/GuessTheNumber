import '../assets/styles/index.css';

let name = '';
let number = 0;
let topRange = 0;
let countHint = 3;
let countAtempt = 1;

const output = document.querySelector('.output');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const title = document.querySelector('.content__title');
const subtitle = document.querySelector('.content__subtitle');

document.addEventListener('keyup', restart)

function restart(e) {
  if (e.key === 'Escape') {
    subtitle.textContent = '';
    output.innerHTML = '';
    name = '';
    number = 0;
    topRange = 0;
    countHint = 3;
    countAtempt = 1;
    input.value = '';
    title.textContent = 'Угадай число';
    newMessage('Введите ваше имя');
  }
}

const numTitle = function () {
  // Внутреняя функция должна принимать два значения. Цифру и массив со спряжениями
  return function (number, title) {
    // Переменная необходимая для проверки окончания цифры
    let last_num = number % 10;
    // перечисленны цифры исключения. Которые имеют другую логику спряжения
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return `${number} ${title[2]}`;
    // логика спряжения цифр оканчивающихся на единицу
    if (last_num == 1) return `${number} ${title[0]}`;
    // логика спряжения цифр оканчивающихся на 2, 3, 4
    if ([2, 3, 4].includes(last_num)) return `${number} ${title[1]}`;
    // логика спряжения цифр оканчивающихся на 5,6,7,8,9, 0
    if ([5, 6, 7, 8, 9, 0].includes(last_num)) return `${number} ${title[2]}`;
  };
}();

newMessage('Введите ваше имя')
input.focus();

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  gameProgress();

  input.value = '';
};

function newMessage(message) {
  const li = document.createElement('li');

  li.textContent = message;

  output.appendChild(li);
}

function clearOutput() {
  for (let i = 0; i < output.children.length; i++) {
    output.removeChild(output.firstChild);
  }
}

function gameProgress() {
  if (!input.value) return;

  if (!name) {
    name = input.value;
    clearOutput()
    subtitle.textContent = 'Чтобы начать занова нажмите "Esc"';
    newMessage(`Здравстуй ${input.value}. Это игра "Угадай число". Тебе необходимо сначала ввести максимальное число для установки диапозона. Например 10. Тогда диапозон будет 1-10. Далее тебе нужно будет угадать случайное число из этого диапозона. Каждые 3 неверные попытки я буду тебе подсказывать в каком направлении двигаться. Удачи!!!
    Введите число для установки диапозона. Не более 10000`);
    return;
  }

  let numberInput = Number(input.value);

  if (number === 0) {
    if (Number.isNaN(numberInput) || numberInput < 10 || numberInput > 10000) {
      clearOutput();
      newMessage('Для того чтобы задать дапозон нужно ввести число больше или равное 10, но не более 10000');
      return;
    }
    topRange = numberInput;

    title.textContent = `Угадай число в диапазоне от 1 до ${topRange}`;
    number = Math.floor(Math.random() * Number(input.value));
    console.log(number)
    clearOutput();
    newMessage('Введите число чтобы начать угадывать');
    return;
  }

  if (numberInput !== number) {
    if (output.children.length > 10) {
      clearOutput();
    }

    if (numberInput <= 0 || numberInput > topRange || Number.isNaN(numberInput)) {
      newMessage('Вы ввели число вне диапазона или не число. Введите число');
      return;
    }
    countAtempt += 1;
    countHint > 0 ? countHint -= 1 : countHint = 2;
    if (countHint === 0) {
      if (numberInput > number) {
        newMessage('Вы не угадали. Загаданное число меньше');
        return;
      }
      if (numberInput < number) {
        newMessage('Вы не угадали. Загаданное число больше');
        return;
      }
    }
    newMessage(`Вы не угадали. Чтобы появилась подсказка осталось ошибиться ${numTitle(countHint, ['раз', 'раза', 'раз'])}. Продолжайте угадывать`);
    return;
  }

  newMessage(`Поздравляю. Ты угадал число. Это была цифра ${numberInput}. Тебе на это понадобилось ${numTitle(countAtempt, ['попытка', 'попытки', 'попыток'])}`)

  input.style.display = 'none';

  return;
}
