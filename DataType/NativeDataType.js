const AbstractContainer = require('logos/Context/AbstractContainer');
const AbstractDataType = require('./AbstractDataType');
const ValidationError = require("./ValidationError");

class NativeDataType extends  AbstractDataType {

    /**
     * @param { AbstractContainer } context
     */
    constructor(context) {
        super();
        this.context = context;
    }

    async toJS(data, configuration) {
        if (configuration.required === true && [null, undefined].includes(data) && !configuration.default) {
            throw new ValidationError('required value');
        }

        if ([null, undefined].includes(data) && configuration.default) {
            return await configuration.default(this.context);
        }
       return data;
    }

    async toJSON(data, configuration) {
        if (configuration.required === true && [null, undefined].includes(data) && !configuration.default) {
            throw new ValidationError('required value');
        }

        if ([null, undefined].includes(data) && configuration.default) {
            return await configuration.default(this.context);
        }
        return data;
    }
}

module.exports = NativeDataType;