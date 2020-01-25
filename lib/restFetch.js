const fetch = require('node-fetch');

function formatResultPromise(fetchPromise) {
    return new Promise((resolve, reject) => {
        fetchPromise
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(json => {
                            resolve({
                                response: response,
                                json,
                            });
                        })
                        .catch(error => {
                            reject({
                                isParseError: true,
                                response: response,
                                error,
                            })
                        });
                } else {
                    response.text()
                        .then(text => {
                            reject({
                                isAPIError: true,
                                response: response,
                                error: text,
                                status: response.status,
                            });
                        })
                        .catch(error => {
                            reject({
                                isParseError: true,
                                response: response,
                                error,
                            })
                        })
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
