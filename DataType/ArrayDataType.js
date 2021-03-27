const AbstractDataType = require('./AbstractDataType');
const NativeDataType = require('./NativeDataType');
const ValidationError = require("./ValidationError");


class ArrayDataType extends NativeDataType {

    /**
     * @param {ArrayDataType} delegate
     */
    constructor(delegate) {
        super();
        this.delegate = delegate;
    }


    async toJS(data, configuration) {
        data = await super.toJS(data, configuration);
        if (!Array.isArray(data)) {
            throw new ValidationError('not array value');
        }
        let new_array = [];
        for (let item of data) {
            new_array.push(await this.delegate.toJS(item, configuration.items));
        }
        return new_array;
    }

    async toJSON(data, configuration) {
        data = await super.toJSON(data, configuration);
        if (!Array.isArray(data)) {
            throw new ValidationError('not array value');
        }
        let new_array = [];
        for (let item of data) {
            new_array.push(await this.delegate.toJSON(item, configuration.items));
        }
        return new_array;
    }
}

module.exports = ArrayDataType;