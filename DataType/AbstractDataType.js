/**
 * @template T
 * @template E
 */
class AbstractDataType {

    static singleton = false;

    /**
     * @param {T} data
     * @param {{}} configuration
     * @return {Promise<E>}
     */
    async toJS(data, configuration) {
        throw new Error('Please implement it!');
    }

    /**
     * @param {E} data
     * @param {{}} configuration
     * @return {Promise<T>}
     */
    async toJSON(data, configuration) {
        throw new Error('Please implement it!');
    }

}

module.exports = AbstractDataType;
