/**
 * Generates a random number of 12 digits.
 * @returns {number} The generated random number.
 */
function generateRandom() {
    var value = Math.random() * Math.pow(10, 12);
    if (Math.floor(value / Math.pow(10, 11)) == 0) {
        value *= 10;
    }
    return Math.floor(value);
}

module.exports = generateRandom;
