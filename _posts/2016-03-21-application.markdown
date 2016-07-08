---
layout: post
title:  "Application"
date:   2016-03-20 12:35:34 -0500
categories: API
author: Michael McLaughlin
permalink: /api/v0/application
---

<p>Applications are the central hub of your project. While modules are good for breaking pieces of your code into self maintaining chunks, the application object is good at unifying all of those pieces coheisively.</p>
<p>Initializing a new application is super easy. Simply call the Odette function, the only function that belongs in the global namespace, and a new application will be created for you.</p>
<div class="Odette">
    <h5 class="title-headline">Odette</h5>
    <p>The Odette function has a couple of purposes. First is to create a gateway through which one can create application objects, both shared, as well as scoped. The first step to doing this is to tell Odette what context you want the shared app to belong and run in. This is usually the window, or the global object, if you're using node. The second argument tells Odette where the shared global object should be on said context. If a shared object is not there, then one will be made for you. The third arguments is the version name of the scoped application that is being created or looked for. If Odette makes a new scopedApp for you then something should probably happen to that new app immediately. If the scopedApp you were looking for in the third argument has already been created, and run then it will ignore this last function.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">Odette(this, 'application', '0.0.1', function (innerSharedApp, scopedApp) {
    // custom setup code for this version
    var global = this;
    // scopedApp.version === 'dev'
    // global app is the object that will be shared with all other iframes
    var globalSharedApp = innerSharedApp.touchTop(global);
});</code></pre>
</div>
<h5 class="title-headline">Shared Application(s)</h5>
<p>A little more on the topic of shared and scoped Application objects. Shared objects usually belong to a singular entity or business who happens to be running code on that page. Shared Application objects are the code, methodologies, apis and general understandings encapsulated in time (by version) by that entity or collective. What I mean to say is that shared objects (the second argument in the Odette generator) are usually for singular businesses. So, google analytics for example, may choose to swap the "application" string in the example above for "ga" (where their code is currently located on the window objects in pages that load google analytics) and then start building versions, or scoped apps, that can exist on the same page.</p>
<div id="methods_definition">
    <h5 class="title-headline">#definition</h5>
    <p>Definitions allow application versions to be defined only once, so that there are no code conflicts between loading the same version multiple times in different globals.</p>
    <p>The definition establishes the base for the application and sets a boolean on the scoped application object. This boolean prevents future definitions, and allows for undefinitions, functions to run if the scoped has been defined and another window is being setup.</p>
    <p>You will usually never have to worry about this method as it has very little to do with your application logic.</p>
    <p>In order to tie definitions to windows, simply pass a window object in as the second argument and Odette will make sure that the appropriate application object is transferred, and undefine handlers run.</p>
</div>
<div id="methods_undefine">
    <h5 class="title-headline">#undefine</h5>
    <p>Pass a function to this method to run it on every scoped Application object's setup. Definitions usually use this method to run code on other windows automatically. For instance, in order to provide a $ variable to all windows, the <a href="doma">DOMA</a> registers an undefine method so that any other windows that are passed to the scoped Application object get their very own $ function.</p>
</div>
<div id="methods_parody">
    <h5 class="title-headline">#parody</h5>
    <p>While we recommend scoping all code against a specific version, sometimes, it is simply better to scope against the most recent version that is being loaded onto the page. Pass a list to this method to allow for a parody method to be placed on the global object. This parodied method will call the scoped method of a specific version if it is passed into the method or will simply use the default (greatest value) version that it can find.</p>
</div>
<div id="methods_extend">
    <h5 class="title-headline">#extend</h5>
    <p>The applications that you build will get better with time. But in order to release early and often, you need to maintain code that does not conflict with other versions when they are both on the page. Odette's scoped Application objects are super basic. As you continue to develop your apps, you'll want to keep those difference sanctioned to their respective apps.</p>
    <p>Extend automatically puts methods and other members on your scoped application instance.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">app.extend({
    "subtleDiff": true
});
app.subtleDiff; // true</code></pre>
</div>
<div id="methods_registerVersion">
    <p>Try running the code and check out the small number of methods available on the prototype of the new scoped Application object in your console.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">application.registerVersion('0.0.1');</code></pre>
</div>
<div id="methods_destroy">
    <h5 class="title-headline">#destroy</h5>
    <p>In order to properly handle the release of scoped Application objects from the shared space, a destroy method is provided for overwriting. Overwrite this method to handle any cleanup on when a scoped Application object needs to clean up after itself regarding other objects that it may touch at any time. In the Module definition of Odette this method is set to the <a href="events">Events</a> destroy method, so if you ever need to listen for application destroy in your app, you can simply listen directly on the scoped Application object for "before:destroy" and "destroy".</p>
</div>
<div id="methods_unRegisterVersion">
    <h5 class="title-headline">#unRegisterVersion</h5>
    <p>The unRegisterVersion method removes a scoped Application object from it's shared parent. In this case the shared parent is the object at application, and the scoped application that is being destroyed has a version of "0.0.1". The destroy method is called internally on the scoped Application object to help it clean up whatever may be left over.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">application.registerVersion('0.0.1');
var app1 = application.scope('0.0.1');
window.zetzetun = app1;
app1.destroy = function () {
    delete window.zetzetun;
};
application.unRegisterVersion('0.0.1'); // scopedApp
window.zetzetun; // undefined</code></pre>
</div>
<div id="methods_scope">
    <h5 class="title-headline">#scope</h5>
    <p>In order to limit the layers of Application objects to only 2 layers (shared and scoped), a scoped method was created to turn the lower layers back toward the shared object. Run the scoped method on any scoped or shared Application object and run your function against the application that is found or created.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var globalApp = application;
var scopedApp = globalApp.scope('0.0.0');
scopedApp === scopedApp.scope();        // true
scopedApp === scopedApp.scope('0.0.0'); // true
scopedApp === globalApp.scope('0.0.0'); // true</code></pre>
    <P>To get back to the shared application object, simply access the global property.</P>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">app.global === application; // true</code></pre>
</div>
<div id="methods_touchTop">
    <h5 class="title-headline">#touchTop</h5>
    <p>Sometimes it is necessary to wait before replacing the shared Application object on the parent globals. An example of this use case is a script that is loading asynchronously needs to establish certain things relative to window it is residing in before merging with upper layered windows. The touchTop method is automatically called by default in the setup.js module, however it may behoove you to wait to call that function if you are politely loading other scripts or for some other reason.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">app.touchTop(window);</code></pre>
    <p>By default, the first time that touch top is called, it will map scoped Application objects to the top most shared object, if it is changing. In order to prevent this behavior, simply pass a truthy value as the second argument and handle the remapping yourself.</p>
</div>