let setOfQuestions = document.querySelector("#setOfQuestions");
let subtitle = document.querySelector("#subtitle");
let cardsQuestion = document.querySelector("#cards-question");
let questionHTMLelement = document.querySelector("#question-element");

// =============================================================

let localQuestionSet =
  JSON.parse(localStorage.getItem("localQuestionSet")) || questionSet;
// let localquestions

function setQuestions() {
  console.log(Object.values(localQuestionSet));

  setOfQuestions.classList.remove("d-none");
  questionHTMLelement.classList.add("d-none");
  setOfQuestions.innerHTML = ``;

  Object.values(localQuestionSet).map((item, indexItem) => {
    setOfQuestions.innerHTML += `
    
    <div class="col-md-6 col-lg-4 col-xl-3">
          <div class="set-box" onclick="listOfQuestions(${indexItem})">
            <p class="set-title mb-0">${item.title}</p>
            <div class="d-flex justify-content-between">
              <p class="problem-number align-self-end">
                ${item.questionsNumber} <i class="fas fa-hourglass-half isonTime"></i>
              </p>
              <div class="skill">
                <div class="outer">
                  <div class="inner">
                    <div id="percent">0%</div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="100px"
                    height="100px"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke-linecap="round"
                      id="circle1"
                      style="stroke-dashoffset: 260"
                    ></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

    `;
  });
}

let renderQuestion;
let questionIndex = 0;
let listOfQuestions = (indexItem) => {
  setOfQuestions.classList.remove("d-none");
  questionHTMLelement.classList.add("d-none");
  questionIndex = indexItem;
  renderQuestion = Object.values(localQuestionSet)[indexItem];
  console.log(Object.values(localQuestionSet)[indexItem]);

  setOfQuestions.innerHTML = "";

  setOfQuestions.innerHTML = `
  
  <div class="d-flex align-items-center  gap-3 my-4">
    <h2 class="question m-0 p-0">${renderQuestion.title}</h2>

    <button class="btn d-flex align-items-center" onclick="setQuestions()">
      <i class="fa-solid fa-arrow-left"></i>
    </button>
  </div>

  `;

  Object.values(renderQuestion.questions).map((item, indexItem) => {
    let indexProbel = item.fun_name.indexOf(" ");

    setOfQuestions.innerHTML += `
    
    
    <div class="col-md-6 col-lg-4 col-xl-3">  
    
    <div class="set-box" onclick="listMasalaQuestion(${indexItem})">
    
    <div class="d-flex align-items-start justify-content-between w-100">
    <h5 class="m-0 p-0">${item.fun_name.slice(0, indexProbel + 1)}</h5>
    
    <i class="fa-solid fa-circle-check isonTime fs-5 ${
      item.solved === true ? "" : "d-none"
    }" id="goodQuestion"></i>
    </div>

    <div/>

    </div>

    `;
  });
};

let listMasalaQuestion = (indexItem) => {
  subtitle.classList.add("d-none");
  setOfQuestions.classList.add("d-none");
  questionHTMLelement.classList.remove("d-none");
  let data = renderQuestion.questions[indexItem + 1];
  console.log(renderQuestion.questions[indexItem + 1]);
  console.log(indexItem);

  let indexProbel =
    renderQuestion.questions[indexItem + 1].fun_name.indexOf(" ");

  cardsQuestion.innerHTML = ``;
  cardsQuestion.innerHTML += `
  
  <div class="card-question  col-12 col-lg-12 col-xl-6  text-center text-xl-start">
            <div class="btns ">
              <button class="home btn" onclick="setQuestions()">
                <i class="fa-solid fa-house"></i>
              </button>

              <button class="left-exit btn" onclick="listOfQuestions(${questionIndex})">
                <i class="fa-solid fa-arrow-left"></i>
              </button>


              
              <button class="next-question btn ${
                indexItem === renderQuestion.questionsNumber - 1 ? "d-none" : ""
              }" onclick="listMasalaQuestion(${indexItem + 1})">
                Следуюший
              </button>

                <button class="next-question btn ${
                  indexItem === 0 ? "d-none" : ""
                }" onclick="listMasalaQuestion(${indexItem - 1})">
                Назад
              </button>
            </div>

            <h1 id="question-title" class="my-3">${data.fun_name.slice(
              0,
              indexProbel + 1
            )}</h1>

            <p>
               ${data.text}
            </p>

            <ul class="my-4 d-flex flex-column gap-3">
             ${data.examples
               .map((item, index) => {
                 return `<li>${item}</li>`;
               })
               .join("")}
          </ul>

          <div class="d-flex gap-4 align-items-center my-3 ">
          <h3 class="m-0 p-0">Natijalar</h3>
          
          <i class="fa-solid fa-circle-check isonTime fs-5 ${
            data.solved === true ? "" : "d-none"
          }" id="goodQuestion"></i>
          </div>

          <div class="bg-color-black p-4 rounded-3 questionCheck">
              <div>
              <div><h5 id="error" class="text-danger"></h5></div>
              ${data.examples
                .map((item, index) => {
                  return ` <div
                  class="py-2 m-0 d-flex align-items-center justify-content-between"
                >
                  <p class="m-0 p-0">
                    ${item}
                  </p>
                  <button class="btn" id="resultBtn">Javobingiz: <span id="result"></span></button>
                </div>`;
                })
                .join("")}
              </div>
            </div>
          </div>

          <div class="card-question mt-5 m-xl-0 col-12 col-lg-12 col-xl-6 ">
          <div
              id="question-ptoverka"
            >

            </div>
            <div class="text-end">
              <button class="btn" id="checkedBtn" onclick="checkedBtn(${indexItem})">Topshirish</button>
            </div> 
          </div>

          `;
  editorTerminal(data);
};
let checkedBtn = async (indexItem) => {
  let data = renderQuestion.questions[indexItem + 1];
  let result = document.querySelectorAll("#result");
  let resultBtn = document.querySelectorAll("#resultBtn");
  let goodQuestion = document.querySelector("#goodQuestion");
  let errors = document.querySelector("#error");
  let truth = 0;
  let indexProbel =
    renderQuestion.questions[indexItem + 1].fun_name.indexOf(" ");

  data.check.map(async (item, indexItem) => {
    try {
      let resultItem = eval(
        String(
          editor.getValue() +
            data.fun_name.slice(0, indexProbel + 1) +
            `(${item})`
        )
      );

      if (data.answers[indexItem] === resultItem) {
        truth++;
        errors.classList.add("d-none");
        result[indexItem].innerHTML = resultItem;
        resultBtn[indexItem].classList.add("bg-green");
        if (truth === data.check.length - 1) {
          goodQuestion.classList.remove("d-none");
          data.solved = true;

          setLocal();
        }
      } else if (data.answers[indexItem] !== resultItem) {
        errors.classList.add("d-none");
        result[indexItem].innerHTML = resultItem;
        resultBtn[indexItem].classList.remove("bg-green");
        resultBtn[indexItem].classList.add("bg-red");
      }
    } catch (error) {
      errors.innerHTML = error;
    }
    if (truth === data.check.length - 1) {
      confetti.start();
      let applause = document.querySelector("#applause");
      await applause.play();
      setTimeout(function () {
        confetti.stop();
      }, 2000);
    }
  });
};

let setLocal = () => {
  localStorage.setItem("localQuestionSet", JSON.stringify(localQuestionSet));
};

setQuestions();
