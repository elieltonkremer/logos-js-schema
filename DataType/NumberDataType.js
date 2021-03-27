const NativeDataType = require('./NativeDataType');
const ValidationError = require("./ValidationError");

class NumberDataType extends NativeDataType {

    async toJS(data, configuration) {
        data = await super.toJS(data, configuration);
        data = parseFloat(data)
        if (configuration.min > data) {
            throw new ValidationError(`value < ${configuration.min}`);
        }
        if (configuration.max < data) {
            throw new ValidationError(`value > ${configuration.max}`);
        }
        return parseFloat(data)
    }

    async toJSON(data, configuration) {
        data = await super.toJSON(data, configuration);
        data = parseFloat(data)
        if (configuration.min > data) {
            throw new ValidationError(`value < ${configuration.min}`);
        }
        if (configuration.max < data) {
            throw new ValidationError(`value > ${configuration.max}`);
        }
        return parseFloat(data)
    }
}

module.exports = NumberDataType;