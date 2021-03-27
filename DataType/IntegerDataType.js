const NumberDataType = require('./NumberDataType');


class IntegerDataType extends NumberDataType {

    async toJS(data, configuration) {
        return parseInt(await super.toJS(data, configuration));
    }

    async toJSON(data, configuration) {
        return parseInt(await super.toJSON(data, configuration));
    }
}

module.exports = IntegerDataType;