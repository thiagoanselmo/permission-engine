import PermissionEngine from '../lib/permissionEngine.js';

/**
 permissionEngine @type {string[]} - user RBAC attributes
 */
const userRuleOne = ['actum:partner', 'page:report:docx:reader', 'page:report:xlsx:reader'];
const userRuleTwo = ['page:report:xlsx:reader', 'page:report:docx:reader', 'page:report:pdf:reader'];
const userRuleThree = ['actum:partner', 'page:report:xlsx:reader', 'page:report:docx:reader', 'page:report:pdf:reader'];

/**
 * @type {{rule: [string]}} - Route schema compose
 */
const case$allOne = {
  rule: [
    {
      $and: [
        'actum:partner',
        {$nin: ['page:report:pdf:reader']},
        {$regex: /page:report:\w*:reader/}
      ]
    }
  ]
};

const case$allTwo = {
  rule: [
    {
      $and: [
        'actum:partner',
        {$nin: ['page:report:pdf:reader']},
        {$regex: /page:report:\w*:reader/}
      ]
    }
  ]
};

const case$allThree = {
  rule: [
    {
      $and: [
        'actum:partner',
        {$in: ['page:report:xlsx:reader', 'page:report:docx:reader']},
        {$nin: ['page:report:csv:reader']}
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

function caseThree() {
  console.time('timerThree');

  const permissionEngine = new PermissionEngine();
  const canAcess = permissionEngine.canAccess(userRuleThree, case$allThree.rule);

  console.timeEnd('timerThree');
  console.log('Case two can access:', canAcess);
}

const cases = [caseOne, caseTwo, caseThree];
cases.forEach(test => test())
