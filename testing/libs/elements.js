/**
 * Created on 09.01.2024
 */

module.exports = Object.freeze({
    ENDPOINTS: {
        CARD_TITLE: "//h2[contains(@class,'Card-Title')]",
    },
    BUTTONS: {
        BUTTON_WITH_SPAN_ADD: "//button[child::span[text()='Add']]",
        REFRESH_BUTTON: "//button[contains(@class,'icon-loop')]",
        DROP_DOWN_HANDLE: "//button[contains(@id,'DropdownHandle')]",
        actionButton: (label) => `//button[contains(@id,'ActionButton') and child::span[contains(.,'${label}')]]`,
        button: (label, cssValue) => `//button[contains(@class,'${cssValue}') and child::span[contains(.,'${label}')]]`,
        dialogButton: label => `//button[contains(@id,'DialogButton') and child::span[contains(.,'${label}')]]`,
        dialogButtonStrict: label => `//button[contains(@id,'DialogButton') and child::span[text()='${label}']]`,
    },
});
