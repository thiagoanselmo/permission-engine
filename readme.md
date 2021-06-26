## Permission engine
> This is a permissions mechanism based on `RBAC` (roles), which can be incorporated into any `javascript` project. The return is always,
** true ** (has permission) or ** false ** (does not have access).

In the permissions check it only has **sync** functions, as we prioritize the speed of validations, so all **async** calls
must be done before passing to the validator.

### Install package

To install package use:

1. npm i permission-engine --save
2. yarn add permission-engine

### Types, which are fundamental in the search engine.
Para uma melhor entendimento, buscamos usar os mesmos operadores igual mongoDB, pois já é um uso comum da comunidade.

1. $in - Must contain at least one;
2. $nin - Must not contain any, $nin is sugar for $not;
3. $and - Must contain all;
4. $not - It must contain none;
5. $regex - Regular expression;

### Class Error `ErrorPermissionEngine`
This class to get error custom the `permission-engine` package

```javascript
    import PermissionEngine, { ErrorPermissionEngine } from '../lib/permissionEngine.js';

    const userRuleOne = [];
    const case$allOne = [{
        $and: [
            'actum:partner',
            {$nin: ['page:report:pdf:reader']},
            {$regex: /page:report:\w*:reader/}
        ]
    }];    
    
    console.time('timerOne');
    let canAccess = false;
    
    try {
        const permissionEngine = new PermissionEngine();
        canAccess = permissionEngine.canAccess(userRuleOne, case$allOne.rule);
    } catch (ex) {
        if (ex instanceof ErrorPermissionEngine) {
          console.error('Error!', ex.message);
          // output Error! Fail, roles or userRoles is empty, verify roles and try again
        } else {
          throw ex;
        }
     }
    
      console.timeEnd('timerOne');
      console.log('Case one can access:', canAccess, '\n');
```

#### `$in` Operator This is an operator that will return `true` if it matches any "role" the user contains.

##### Example 1

```javascript
    import PermissionEngine from 'permission-engine';

    const userPermission = ['actum:admin', 'page:client', 'page:client:create'];
    const routePermission =  [{
        $in: ['actum:admin']
    }];

    const permissionEngine = new PermissionEngine();
    const canAccess = permissionEngine.canAccess(userPermission, routePermission);
    // output true
```

##### Example 2
```javascript
    import PermissionEngine from 'permission-engine';

    const userPermission = [
        'actum:user', 'page:report:pdf:reader', 'page:report:xls:reader',
        'page:report:docx:reader', 'page:report:odt:reader'
    ];
    const routePermission =  [{
        $in: [
            'actum:partner',
            { $regex: /page:report:\w*:reader/ }
        ]
    }];

    const permissionEngine = new PermissionEngine();
    const canAccess = permissionEngine.canAccess(userPermission, routePermission);
    // output true
```

**Attention: The `$nin` operator follows the same principle as the `$in` operator but negates the expression.** 


#### `$and` operator this is an operator that will return `true` if it matches **all** rules.

##### Example 1
```javascript

    import PermissionEngine from 'permission-engine';

    const userPermission = ['actum:partner', 'page:report:xlsx:reader', 'page:report:docx:reader', 'page:report:pdf:reader'];
    const routePermission =  [{
      $and: [
        'actum:partner',
        {$in: ['page:report:xlsx:reader', 'page:report:docx:reader']},
        {$nin: ['page:report:csv:reader']}
      ]
    }]

    const permissionEngine = new PermissionEngine();
    const canAccess = permissionEngine.canAccess(userPermission, routePermission);
    // output true
```

**Attention: The `$not` operator follows the same principle as the `$and` operator, but negates the expression.**


### Use in projects 

This permission engine will be used to create an ACL plugin for:

* Vuejs (frontEnd) - [permission-vue](https://github.com/thiagoanselmo/permission-vue);
* Hapijs (Backend) - Wait for the link soon;
* Expressjs (Backend) - Wait for the link soon;