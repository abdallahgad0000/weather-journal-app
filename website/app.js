/* Global Variables */
// api base url
const baseUrl = "api.openweathermap.org/data/2.5/weather";
const apiKey = "3e9bffd00fec0d486931f5a262fe57fb";

// function that makes the url dynamically
function makeUrl(zip) {
  return `http://${baseUrl}?zip=${zip},us&appid=${apiKey}&units=metric`;
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear();

// self invoked function that display current date 
(()=>{
  document.getElementById("currentDate").innerHTML = `current date: ${newDate}`;
})();

// POST function that add data to the app
const postData = async (url = "", data = {}) => {
  const response = fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await await response;
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// GET function that get data from the app
const getData = async (url = "") => {
  const response = fetch(url);
  try {
    const data = await (await response).json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// function that update the ui of index.html by the last element added to the app
const updateUi = async () => {
  let data = await getData("/getDate");
  document.getElementById("date").innerHTML = data[data.length - 1].date;
  document.getElementById("temp").innerHTML = data[data.length - 1].temperature +"°C";
  document.getElementById("content").innerHTML =
    data[data.length - 1].userResponse;
};

// function that update the ui of index.html to add the new weather data
const updateWeather = async (data) => {
  document.getElementById("weatherResults").innerHTML = `
    <p>country: usa</p>
    <p>city: ${data.name}</p>
    <p>temperature: ${data.main.temp} °C </p>
    <p>weather description: ${data.weather[0].description}</p>
  `;
};

//  an event listener for the element with the id: generate, with a callback function to execute when it is clicked
document.getElementById("generate").addEventListener("click", async () => {
  let zip = document.getElementById("zip").value;
  let data = await getData(makeUrl(zip)).then(async (data) => {
    if (data != undefined) {
      if (data.message) {
        document.getElementById("msg").innerHTML = `${data.message}`;
      } else {
        document.getElementById("msg").innerHTML =``;
        let feelings = document.getElementById("feelings").value;
        postData("/addData", {
          temperature: ` temperature: ${data.main.temp}`,
          userResponse: ` user feelings: ${feelings}`,
          date: ` date: ${newDate}`,
        }).then(() => {
          updateUi();
          updateWeather(data);
        });
      }
    } else {
      document.getElementById("msg").innerHTML = `can't fetch the data `;
    }
  });
});
