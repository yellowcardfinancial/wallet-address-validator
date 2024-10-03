var cryptoUtils = require("./crypto/utils");

const regexp = new RegExp("^(EQ|UQ)[A-Za-z0-9_-]{48}$");

module.exports = {
    isValidAddress: function (address) {
        if (!regexp.test(address)) {
            // Check if it has the basic requirements of an address
            return false;
        }

        // Otherwise check each case
        // return this.verifyChecksum(address);

        return true;
    },

    // TODO: Figure out the checksum for ton addresses
    verifyChecksum: function (address) {
        // Check each case
        address = address.replace("0x", "");

        var addressHash = cryptoUtils.keccak256(address.toLowerCase());

        for (var i = 0; i < 40; i++) {
            // The nth letter should be uppercase if the nth digit of casemap is 1
            if (
                (parseInt(addressHash[i], 16) > 7 &&
                    address[i].toUpperCase() !== address[i]) ||
                (parseInt(addressHash[i], 16) <= 7 &&
                    address[i].toLowerCase() !== address[i])
            ) {
                return false;
            }
        }

        return true;
    },
};
