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

async function bulkRestAPI(urlAndOptions = []) {
    const promises = urlAndOptions.map(args => {
        const [url, options] = args;
        return formatResultPromise(fetch(url, options));
    });

    const results = [];
    let fails = false;
    for(let promise of promises) {
        try {
            const result = await promise;
            results.push(result);
        } catch (e) {
            fails = true;
            results.push(e);
        }
    }

    if (fails) {
        throw fails;
    }

    return results;
}

module.exports.fetchRestAPI = fetchRestAPI;

module.exports.bulkRestAPI = bulkRestAPI;
