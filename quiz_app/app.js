const question = document.querySelector(`.question`);
const optA = document.querySelector(`.A`);
const optB = document.querySelector(`.B`);
const optC = document.querySelector(`.C`);
const optD = document.querySelector(`.D`);
const options = document.getElementsByName(`option`);
const buttons = document.querySelectorAll(`.submit`);

const questions = [
  {
    question: `Which programming language is primarily used for web development alongside HTML and CSS?`,
    A: `Python`,
    B: `Java`,
    C: `JavaScript`,
    D: `C++`,
    answer: `opt-3`,
    id:`Q1`,
    selected: null
  },
  {
    question: `What does HTML stand for?`,
    A: `HyperText Markup Language`,
    B: `HighText Machine Language`,
    C: `Hyperlink and Text Markup Language`,
    D: `Home Tool Markup Language`,
    answer: `opt-1`,
    id:`Q2`
  },
  {
    question: `Which keyword is used to create a function in Python`,
    A: `func`,
    B: `def`,
    C: `function`,
    D: `create`,
    answer: `opt-2`,
    id:`Q3`
  },
  {
    question: `What symbol is used to comment a single line in Python?`,
    A: `//`,
    B: `#`,
    C: `/*`,
    D: `<!--`,
    answer: `opt-2`,
    id:`Q4`
  },
];
let quizIndex = 0;
let scores = 0;
let answer = undefined;
let questionID = []
let correctQuestionId = new Set(questionID)

const deselectAnswer = () => {
  options.forEach((option) => {
    if (option.checked) {
      option.checked = false;
    }
  });
};
const load = () => {
  deselectAnswer();
  question.textContent = questions[quizIndex].question;
  optA.textContent = questions[quizIndex].A;
  optB.textContent = questions[quizIndex].B;
  optC.textContent = questions[quizIndex].C;
  optD.textContent = questions[quizIndex].D;
};
load();

const selectedAnswer = () => {
  options.forEach((option) => {
    if (option.checked) {
      answer = option.id;
      console.log(option);
    }
  });
  return answer;
};

// const userAnswerFunc = ()=>{
//     let answer;
//     options.forEach(option=>{
//         if(option.checked){
//             // const userAnswer = option.nextElementSibling.textContent
//             // const userAnswer = option.id
//              answer = option.id
//                 // console.log(answer)
//                 option.checked = false
//         }
//         console.log(answer)
//     })

// }

buttons.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    e.preventDefault();
    const btnValue = e.target.textContent;

    const userAnswer = selectedAnswer();
    if (userAnswer) {
        
        // console.log(questionID)
      if (userAnswer === questions[quizIndex].answer) {
        scores++;
        
        questionID.push(questions[quizIndex].id)
        console.log(questionID)
        console.log(scores);
        // console.log(`free`);
      }
      if (questionID.includes(questions[quizIndex].id) && userAnswer !== questions[quizIndex].answer) {
        // questionID.remove(questions[quizIndex].id) 
        let questIndex = questionID.indexOf(questions[quizIndex].id) 
        questionID.splice(questIndex, 1)  
        console.log(`wrong`)
    }
    // if(questionID.includes(questions[quizIndex].id)){
    //     return questionID
    // }
      if (btnValue === `Next`) {
        quizIndex++;
        deselectAnswer();
        if (quizIndex > questions.length - 1) {
          alert(`this is you score : ${scores}`);
          quizIndex = 0;
          scores = 0;
          questionID = []
        }
      }
  
      if (btnValue === `Prev`) {
        quizIndex--;
        deselectAnswer();
        if (quizIndex < 0) {
          quizIndex = 0;
        }
      }
    //   quizIndex++;
    deselectAnswer();
    }
    else{}
    


                load()
    //             console.log(quizIndex)
    //             userAnswerFunc()
  });
});

// buttons.addEventListener(`click`, (e)=>{
//     e.preventDefault()

//     const userAnswer = selectedAnswer()

//     if(userAnswer){
//         if(userAnswer === questions[quizIndex].answer){
//             scores++
//             console.log(scores)
//             console.log(`free`)
//         }

//         quizIndex++
//     } else{
//         console.log(`your score`)
//     }

//     load( )
// })
// const buttonAction = ()=>{
// buttons.forEach(button =>{
//     button.addEventListener(`click`, (e)=>{
//         e.preventDefault()

//         const btnValue = e.target.textContent
//         if(btnValue === `Next`){
//             quizIndex++
//             if(quizIndex > questions.length - 1){
//                  quizIndex = 0

//                 alert(`this is you score`)
//             }
//         }
//         if(btnValue === `Prev`){
//             quizIndex--
//             if(quizIndex < questions.length){
//                 quizIndex = 0
//            }
//         }
//             load()
//             console.log(quizIndex)
//             userAnswerFunc()
// })
// })
// }
// buttonAction()
