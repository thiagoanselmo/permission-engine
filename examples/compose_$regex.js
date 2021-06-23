import PermissionEngine from '../lib/permissionEngine.js';

/**
 * @type {string[]} - user RBAC attributes
 */
const userRuleOne = ['actum:admin'];

/**
 * @type {{rule: [string]}} - Route schema compose
 */
const case$matchOne = {
  rule: [
    { $regex: /actum:.*\w*/ }
  ]
};

function caseOne() {
  console.time('timerOne');
  const permissionEngine = new PermissionEngine();
  const canAcess = permissionEngine.canAccess(userRuleOne, case$matchOne.rule);
  console.timeEnd('timerOne');
  console.log('Case one can access:', canAcess);
}

caseOne();





