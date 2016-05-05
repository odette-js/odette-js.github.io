---
layout: post
title:  "DomManager"
date:   2016-03-20 12:35:34 -0500
categories: API
author: Michael McLaughlin
permalink: /api/v0/dommanager
---




<p>Odette's DomManager is a very powerful abstraction of the DOM api. It abstracts a variety of tests as well as tasks away from you so you don't have to worry about them, such as events on attachment, detachment, contentChanges, attributeChanges, destruction and more.</p>
<p>To access a DomManager, simply query the dom using the <a href="/api/v0/doma">DOMA</a> and find the element that you would like to manipulate through any of the methods that the doma provides. A simple one is <a href="/api/v0/doma#methods_index">index</a> which will return the element in that location on the list of possible DomManagers</p>
<pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var $body = $('body');
var bodyManager = $body.index(0); // dom manager</code></pre>
<ul class="list">
    <li class="left clear-left">
        <a data-custom="expands-next" data-target=".nested-list-collapser">Members</a>
        <div class="nested-list-collapser" data-duration="100">
            <ul class="list nested-list">
                <li class="left clear-left"><a href="#members_isDocument">isDocument</a></li>
                <li class="left clear-left"><a href="#members_isWindow">isWindow</a></li>
                <li class="left clear-left"><a href="#members_isElement">isElement</a></li>
                <li class="left clear-left"><a href="#members_isFragment">isFragment</a></li>
                <li class="left clear-left"><a href="#members_isValidDomManager">isValidDomManager</a></li>
            </ul>
        </div>
    </li>
    <li class="left clear-left">
        <a data-custom="expands-next" data-target=".nested-list-collapser">Methods</a>
        <div class="nested-list-collapser" data-duration="300">
            <ul class="list nested-list">
                <li class="left clear-left"><a href="#methods_$">$</a></li>
                <li class="left clear-left"><a href="#methods_addValue">addValue</a></li>
                <li class="left clear-left"><a href="#methods_append">append</a></li>
                <li class="left clear-left"><a href="#methods_applyStyle">applyStyle</a></li>
                <li class="left clear-left"><a href="#methods_attr">attr</a></li>
                <li class="left clear-left"><a href="#methods_blur">blur</a></li>
                <li class="left clear-left"><a href="#methods_box">box</a></li>
                <li class="left clear-left"><a href="#methods_change">change</a></li>
                <li class="left clear-left"><a href="#methods_changeValue">changeValue</a></li>
                <li class="left clear-left"><a href="#methods_checked">checked</a></li>
                <li class="left clear-left"><a href="#methods_children">children</a></li>
                <li class="left clear-left"><a href="#methods_classes">classes</a></li>
                <li class="left clear-left"><a href="#methods_click">click</a></li>
                <li class="left clear-left"><a href="#methods_client">client</a></li>
                <li class="left clear-left"><a href="#methods_clone">clone</a></li>
                <li class="left clear-left"><a href="#methods_contains">contains</a></li>
                <li class="left clear-left"><a href="#methods_contextmenu">contextmenu</a></li>
                <li class="left clear-left"><a href="#methods_css">css</a></li>
                <li class="left clear-left"><a href="#methods_data">data</a></li>
                <li class="left clear-left"><a href="#methods_dblclick">dblclick</a></li>
                <li class="left clear-left"><a href="#methods_destroy">destroy</a></li>
                <li class="left clear-left"><a href="#methods_disabled">disabled</a></li>
                <li class="left clear-left"><a href="#methods_dispatchEvent">dispatchEvent</a></li>
                <li class="left clear-left"><a href="#methods_each">each</a></li>
                <li class="left clear-left"><a href="#methods_element">element</a></li>
                <li class="left clear-left"><a href="#methods_elements">elements</a></li>
                <li class="left clear-left"><a href="#methods_emit">emit</a></li>
                <li class="left clear-left"><a href="#methods_error">error</a></li>
                <li class="left clear-left"><a href="#methods_find">find</a></li>
                <li class="left clear-left"><a href="#methods_flow">flow</a></li>
                <li class="left clear-left"><a href="#methods_focus">focus</a></li>
                <li class="left clear-left"><a href="#methods_focusin">focusin</a></li>
                <li class="left clear-left"><a href="#methods_focusout">focusout</a></li>
                <li class="left clear-left"><a href="#methods_frame">frame</a></li>
                <li class="left clear-left"><a href="#methods_getAttribute">getAttribute</a></li>
                <li class="left clear-left"><a href="#methods_getStyle">getStyle</a></li>
                <li class="left clear-left"><a href="#methods_getValue">getValue</a></li>
                <li class="left clear-left"><a href="#methods_hasValue">hasValue</a></li>
                <li class="left clear-left"><a href="#methods_hide">hide</a></li>
                <li class="left clear-left"><a href="#methods_html">html</a></li>
                <li class="left clear-left"><a href="#methods_id">id</a></li>
                <li class="left clear-left"><a href="#methods_index">index</a></li>
                <li class="left clear-left"><a href="#methods_insertAt">insertAt</a></li>
                <li class="left clear-left"><a href="#methods_keydown">keydown</a></li>
                <li class="left clear-left"><a href="#methods_keypress">keypress</a></li>
                <li class="left clear-left"><a href="#methods_keyup">keyup</a></li>
                <li class="left clear-left"><a href="#methods_length">length</a></li>
                <li class="left clear-left"><a href="#methods_load">load</a></li>
                <li class="left clear-left"><a href="#methods_mousedown">mousedown</a></li>
                <li class="left clear-left"><a href="#methods_mouseenter">mouseenter</a></li>
                <li class="left clear-left"><a href="#methods_mouseleave">mouseleave</a></li>
                <li class="left clear-left"><a href="#methods_mousemove">mousemove</a></li>
                <li class="left clear-left"><a href="#methods_mouseout">mouseout</a></li>
                <li class="left clear-left"><a href="#methods_mouseover">mouseover</a></li>
                <li class="left clear-left"><a href="#methods_mouseup">mouseup</a></li>
                <li class="left clear-left"><a href="#methods_next">next</a></li>
                <li class="left clear-left"><a href="#methods_off">off</a></li>
                <li class="left clear-left"><a href="#methods_on">on</a></li>
                <li class="left clear-left"><a href="#methods_once">once</a></li>
                <li class="left clear-left"><a href="#methods_parent">parent</a></li>
                <li class="left clear-left"><a href="#methods_pause">pause</a></li>
                <li class="left clear-left"><a href="#methods_play">play</a></li>
                <li class="left clear-left"><a href="#methods_prepend">prepend</a></li>
                <li class="left clear-left"><a href="#methods_prev">prev</a></li>
                <li class="left clear-left"><a href="#methods_prop">prop</a></li>
                <li class="left clear-left"><a href="#methods_registerAs">registerAs</a></li>
                <li class="left clear-left"><a href="#methods_registeredElementName">registeredElementName</a></li>
                <li class="left clear-left"><a href="#methods_remove">remove</a></li>
                <li class="left clear-left"><a href="#methods_removeAttribute">removeAttribute</a></li>
                <li class="left clear-left"><a href="#methods_removeValue">removeValue</a></li>
                <li class="left clear-left"><a href="#methods_resize">resize</a></li>
                <li class="left clear-left"><a href="#methods_sameOrigin">sameOrigin</a></li>
                <li class="left clear-left"><a href="#methods_scroll">scroll</a></li>
                <li class="left clear-left"><a href="#methods_select">select</a></li>
                <li class="left clear-left"><a href="#methods_setAddress">setAddress</a></li>
                <li class="left clear-left"><a href="#methods_setAttribute">setAttribute</a></li>
                <li class="left clear-left"><a href="#methods_show">show</a></li>
                <li class="left clear-left"><a href="#methods_siblings">siblings</a></li>
                <li class="left clear-left"><a href="#methods_skip">skip</a></li>
                <li class="left clear-left"><a href="#methods_src">src</a></li>
                <li class="left clear-left"><a href="#methods_submit">submit</a></li>
                <li class="left clear-left"><a href="#methods_text">text</a></li>
                <li class="left clear-left"><a href="#methods_toggleValue">toggleValue</a></li>
                <li class="left clear-left"><a href="#methods_toJSON">toJSON</a></li>
                <li class="left clear-left"><a href="#methods_unload">unload</a></li>
                <li class="left clear-left"><a href="#methods_unwrap">unwrap</a></li>
                <li class="left clear-left"><a href="#methods_visible">visible</a></li>
                <li class="left clear-left"><a href="#methods_window">window</a></li>
                <li class="left clear-left"><a href="#methods_wrap">wrap</a></li>
            </ul>
        </div>
    </li>
    <li class="left clear-left">
        <a data-custom="expands-next" data-target=".nested-list-collapser">Augments</a>
        <div class="nested-list-collapser" data-duration="100">
            <ul class="list nested-list">
                <li class="left clear-left"><a href="/api/v0/events">Events</a></li>
                <li class="left clear-left"><a href="/api/v0/directive">Directive</a></li>
                <li class="left clear-left"><a href="/api/v0/extendable">Extendable</a></li>
            </ul>
        </div>
    </li>
