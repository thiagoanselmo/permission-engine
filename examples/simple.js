
import PermissionEngine from '../lib/permissionEngine.js';

/**
 * @type {string[]} - user RBAC attributes
 */
const userRule = ['actum:admin'];

/**
 * @type {{rule: [string]}} - Route schema simple
 */
const simple = {
  rule: ['actum:admin']
};

function caseOne() {
  console.time('timerOne');
  const permissionEngine = new PermissionEngine();
  const canAcess = permissionEngine.canAccess(userRule, simple.rule);
  console.timeEnd('timerOne');
  console.log('Can access:', canAcess);
}

caseOne();





