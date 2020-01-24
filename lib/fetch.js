const fetchAPI = require('node-fetch');
const path = require('path');

function fetchRaw (url, options) {
    return fetchAPI(url, options);
}

module.exports.fetchRaw = fetchRaw;
