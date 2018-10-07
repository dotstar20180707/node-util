module.exports.lowerAlphabets = 'abcdefghijklmnopqrstuvwxyz';
module.exports.upperAlphabets = this.lowerAlphabets.toUpperCase();
module.exports.numbers = '0123456789';

const defaultSet =
    this.lowerAlphabets +
    this.upperAlphabets +
    this.numbers;
module.exports.string = (length, set = defaultSet) => {
    const setLength = set.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += set[Math.floor(Math.random() * setLength)];
    }
    return result;
};

module.exports.integer = (from = 0, to = Number.MAX_SAFE_INTEGER) => {
    return Math.random()*(to - from)+from;
};

module.exports.boolean = () => {
    return this.element([true, false]);
};

module.exports.element = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

module.exports.elements = (source, count) => {
    let array = source.concat();

    for(let i = array.length - 1; i > 0; i--){
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }

    return array.slice(0, count);
};
