// Получаем элементы со страницы
const attemptsInput = document.getElementById("attemptsInput");
const changeBtn = document.getElementById("changeBtn");
const stayBtn = document.getElementById("stayBtn");
const result = document.getElementById("result");

let doorsCount = 3; // количество дверей

if (doorsCount < 3) {
  // защита от дурака.
  doorsCount = 3;
}

const runGame = (isChangeChoice) => {
  // Получаем количество попыток из input и приводим к числу
  const attempts = Number(attemptsInput.value);
  // Счетчик выигрышей
  let wins = 0;
  // Проверка: если введено 0 или меньше
  if (attempts <= 0) {
    result.textContent = "Введите количество попыток больше 0";
    return;
  }
  // Запускаем цикл
  for (let i = 0; i < attempts; i++) {
    const winDoor = Math.floor(Math.random() * 3);
    const playerChoice = Math.floor(Math.random() * 3);

    // Ведущий открывает одну неправильную дверь
    let hostDoor;
    do {
      hostDoor = Math.floor(Math.random() * doorsCount);
    } while (hostDoor === winDoor || hostDoor === playerChoice);

    if (isChangeChoice) {
      // Игрок выбирает новую дверь (не свою и не открытую)
      let newChoice;
      do {
        newChoice = Math.floor(Math.random() * doorsCount);
      } while (newChoice === playerChoice || newChoice === hostDoor);

      if (newChoice === winDoor) {
        wins++;
      }
    } else {
      if (playerChoice === winDoor) {
        wins++;
      }
    }

    //     if (isChangeChoice) {
    //       if (playerChoice !== winDoor) {
    //         //
    //         wins++;
    //       }
    //     } else {
    //       // Победа только если сразу угадал
    //       if (playerChoice === winDoor) {
    //         wins++;
    //       }
    //     }
    //   }
  }
  // Вычисляем процент побед
  const percent = ((wins / attempts) * 100).toFixed(2); //процент победи закругляем до 2х запятих
  // Выводим результат на экран
  result.textContent = `Побед: ${wins} из ${attempts}. Вероятность: ${percent}%`;
};
// Обработчик кнопки "Менять выбор"
changeBtn.onclick = () => {
  runGame(true);
};
// Обработчик кнопки "Не менять выбор"
stayBtn.onclick = () => {
  runGame(false);
};
