---
layout: post
title: "Angular ngRepeat and ngOptions Comparison"
summary: "Both ngRepeat and ngOptions give you the ability to populate a list of options in a select input. Each has their place and I'm going to demonstrate where you'd use them."
path: 2015-05-19-angular-ngrepeat-and-ngoptions-comparison.md
---

Here's the model we'll be working with. All properties have string values.

{% highlight javascript %}
var Contact = function (data) {
     var _this = this;
     _this.firstName = data.firstName;
     _this.lastName = data.lastName;
     _this.stateCode = data.stateCode;
     _this.county = data.county;
}
{% endhighlight %}

We have a form that looks like this:

{% highlight html %}
<form name="ContactForm" ng-controller="ContactController as vm">
     <div class="row">
          <div class="col-sm-4 form-group">
               <label class="control-label">First Name</label>
               <input type="text" class="form-control" ng-model="vm.contact.firstName" />
          </div>
          <div class="col-sm-4 form-group">
               <label class="control-label">Last Name Name</label>
               <input type="text" class="form-control" ng-model="vm.contact.lastName" />
          </div>
          <div class="col-sm-4 form-group">
               <label class="control-label">State</label>
               <select class="form-control" ng-model="vm.contact.stateCode">
                    <option value="">--Select One--</option>
               </select>
          </div>
          <div class="col-sm-4 form-group">
               <label class="control-label">County</label>
               <select class="form-control" ng-model="vm.contact.county">
                    <option value="">--Select One--</option>
               </select>
          </div>
     </div>
</form>
{% endhighlight %}

Our controller looks like this:

{% highlight javascript %}
function ContactController () {
     var _this = this;
     
     _this.contact = new Contact({ firstName: 'Ken', lastName: 'Howard', stateCode: 'OR', county: 'Multnomah' });
     
     _this.states = [
          { stateCode: 'CA', stateName: 'California' },
          { stateCode: 'ID', stateName: 'Idaho' },
          { stateCode: 'OR', stateName: 'Oregon' },
          { stateCode: 'WA', stateName: 'Washington' }
     ];
     
     _this.counties = []; // We'll be updating this based on the state selected.
}

angular.module('contactApp').controller('ContactController', ContactController);
{% endhighlight %}

As you can _clearly_ see, our controller has two arrays, `states` and `counties`. The `states` array is available to the view when it is loaded. The `counties` array will be updated after a `state` has been selected.

Now we need to get those Arrays of `states` and `counties` into our select inputs so that we have some options to choose from.

Let's first try using [ngOptions](https://docs.angularjs.org/api/ng/directive/ngOptions):

{% highlight html %}
<div class="col-sm-4 form-group">
     <label class="control-label">State</label>
     <select class="form-control" ng-model="vm.contact.stateCode" ng-options="state.stateCode as state.stateName for state in vm.states">
          <option value="">--Select One--</option>
     </select>
</div>
<div class="col-sm-4 form-group">
     <label class="control-label">County</label>
     <select class="form-control" ng-model="vm.contact.county" ng-options="county.countyName for county in vm.counties">
          <option value="">--Select One--</option>
     </select>
</div>
{% endhighlight %}

Here's how that looks so far:

<p data-height="298" data-theme-id="6649" data-slug-hash="JdKBXQ" data-default-tab="result" data-user="kenhowardpdx" class='codepen'>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/JdKBXQ/'>1/3: Angular Select ngOptions & ngRepeat Comparison</a> by Ken Howard (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
&nbsp;

You can see that the "State" select field is populated and the correct state is selected based on the contact model. And, because we haven't populated the `counties` Array, the "County" select field defaulted to "--Select One--" as expected.

The next thing we need to do is update the `counties` Array when a state is selected. I'm going to use Angular's `$watch` method because I don't want my view getting cluttered. If you prefer, you could also create a method that executes on controller initialization and also implement `ngChange` in the view when the user selects a state from the select input. I'm not going to cover the latter method.

Before we can use `$watch` we'll need to inject `$scope` into our controller. And setup the watch inside the controller.

{% highlight javascript %}
ContactController.$inject = ['$scope'];
function ContactController ($scope) {
     var _this = this;
     
     ...
     
     $scope.$watch(function () {
          // The property we are watching.
          return _this.contact.stateCode;
     }, function (newValue, oldValue) {
          // When the property changes. (this occurs on initial load as well as when the model is updated in anyway, by the user or by another method.)
          if (newValue === 'OR') {
               _this.counties = [
                    { countyId: 1, countyName: 'Clackamas' },
                    { countyId: 2, countyName: 'Multnomah' },
                    { countyId: 3, countyName: 'Washington' }
               ];
           } else if (newValue === 'WA') {
               _this.counties = [
                    { countyId: 4, countyName: 'unknown' },
                    { countyId: 5, countyName: 'somewhere' },
                    { countyId: 6, countyName: 'nothere' }
               ];
           } else if (newValue === 'CA') {
               _this.counties = [
                    { countyId: 7, countyName: 'Orange' },
                    { countyId: 8, countyName: 'Los Angeles' },
                    { countyId: 9, countyName: 'San Diego' }
               ];
           } else if (newValue === 'ID') {
               _this.counties = [
                    { countyId: 10, countyName: '?' },
                    { countyId: 11, countyName: 'potato land' },
                    { countyId: 12, countyName: 'snake river' }
               ];
           }
     });
}
{% endhighlight %}

