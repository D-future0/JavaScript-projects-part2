const text = document.querySelector(`#text`);
const date = document.querySelector(`#date`);
const time = document.querySelector(`#time`);
const submit = document.querySelector(`#submit`);

const functionality = () => {
  
  //  current time and date in sec
  const now = () => {
    const ex = Math.floor(new Date().getHours() * 3600);
    const exx = Math.floor(new Date().getMinutes() * 60);
    const exxx = Math.floor(new Date().getSeconds());
    const exxxx = Math.floor(ex + exx + exxx);
    const e = Math.floor(new Date() / 1000) - exxxx + 3600;
    return e + exxxx;
  };
  // convert user input date to seconds
  const dateToSeconds = () => {
    const userDate = new Date(date.value) / 1000;
    return userDate;
  };
  // convert user input time to seconds
  const timeToSeconds = () => {
    const [hourss, minutess] = time.value.split(":");
    const userTime = Number(hourss) * 3600 + Number(minutess) * 60 + 60;
    return userTime;
  };
  // addition of user input date and time in seconds
  const userDateAndTimeInSec = dateToSeconds() + timeToSeconds();
  //  conditions to accept user input
  if (text.value === "" || text.value.trim() === "") {
    text.value = "countdown";
    return text;
  }
  if (isNaN(dateToSeconds()) && timeToSeconds()) {
    alert(`invalid date`);
  }
  if (isNaN(timeToSeconds()) && dateToSeconds()) {
    alert(`invalid time`);
  }
  if (isNaN(dateToSeconds()) && isNaN(timeToSeconds())) {
    alert(`invalid time and date`);
  }
  if (userDateAndTimeInSec <= now()) {
    alert(`please input future time and date`);
  } else if (userDateAndTimeInSec > now()) {
    alert(`input accepted`);
    localStorage.setItem(
      "userDateAndTimeInSec",
      JSON.stringify(userDateAndTimeInSec)
    );

    localStorage.setItem("titleText", JSON.stringify(text.value));
     const deadline = () => {
      const calenderDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednessday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const calenderMonth = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Auguest",
        "September",
        "October",
        "November",
        "December"
      ];
    
      const deadlineDay = new Date(date.value).getDay();
      const deadlineDate = new Date(date.value).getUTCDate();
      const deadlineMonth = new Date(date.value).getMonth();
      const deadlineYear = new Date(date.value).getFullYear();
      const deadlineFormat = `${calenderDay[deadlineDay]}, ${calenderMonth[deadlineMonth]} ${deadlineDate}, ${deadlineYear}`;
      localStorage.setItem("deadlineFormat", JSON.stringify(deadlineFormat));
      
      window.location.href = `./home.html`;

    };
    deadline()
  }
};
//click event to start countdown
submit.addEventListener("click", function (e) {
  e.preventDefault();
  functionality();
});