</ul>
<h4 id="members" class="title-headline">Members</h4>
<div id="members_isWindow">
    <h5 class="title-headline">#isWindow</h5>
    <p>Boolean that denotes whether or not the target element is a window.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var manager = $(window).index(0);
manager.isWindow; // true</code></pre>
</div>
<div id="members_isDocument">
    <h5 class="title-headline">#isDocument</h5>
    <p>Boolean that denotes whether or not the target element is a document.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var manager = $(document).index(0);
manager.isDocument; // true</code></pre>
</div>
<div id="members_isElement">
    <h5 class="title-headline">#isElement</h5>
    <p>Boolean that denotes whether or not the target element is a html element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var manager = $('body').index(0);
manager.isElement; // true</code></pre>
</div>
<div id="members_isFragment">
    <h5 class="title-headline">#isFragment</h5>
    <p>Boolean that denotes whether or not the target element is a document fragment.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var manager = $.fragment();
manager.isFragment; // true</code></pre>
</div>
<div id="members_isValidDomManager">
    <h5 class="title-headline">#isValidDomManager</h5>
    <p>Boolean on the prototype that denotes whether the item in question is a DomManager. Useful when dealing with multiple windows.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript"></code></pre>
</div>
<h4 id="methods" class="title-headline">Methods</h4>
<div id="methods_$">
    <h5  class="title-headline">#$</h5>
    <p>The query symbol ($) is used to query elements inside of the current context. When this function is called, the target is queried using querySelectorAll and the query string is passed in. When the elements are returned, they are wrapped in a <a href="/api/v0/doma">DOMA</a> object.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var $divs = bodyManager.$('div'); // all the divs under body
