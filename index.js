const op = [
  {
    question:
      "1.India's first Technicolor film ____ in the early 1950s was produced by ____",
    ans: "option4",
    option1: "'Jhansi Ki Rani', Sir Syed Ahmed",
    option2: "'Mirza Ghalib', Sohrab Modi",
    option3: "'Mirza Ghalib', Munshi Premchand",
    option4: "Jhansi Ki Rani', Sohrab Modi",
  },
  {
    question: "2.India has largest deposits of ____ in the world.",
    ans: "option3",
    option1: "gold",
    option2: "copper",
    option3: "mica",
    option4: "None of the above",
  },
  {
    question: "3.How many Lok Sabha seats belong to Rajasthan?",
    ans: "option1",
    option1: "25",
    option2: "17",
    option3: "32",
    option4: "30",
  },
  {
    question:
      "4.In which year of First World War Germany declared war on Russia and France?",
    ans: "option4",
    option1: "1915",
    option2: "1916",
    option3: "1917",
    option4: "1914",
  },
  {
    question: "5.Grand Central Terminal, Park Avenue, New York is the world's",
    ans: "option3",
    option1: "highest railway station",
    option2: "longest railway station",
    option3: "largest railway station",
    option4: "None of the above",
  },
  {
    question: "6.Entomology is the science that studies",
    ans: "option3",
    option1: "Behavior of human beings",
    option2: "The origin and history of technical and scientific terms",
    option3: "Insects",
    option4: "The formation of rocks",
  },
  {
    question:
      "7.Eritrea, which became the 182nd member of the UN in 1993, is in the continent of",
    ans: "option1",
    option1: "Africa",
    option2: "Europe",
    option3: "Australia",
    option4: "Asia",
  },
  {
    question: "8.Garampani sanctuary is located at",
    ans: "option2",
    option1: "Kohima, Nagaland",
    option2: "Diphu, Assam",
    option3: "Junagarh, Gujarat",
    option4: "Gangtok, Sikkim",
  },
  {
    question:
      "9.For which of the following disciplines is Nobel Prize awarded?",
    ans: "option4",
    option1: "Literature, Peace and Economics",
    option2: "Physiology or Medicine",
    option3: "Physics and Chemistry",
    option4: "All of the above",
  },
];
let score = 0;
let curQuestNumber = 0;
let globalansweraccess = "";
let count;
let autoNext;
let timeforend = 0;
let timeforend2 = true;
const start = document.querySelector("#start-btn");
const parentStart = start.parentElement;
const passBtn = document.querySelector("#pass-btn");
const options = document.querySelectorAll(".answers");
const spanElem = document.querySelector("span");
const resultsection = document.querySelector(".result-section");
const resultwrapperh1 =
  document.querySelector(".wrapper-result").firstElementChild;
function showAnswer(useroption, token = false) {
  if (timeforend2) {
    let question =
      document.querySelector(".question").firstElementChild.innerText;
    const curQuestObj = op.filter((val) => val.question == question);
    if (token) {
      if (useroption.id != curQuestObj[0].ans) {
        useroption.style.backgroundColor = "red";
      } else {
        score++;
      }
    }
    const getanswerElem = document.querySelector(`#${curQuestObj[0].ans}`);
    getanswerElem.style.backgroundColor = "green";
    setTimeout(() => {
      if (useroption != undefined) useroption.style.backgroundColor = "white";
      getanswerElem.style.backgroundColor = "white";
    }, 800);
  }
}
function nextquestion() {
  if (curQuestNumber <= 7) {
    const curQuest = document.querySelector(".question");
    const nextquestionObj = op[Number(curQuestNumber) + 1];
    curQuest.firstElementChild.innerText = nextquestionObj.question;
    let i = 0;
    options.forEach((e) => {
      e.innerText = nextquestionObj[`option${i + 1}`];
      i++;
    });
    curQuestNumber++;
    spanElem.innerText = Number(curQuestNumber) + 1;
  }
}
passBtn.addEventListener("click", () => {
  run();
  clearInterval(autoNext);
  autonextall();
});
options.forEach((e) => {
  e.addEventListener("click", (e) => {
    const getuseranswer = e.target;
    run(getuseranswer, true, "options");
    clearInterval(autoNext);
    autonextall();
  });
});
function countdown() {
  clearInterval(count);
  const time = document.querySelector(".time");
  time.innerText = 15;
  let i = 14;
  count = setInterval(() => {
    time.innerText = i;
    i--;
    if (i < 0 || timeforend == 9) {
      time.innerText = 15;
      clearInterval(count);
    }
  }, 1000);
}
function animation(stop = true) {
  const line = document.querySelector(".line");
  if (stop && timeforend != 9) {
    line.style.transition = "all 15s ease";
    line.style.width = "100%";
    countdown();
  } else {
    line.style.width = "0%";
    line.style.transition = "none";
  }
}
function run(getuseranswer, token, btn) {
  if (curQuestNumber <= 8) {
    if (curQuestNumber == 0) {
      start.remove();
    }
    if (btn == "options") {
      showAnswer(getuseranswer, token);
    } else {
      showAnswer();
    }
    animation(false);
    setTimeout(() => {
      nextquestion();
      animation();
    }, 800);
    if (curQuestNumber == 8) {
      timeforend = curQuestNumber + 1;
      timeforend2 = false;
      setTimeout(() => {
        resultsection.style = "display:flex; z-index:999;";
        resultwrapperh1.innerText = `Result:${score}`;
      }, 800);
    }
  }
}
function autonextall() {
  clearInterval(autoNext);
  autoNext = setInterval(() => {
    run();
    if (curQuestNumber == 8) {
      clearInterval(autoNext);
    }
  }, 15000);
}
const backbtn = document.querySelector("#back");
backbtn.addEventListener("click", () => {
  score = 0;
  curQuestNumber = 0;
  globalansweraccess = "";
  count;
  autoNext;
  timeforend = 0;
  timeforend2 = true;
  resultsection.style = "display:none; z-index:-1;";
  let question = document.querySelector(".question").firstElementChild;
  question.innerText = op[0].question;
  for (let i = 0; i < 4; i++) {
    options[i].innerText = op[0][`option${i + 1}`];
  }
  spanElem.innerText = 1;
  parentStart.insertBefore(start, passBtn);
});
start.addEventListener("click", () => {
  animation();
  autonextall();
});
