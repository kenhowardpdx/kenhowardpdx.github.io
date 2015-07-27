---
layout: post
title: "Angular controllerAs with TypeScript Classes"
summary: "Writing an Angular controller using the controllerAs syntax has helped improve our code and nearly eliminate the need to inject $scope. This post will go over writing your controllers as classes in TypeScript to take that concept to the next level."
path: 2015-07-26-angular-controlleras-with-typescript-classes.md
---

If you don't already know what it means to use the `controllerAs` syntax I suggest you read [AngularJS: "Controller as" or "$scope"?](http://codetunnel.io/angularjs-controller-as-or-scope/) first.

A lot of talk is happening around Angular 2 and what our code will look like in the future. With [TypeScript](http://www.typescriptlang.org/) or [Babel](https://babeljs.io/) you can get your code ready today by using [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) that are part of the ES6 (ES2015) Spec.

For the un-initiated, a class has properties, methods and a constructor. Classes can be extended.

{% highlight javascript %}
class Mammal {
	hairColor = null;
	breath() {
		// Something all Mammals do
	}
	constructor(hairColor) {
		this.hairColor = hairColor;
	}
}

class Dog extends Mammal {
	bark() {
		// Something only Dogs do
		console.log('Woof!');
	}
	constructor(hairColor) {
		super(hairColor);
	}
}

var WonderDog = new Dog('black');
WonderDog.bark();
{% endhighlight %}

You'll notice above that there's a Mammal. Because all Mammals have hair we've got a `hairColor` property. And, because all Mammals breath we have a method aptly named `breath`. Then we extended that class by creating a new class called `Dog`. And finally we have `WonderDog` who is a Dog with black hair and is barking.

Now on to Angular and writing your controllers with classes in TypeScript.

Let's look at what a controller looks like with a constructor function (likely what you are using today):

{% highlight javascript %}
MyController.$inject = ['MyService']; // safely handling dependency injection to avoid minification issues
function MyController(MyService) {
	var _this = this;
	_this.username = null;
	_this.password = null;
	
	_this.login() {
		if (_this.username && _this.password) {
			MyService.login(_this.username, _this.password).then(function () {
				// Do something when things go right.
			}, function () {
				// Do something when things go wrong.
			});
		} else {
			// Hey, user... you're not doing it right.
		}
	}
}
{% endhighlight %}

The `_this` variable assignment becomes handy when you need to access controller properties within functions. If we had tried targeting `this` (without the underscore) we wouldn't be in the correct scope. Both `username` and `password` would be `undefined`. And if you wanted to have a function that didn't get exposed to your template then you'd leave it off of `_this`:

{% highlight javascript %}
function MyController(MyService) {
	...
	_this.hashedPassword = _hashPassword(_this.password);
	
	function _hashPassword () {
		...
	}
}
{% endhighlight %}

Now let's see what this looks like as a class:

{% highlight javascript %}
class MyController {
	username = null;
	password = null;
	
	login() {
		if (_this.username && _this.password) {
			this._myService.login(this.username, this.password).then(() => {
				// Do something when things go right.
			}, () => {
				// Do something when things go wrong.
			});
		} else {
			// Hey, user... you're not doing it right.
		}
	}
	
	private _hashPassword() {
		
	}
	
	private _myService;
	
	static $inject = ['MyService'];
	constructor(MyService) {
		this._myService = MyService;
	}
}
{% endhighlight %}

There's a few of things you'll notice here. First, we only are using the `this` keyword when we want to access properties and methods of the class, we didn't need to declare those properties with the `this` keyword. Second, our `$inject` is a static member of the controller. And finally, our constructor handles the DI and any other initialization you may need to do when the controller is used.

Up until now we haven't used anything that is TypeScript specific. You could use Babel with this code and it would know what to do.

Let's decorate this controller with some type definitions.

{% highlight javascript %}
class MyController {
	username: string = null;
	password: string = null;
	
	login(): void {
		if (_this.username && _this.password) {
			this._myService.login(this.username, this.password).then(() => {
				// Do something when things go right.
			}, () => {
				// Do something when things go wrong.
			});
		} else {
			// Hey, user... you're not doing it right.
		}
	}
	
	private _hashPassword(): string {
		
	}
	
	private _myService: MyService;
	
	static $inject = ['MyService'];
	constructor(MyService) {
		this._myService = MyService;
	}
}
{% endhighlight %}

You'll notice the various properties now have a type of `string` and our methods have a return type defined. Also, we defined `_myService` as `MyService` which can be a class somewhere else in your codebase.

An important thing to note when working with classes is to avoid using `function` type functions and instead [use arrow functions (lambdas)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) `() => {}` so you are scoping the correct `this`.

Embrace classes and your code will be a lot more maintainable and easier to troubleshoot should things go wrong.

If you have questions, please leave them in the comments.