var secondDivManager = $divs.index(1);
secondDivManager.$('li'); // all of the li's under the second div</code></pre>
</div>
<div id="methods_addValue">
    <h5 class="title-headline">#addValue</h5>
    <p>To add a single value to an attribute that already has many values, you can simply call the addValue method. This method uses the AttributeManager to back it's attributes.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">// &lt;body&gt;
bodyManager.addValue('data-here', 'one');
bodyManager.addValue('data-here', 'two'); // body -> &lt;body data-here=&quot;one two&quot;&gt;</code></pre>
</div>
<div id="methods_append">
    <h5 class="title-headline">#append</h5>
    <p>Append elements to the target context by calling this method.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var newDiv = $.createElement('div');
bodyManager.append(newDiv);
newDiv.parent() === bodyManager; // true</code></pre>
</div>
<div id="methods_applyStyle">
    <h5 class="title-headline">#applyStyle</h5>
    <p>Applies a singular style to the target element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var newDiv = $.createElement('div');
bodyManager.append(newDiv);
newDiv.parent() === bodyManager; // true</code></pre>
</div>
<div id="methods_attr">
    <h5 class="title-headline">#attr</h5>
    <p>Convenience function for setting and getting attributes on the target element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var newDiv = $.createElement('div');
newDiv.attr({
    name: "michael"
}); // &lt;div name="michael"&gt;</code></pre>
</div>
<div id="methods_box">
    <h5 class="title-headline">#box</h5>
    <p>Gets the box model that it can with the information it has available. If the target element is not attached it will return an object with all 0s. If it is attached then it will get the computed styles as well as the bounding client rect to give the most accurate representation possible.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var boxModel = bodyManager.box();
// {
//     borderLeft: 0,
//     borderRight: 0,
//     borderTop: 0,
//     bottom: 701,
//     computedBottom: 0,
//     computedLeft: 0,
//     computedRight: 0,
//     computedTop: 0,
//     height: 701,
//     left: 0,
//     marginBottom: 0,
//     marginLeft: 0,
//     marginRight: 0,
//     marginTop: 0,
//     paddingBottom: 0,
//     paddingLeft: 0,
//     paddingRight: 0,
//     paddingTop: 0,
//     right: 1280,
//     top: 0,
//     width: 1280
// }</code></pre>
</div>
<div id="methods_changeValue">
    <h5 class="title-headline">#changeValue</h5>
    <p>The changeValue method takes up to 3 arguments. First the attribute to change, the second is the list of values to remove, and the third is the list of values to add to the attribute.</p>
    <p>Consider the following Element</p>
    <pre class="code code-section"><code class="language-html">&lt;div id=&quot;unique-id&quot; data-special=&quot;one two three four five&quot;&gt;&lt;div&gt;</code></pre>
    <p>To change the values in the data-special attribute all we need to do is call changeValue with the appropriate inputs. Lets remove three and five, and add threepointfive and seven. We can even choose to pass a space delineated string, or an array with our appropriate values.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var specialManager = $('#unique-id').index(0);
specialManager.changeValue('data-special', ['three', 'five'], 'threepointfive seven');</code></pre>
    <pre class="code code-section"><code class="language-html">&lt;div id=&quot;unique-id&quot; data-special=&quot;one two four threepointfive seven&quot;&gt;&lt;div&gt;</code></pre>
</div>
<div id="methods_checked">
    <h5 class="title-headline">#checked</h5>
    <p>Convenience method for checking if the element has a checked property. If the element does have the checked property, regardless of it's value, it will return true. If the element does not have the corresponding value it will return false.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">// &lt;input type=&quot;checkbox&quot;/&gt;
