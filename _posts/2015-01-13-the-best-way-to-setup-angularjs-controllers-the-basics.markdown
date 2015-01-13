---
layout: post
title: "The Best Way to Setup AngularJS Controllers: The Basics"
summary: "Most AngularJS tutorials lead new developers down a dark and narrow path. Once your app has more than a few controllers and templates, things start to break down and you'll end up refactoring the entire application."
---
This article focuses on the basics of setting up an angular application and a controller with dependency injection.

<div class="notice general">
<p>Bookmark John Papa's <a href="https://github.com/johnpapa/angularjs-styleguide">AngularJS Style Guide</a> Now!</p>
</div>

##Getting Setup

To get started, we'll create our html file (index.html). There's nothing special about this file except you'll notice the `ng-app` attribute on the `html` element which tells Angular we want to use the entire document as our application, and the `ng-controller` attribute on the `div` element which tells Angular that we want to use a controller for the contents of that element.

```
<!doctype html>
<html ng-app="app">
    <head>
        <meta charset="utf-8">
        <title>Angular Controller Demo</title>
    </head>
    <body>

        <div ng-controller="MyController">
            <span></span>
        </div>

        <script src="angular.js"></script>
        <script src="app.js"></script>
    </body>
</html>
```

Now we'll create our angular application (app.js).

```
(function () {
    'use strict';

    angular.module('app', []);
})();
```

###The Controller
Now that we have the basic application configured, let's walk through setting up a controller.

In the `app.js` file, let's create our controller.

```
(function () {
    'use strict';

    angular.module('app', [])
        .controller('MyController', My Controller);

    function MyController () {

    }

})();
```

Notice that we're hanging the controller directly off the instantiation of the `app` module. But, what if we want to inject a service into our controller? We have two options if we want to use [dependency injection](https://code.angularjs.org/1.3.8/docs/guide/di).

####DI Option #1: In-line Injection

We'll want to avoid this type of dependency injection as it's not very clear what is happening to someone less familiar with Angular. Notice the array that starts with a collection of strings referring to our injected services and ending with our controller. Example:

```
(function () {
    'use strict';

    angular.module('app', [])
        .controller('MyController', ['myService', My Controller]);

    function MyController (myService) {

    }

})();
```

####DI Option #2: [Manual Injection](https://github.com/johnpapa/angularjs-styleguide#manually-identify-dependencies)

Using Angular's `$inject` method, we can explicitly declare our dependencies. We'll want to detach our controller from the main app so we can move it to it's own file or another closure.

```
(function () {
    'use strict';

    angular.module('app', []);

    // Set up the controller
    angular.module('app')
        .controller('MyController', MyController)

    // Inject dependencies
    MyController.$inject('myService');

    // Controller
    function MyController (myService) {

    }

})();
```

If you are wondering why we would write more code than necessary and separating our controller from our injections and from our app, we're doing this so our code can be more maintainable and intentional. We avoid being clever in favor of making our code readable and digestable for the next developer, or our future selves.
