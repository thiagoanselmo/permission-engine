import Base from './base.js';

class PermissionEngine extends Base {

  constructor() {
    super();
  }

  /**
   * @description Run rule $regex
   * @param {string} match - Regex to match in user attributes
   * @param {string[]} userRoles - User attributes
   * @return {boolean} - true match attributes or false not match
   * @private
   */
  _ruleType$regex(match, userRoles) {
    try {
      return userRoles.some(attribute => match.test(attribute));
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Run rules $in allow (string or $regex)
   * @param {any[]} rolesData - Array with attributes to exec
   * @param {string[]} userRoles - User attributes
   * @return {boolean} - true match permission or false not match
   * @private
   */
  _ruleType$in(rolesData, userRoles) {
    const self = this;

    try {
      return rolesData.some(rule => {
        if(self._isString(rule)) return userRoles.includes(rule);
        else if (self._isRuleType('$regex', rule)) return self._ruleType$regex(rule.$regex, userRoles);
        else throw new Error(`Rule ${JSON.stringify(rule)} not allow`);
      });
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Run rules $and
   * @param {any[]} rolesData - Array with attributes to exec
   * @param {string[]} userRoles - User attributes
   * @return {boolean} - true match permission or false not match
   * @private
   */
  _ruleType$and(rolesData, userRoles) {
    const self = this;

    try {
      return rolesData.every(rule => {
        if(self._isString(rule)) return userRoles.includes(rule);
        else if (self._isRuleType('$in', rule)) return self._ruleType$in(rule.$in, userRoles);
        else if (self._isRuleType('$nin', rule)) return !self._ruleType$in(rule.$nin, userRoles);

        else if (self._isRuleType('$and', rule)) return self._ruleType$and(rule.$and, userRoles);
        else if (self._isRuleType('$not', rule)) return !self._ruleType$and(rule.$not, userRoles);

        else if (self._isRuleType('$regex', rule)) return self._ruleType$regex(rule.$regex, userRoles);
        else throw new Error(`Rule ${JSON.stringify(rule)} not allow`);
      });
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Run rules simple permission
   * @param {string} rolesData - String with attribute name
   * @param {string[]} userRoles - User attributes
   * @return {boolean} - true match permission or false not match
   * @private
   */
  _ruleSimple(rolesData, userRoles) {
    const self = this;

    try {
      const setNewRule = { $in: [rolesData] };
      const hasPermission = self._ruleCompose(setNewRule, userRoles);
      return hasPermission;

    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Run rules simple compose
   * @param {object} rule - rule data
   * @param {string[]} userRoles - User attributes
   * @return {boolean} - true match permission or false not match
   * @private
   */
  _ruleCompose(rule, userRoles) {
    const self = this;

    try {
      const [ruleType] = Object.keys(rule);

      if (!self._ruleTypeAllowed(ruleType)) throw new Error('Rule type not allow!')

      const rolesData = rule[ruleType];
      const hasPermission = {
        'type_$in': () =>  self._ruleType$in(rolesData, userRoles),
        'type_$nin': () =>  !self._ruleType$in(rolesData, userRoles),

        'type_$and': () =>  self._ruleType$and(rolesData, userRoles),
        'type_$not': () =>  !self._ruleType$and(rolesData, userRoles),

        'type_$regex': () =>  self._ruleType$regex(rolesData, userRoles),
      };

      return hasPermission[`type_${ruleType}`]();

    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Check if params exist and not empty
   * @param {string[]} userRoles - User roles
   * @param {object[]} roles - Roles
   * @return {boolean}
   * @private
   */
  _checkRoles(userRoles, roles) {
    const self = this;
    try {
      const userAttrIsValid = self._isArray(userRoles) && userRoles.length > 0;
      const rolesIsValid = self._isArray(roles) && roles.length > 0;

      if (!userAttrIsValid || !rolesIsValid) throw new Error('Roles not valid, verify roles and try again');
      return true;

    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description engine to run all rules
   * @param {string[]} userRoles - User attributes
   * @param {object[]} rules - rules to exec
   * @return {boolean} - true match permission or false not match
   * @private
   */
  canAccess(userRoles, rules) {
    const self = this;

    try {
      self._checkRoles(userRoles, rules);

      const allPermission = [];

      for (const rule of rules) {
        let hasPermission = false;

        if (self._isString(rule)) hasPermission = self._ruleSimple(rule, userRoles);
        else if (self._isObject(rule)) hasPermission = self._ruleCompose(rule, userRoles);
        else console.error(`Rule type ${typeof rule} not allow`);

        allPermission.push(hasPermission);
      }

      return [...new Set(allPermission)].every(permission => permission);

    } catch (ex) {
      console.error('Fail in method canAccess', ex.name || 'not have name', ex.message || 'not have message')
      throw ex;
    }
  }
}

export default PermissionEngine;