Here's what that looks like:

<p data-height="298" data-theme-id="6649" data-slug-hash="PqzgKB" data-default-tab="result" data-user="kenhowardpdx" class='codepen'>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/PqzgKB/'>2/3: Angular Select ngOptions & ngRepeat Comparison</a> by Ken Howard (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
&nbsp;

You'll notice that the "County" options are being populated but they selected value is still the default "--Select One". This is not what we expected. If you are wondering why this is happening, it's because `ngOptions` is not intended to be used when your `ngModel` is a `string` property. You also may be wondering, "Hey, we're using the same approach for 'states' and that's working as expected." You are right. If the controller has the Array populated with our options before the view is loaded the `ngModel` will inform `ngOptions` which item to select. But if we don't have anything in `ngOptions` when the view is loaded they will not sync when `ngOptions` are updated after the initial load.

So, what do we do now? Let's look at the [documentation for Select](https://docs.angularjs.org/api/ng/directive/select).

![Angular Select Documentation](/images/posts/2015-05-19-angular-ngrepeat-and-ngoptions-comparison/angular-select-documentation.png)

Ok. Let's change our "State" and "County" select inputs to use `ngRepeat`.

{% highlight html %}
<div class="col-sm-4 form-group">
     <label class="control-label">State</label>
     <select class="form-control" ng-model="vm.contact.stateCode">
          <option value="" ng-selected="true">--Select One--</option>
          <option ng-repeat="state in vm.states"
          value="{% raw %}{{state.stateCode}}{% endraw %}"
          ng-selected="{% raw %}{{state.stateCode === vm.contact.stateCode}}{% endraw %}">{% raw %}{{state.stateName}}{% endraw %}</option>
     </select>
</div>
<div class="col-sm-4 form-group">
     <label class="control-label">County</label>
     <select class="form-control" ng-model="vm.contact.county">
          <option value="" ng-selected="true">--Select One--</option>
          <option ng-repeat="county in vm.counties"
          value="{% raw %}{{county.countyName}}{% endraw %}"
          ng-selected="{% raw %}{{county.countyName === vm.contact.county}}{% endraw %}">{% raw %}{{county.countyName}}{% endraw %}</option>
     </select>
</div>
{% endhighlight %}

And here's how that looks:

<p data-height="298" data-theme-id="6649" data-slug-hash="xGOeWq" data-default-tab="result" data-user="kenhowardpdx" class='codepen'>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/xGOeWq/'>3/3: Angular Select ngOptions & ngRepeat Comparison</a> by Ken Howard (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
&nbsp;

One side effect that you may notice is that when our selected county ("Multnomah" by default) isn't available in a state (switch to "Washington"), the selected option will be blank. This is because Angular is hanging on to the value that is in `ngModel`. You'll need to handle that on your own. In this case, I'm going to clear the value of `contact.county` whenever the `contact.sate` changes, but only if the value `contact.state` isn't the same as it's current value (like on the initial load of the view).

{% highlight javascript %}
$scope.$watch(function () {
     ...
}, function (newValue, oldValue) {
     ...
     
     if (newValue !== oldValue) {
          _this.contact.county = '';
     }
});
{% endhighlight %}

And this is what we end up with:

<p data-height="298" data-theme-id="6649" data-slug-hash="EjyJpZ" data-default-tab="result" data-user="kenhowardpdx" class='codepen'>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/EjyJpZ/'>4/4: Angular Select ngOptions & ngRepeat Comparison</a> by Ken Howard (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
&nbsp;

Interested in looking at the working source code?

* [1/4: Angular Select ngOptions & ngRepeat Comparison](http://codepen.io/kenhowardpdx/pen/JdKBXQ)
* [2/4: Angular Select ngOptions & ngRepeat Comparison](http://codepen.io/kenhowardpdx/pen/PqzgKB)
* [3/4: Angular Select ngOptions & ngRepeat Comparison](http://codepen.io/kenhowardpdx/pen/xGOeWq)
* [4/4: Angular Select ngOptions & ngRepeat Comparison](http://codepen.io/kenhowardpdx/pen/EjyJpZ)