---
layout: post
title:  "Directive"
date:   2016-03-20 12:35:34 -0500
categories: API
author: Michael McLaughlin
permalink: /api/v0/directive
---

<p>Directives are defined as an official or authoritative instruction. All directives are APIs, and all APIs can be used as directives. One directive simply wraps another or multiple directives to create a relationship or give the originating method structure more logic.</p>
<p>Directives are miniature apis that can be extended against, and swapped out in the middle of other apis. What does that mean? That means that the same code can be used for two different objects' prototypes, one can extend the other, and / or overwrite specific methods, only overwriting what it needs to all while keeping the pathways and methods to that directive that that parent object depends on intact.</p>
<p>For example, the DomManager event bus is actually based off of the Object event bus. It uses the exact same methods for it's events even though the <a href="doma">DOMA</a> rearranges delegated events, has counters surrounding the index of said delegated events and rearranges the events that it executes based on the html structure beneath it. Shimming and swapping out shared structures like this would not be possible with normal apis. By providing a methodology and pattern to exposing apis on objects it is possible to achieve this. Read more about defining, extending, and swapping directives at the bottom of this page.</p>

<ul class="list">
    <li class="left clear-left">
        <a>Methods</a>
        <ul class="list nested-list">
            <li class="left clear-left"><a href="#method_directive">directive</a></li>
            <li class="left clear-left"><a href="#method_directiveDestruction">directiveDestruction</a></li>
            <li class="left clear-left"><a href="#method_is">is</a></li>
            <li class="left clear-left"><a href="#method_mark">mark</a></li>
            <li class="left clear-left"><a href="#method_remark">remark</a></li>
            <li class="left clear-left"><a href="#method_unmark">unmark</a></li>
        </ul>
    </li>
    <li class="left clear-left">
        <a>Augments</a>
        <ul class="list nested-list">
            <li class="left clear-left"><a href="extendable">Extendable</a></li>
        </ul>
    </li>
</ul>
<h4 id="methods" class="title-headline">Methods</h4>
<div id="methods_directive">
    <h5 class="title-headline">#directive</h5>
    <p>Directives in Odette are used to share behaviors and patterns between apis, and keep your code dry. In addition to keeping your code dry, the directive method also helps to lazy create objects. There's no need to repeat logic to check if members exist, or create them at multiple points in your API.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var directiveObject = factories.Directive();
directiveObject.MyDirective; // undefined
directiveObject.directive('MyDirective'); // {}
directiveObject.MyDirective; // {}</code></pre>
</div>
<div id="methods_directiveDestruction">
    <h5 class="title-headline">#directiveDestruction</h5>
    <p>Just as directives can be created, they can also be destroyed. The directiveDestrcution method allows for this type of lifecycle behavior by calling a function that is passed in at the directive's definition.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var directiveObject = factories.Directive();
directiveObject.directiveDestruction('MyDirective'); // null
directiveObject.MyDirective; // undefined</code></pre>
</div>
<div id="methods_is">
    <h5 class="title-headline">#is</h5>
    <p>In order to get you started, the Directive Constructor will keep simple states for you.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var directiveObject = factories.Directive();
directiveObject.is('here');     // false
directiveObject.mark('here');   // true
directiveObject.is('here');     // true
directiveObject.unmark('here'); // true
directiveObject.is('here');     // false</code></pre>
</div>
<div id="methods_remark">
    <h5 class="title-headline">#remark</h5>
    <p>Remark is kind of like a directed toggle. You can pass in a value with the key and remark will discern it as a boolean.</p>
</div>
<div id="methods_mark">
    <h5 class="title-headline">#mark</h5>
    <p>To change statuses, simply call mark on the directive object and your status will become true. The mark and unmark methods return a boolean that denotes whether the status was changed or not.</p>
</div>
<div id="methods_unmark">
    <h5 class="title-headline">#unmark</h5>
    <p>Unmark is used to denote a false status.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var directiveObject = factories.Directive();
directiveObject.mark('here');   // true
directiveObject.is('here');     // true
directiveObject.mark('here');   // false
directiveObject.unmark('here'); // true
directiveObject.is('here');     // false
directiveObject.mark('here');   // true</code></pre>
</div>
<p>These methods are all greate for measuring state on objects that would normally be difficult to do or would need their own namespace like isDestroying, or isRendering. But what if you want to change the behavior of that object as it interacts with the api that it uses internally? Odette makes this process easy. Simply overwrite the "directive:creation:{{directive_name}}" property on the prototype of the parent object.</p>
<p>First let's define a directive.</p>
<div id="overwriting">
    <h5 class="title-headline">#overwriting internal apis</h5>
    <p>In order to overwrite internally used apis, it is helpful to have a switch that is easily accessable on the prototype of the object. In this case the creation and destruction lifecycle are overwritable at the following, respective keys: "directive:creation:{{directiveName}}" and "directive:destruction:{{directiveName}}" where {{directiveName}} is the name that begins and finishes the lifecycle of the directive at that key.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript"></code></pre>
</div>