inputManager.checked(); // false
inputManager.prop('checked', true);
inputManager.checked(); // true</code></pre>
</div>
<div id="methods_children">
    <h5 class="title-headline">#children</h5>
    <p>Method to return all of the direct children of the target element. While the list of children is being iterated over, it can also be filtered by passing in a string to act as a query selector, a number to only get that element, or a function for custom filtering.</p>
    <p>Consider the following markup.</p>
    <pre class="code code-section"><code class="language-html">&lt;div id=&quot;top-level&quot;&gt;
    &lt;div class=&quot;item-0&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;item-1&quot; data-marker&gt;&lt;/div&gt;
    &lt;div class=&quot;item-2&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;item-3&quot; data-marker&gt;&lt;/div&gt;
    &lt;div class=&quot;item-4&quot;&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
    <p>We might want to select for the children in a variety of ways.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var topLevelManager = $('#top-level');
var $allChildren = topLevelManager.children(); // length 5
var $thirdChild = topLevelManager.children(2); // length 1
var $markerChildren = topLevelManager.children('[data-marker]'); // length 2
var $evenChildren = topLevelManager.children(function (manager, index) {
    return !(index % 2);
}); // length 3</code></pre>
</div>
<div id="methods_classes">
    <h5 class="title-headline">#classes</h5>
    <p>Convenience method for retrieving and setting the class attribute. Class was not used because it is a reserved word.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">newDiv.classes('one two');
newDiv.classes(); // returns "one two"</code></pre>
</div>
<div id="methods_client">
    <h5 class="title-headline">#client</h5>
    <p>Returns the boundingClientRect of the target element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.client();
// {
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 701,
//     width: 1280
// }</code></pre>
</div>
<div id="methods_clone">
    <h5 class="title-headline">#clone</h5>
    <p>Returns a javascript literal that can be serialized and reparsed at a later time by the DOMA.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">newDivManager.clone();
// {
//     children: [],
//     attributes: {},
//     tagName: "div"
// }</code></pre>
</div>
<div id="methods_contains">
    <h5 class="title-headline">#contains</h5>
    <p>Returns a boolean based on whether or not the elements passed into the method are inside of target element. Also, a <a href="#methods_parent">parent</a> type function can be passed to discern whether or not the parent is in fact the parent you are looking for.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.contains('div'); // true
bodyManager.contains($('div').index(0)); // true
bodyManager.contains($.createElement('div')); // false</code></pre>
</div>
<div id="methods_css">
    <h5 class="title-headline">#css</h5>
    <p>The css method is a convenience function for setting and retrieving values off of the style api.</p>
    <p>To change the opacity for instance from 1 to 0.5, simply use the following code on your target DomManager.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.css('opacity', 0.5);</code></pre>
    <p>Many styles can be applied at the same time by passing an object instead of key value pairs. Below is an example of an element being centered with the absolute position method. Don't worry, those numbered values will converted into pixel values they are applied.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.css({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto'
});</code></pre>
</div>
<div id="methods_data">
    <h5 class="title-headline">#data</h5>
    <p>The data method is a convenience method for wrapping attribute changes around data attributes. Simply pass an object or key value pairs into the function and the method will take care of unCamelCasing it for you and applying it with a data- prefix.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">newDivManager.data('wanted', 'alive'); // &lt;div data-wanted=&quot;alive&quot;&gt;&lt;/div&gt;</code></pre>
</div>
<div id="methods_destroy">
    <h5 class="title-headline">#destroy</h5>
    <p>The destroy method ends the target DomManager's lifecycle. It will go through the same cycle as other <a href="/api/v0/events">Events</a> obejcts but will also unregister itself against its parent document if it was registered as a custom element using the data-custom marker.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.destroy();</code></pre>
    <p>An optional handler can be passed into the method to be called asynchronously if the element is an iframe since it will be <a href="#methods_remove">removed</a> from the dom.</p>
</div>
<div id="methods_disabled">
    <h5 class="title-headline">#disabled</h5>
    <p>Useful when checking if an element is has the disabled property, or setting the element to be or not to be disabled.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var inputManager = $('input').index(0);
inputManager.disabled(); // false
inputManager.disabled(true);
inputManager.disabled(); // true
inputManager.disabled(false);
inputManager.disabled(); // false</code></pre>
</div>
<div id="methods_dispatchEvent">
    <h5 class="title-headline">#dispatchEvent</h5>
    <p>A wrapper around the <a href="/api/v0/events">Events</a> <a href="/api/v0/events#dispatchEvent">dispatchEvent</a> method, which marks the event object as trust worthy or not, providing a greater measure of trustworthiness for browsers that do not support the isTrusted property.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.on('click', function (e) {
    console.log(e.isTrusted);
});
targetManager.dispatchEvent('click'); // logs false
targetManager.click(); // logs false
// ...
// native click -> logs true</code></pre>
</div>
<div id="methods_each">
    <h5 class="title-headline">#each</h5>
    <p>A parody method to allow a DomManager share internal methods with the <a href="doma">DOMA</a>.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.each(function (manager, index) {
    manager === bodyManager; // true
    index === 0; // true
});</code></pre>
</div>
<div id="methods_element">
    <h5 class="title-headline">#element</h5>
    <p>Returns the element that belongs to that manager.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.element(); // &lt;body&gt;&lt;/body&gt;</code></pre>
