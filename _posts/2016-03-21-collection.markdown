---
layout: post
title:  "Collection"
date:   2016-03-20 12:35:34 -0500
categories: API
author: Michael McLaughlin
permalink: /api/v0/collection
---


<p>Collections are the root for dealing with many objects at the same time. Many of the methods described are available in the regular underscore library or ES6. Collections depend on the <a href="list">List</a> directive, which manages arrays directly, and provides allows the array to be iteratable without ever having to set up a for or while loop. Collections also depend on the <a href="registry">Registry</a> directive to track what is in the list and the items registered in said list. Collections are very powerful, but if you just need to iterate over something, or just need a registry to group different objects, then look no further than it's dependant directives.</p>
<ul class="list">
    <li class="left clear-left">
        <a href="#methods">Methods</a>
        <ul class="list nested-list">
            <li class="left clear-left"><a href="#methods_begin">begin</a></li>
            <li class="left clear-left"><a href="#methods_bounce">bounce</a></li>
            <li class="left clear-left"><a href="#methods_connected">connected</a></li>
            <li class="left clear-left"><a href="#methods_create">create</a></li>
            <li class="left clear-left"><a href="#methods_defineIframe">defineIframe</a></li>
            <li class="left clear-left"><a href="#methods_defineWindows">defineWindows</a></li>
            <li class="left clear-left"><a href="#methods_flush">flush</a></li>
            <li class="left clear-left"><a href="#methods_receive">receive</a></li>
            <li class="left clear-left"><a href="#methods_respond">respond</a></li>
            <li class="left clear-left"><a href="#methods_response">response</a></li>
            <li class="left clear-left"><a href="#methods_setGroup">setGroup</a></li>
            <li class="left clear-left"><a href="#methods_setupIframe">setupIframe</a></li>
            <li class="left clear-left"><a href="#methods_stripData">stripData</a></li>
            <li class="left clear-left"><a href="#methods_sync">sync</a></li>
        </ul>
    </li>
    <li class="left clear-left">
        <a href="javascript:void 0;">Augments</a>
        <ul class="list nested-list">
            <li class="left clear-left"><a href="/api/v0/model">Model</a></li>
            <li class="left clear-left"><a href="/api/v0/parent">Parent</a></li>
            <li class="left clear-left"><a href="/api/v0/events">Events</a></li>
            <li class="left clear-left"><a href="/api/v0/directive">Directive</a></li>
            <li class="left clear-left"><a href="/api/v0/extendable">Extendable</a></li>
        </ul>
    </li>
</ul>
<h4 id="methods" class="title-headline">Methods</h4>
<div id="methods_begin">
    <h5 class="title-headline">#begin</h5>
    <p>The begin method is a method that is called on initialization. It posts up to it's parent if it is in a nested global object, and it posts down if it was handed an iframe to watch. The begin method accepts one of two strings for it's first argument. If the buster is watching an iframe and it may have been created after the iframe was appended to the document, then it will pass "initialize" as the first argument. If it is watching the iframe before it was appended, or it did the appending (most likely) then the buster will not call the begin method and simply wait for the inner buster to post out that it is ready to begin. Inner busters are much more likely to utilize this method. They automatically post up a begin message to the parent window, which, if another buster is watching it, will begin a series of posts to eachother to establish a connection.</p>
    <pre class="code code-section"><code class="language-javascript">buster.begin('connect');</code></pre>
</div>

