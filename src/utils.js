'use strict';

const length = 12;

/**
 * Generates a random number up to 12 digits.
 * @returns {number} The generated random number.
 */
function generateRandom() {
    return Math.floor(Math.random() * Math.pow(10, length));
}

module.exports.random = generateRandom;

/**
 * Pads the given number with leading zeros to get a 12 digits number.
 * @param {number} number The number to pad.
 * @returns {string} The zero padded number.
 */
function zeroPad(number) {
    let zeros = "";
    for (let i = 0; i < length; i++) {
        zeros += "0";
    }
    const zeroPadded = zeros + number;
    return zeroPadded.slice(-12);
}

module.exports.zeroPad = zeroPad;