</div>
<div id="methods_elements">
    <h5 class="title-headline">#elements</h5>
    <p>Parody method of the <a href="doma">DOMA</a> that simply returns the element in an array.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.elements(); // [&lt;body&gt;&lt;/body&gt;]</code></pre>
</div>
<div id="methods_emit">
    <h5 class="title-headline">#emit</h5>
    <p>Post message abstraction for window objects. Be sure to pass a function, because if the window is friendly, the DomManager will pass an object that resembles an event back throught that function to be handled by the same side.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">$('iframe').index(0).emit('{"coded":"messages"}', 'http://odette-js.github.io', function (fake_evnt) {
    // nevermind, i've got this
});</code></pre>
</div>
<div id="methods_find">
    <h5 class="title-headline">#find</h5>
    <p>Parody method of the <a href="doma">DOMA</a> that fake iterates with the single manager.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.find(function (manager, index) {
    manager === bodyManager; // true
    index === 0; // true
    return !index;
}); // bodyManager</code></pre>
</div>
<div id="methods_flow">
    <h5 class="title-headline">#flow</h5>
    <p>Gets the flow rect of the target element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.flow();</code></pre>
</div>
<div id="methods_frame">
    <h5 class="title-headline">#frame</h5>
    <p>The frame method helps you create the base string for an iframe. You can either pass it the full string (with doctype) or the head and the body in one or two arguments. If the head and body are separate, the method will automatically add some helpful meta tags to the head to reduce redundancy.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.frame('&lt;link rel=&quot;stylesheet&quot; href=&quot;/css/main.css&quot;&gt;', '&lt;div class=&quot;my-container&quot;&gt;&lt;/div&gt;');</code></pre>
    <pre class="code code-section"><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;meta name=&quot;viewport&quot; content=&quot;user-scalable=no,width=device-width,initial-scale=1&quot;&gt;
        &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot;&gt;
        &lt;link rel=&quot;stylesheet&quot; href=&quot;/css/main.css&quot;&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div class=&quot;my-container&quot;&gt;&lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
</div>
<div id="methods_getAttribute">
    <h5 class="title-headline">#getAttribute</h5>
    <p>Gets the value of the attribute that is passed into this method. Basically a parody of the native getAttribute function... except it will automatically parse any object or number or boolean for you.</p>
    <pre class="code code-section"><code class="language-html">&lt;div data-number=&quot;5&quot;&gt;&lt;/div&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.getAttribute('data-number'); // 5</code></pre>
</div>
<div id="methods_getStyle">
    <h5 class="title-headline">#getStyle</h5>
    <p>A convenience method for retrieving styles from an element.</p>
    <pre class="code code-section"><code class="language-html">&lt;div style=&quot;display&colon; block;&quot;&gt;&lt;/div&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.getStyle('display'); // "block"</code></pre>
</div>
<div id="methods_hasValue">
    <h5 class="title-headline">#hasValue</h5>
    <p>A method for checking whether or not a manager has a particular value in the attribute is passed in.</p>
    <pre class="code code-section"><code class="language-html">&lt;div data-list=&quot;one two three&quot;&gt;&lt;/div&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.hasValue('dataList', 'two'); // true</code></pre>
</div>
<div id="methods_addClass">
    <h5 class="title-headline">#addClass</h5>
    <p>This method adds the list or space delineated string to the target manager's element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.addClass('item1 class2');</code></pre>
</div>
<div id="methods_removeClass">
    <h5 class="title-headline">#removeClass</h5>
    <p>This method removes the list or space delineated string to the target manager's element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.removeClass('item1 class2');</code></pre>
</div>
<div id="methods_toggleClass">
    <h5 class="title-headline">#toggleClass</h5>
    <p>This method toggles the list or space delineated string to the target manager's element. A second argument can be passed to toggle the class in a direction a truthy value will add the class, a falsey value will remove the class. Super useful if you want to direct the classes and you do not want any logic to clutter up your calls.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.toggleClass('item1 class2');
targetManager.toggleClass('item1 class2', true); // equivalent to calling addClass
targetManager.toggleClass('item1 class2', false); // equivalent to calling removeClass</code></pre>
</div>
<div id="methods_changeClass">
    <h5 class="title-headline">#changeClass</h5>
    <p>This method both removes and adds classes at the same time, and in that order.</p>
    <pre class="code code-section"><code class="language-html">&lt;div class=&quot;item1 class2 class3&quot;&gt;&lt;/div&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.changeClass('item1 class2', 'item3 item4');</code></pre>
    <pre class="code code-section"><code class="language-html">&lt;div class=&quot;class3 item3 item4&quot;&gt;&lt;/div&gt;</code></pre>
</div>
<div id="methods_setClass">
    <h5 class="title-headline">#setClass</h5>
    <p>This method overwrites the class attribute and sets it to whatever was passed into the method</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.setClass('item1 class2'); // &lt;div class=&quot;item1 class2&quot;&gt;&lt;/div&gt;</code></pre>
