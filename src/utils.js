'use strict';

/**
 * Generates a random number of 12 digits.
 * @returns {number} The generated random number.
 */
function generateRandom() {
    let length = 12;
    let value = Math.random() * Math.pow(10, length);
    if (Math.floor(value / Math.pow(10, length - 1)) == 0) {
        value *= 10;
    }
    return Math.floor(value);
}

module.exports.random = generateRandom;
