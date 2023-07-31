/*
async function getCoins(){
    try{
      const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
      const data = await res.json()
      document.getElementById("cryptoTop").innerHTML=`<img src=${data.image.small} /><span>${data.name}</span>`
      document.getElementById("cryptoPrice").innerHTML=`<p>👉: € ${data.market_data.current_price.eur}</p>
                                                        <p>👆: € ${data.market_data.high_24h.eur}</p>
                                                        <p>👇: € ${data.market_data.low_24h.eur}</p>`
      console.log(data)   
    } catch(error) {
        console.log("Fetch coin error -", error)
    }   
} 
getCoins()
*/

//background
async function setbackgroundImage(){
    try{
      const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
      const data = await res.json()
      const imgURL = data.urls.full
      const imgAuthor = data.user.name
      document.body.style.backgroundImage = `url(${imgURL})`;   
      document.getElementById("img-author").innerHTML = `<p>Photographer: ${imgAuthor}</p>`
    } catch(error) {
        console.log("Fetch background IMG error -", error)
    }   
} 
setbackgroundImage()

//to do list

const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createTask(task);
  });
}

// submit form
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = this.name;
  const inputValue = input.value;

  if (inputValue != "") {
    const task = {
      id: new Date().getTime(),
      name: inputValue,
      isCompleted: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(task);
    todoForm.reset();
  }
  input.focus();
});

// remove task
todoList.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("remove-task") ||
    e.target.parentElement.classList.contains("remove-task")
  ) {
    const taskId = e.target.closest("li").id;
    removeTask(taskId);
  }
});

// update task - change status or name
todoList.addEventListener("input", (e) => {
  const taskId = e.target.closest("li").id;
  updateTask(taskId, e.target);
});

// prevent new lines with Enter
todoList.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
});

// create task
function createTask(task) {
  const taskEl = document.createElement("li");
  taskEl.setAttribute("id", task.id);
  const taskElMarkup = `
    <div class="checkbox-wrapper">
      <input type="checkbox" id="${task.name}-${task.id}" name="tasks" ${
    task.isCompleted ? "checked" : ""
  }>
      
      <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
    </div>
    <button class="remove-task" title="Remove ${task.name} task">
    ✖️
    </button>
  `;
  taskEl.innerHTML = taskElMarkup;
  todoList.appendChild(taskEl);
  countTasks();
}

// remove task
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();
  countTasks();
}

// update task
function updateTask(taskId, el) {
  const task = tasks.find((task) => task.id === parseInt(taskId));

  if (el.hasAttribute("contentEditable")) {
    task.name = el.textContent;
  } else {
    const span = el.nextElementSibling.nextElementSibling;
    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
      span.removeAttribute("contenteditable");
      el.setAttribute("checked", "");
    } else {
      el.removeAttribute("checked");
      span.setAttribute("contenteditable", "");
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  countTasks();
}

function countTasks() {
  totalTasks.textContent = tasks.length;
  const completedTasksArray = tasks.filter((task) => task.isCompleted === true);
  completedTasks.textContent = completedTasksArray.length;
  remainingTasks.textContent = tasks.length - completedTasksArray.length;
}



//time
function getDateTime(){
    const today = new Date()
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    const date = today.toLocaleDateString("de-DE", options)
    const time = today.toLocaleTimeString("de-DE", {timeStyle: "medium"})
    document.getElementById("time").innerHTML =`<h1>${time}</h1>
                                                <p>${date}</p>`

}
   
setInterval(getDateTime, 1000)

//weather
navigator.geolocation.getCurrentPosition(pos => {
    async function getWeather(){
        const APIKey = "b0c6dd1560b603095aed754d5d1756d0"
        const APIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${APIKey}&units=metric`
      try{
        const res =  await fetch(APIUrl)
        const data = await res.json()
        const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        console.log(data)
        document.getElementById("weather").innerHTML = `<img src=${iconURL}><h2>${Math.round(data.main.temp)}°C `
        document.getElementById("location").textContent = `${data.name}`                                               
       
                                                       
      } catch (error) {
        console.log("error", error);
      } 
            
    } 
    getWeather()
});



//quote

async function getQuotes(){
  try{
    const res = await fetch("https://github.com/Qinisfighting/Assets-for-all/blob/main/quotes.json")
    const data = await res.json()
    let randomIndex = Math.floor(Math.random() * data.length);
    let quote = data[randomIndex]
    document.getElementById("quote").innerHTML=`<h3>${quote.q}</h3><p> - ${quote.a}</p>` 
  } catch(error) {
      console.log("Fetch coin error -", error)
  }   
} 
getQuotes()
