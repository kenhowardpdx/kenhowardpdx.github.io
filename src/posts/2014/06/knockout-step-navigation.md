---
date: '2014-06-12'
title: "Knockout Step (Wizard) Navigation"
summary: "THE PROBLEM: You've got a single page that processes a lot of information and you need to break it into small, digestible steps for users."
---

Knockout's bindings are pretty easy to understand. One of the best parts about knockout are its [computed observables](http://knockoutjs.com/documentation/computedObservables.html). In this code example I've used `ko.computed` to enable the navigation buttons depending on the current step.

This example goes a step further in making the function reusable through the APP object literal. With this you can easily define your steps and get on with building awesome stuff.

## THE HTML

There isn't anything special about the HTML. I'm using Bootstrap 3 panels and peppering in some knockout data-binding. You will notice an array is used for the visible data-binding on panel one and panel two.

<div data-height="800" data-theme-id="6649" data-slug-hash="tebhi" data-default-tab="html" class='codepen'><pre><code>&lt;br/&gt;
&lt;div class=&quot;container&quot;&gt;

  &lt;div class=&quot;panel panel-default&quot;&gt;
    &lt;div class=&quot;panel-heading&quot;&gt;&lt;span class=&quot;h4&quot;&gt;Tools&lt;/span&gt;&lt;/div&gt;
    &lt;div class=&quot;panel-body&quot;&gt;
      &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;col-md-9&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-md-3&quot;&gt;
          &lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; data-bind=&quot;enable: canGoBack, click: prevStep&quot;&gt;&lt;span class=&quot;glyphicon glyphicon-chevron-left&quot;&gt;&lt;/span&gt;&lt;/button&gt;
          &lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; data-bind=&quot;enable: canGoFwd, click: nextStep&quot;&gt;&lt;span class=&quot;glyphicon glyphicon-chevron-right&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class=&quot;panel panel-default&quot; data-bind=&quot;visible: steps[0].IsVisible&quot;&gt;
    &lt;div class=&quot;panel-heading&quot;&gt;&lt;span class=&quot;h4&quot;&gt;Panel One&lt;/span&gt;&lt;/div&gt;
    &lt;div class=&quot;panel-body&quot;&gt;
      &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet est magni non omnis maiores? Eum quibusdam inventore consequuntur iusto est fugiat nam deleniti totam voluptatum ipsa earum harum odit ut!&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class=&quot;panel panel-default&quot; data-bind=&quot;visible: steps[1].IsVisible&quot;&gt;
    &lt;div class=&quot;panel-heading&quot;&gt;&lt;span class=&quot;h4&quot;&gt;Panel Two&lt;/span&gt;&lt;/div&gt;
    &lt;div class=&quot;panel-body&quot;&gt;
      &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sequi impedit reiciendis tempora saepe deserunt iste molestias quidem illum minus nihil maiores sunt quae enim vitae quia expedita. Minima sit.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/tebhi/'>Knockout Page Navigator</a> by Ken Howard (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//codepen.io/assets/embed/ei.js"></script>

## THE JAVASCRIPT

The magic of the approach here is that you can reuse this code anywhere in your app. Place the `window.APP` in a main javascript file you use everywhere and then instantiate the function when you need it. It takes two parameters: A view model (viewModel) and the number of steps your viewModel requires.

<div data-height="1197" data-theme-id="6649" data-slug-hash="tebhi" data-default-tab="js" class='codepen'><pre><code>window.APP = {
  setupKnockoutSteps: function(viewModel, numberOfSteps) {
    var self = viewModel;
    self.steps = [];
    self.currentStep = ko.observable(0);

    for(var i = 0; i &lt; numberOfSteps; i++) {
      var visible = (self.currentStep() === i) ? true : false
      self.steps[i] = { IsVisible: ko.observable(visible) };
    }

    self.nextStep = function() {
      self.currentStep(self.currentStep() + 1);
      if (self.currentStep() &lt;= (numberOfSteps - 1 )) {
        self.hideSteps();
        self.steps[self.currentStep()].IsVisible(true);
      } else {
        self.currentStep(numberOfSteps - 1);
      }
    }

    self.prevStep = function() {
      self.currentStep(self.currentStep() - 1);
      if(self.currentStep() &gt;= 0) {
        self.hideSteps();
        self.steps[self.currentStep()].IsVisible(true);
      } else {
        self.currentStep(0);
      }
    }

    self.hideSteps = function() {
      for(step in self.steps) {
        self.steps[step].IsVisible(false);
      }
    }

    self.canGoBack = ko.computed(function() {
      return self.currentStep() &gt; 0;
    });

    self.canGoFwd = ko.computed(function() {
      return self.currentStep() &lt; (numberOfSteps - 1);
    });

  }
}

function viewModel() {
  var self = this;
}

var viewModel = new viewModel();

APP.setupKnockoutSteps(viewModel, 2);

ko.applyBindings(viewModel);</code></pre>
<p>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/tebhi/'>Knockout Page Navigator</a> by Ken Howard (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//codepen.io/assets/embed/ei.js"></script>

## THE RESULT

<p data-height="344" data-theme-id="6649" data-slug-hash="tebhi" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/kenhowardpdx/pen/tebhi/'>Knockout Page Navigator</a> by Ken Howard (<a href='http://codepen.io/kenhowardpdx'>@kenhowardpdx</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>
