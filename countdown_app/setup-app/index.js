const countdown = document.querySelector(`.countdown`);
const eventTitle = document.getElementById("event-title");
const eventDate = document.getElementById("event-date");
const resetBtn = document.getElementById("rest");

// functionality to stop timer
const stop = () => {
  localStorage.clear();
  // const store = [];
  countdown.innerHTML = `<h1>00:00:00:00</h1>`;
  eventTitle.innerHTML = `<h2>countdown</h2>`;
  eventDate.innerHTML = `<h2>deadline</h2>`;
  clearInterval(live);
};

const liveUpdate = () => {
  // get input date and time in sec from the localstorage and title
  // const store = JSON.parse(localStorage.getItem("userDateAndTimeInSec"));
  const value = JSON.parse(localStorage.getItem("userDateAndTimeInSec"));
  const titleText = JSON.parse(localStorage.getItem("titleText"));
  const deadlineFormat = JSON.parse(localStorage.getItem("deadlineFormat"));
  // update input title in html
  eventTitle.innerHTML = `<h2>${titleText}</h2>`;
  // update input title in html
  eventDate.innerHTML = `<h2>${deadlineFormat}</h2>`;
  //  current time and date in sec
  const now = () => {
    const ex = Math.floor(new Date().getHours() * 3600);
    const exx = Math.floor(new Date().getMinutes() * 60);
    const exxx = Math.floor(new Date().getSeconds());
    const exxxx = Math.floor(+ex + exx + exxx);
    const e = Math.floor(new Date() / 1000) - exxxx + 3600;
    return e + exxxx;
  };
  // difference between input time&date in sec and current time and date in sec
  const timeDifference = value - now();
  // product from the difference between input time&date in sec and current time and date in sec, converted to days, hours, minute and seconds
  const days = Math.floor(timeDifference / (3600 * 24));
  const hours = Math.floor(timeDifference / 3600) % 24;
  const minutes = Math.floor(timeDifference / 60) % 60;
  const seconds = Math.floor(timeDifference) % 60;
  // assigning days, hours, minute and seconds to a variable
  const userInputs = [days, hours, minutes, seconds];
  console.log(userInputs);
  // functionality to format days, hours, minute and seconds which is assigned to a variable
  const propFormats = () => {
    const formated = userInputs.map((userInput) => {
      if (userInput < 10) {
        const format = `0${userInput}`;
        return format;
      } else {
        return userInput;
      }
    });

    const formateds = formated.toString().split(",");
    // destructuring result into days, hours, minute and seconds
    const [days, hours, minutes, seconds] = formateds;
    // dynamically update our html
    countdown.innerHTML = `<h1>${days}:${hours}:${minutes}:${seconds}</h1>`;
  };

  propFormats();
  // stop countdown if there are not difference between input time&date and current time&date
  if (timeDifference < 0) {
    stop();
  }
};

// stop/reset countdown
resetBtn.addEventListener(`click`, (e) => {
  e.preventDefault();
  stop();
});
// update countdown every seconds
const live = setInterval(() => {
  liveUpdate();
}, 1000);
// liveUpdate();
