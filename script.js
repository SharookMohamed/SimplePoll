let poll = {
  answers: [
    {
      name: "One Piece",
      image:
        "https://m.media-amazon.com/images/M/MV5BYzJkZDNhYWUtN2EwNS00ZWViLWFiNmEtYjkxY2RkMzMyMTBkXkEyXkFqcGc@._V1_FMjpg_UY720_.jpg",
    },
    {
      name: "Naruto",
      image:
        "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    },
    {
      name: "Attack of titans",
      image:
        "https://images.justwatch.com/poster/306747132/s332/attack-on-titan",
    },
    {
      name: "Haikyu",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjkyNDI2MTgtN2Y3NS00M2RjLWJhNDMtMmNmZmUwMDQwZTE1XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UY1920_.jpg",
    },
  ],
  pollcount: 100,
  answerweight: [60, 10, 20, 10], // sum = 100
  selectanswer: -1,
};

let polldom = {
  answers: document.querySelector(".poll .answers"),
};

polldom.answers.innerHTML = poll.answers
  .map(function (answer, i) {
    return `
<div class="answer" onclick="markanswer('${i}')">
<img src="${answer.image}" alt="${answer.name}">
<div class="answer-content">
<div class="name">${answer.name}</div>
<div class="percentage-container">
    <span class="percentage_bar"></span>
    <span class="percentage_value"></span>
</div>
</div>
</div>
`;
  })
  .join("");

function markanswer(i) {
  if (poll.selectanswer === -1) {
    // Allow selection only once
    poll.selectanswer = +i;

    document
      .querySelectorAll(".poll .answers .answer")
      .forEach((answer) => answer.classList.remove("selected"));

    document
      .querySelectorAll(".poll .answers .answer")
      [+i].classList.add("selected");

    showresults();
  }
}

function showresults() {
  let answers = document.querySelectorAll(".poll .answers .answer");

  for (let i = 0; i < answers.length; i++) {
    let percentage = 0;

    if (i == poll.selectanswer) {
      percentage = Math.round(
        ((poll.answerweight[i] + 1) * 100) / (poll.pollcount + 1)
      );
    } else {
      percentage = Math.round(
        (poll.answerweight[i] * 100) / (poll.pollcount + 1)
      );
    }

    answers[i].querySelector(".percentage_bar").style.width = percentage + "%";
    answers[i].querySelector(".percentage_value").innerText = percentage + "%";
  }
}
