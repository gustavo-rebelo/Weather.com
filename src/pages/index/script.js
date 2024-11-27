// Variáveis e elementos
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const weatherIconElement = document.querySelector("#hours");
const descElement = document.querySelector("#description");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-container");

// Função para obter a chave da API
const getApiKey = async () => {
  try {
    const response = await fetch("https://weather-backend-production-7f33.up.railway.app/api-key"); 
    const data = await response.json();
    return data.apiKey; // Retorna a chave da API
  } catch (error) {
    console.error("Erro ao obter a API Key:", error);
    alert("Erro ao obter a chave de API. Verifique a conexão com o backend.");
  }
};

// Função para obter os dados do clima usando a chave da API
const getWeatherData = async (city) => {
  const apiKey = await getApiKey(); // Obtém a chave da API dinamicamente do backend
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherUrl); // Requisição para a API do OpenWeatherMap
  const data = await res.json();
  return data;
};

// Função para exibir os dados do clima no frontend
const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  windElement.innerText = `${data.wind.speed}Km/h`;
  humidityElement.innerText = `${data.main.humidity}%`;

  weatherContainer.classList.remove("hide");
};

// Eventos

// Quando o botão de pesquisa for clicado
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  if (city) {
    showWeatherData(city); // Exibe os dados da cidade
  }
});

// Evento para ocultar o container quando o input estiver vazio
cityInput.addEventListener("input", () => {
  if (cityInput.value.trim() === "") {
    weatherContainer.classList.add("hide");
  }
});

// Evento para buscar os dados ao apertar 'Enter'
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
      showWeatherData(city); // Exibe os dados da cidade
    }
  }
});