</div>
<div id="hasClass">
    <h5 class="title-headline">#hasClass</h5>
    <p>This method checks class attribute against the list or space delineated string to make sure all of the questioned classes are present. If one or more are missing the method will return false.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.hasClass('item1 class2'); // false
targetManager.addClass('item1 class2');
targetManager.hasClass('item1 class2'); // true</code></pre>
</div>
<div id="methods_hasValue">
    <h5 class="title-headline">#hasValue</h5>
    <p>This method checks to see if the attribute passed in as the first argument has the values passed in as the second argument.</p>
    <pre class="code code-section"><code class="language-html">&lt;div data-questionable=&quot;one two three&quot;&gt;&lt;/div&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.hasValue('dataQuestionable', 'one'); // true</code></pre>
</div>
<div id="methods_hide">
    <h5 class="title-headline">#hide</h5>
    <p>The hide method is simply a convenience for setting display: none; on the element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.hide(); // &lt;div style=&quot;display&colon; none;&quot;&gt;&lt;/div&gt;</code></pre>
</div>
<div id="methods_html">
    <h5 class="title-headline">#html</h5>
    <p>Use the html method to get and set the innerHTML of the target element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetElement.children().length(); // 0
targetElement.html('&lt;div&gt;&lt;/div&gt;');
targetElement.children().length(); // 1</code></pre>
</div>
<div id="methods_id">
    <h5 class="title-headline">#id</h5>
    <p>The id method is a convenience method for setting and retrieving the id of a target element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetElement.id(); // false
targetElement.id('targeted');
targetElement.id(); // "targeted"</code></pre>
</div>
<div id="methods_index">
    <h5 class="title-headline">#index</h5>
    <p>The index method, if called on the DomManager will simply return the DomManager. Index is more useful when the DomManager is wrapped in a <a href="doma">DOMA</a> to pick out a manager by index.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.index(0); // targetManager</code></pre>
</div>
<div id="methods_insertAt">
    <h5 class="title-headline">#insertAt</h5>
    <p>The insertAt method is the main handler that will be abstracted by append, prepend and others. It handles node insertion at whatever index is passed into the method as the second argument.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.insertAt(divManager, 3); // inserts the div at the 4th child index</code></pre>
</div>
<div id="methods_length">
    <h5 class="title-headline">#length</h5>
    <p>Parody method for the DOMA. Always responds with 1 when called on a DomManager.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.length(); // 1</code></pre>
</div>
<div id="methods_next">
    <h5 class="title-headline">#next</h5>
    <p>Gets the next element that matches the selector. Or just gets the next sibling in the sequence.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.next();</code></pre>
</div>
<div id="methods_off">
    <h5 class="title-headline">#off</h5>
    <p>Removes event handlers that match the parameters passed into the method.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var handleIt = function () {
    console.log('handled');
};
bodyManager.on('handle', handleIt);
bodyManager.dispatchEvent('handle'); // logs "handled"
bodyManager.off('handle', handleIt);
bodyManager.dispatchEvent('handle'); // ... nothing happens</code></pre>
</div>
<div id="methods_on">
    <h5 class="title-headline">#on</h5>
    <p>Attaches an event listeners to the target manager.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.on('evnt', function () {
    console.log('handled');
});
bodyManager.dispatchEvent('evnt'); // logs "handled"
bodyManager.dispatchEvent('evnt'); // logs "handled"</code></pre>
</div>
<div id="methods_once">
    <h5 class="title-headline">#once</h5>
    <p></p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.once('evnt', function () {
    console.log('handled');
});
bodyManager.dispatchEvent('evnt'); // logs "handled"
bodyManager.dispatchEvent('evnt'); // ... nothing happens</code></pre>
</div>
<div id="methods_parent">
    <h5 class="title-headline">#parent</h5>
    <p>Returns the first matching parent of target manager. If no argument is passed, the direct parent will be returned. A function can be passed, through the method, but it must return a tuple with the parent at the first index, and a boolean at the second index to continue or terminate the loop.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var parentOfBody = bodyManager.parent();
parentOfBody.tagName; // "html"
bodyManager.parent('document').isDocument; // true
bodyManager.parent('window').isWindow; // true
bodyManager.parent('iframe').tagName; // "iframe"
bodyManager.parent(function (parent) {
    return [parent, parent.window === parent];
}).isWindow; // true</code></pre>
</div>
<div id="methods_pause">
    <h5 class="title-headline">#pause</h5>
    <p>Convenience method for calling the pause method / triggering a pause event on the target manager.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.pause(); // triggers "paused" event
videoManager.pause(); // calls native pause on the video element</code></pre>
</div>
<div id="methods_play">
    <h5 class="title-headline">#play</h5>
    <p>Convenience method for calling the play method / triggering a play event on the target manager.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.play(); // triggers "playing" event
