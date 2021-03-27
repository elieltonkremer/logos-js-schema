const AbstractDataType = require('./AbstractDataType');
const NativeDataType = require('./NativeDataType');
const ValidationError = require("./ValidationError");


/**
 * @template AbstractDataType<Ob>
 */
class ObjectDataType extends NativeDataType {

    /**
     * @param {AbstractDataType} delegate
     */
    constructor(delegate) {
        super();
        this.delegate = delegate;
    }

    /**
     * @param {{}} data
     * @param {{}} configuration
     * @return {Promise<{}>}
     */
    async toJS(data, configuration) {
        data = await super.toJS(data, configuration);
        let js_data = {};
        let properties = configuration.properties || {};
        let errors = {};
        for (const field of Object.keys(properties)) {
            try {
                js_data[field] = await this.delegate.toJS(data[field], properties[field]);
            } catch (e) {
                let message = '';
                if (e instanceof ValidationError) {
                    message = e.message;
                } else {
                    message = e.toString();
                }
                if (message === 'required value') {
                    if (!configuration.partial) {
                        errors[field] = message;
                    }
                } else {
                    errors[field] = message;
                }
            }
        }
        if (Object.keys(errors).length !== 0) {
            throw new ValidationError(errors);
        }
        return js_data;
    }

    /**
     * @param {{}} data
     * @param {{}} configuration
     * @return {Promise<void>}
     */
    async toJSON(data, configuration) {
        data = await super.toJS(data, configuration);
        let js_data = {};
        let properties = configuration.properties || {};
        let errors = {};
        for (const field of Object.keys(properties)) {
            try {
                js_data[field] = await this.delegate.toJSON(data[field], properties[field]);
            } catch (e) {
                let message = '';
                if (e instanceof ValidationError) {
                    message = e.message;
                } else {
                    message = e.toString();
                }
                if (message === 'required value') {
                    if (!configuration.partial) {
                        errors[field] = message;
                    }
                } else {
                    errors[field] = message;
                }
            }
        }
        if (Object.keys(errors).length !== 0) {
            throw new ValidationError(errors);
        }
        return js_data;
    }
}

module.exports = ObjectDataType;
