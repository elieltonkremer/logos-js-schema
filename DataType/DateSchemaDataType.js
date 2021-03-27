const NativeDataType = require('./NativeDataType');
const ValidationError = require("./ValidationError");
const moment = require('moment');

moment.suppressDeprecationWarnings = true;

class DateSchemaDataType extends NativeDataType {

    /**
     * @param {Date|*} data
     * @param {{}} configuration
     * @return {Promise<string>}
     */
    async toJSON(data, configuration) {
        data = await super.toJSON(data, configuration);
        if (data) {
            if (configuration.format) {
                return moment(data).format(configuration.format);
            } else {
                return moment(data).toISOString();
            }
        }
        return data;
    }

    /**
     * @param {String} data
     * @param {{}} configuration
     * @return {Promise<Date>}
     */
    async toJS(data, configuration) {
        data = await super.toJS(data, configuration);
        if (data) {
            data = moment(data, configuration.format).toDate();
            if (data.toString() === 'Invalid Date') {
                throw new ValidationError(data.toString())
            }
            return data;
        }
        return data;
    }

}

module.exports = DateSchemaDataType;