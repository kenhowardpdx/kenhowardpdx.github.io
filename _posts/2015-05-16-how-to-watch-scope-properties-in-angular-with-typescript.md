---
layout: post
title: "How to Watch Scope Properties in Angular with TypeScript"
summary: "There's more than one way to watch a property on your scope in Angular. I'll show you the best way to setup a watch using TypeScript."
path: 2015-05-16-how-to-watch-scope-properties-in-angular-with-typescript.md
---

For this demo I'll be opening and closing a door and watching the `isDoor` property for changes. Here is the very simple `Door` class:

{% highlight javascript %}
class Door
{
	isOpen: boolean;
	
	open(): void
	{
		this.isOpen = true;
	}
	
	close(): void
	{
		this.isOpen = false;
	}
}
{% endhighlight %}

I'm going to assume you already know how to setup an Angular controller using TypeScript. Here is the controller we'll be using:

{% highlight javascript %}
class HouseController
{
	frontDoor: Door;
	
	static $inject = ['$scope'];
	constructor($scope: ng.IScope)
	{
		this.frontDoor = new Door();
		
		// setup $watch
	}
}

angular.module('houseApp').controller('HouseController', HouseController);
{% endhighlight %}

Angular's `$watch` [takes three parameters](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch). We'll only look at the first two for this demo, `watchExpression` and `listener`. Both parameters take either a string or an expression. The simplest way to watch a property is like this:

{% highlight javascript %}
$scope.$watch('frontDoor.isOpen', (newValue, oldValue) => {
	// frontDoor.isOpen has changed
});
{% endhighlight %}

Now, if we are doing this, we'll need to put `frontDoor` directly on `$scope`. I personally don't do this because I use `controllerAs` syntax to assign my controller to a property on `$scope`.

Here's my template:

{% highlight html %}
 <div ng-controller="HouseController as house">
	<button ng-click="house.frontDoor.open()" ng-if="!house.frontDoor.isOpen">Open Door</button>
	<button ng-click="house.frontDoor.close()" ng-if="house.frontDoor.isOpen">Close Door</button>
	<p>
		{% raw %}The door is {{house.frontDoor.isOpen === true ? "open" : "closed"}}{% endraw %}
	</p>
 </div>
{% endhighlight %}

As you can see I am calling my controller and then assigning it to the property of `house` on `$scope` with this line: `ng-controller="HouseController as house"`

We can modify our `$watch` to work with how our controller is defined in the view like this:
{% highlight javascript %}
// Added 'house'----.
$scope.$watch('house.frontDoor.isOpen', (newValue, oldValue) => {
	// frontDoor.isOpen has changed
});
{% endhighlight %}

But this isn't very flexible. What if we were using this controller in multiple places and we couldn't depend on it being asigned to the `house` property of `$scope`?

Instead of passing the `$watch` a string literal, let's give it a function that returns the property we want to watch:

{% highlight javascript %}
$scope.$watch(() => { return this.house.isOpen; }, (newValue, oldValue) => {
	// frontDoor.isOpen has changed
});
{% endhighlight %}

Here's the entire controller:

{% highlight javascript %}
class HouseController
{
	frontDoor: Door;
	
	static $inject = ['$scope'];
	constructor($scope: ng.IScope)
	{
		this.frontDoor = new Door();
		
		$scope.$watch(() => { return this.house.isOpen; }, (newValue, oldValue) => {
			if (newValue !== oldValue) {
				var doorState = (newValue === true) ? 'open' ? 'closed';
				alert('The door is ' + doorState);
			}
		});
	}
}
{% endhighlight %}

See it in action:

<p data-height="71" data-theme-id="6649" data-slug-hash="EjYzev" data-default-tab="result" data-user="kenhowardpdx" class='codepen'>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/EjYzev/'>How to Watch Scope Properties in Angular</a> by Ken Howard (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
&nbsp;

These blog posts helped me form my own opinions of the best way to use `$watch` with TypeScript:

* [Digging into Angular’s “Controller as” syntax](http://toddmotto.com/digging-into-angulars-controller-as-syntax/)
* [AngularJS + TypeScript – how to setup a watch (and 2 ways to do it wrong)](http://dotnetbyexample.blogspot.com/2014/07/angularjs-typescript-how-to-setup-watch.html)