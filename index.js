const { Container, ServiceResource, GroupResource } = require('logos');


module.exports = {
    container: new Container({
        'groups.data_type': new GroupResource(/^app.data_type./),
        'app.data_type': new ServiceResource(
            'logos-schema/DataType/DelegateDataType',
            [
                '%context%'
            ]
        ),
        'app.data_type.object': new ServiceResource(
            'logos-schema/DataType/ObjectDataType',
            [
                '%app.data_type%'
            ]
        ),
        'app.data_type.array': new ServiceResource(
            'logos-schema/DataType/ArrayDataType',
            [
                '%app.data_type%'
            ]
        ),
        'app.data_type.string': new ServiceResource(
            'logos-schema/DataType/StringDataType',
            []
        ),
        'app.data_type.number': new ServiceResource(
            'logos-schema/DataType/NumberDataType',
            []
        ),
        'app.data_type.date': new ServiceResource(
            'logos-schema/DataType/DateSchemaDataType',
            []
        ),
        'app.data_type.integer': new ServiceResource(
            'logos-schema/DataType/IntegerDataType',
            []
        )
    })
}