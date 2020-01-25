const fetch = require('node-fetch');

function formatResultPromise(fetchPromise) {
    return new Promise((resolve, reject) => {
        fetchPromise
            .then(response => {
                if (response.ok) {
                    resolve({
                        response: response,
                        json: response.json(),
                    });
                } else {
                    reject({
                        isAPIError: true,
                        response: response,
                        error: response.text(),
                        status: response.status,
                    });
                }
            })
            .catch(error => {
                reject({
                    isConnectionError: true,
                    error: error,
                });
            });
    })
}

function fetchRestAPI (url, options) {
    return formatResultPromise(fetch(url, options));
}

module.exports = fetchRestAPI;
