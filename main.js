async function fetchEarthquakeData(countryCode) {
    try {
        const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2024-12-31&minmagnitude=5`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const filteredData = data.features.filter(item => item.properties.place && item.properties.place.toUpperCase().includes(countryCode.toUpperCase()));
        displayEarthquakeData(filteredData);
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
    }
}

function displayEarthquakeData(earthquakes) {
    const earthquakeContainer = document.getElementById('earthquakeContainer');
    earthquakeContainer.innerHTML = '';
    if (earthquakes.length === 0) {
        earthquakeContainer.innerHTML = '<p>No recent significant earthquakes found for this country.</p>';
        return;
    }
    earthquakes.forEach(earthquake => {
        const earthquakeElement = document.createElement('div');
        earthquakeElement.classList.add('earthquake-item');
        earthquakeElement.innerHTML = `
            <h3>${earthquake.properties.place}</h3>
            <p><strong>Magnitude:</strong> ${earthquake.properties.mag}</p>
            <p><strong>Time:</strong> ${new Date(earthquake.properties.time).toLocaleString()}</p>
            <p><strong>Details:</strong> <a href="${earthquake.properties.url}" target="_blank">More info</a></p>
        `;
        earthquakeContainer.appendChild(earthquakeElement);
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const countryCode = document.getElementById('countryCodeInput').value;
    fetchEarthquakeData(countryCode);
});

document.getElementById('Chinabutton').addEventListener('click', () => {
    fetchEarthquakeData("China");
});


document.getElementById('Indonesiabutton').addEventListener('click', () => {
    fetchEarthquakeData("Indonesia");
});

document.getElementById('Iranbutton').addEventListener('click', () => {
    fetchEarthquakeData("Iran");
});

document.getElementById('Japanbutton').addEventListener('click', () => {
    fetchEarthquakeData("Japan");
});

document.getElementById('UnitedStatesbutton').addEventListener('click', () => {
    fetchEarthquakeData("UnitedStates");
});


const countrySelector = document.getElementById('country-selector');
const earthquakeContainer = document.getElementById('earthquake-container');

const countries = {
    'USA': 'us',
    'Japan': 'jp',
    'Mexico': 'mx',
    'Indonesia': 'id',
    'Chile': 'cl',
    'Alaska': 'ak'
};
