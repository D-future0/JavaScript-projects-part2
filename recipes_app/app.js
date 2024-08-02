let favArray = [];
function randomMeals() {
  async function dailyBread2() {
    const resp = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await resp.json();
    const meals = data.meals;
    const mealsId = data.meals[0].idMeal;
    console.log(data.meals);
    let displaymeal = meals.map((meal) => {
      return `<img src="${meal.strMealThumb}" />
            <div class="meal">
              <p>${meal.strMeal}</p><span id="${meal.idMeal}" class="addToFav">love</span>
            </div>`;
    });
    document.querySelector(`.random-meal`).innerHTML = displaymeal;
    const selectFav = document.querySelector(".addToFav");
    selectFav.addEventListener(`click`, (e) => {
      const id = e.target.id;
      if(selectFav.classList.contains(`active`)){
        removeFromLocalstorage(id)
        selectFav.classList.remove(`active`);
      }
      else{
        addFavToLocalStorage(id)
        selectFav.classList.add(`active`);
      }
      ;
    });
  }
  dailyBread2();
}
randomMeals();

const addFavToLocalStorage = (id) => {
localStorage.setItem("mealIds", JSON.stringify([...getFavFromLocalStorage(), id]));
}
;
const getFavFromLocalStorage = () => {
     return JSON.parse(localStorage.getItem(`mealIds`)) === null ? [] : JSON.parse(localStorage.getItem(`mealIds`)) ;
};
const removeFromLocalstorage = (mealsId)=>{
    localStorage.setItem("mealIds", JSON.stringify(getFavFromLocalStorage().filter((id)=> id !== mealsId)));
}
// console.log(favMealContainer)
// searchmeal()
