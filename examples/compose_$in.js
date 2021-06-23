import PermissionEngine from '../lib/permissionEngine.js';

/**
 * @type {string[]} - user RBAC attributes
 */
const userRuleOne = ['page:report:xlsx:reader'];
const userRuleTwo = ['page:report:xlsx:reader', 'page:report:docx:reader', 'page:report:pdf:reader'];

/**
 * @type {{rule: [string]}} - Route schema compose
 */
const case$inOne = {
  rule: [
     {
      $in: [
        'page:report:xlsx:reader',
        'page:report:docx:reader'
      ]
    }
  ]
};

const case$inTwo = {
  rule: [
    {
      $in: [
        'actum:partner',
        { $match: /page:report:\w*:reader/ }
      ]
    }
  ]
};

function caseOne() {
  console.time('timerOne');

  const permissionEngine = new PermissionEngine();
  const canAcess = permissionEngine.canAccess(userRuleOne, case$inOne.rule);

  console.timeEnd('timerOne');
  console.log('Case one can access:', canAcess, '\n');
}

function caseTwo() {
  console.time('timerTwo');

  const permissionEngine = new PermissionEngine();
  const canAcess = permissionEngine.canAccess(userRuleTwo, case$inTwo.rule);

  console.timeEnd('timerTwo');
  console.log('Case two can access:', canAcess);
}

const cases = [caseOne, caseTwo];
cases.forEach(test => test())





