const AbstractDataType = require('./AbstractDataType');
const NativeDataType = require('./NativeDataType');
const ValidationError = require("./ValidationError");


class ArrayDataType extends NativeDataType {

    /**
     * @param {ArrayDataType} delegate
     */
    constructor(delegate, context) {
        super(context);
        this.delegate = delegate;
    }


    async toJS(data, configuration) {
        data = await super.toJS(data, configuration);
        if (!Array.isArray(data)) {
            throw new ValidationError('not array value');
        }
        let new_array = [];
        let errors = {};
        for (let i=0; i < data.length; i++) {
            try {
                new_array.push(await this.delegate.toJSON(data[i], configuration.items));
            } catch (e) {
                if (e instanceof ValidationError) {
                    errors[i] = e.message;
                } else {
                    errors[i] = e.toString();
                }
            }
        }
        if (Object.keys(errors).length !== 0) {
            throw new ValidationError(errors);
        }
        return new_array;
    }

    async toJSON(data, configuration) {
        data = await super.toJSON(data, configuration);
        if (!Array.isArray(data)) {
            throw new ValidationError('not array value');
        }
        let new_array = [];
        let errors = {};
        for (let i=0; i < data.length; i++) {
            try {
                new_array.push(await this.delegate.toJSON(data[i], configuration.items));
            } catch (e) {
                if (e instanceof ValidationError) {
                    errors[i] = e.message;
                } else {
                    errors[i] = e.toString();
                }
            }
        }
        if (Object.keys(errors).length !== 0) {
            throw new ValidationError(errors);
        }
        return new_array;
    }
}

module.exports = ArrayDataType;