<div id="methods_add">
    <h5 class="title-headline">#add</h5>
    <p>The add method is a combination of indexOf and push. First the list will check to see if it already has the object in question. If it determines that it does not then it will push it onto the back of the list. If it does, it will simply ignore it.</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_call">
    <h5 class="title-headline">#call</h5>
    <p>The call method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_concat">
    <h5 class="title-headline">#concat</h5>
    <p>The concat method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_count">
    <h5 class="title-headline">#count</h5>
    <p>The count method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_countFrom">
    <h5 class="title-headline">#countFrom</h5>
    <p>The countFrom method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_countTo">
    <h5 class="title-headline">#countTo</h5>
    <p>The countTo method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_cycle">
    <h5 class="title-headline">#cycle</h5>
    <p>The cycle method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_duff">
    <h5 class="title-headline">#duff</h5>
    <p>The duff method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_duffRight">
    <h5 class="title-headline">#duffRight</h5>
    <p>The duffRight method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_each">
    <h5 class="title-headline">#each</h5>
    <p>The each method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_eachCall">
    <h5 class="title-headline">#eachCall</h5>
    <p>The eachCall method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_eachCallRight">
    <h5 class="title-headline">#eachCallRight</h5>
    <p>The eachCallRight method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_eachRight">
    <h5 class="title-headline">#eachRight</h5>
    <p>The eachRight method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_empty">
    <h5 class="title-headline">#empty</h5>
    <p>The empty method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_eq">
    <h5 class="title-headline">#eq</h5>
    <p>The eq method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_filter">
    <h5 class="title-headline">#filter</h5>
    <p>The filter method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_find">
    <h5 class="title-headline">#find</h5>
    <p>The find method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_findLast">
    <h5 class="title-headline">#findLast</h5>
    <p>The findLast method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_findLastWhere">
    <h5 class="title-headline">#findLastWhere</h5>
    <p>The findLastWhere method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_findWhere">
    <h5 class="title-headline">#findWhere</h5>
    <p>The findWhere method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_first">
    <h5 class="title-headline">#first</h5>
    <p>The first method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_flatten">
    <h5 class="title-headline">#flatten</h5>
    <p>The flatten method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_foldl">
    <h5 class="title-headline">#foldl</h5>
    <p>The foldl method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_foldr">
    <h5 class="title-headline">#foldr</h5>
    <p>The foldr method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_forEach">
    <h5 class="title-headline">#forEach</h5>
    <p>The forEach method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_forEachRight">
    <h5 class="title-headline">#forEachRight</h5>
    <p>The forEachRight method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_gather">
    <h5 class="title-headline">#gather</h5>
    <p>The gather method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_get">
    <h5 class="title-headline">#get</h5>
    <p>The get method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_has">
    <h5 class="title-headline">#has</h5>
    <p>The has method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_index">
    <h5 class="title-headline">#index</h5>
    <p>The index method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_indexOf">
    <h5 class="title-headline">#indexOf</h5>
    <p>The indexOf method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_insertAt">
    <h5 class="title-headline">#insertAt</h5>
    <p>The insertAt method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_join">
    <h5 class="title-headline">#join</h5>
    <p>The join method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_last">
    <h5 class="title-headline">#last</h5>
    <p>The last method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_length">
    <h5 class="title-headline">#length</h5>
    <p>The length method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_map">
    <h5 class="title-headline">#map</h5>
    <p>The map method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_mapCall">
    <h5 class="title-headline">#mapCall</h5>
    <p>The mapCall method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_merge">
    <h5 class="title-headline">#merge</h5>
    <p>The merge method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_pluck">
    <h5 class="title-headline">#pluck</h5>
    <p>The pluck method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_pop">
    <h5 class="title-headline">#pop</h5>
    <p>The pop method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_posit">
    <h5 class="title-headline">#posit</h5>
    <p>The posit method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_push">
    <h5 class="title-headline">#push</h5>
    <p>The push method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_range">
    <h5 class="title-headline">#range</h5>
    <p>The range method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_reduce">
    <h5 class="title-headline">#reduce</h5>
    <p>The reduce method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_register">
    <h5 class="title-headline">#register</h5>
    <p>The register method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_remove">
    <h5 class="title-headline">#remove</h5>
    <p>The remove method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_removeAt">
    <h5 class="title-headline">#removeAt</h5>
    <p>The removeAt method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_reset">
    <h5 class="title-headline">#reset</h5>
    <p>The reset method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_results">
    <h5 class="title-headline">#results</h5>
    <p>The results method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_reverse">
    <h5 class="title-headline">#reverse</h5>
    <p>The reverse method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_shift">
    <h5 class="title-headline">#shift</h5>
    <p>The shift method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_sort">
    <h5 class="title-headline">#sort</h5>
    <p>The sort method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_splice">
    <h5 class="title-headline">#splice</h5>
    <p>The splice method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_swapRegister">
    <h5 class="title-headline">#swapRegister</h5>
    <p>The swapRegister method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_toJSON">
    <h5 class="title-headline">#toJSON</h5>
    <p>The toJSON method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_toString">
    <h5 class="title-headline">#toString</h5>
    <p>The toString method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_uncycle">
    <h5 class="title-headline">#uncycle</h5>
    <p>The uncycle method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_unRegister">
    <h5 class="title-headline">#unRegister</h5>
    <p>The unRegister method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_unshift">
    <h5 class="title-headline">#unshift</h5>
    <p>The unshift method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_unwrap">
    <h5 class="title-headline">#unwrap</h5>
    <p>The unwrap method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_where">
    <h5 class="title-headline">#where</h5>
    <p>The where method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>
<div id="methods_whereNot">
    <h5 class="title-headline">#whereNot</h5>
    <p>The whereNot method</p>
    <pre class="code code-section"><code class="language-javascript"></code></pre>
</div>