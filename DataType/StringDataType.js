const AbstractDataType = require('./AbstractDataType');
const NativeDataType = require('./NativeDataType');
const ValidationError = require("./ValidationError");


class StringDataType extends NativeDataType {

    async toJS(data, configuration) {
        data = await super.toJS(data, configuration);
        if (typeof data === "string") {
            data = data.trim();
            if (data === '' && configuration.empty === false) {
                throw new ValidationError('empty value');
            }
            if (configuration.choices) {
                let choices = configuration.choices;
                if (choices instanceof Function || choices instanceof (async function() {}).constructor) {
                    choices = await choices();
                }
                if (!Array.isArray(choices)) {
                    throw new ValidationError('invalid choices configuration');
                }

                if (choices.includes(data)) {
                    throw new ValidationError(`values not in ${choices}`);
                }

            } else {
                if (configuration.min_length > data.length) {
                    throw new ValidationError(`length < ${configuration.min_length}`);
                }
                if (configuration.max_length < data.length) {
                    throw new ValidationError(`length >  ${configuration.max_length}`);
                }
                if (configuration.pattern) {
                    let regex = new RegExp(configuration.pattern);
                    if (!data.match(regex)) {
                        throw new ValidationError(`invalid value for pattern "${configuration.pattern}"`);
                    }
                }
            }
        }
        return data;
    }

    async toJSON(data, configuration) {
        data = await super.toJSON(data, configuration);
        if (typeof data === "string") {
            data = data.trim();
            if (data === '' && configuration.empty === false) {
                throw new ValidationError('empty value');
            }
            if (configuration.choices) {
                let choices = configuration.choices;
                if (choices instanceof Function || choices instanceof (async function() {}).constructor) {
                    choices = await choices();
                }
                if (!Array.isArray(choices)) {
                    throw new ValidationError('invalid choices configuration');
                }

                if (!choices.includes(data)) {
                    throw new ValidationError(`values not in ${choices}`);
                }

            } else {
                if (configuration.min_length > data.length) {
                    throw new ValidationError(`length < ${configuration.min_length}`);
                }
                if (configuration.max_length < data.length) {
                    throw new ValidationError(`length >  ${configuration.max_length}`);
                }
                if (configuration.pattern) {
                    let regex = new RegExp(configuration.pattern);
                    if (!data.match(regex)) {
                        throw new ValidationError(`invalid value for pattern "${configuration.pattern}"`);
                    }
                }
            }
        }
        return data;
    }
}

module.exports = StringDataType;