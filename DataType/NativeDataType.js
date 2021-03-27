const AbstractDataType = require('./AbstractDataType');
const ValidationError = require("./ValidationError");

class NativeDataType extends  AbstractDataType {

    async toJS(data, configuration) {
        if (configuration.required === true && [null, undefined].includes(data) && !configuration.default) {
            throw new ValidationError('required value');
        }

        if ([null, undefined].includes(data) && configuration.default) {
            return await configuration.default();
        }
       return data;
    }

    async toJSON(data, configuration) {
        if (configuration.required === true && [null, undefined].includes(data) && !configuration.default) {
            throw new ValidationError('required value');
        }

        if ([null, undefined].includes(data) && configuration.default) {
            return await configuration.default();
        }
        return data;
    }
}

module.exports = NativeDataType;