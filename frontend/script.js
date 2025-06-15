function showSuggestions(cities) {
    suggestionsBox.innerHTML = '';

    if (cities.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    cities.forEach(city => {
        const div = document.createElement('div');
        div.textContent = `${city.name}, ${city.state || ''} ${city.country}`;
        div.style.padding = '8px';
        div.style.cursor = 'pointer';
        div.style.borderBottom = '1px solid #ccc';

        div.addEventListener('click', () => {
            input.value = city.name;
            suggestionsBox.innerHTML = '';
            suggestionsBox.style.display = 'none';
            searchCity(city.name);
        });

        suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = 'block';
}

function showInScreen(data) {
    document.querySelector(".city").innerHTML = "Tempo em: " + data.name
    document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C"
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
    document.querySelector(".humidity").innerHTML = "Umidade: " + data.main.humidity + "%"

}

async function searchCity(city) {
    let data = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`).then(response => response.json())
    showInScreen(data)
}

function clickButton() {
    let city = document.querySelector("input").value
    searchCity(city)
}

const input = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');

input.addEventListener('input', async () => {
    const query = input.value.trim();
    if (query.length < 2) {
        suggestionsBox.innerHTML = '';
        suggestionsBox.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/geo?q=${encodeURIComponent(query)}`)
        const cities = await response.json();

        showSuggestions(cities);
    } catch (err) {
        console.error(err);
    }
});