/**
 * Created  on 09.01.2024
 */
module.exports = Object.freeze({
    //waitForTimeout
    mediumTimeout: 3000,
    longTimeout: 7000,
    shortTimeout: 2000,
    TIMEOUT_1: 1000,
    DELETE_COOKIE_TIMEOUT: 20000,
    INSTALL_APP_TIMEOUT: 30000,
    TIMEOUT_SUITE: 180000,

    generateRandomName (part) {
        return part + Math.round(Math.random() * 1000000);
    },

});
