const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json'); //Promise of ip data (JSON string)
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);//promise of coordinates (JSON string)
};

const fetchISSFlyOverTimes = function(body) {
  const { lat, lon } = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`);//promise of fly over data (JSON string)
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;// promise for ISS data based on location
    });
};

module.exports = { nextISSTimesForMyLocation };