videoManager.play(); // calls native pause on the video element</code></pre>
</div>
<div id="methods_prepend">
    <h5 class="title-headline">#prepend</h5>
    <p>Uses insertAt method to prepend the passed in elements and managers' elements to the target manager's element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var newDiv = $.createElement('div');
targetManager.prepend(newDiv);
targetManager.children(0) === newDiv; // true</code></pre>
</div>
<div id="methods_prev">
    <h5 class="title-headline">#prev</h5>
    <p>Gets the previous element that matches the selector. Or just gets the previous sibling in the sequence.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.prev();</code></pre>
</div>
<div id="methods_prop">
    <h5 class="title-headline">#prop</h5>
    <p>Convenience function for setting and getting properties on the target element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var newDiv = $.createElement('div');
newDiv.prop({
    name: "michael"
}); // &lt;div name="michael"&gt;</code></pre>
</div>
<div id="methods_registerAs">
    <h5 class="title-headline">#registerAs</h5>
    <p>This method allows you to tie custom behaviors to your dom element. It is automatically called by the DomManager's constructor if the element being tied to the manager has a data-custom attribute.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">newDivManager.registerAs('someother-div');</code></pre>
    <pre class="code code-section"><code class="language-html">&lt;div data-custom=&quot;someother-div&quot;&gt;&lt;/div&gt;</code></pre>
</div>
<div id="methods_registeredElementName">
    <h5 class="title-headline">#registeredElementName</h5>
    <p>Retrieve the directive name that the manager is registered under and customized by.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">newDivManager.registerAs('someother-div');
// custom element behaviors are registered below documents so that each document
// can have it's own stash of custom elements, just like the registerElement api
newDivManager.registeredElementName(); // Element-doc0-someother-div</code></pre>
</div>
<div id="methods_remove">
    <h5 class="title-headline">#remove</h5>
    <p>Removes the dom node from its parent. First optional argument can be a document fragment that the target manager's element will be appended to. The second, optional, argument can be a function that is run asynchronously after the dom element is removed from the dom.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">newDivManager.remove();
newDivManager.parent(); // undefined</code></pre>
</div>
<div id="methods_removeAttribute">
    <h5 class="title-headline">#removeAttribute</h5>
    <p>Remove an attribute from the manager's element.</p>
    <pre class="code code-section"><code class="language-html">&lt;div data-some=&quot;attr&quot;&gt;&lt;/div&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.removeAttribute('dataSome');</code></pre>
    <pre class="code code-section"><code class="language-html">&lt;div&gt;&lt;/div&gt;</code></pre>
</div>
<div id="methods_removeValue">
    <h5 class="title-headline">#removeValue</h5>
    <p>Remove a particular value from an attribute list.</p>
    <pre class="code code-section"><code class="language-html">&lt;div data-some=&quot;attr key&quot;&gt;&lt;/div&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.removeValue('dataSome', 'key');</code></pre>
    <pre class="code code-section"><code class="language-html">&lt;div data-some=&quot;attr&quot;&gt;&lt;/div&gt;</code></pre>
</div>
<div id="methods_sameOrigin">
    <h5 class="title-headline">#sameOrigin</h5>
    <p>This one is tricky. DomManagers can reach into other iframes and up the parent chain of windows, which means that they create DomManagers for other windows, even if they are not friendly. When this happens, the DomManager can check it's accessability against it's owner, which is the document that the object originates from.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">// this example is of code that is running inside of an unfriendly iframe
$.returnsManager(window).sameOrigin(); // true
$.returnsManager(window.top).sameOrigin(); // false</code></pre>
</div>
<div id="methods_setAddress">
    <h5 class="title-headline">#setAddress</h5>
    <p>The setAddress method is called automatically during Manager construction. It creates a unique id for the window to post emit messages to.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">$.returnsManager(window).address; // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code></pre>
</div>
<div id="methods_setAttribute">
    <h5 class="title-headline">#setAttribute</h5>
    <p>Wipe the values from whatever attribute is passed in and replace them with the second argument.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">newDovManager.setAttribute('dataList', 'one two three four');</code></pre>
</div>
<div id="show">
    <h5 class="title-headline">#show</h5>
    <p>The show method is simply a convenience for setting display: block; on the element.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.show(); // &lt;div style=&quot;display&colon; block;&quot;&gt;&lt;/div&gt;</code></pre>
</div>
<div id="methods_siblings">
    <h5 class="title-headline">#siblings</h5>
    <p>The siblings method returns all siblings that are not the current manager and meet the filter passed in as the first argument.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var targetManager = $('div').index(10); // 11th element
targetManager.siblings('li'); // all of the li elements on the same level</code></pre>
</div>
<div id="methods_skip">
    <h5 class="title-headline">#skip</h5>
    <p>Uses the same code that backs next and previous. A number (count of elements to skip) or a string must be passed</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">targetManager.skip(2); // returns manager of element 2 siblings ahead
