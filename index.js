// Global variables
const apiKey = 'rcskT5ugVFhgBjHYUGSvLgdEiolk0T0J21qv6nmF';
let endpointUrl = 'https://developer.nps.gov/api/v1/parks';

//Format query parameters
function formatQueryParameters(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

// Render park data to DOM
function renderToDom(responseJson, maxNumber) {
  $('.resultsList').empty();
  for (let i=0; i<responseJson.data.length && i < maxNumber; i++) {
    $('.resultsList').append(`
    <li><h3><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].fullName}</a></h3>
    <p class="background-light bold">${responseJson.data[i].description}"</p>
    `)
  }
  $('.resultsArea').show();
}

// Get data from National Parks API
function getParkData(query, resultsNumber) {
  const params = {
    stateCode: query,
    limit: resultsNumber,
    api_key: apiKey
  };
  const queryString = formatQueryParameters(params);
  const url = endpointUrl + "?" + queryString;
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
  }})
  .then(responseJson => renderToDom(responseJson, resultsNumber))
  .catch(error => {
    alert(`Something went wrong: ${error.message}`);
  });
  }

// Listens for form submit to start the app
function startApp() {
  $('.inputForm').submit(event => {
    event.preventDefault();
    const userStateQuery = $('#userStateInput').val().split(',');
    const userResultsNumber = $('#userResultsNumberInput').val();
    getParkData(userStateQuery, userResultsNumber);
  })
}

$(startApp);
