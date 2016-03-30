---
layout: post
title:  "Directive"
date:   2016-03-20 12:35:34 -0500
categories: API
author: Michael McLaughlin
permalink: /api/v0/directive
---


<p>Directives are miniature apis that can be extended against, and swapped out in the middle of other apis. What does that mean? That means that the same code can be used for two different objects' prototypes, one can extend the other, and / or overwrite specific methods, only overwriting what it needs to all while keeping the pathways and methods to that directive exactly the same.</p>
<p>For example, the DomManager event bus is actually based off of the Object event bus. It uses the exact same apis.</p>
<ul class="list">
    <li class="left clear-left">
        <a data-custom="expands-next" data-target=".nested-list-collapser">Methods</a>
        <div class="nested-list-collapser" data-duration="300">
            <ul class="list nested-list">
                <li class="left clear-left"><a href="method_directive">directive</a></li>
                <li class="left clear-left"><a href="method_directiveDestruction">directiveDestruction</a></li>
                <li class="left clear-left"><a href="method_is">is</a></li>
                <li class="left clear-left"><a href="method_mark">mark</a></li>
                <li class="left clear-left"><a href="method_remark">remark</a></li>
                <li class="left clear-left"><a href="method_unmark">unmark</a></li>
            </ul>
        </div>
    </li>
    <li class="left clear-left">
        <a>Augments</a>
        <ul class="list nested-list">
            <li class="left clear-left"><a href="/api/v0/extendable">Extendable</a></li>
        </ul>
    </li>
</ul>
<h4 id="members" class="title-headline">Members</h4>
<div id="members_isWindow">
    <h5 class="title-headline">#isWindow</h5>
    <p>Boolean that denotes whether or not the target element is a window.</p>
    <pre class="code code-section"><code class="language-javascript">var manager = $(window).index(0);
manager.isWindow; // true</code></pre>
</div>