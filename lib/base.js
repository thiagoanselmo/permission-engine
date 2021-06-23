class Base {
  constructor() {
    const self = this;

    self._allowedOperators = ['$in', '$nin', '$regex', '$and', '$not'];
  }

  /**
   * @description Verify if allow type
   * @param {object} value - Value to check
   * @return {boolean} - true or false
   * @private
   */
  _ruleTypeAllowed(ruleType) {
    const self = this;
    return self._allowedOperators.includes(ruleType);
  }

  /**
   * @description Verify if value is string
   * @param {object} value - Value to check
   * @return {boolean} - true or false
   * @private
   */
   _isString(value) {
    return typeof value === 'string'
  }

  /**
   * @description Verify if value is object
   * @param {object} value - Value to check
   * @return {boolean} - true or false
   * @private
   */
  _isObject(value) {
    return !Array.isArray(value) && typeof value === 'object'
  }

  /**
   * @description Verify if value is array
   * @param {any[]} value - Value to check
   * @return {boolean} - true or false
   * @private
   */
  _isArray(value) {
    return Array.isArray(value)
  }

  /**
   * @description Verify rule type
   * @param {string} type - Type to check, alloed (self._allowedOperators)
   * @param {object} rule - Rule to verify
   * @return {boolean} - true to has type
   * @private
   */
  _isRuleType(type, rule) {
    const self = this;

    try {
      return self._isObject(rule) && type in rule;
    } catch (ex) {
      throw ex;
    }
  }
}

export default Base;