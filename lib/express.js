
function wrapPromise(f) {
    return (req, res, next) => {
        f(req, res, next)
            .catch(next);
    }
}

module.exports.wrapPromise = wrapPromise;
