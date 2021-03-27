const AbstractDataType = require('./AbstractDataType');
const AbstractContainer  = require('logos/Context/AbstractContainer');

class DelegateDataType extends  AbstractDataType {

    /**
     * @param {AbstractContainer} context
     */
    constructor(context) {
        super();
        this.context = context;
    }

    /**
     * @param {{type: String}} configuration
     * @return {AbstractDataType}
     */
    resolve_data_type(configuration) {
        return this.context.get(`app.data_type.${configuration.type}`);
    }

    async toJS(data, configuration) {
        return await this.resolve_data_type(configuration).toJS(data, configuration);
    }

    async toJSON(data, configuration) {
        return await this.resolve_data_type(configuration).toJSON(data, configuration);
    }
}

module.exports = DelegateDataType;