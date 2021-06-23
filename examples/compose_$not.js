import PermissionEngine from '../lib/permissionEngine.js';

/**
 permissionEngine @type {string[]} - user RBAC attributes
 */
const userRuleOne = ['actum:partner', 'page:report:docx:reader', 'page:report:xlsx:reader'];
const userRuleTwo = ['page:report:xlsx:reader', 'page:report:docx:reader', 'page:report:pdf:reader'];

/**
 * @type {{rule: [string]}} - Route schema compose
 */
const case$allOne = {
  rule: [
    {
      $not: [
        'actum:partner',
        {$nin: ['page:report:pdf:reader']}
      ]
    }
  ]
};

const case$allTwo = {
  rule: [
    {
      $not: [
        'actum:user',
        {$nin: ['page:report:pdf:create']},
        { $not: [ {$regex: /page:report:\w*:create/} ] }
      ]
    }
  ]
};


function caseOne() {
  console.time('timerOne');

  const permissionEngine = new PermissionEngine();
  const canAcess = permissionEngine.canAccess(userRuleOne, case$allOne.rule);

  console.timeEnd('timerOne');
  console.log('Case one can access:', canAcess, '\n');
}

function caseTwo() {
  console.time('timerTwo');

  const permissionEngine = new PermissionEngine();
  const canAcess = permissionEngine.canAccess(userRuleTwo, case$allTwo.rule);

  console.timeEnd('timerTwo');
  console.log('Case two can access:', canAcess, '\n');
}

const cases = [caseOne, caseTwo];
cases.forEach(test => test())