targetManager.skip(-2); // returns manager of element 2 siblings behind</code></pre>
</div>
<div id="methods_src">
    <h5 class="title-headline">#src</h5>
    <p>The src method sets and gets the src property from the target DomManager.</p>
    <pre class="code code-section"><code class="language-html">&lt;img src=&quot;my_img.jpg&quot;&gt;&lt;/img&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">imgManager.src(); // "my_img.jpg"
imgManager.src('your_img.jpg');
imgManager.src(); // your_img.jpg</code></pre>
</div>
<div id="methods_text">
    <h5 class="title-headline">#text</h5>
    <p>Gets and sets the text of a target manager. Uses the textContent property.</p>
    <pre class="code code-section"><code class="language-html">&lt;div&gt;text goes here&lt;/div&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">divManager.text(); // "text goes here"
divManager.text('text went there');
divManager.text(); // "text went there"</code></pre>
</div>
<div id="methods_toggleValue">
    <h5 class="title-headline">#toggleValue</h5>
    <p>Toggles a singular value of an attribute in a list.</p>
    <pre class="code code-section"><code class="language-html">&lt;div data-directions=&quot;s w&quot;&gt;&lt;/div&gt;</code></pre>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">divManager.toggleValue('dataDirections', 'n e');</code></pre>
    <pre class="code code-section"><code class="language-html">&lt;div data-directions=&quot;s w n e&quot;&gt;&lt;/div&gt;</code></pre>
</div>
<div id="methods_toJSON">
    <h5 class="title-headline">#toJSON</h5>
    <p>Turns the dom into a serializable object that can be reparsed and recreated at a later time.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">divManager.toJSON();
// {
//     children: [],
//     attributes: {},
//     tagName: "div"
// }</code></pre>
</div>
<div id="methods_unwrap">
    <h5 class="title-headline">#unwrap</h5>
    <p>Parody method that simply wraps the dom manager in an array so that it produces the same result as the <a href="doma">DOMA</a>.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">divManager.wrap(); // [divManager]</code></pre>
</div>
<div id="methods_visible">
    <h5 class="title-headline">#visible</h5>
    <p>Runs a series of checks to determine if the element in question is visible. It will first check the attachment status, then various css properties, as well as the client rect of the element. Finally, if the element is inside of an iframe, it will do it's best to discern the element's visibility.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">divManager.remove();
divManager.visible(); // false
bodyManager.append(divManager);
divManager.visible(); // true</code></pre>
</div>
<div id="methods_window">
    <h5 class="title-headline">#window</h5>
    <p>Returns the manager of the window associated with the element. If this method is called on the document, then it will reach up to it's parent window. If it is called on a window, then it will return said window. If it is called on any element that is not an iframe, then it will get the window of the owner document. If it is called on an iframe then it will grab the content window of said iframe. This method is used internally for the emit and other methods.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">bodyManager.window();   // bodyManager.element().parentNode.parentNode.defaultView;
iframeManager.window(); // iframeManager.element().contentWindow;
divManager.window();    // divManager.owner.element().defaultView;
windowManager.window(); // windowManager.element();</code></pre>
</div>
<div id="methods_wrap">
    <h5 class="title-headline">#wrap</h5>
    <p>Wraps the Dom Manager in a <a href="doma">DOMA</a> So that other elements might be added to it. DomManager is wrapped with owner's DOMA, which is relative to the owning document.</p>
    <pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">domManager.wrap();</code></pre>
</div>
<h4 class="title-headline">Convenience Methods</h4>
<h5 class="title-headline"><span id="methods_blur">#blur</span> <span id="methods_change">#change</span> <span id="methods_click">#click</span> <span id="methods_contextmenu">#contextmenu</span> <span id="methods_dblclick">#dblclick</span> <span id="methods_error">#error</span> <span id="methods_focus">#focus</span> <span id="methods_focusin">#focusin</span> <span id="methods_focusout">#focusout</span> <span id="methods_keydown">#keydown</span> <span id="methods_keypress">#keypress</span> <span id="methods_keyup">#keyup</span> <span id="methods_load">#load</span> <span id="methods_mousedown">#mousedown</span> <span id="methods_mouseenter">#mouseenter</span> <span id="methods_mouseleave">#mouseleave</span> <span id="methods_mousemove">#mousemove</span> <span id="methods_mouseout">#mouseout</span> <span id="methods_mouseover">#mouseover</span> <span id="methods_mouseup">#mouseup</span> <span id="methods_resize">#resize</span> <span id="methods_scroll">#scroll</span> <span id="methods_select">#select</span> <span id="methods_submit">#submit</span> <span id="methods_unload">#unload</span> </h5>
<p>Convenience function for programmatically calling blur on the target element. If a function is passed into the method, then it will attach that method through the on api. An optional string as the first argument can be passed as a delegate target.</p>
<p>Below is an example of the blur method being called, and the DomManager triggering the appropriate handlers.</p>
<pre class="code code-section" data-custom="code-snippet"><code class="language-javascript">var newInput = $.createElement('input');
newInput.blur(function () {
    console.log('blurred');
});
// ...
newInput.blur(); // logs "blurred"</code></pre>