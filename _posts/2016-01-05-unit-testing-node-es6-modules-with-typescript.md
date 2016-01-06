---
layout: post
title: "Unit Testing Node ES6 Modules with TypeScript"
summary: "Just when you think you've got TypeScript figured out and are using es6 (es2015) module loading you discover your unit tests fail. Don't worry. It's not you, it's Mocha."
path: 2016-01-05-unit-testing-node-es6-modules-with-typescript.md
---
This just a quick note to give you some direction on how to enable ES6 module loading within your TypeScript files while keeping your unit tests from throwing errors.

First, you'll need to be ok with using the babel compiler. While it won't be used for your production code, the babel compiler with the es2015 preset essentially down-samples your code to es5 so mocha can run it.

### 1. Install the required dependencies:

```
    npm install babel-register babel-preset-es2015 --save-dev
```

### 2. Create _**.babelrc**_ in the root of your project

```
    {
        "presets": ["es2015"]   
    }
```

### 3. Update the _**test**_ task in _**package.json**_

```
    {
        "scripts": {
            "test": "mocha test --compilers js:babel-register"
        }
    }
```

## What Does an ES6 Module Look Like?

A regular-ol-commonjs module looks like this:

{% highlight javascript %}
    // module.js
    // ---------
    'use strict';
    module.exports = {
        log: function() {
            console.log('logging');    
        }    
    }
{% endhighlight %}

The same thing in TypeScript would look like this:

{% highlight javascript %}
    // module.ts
    // ---------
    'use strict';
    export = {
        log: function() {
            console.log('logging');    
        }    
    }
{% endhighlight %}

But we're not talking about those boring regular-ol-commonjs modules. We're talking about **ES6 modules**!:

{% highlight javascript %}
    // module.ts
    // ---------
    'use strict';
    export default {
        log: function() {
            console.log('logging');    
        }    
    }
{% endhighlight %}

See the _default_ keyword? Yeah. That's an ES6 module.

And we import that guy like this:

{% highlight javascript %}
    // index.ts
    // --------
    'use strict';
    import module from './module';
    module.log(); // logging
{% endhighlight %}

## When External Modules Break Your Tests

Some modules aren't compatible with ES6 module loading. Because of this you _must_ require the module instead of importing it.

{% highlight javascript %}
    // mytest.ts
    // ---------
    import * as chai from 'chai';
    var chaiAsPromised = require('chai-as-promised'); // Not ES6 compatible
{% endhighlight %}

## Conclusion...

JavaScript is full of breaking changes! Be aware. Lock down your dependencies. The future is dangerous!

## Comments / Questions?

Leave them below.