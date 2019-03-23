---
date: '2015-05-20'
title: "The Difference Between Angular's $http and $resource Services"
summary: "I tend to stick with the $http service as it works well and has no suprises. But, I can see the allure of the $resource service. Here's a really brief demo."
path: 2015-05-19-angular-ngrepeat-and-ngoptions-comparison.md
---

These two services accomplish the same job: **send and retrieve data from an API.**

And they both return a promise. So, why would you choose one over the other?

### $http [[documentation](https://docs.angularjs.org/api/ng/service/$http)]

Here's a quick example of how you might use the `$http` service:

```js
var users; // A place to store our data

// Setup the request.
var myHttpPromise = $http.get('users');

// Call the request.
myHttpPromise.then(function(response) {
	// Handle the response.
	users = response.data;
});
```

If our API returns an Array of users then we are all set. If we want to do something when there's an error we'll need to handle the promise a bit differently.

```js
myHttpPromise.success(function(response) {
	users = response.data;
}).error((reason) {
	console.log(reason);
});
```

We could accomplish the same thing like this:

```js
myHttpPromise.then(function(response) {
	users = response.data;
}, function(reason) {
	console.log(reason);
});
```

And because this is a promise, it's "thenable" - meaning you can chain more requests in sequence:

```js
myHttpPromise.then(function(response) {
	users = response.data;
}, function(reason) {
	console.log(reason);
}).then(function() {
	// Do something else
})
```

### $resource [[documentation](https://docs.angularjs.org/api/ngResource/service/$resource)]

Here's a quick example of how you might user the `$resource` service:

```js
var MyResource = $resource('/users/:userId', { userId:'@userId' });

var getUser = function (userId) {
	return MyResource.get({ userId: userId }).$promise;
}
```

`MyResource` is defined once and can be used throughout your controller/service to `get`, `save`, `update`, `query`, `remove` and `delete`. The nice thing about the `$resource` is that it has all of the convenience methods built in. The downside is you have to define your parameters upfront.

Here's a demo showing both methods.

<p data-height="404" data-theme-id="6649" data-slug-hash="BNzXeE" data-default-tab="result" data-user="kenhowardpdx" class='codepen'>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/BNzXeE/'>$resource vs. $http - to the death!</a> by Ken Howard (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>