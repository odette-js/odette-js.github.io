---
layout: post
title:  "Collection"
date:   2016-03-20 12:35:34 -0500
categories: API
author: Michael McLaughlin
permalink: /api/v0/collection
---


<p>Collections are an abstraction for arrays. They handle adding and removing items on arrays, and doing other fancy things that parody many of the methods available in libraries such as underscore. Collections also offer a way to register objects against categories and ids. This is especially helpful when dealing with objects that may need to be found quickly without having to iterate through the entire collection, especially if your collection is quite large. To create a collection, simply call the Collections method on the factories object. Below is a collection of numbers being created.</p>
<pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4, 5]);</code></pre>
<ul class="list">
    <li class="left clear-left">
        <a is="expands-next" data-target=".nested-list-collapser">Methods</a>
        <div class="nested-list-collapser" data-duration="300">
            <ul class="list nested-list">
                <li class="left clear-left"><a href="#methods_add">add</a></li>
                <li class="left clear-left"><a href="#methods_call">call</a></li>
                <li class="left clear-left"><a href="#methods_concat">concat</a></li>
                <li class="left clear-left"><a href="#methods_count">count</a></li>
                <li class="left clear-left"><a href="#methods_countFrom">countFrom</a></li>
                <li class="left clear-left"><a href="#methods_countTo">countTo</a></li>
                <li class="left clear-left"><a href="#methods_cycle">cycle</a></li>
                <li class="left clear-left"><a href="#methods_duff">duff</a></li>
                <li class="left clear-left"><a href="#methods_duffRight">duffRight</a></li>
                <li class="left clear-left"><a href="#methods_each">each</a></li>
                <li class="left clear-left"><a href="#methods_eachCall">eachCall</a></li>
                <li class="left clear-left"><a href="#methods_eachCallRight">eachCallRight</a></li>
                <li class="left clear-left"><a href="#methods_eachRight">eachRight</a></li>
                <li class="left clear-left"><a href="#methods_empty">empty</a></li>
                <li class="left clear-left"><a href="#methods_eq">eq</a></li>
                <li class="left clear-left"><a href="#methods_filter">filter</a></li>
                <li class="left clear-left"><a href="#methods_find">find</a></li>
                <li class="left clear-left"><a href="#methods_findLast">findLast</a></li>
                <li class="left clear-left"><a href="#methods_findLastWhere">findLastWhere</a></li>
                <li class="left clear-left"><a href="#methods_findWhere">findWhere</a></li>
                <li class="left clear-left"><a href="#methods_first">first</a></li>
                <li class="left clear-left"><a href="#methods_flatten">flatten</a></li>
                <li class="left clear-left"><a href="#methods_foldl">foldl</a></li>
                <li class="left clear-left"><a href="#methods_foldr">foldr</a></li>
                <li class="left clear-left"><a href="#methods_forEach">forEach</a></li>
                <li class="left clear-left"><a href="#methods_forEachRight">forEachRight</a></li>
                <li class="left clear-left"><a href="#methods_gather">gather</a></li>
                <li class="left clear-left"><a href="#methods_has">has</a></li>
                <li class="left clear-left"><a href="#methods_indexOf">indexOf</a></li>
                <li class="left clear-left"><a href="#methods_insertAt">insertAt</a></li>
                <li class="left clear-left"><a href="#methods_item">item</a></li>
                <li class="left clear-left"><a href="#methods_join">join</a></li>
                <li class="left clear-left"><a href="#methods_last">last</a></li>
                <li class="left clear-left"><a href="#methods_length">length</a></li>
                <li class="left clear-left"><a href="#methods_map">map</a></li>
                <li class="left clear-left"><a href="#methods_mapCall">mapCall</a></li>
                <li class="left clear-left"><a href="#methods_merge">merge</a></li>
                <li class="left clear-left"><a href="#methods_pluck">pluck</a></li>
                <li class="left clear-left"><a href="#methods_pop">pop</a></li>
                <li class="left clear-left"><a href="#methods_push">push</a></li>
                <li class="left clear-left"><a href="#methods_range">range</a></li>
                <li class="left clear-left"><a href="#methods_reduce">reduce</a></li>
                <li class="left clear-left"><a href="#methods_remove">remove</a></li>
                <li class="left clear-left"><a href="#methods_removeAt">removeAt</a></li>
                <li class="left clear-left"><a href="#methods_reset">reset</a></li>
                <li class="left clear-left"><a href="#methods_results">results</a></li>
                <li class="left clear-left"><a href="#methods_reverse">reverse</a></li>
                <li class="left clear-left"><a href="#methods_shift">shift</a></li>
                <li class="left clear-left"><a href="#methods_sort">sort</a></li>
                <li class="left clear-left"><a href="#methods_splice">splice</a></li>
                <li class="left clear-left"><a href="#methods_toJSON">toJSON</a></li>
                <li class="left clear-left"><a href="#methods_toString">toString</a></li>
                <li class="left clear-left"><a href="#methods_uncycle">uncycle</a></li>
                <li class="left clear-left"><a href="#methods_unshift">unshift</a></li>
                <li class="left clear-left"><a href="#methods_unwrap">unwrap</a></li>
                <li class="left clear-left"><a href="#methods_where">where</a></li>
                <li class="left clear-left"><a href="#methods_whereNot">whereNot</a></li>
            </ul>
        </div>
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
<div id="methods_add">
    <h5 class="title-headline">#add</h5>
    <p>The add method is a combination of indexOf and push. First the collection will check to see if it already has the object in question. If the collection determines that it does not then it will push it onto the back of the collection. If it does, it will simply ignore it. The collection will return true or false based on whether or not the item was added to the collection.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4, 5]);
collection.add(1); // false
collection.add(6); // true</code></pre>
</div>
<div id="methods_call">
    <h5 class="title-headline">#call</h5>
    <p>The call method is used for calling a bunch of functions in sequence. If you have a collection of functions, they can be called using the call method. Because Collections objects are not functions, the call method does not conflict. Pass something into the call method for it to be passed to each function. Only one argument is permitted.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([function () {
    console.log('a');
}, function () {
    console.log('b');
}, function (a, b) {
    console.log(arguments);
}]);
collection.call(1, 2); // logs "a", "b", [1]</code></pre>
</div>
<div id="methods_concat">
    <h5 class="title-headline">#concat</h5>
    <p>The concat method is simply a parody for concatonating collections directly onto the managed array. This call maps the arguments and unwraps any objects that are collections or that extend from collections as it maps.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([1, 2]);
var collection2 = factories.Collection([5, 6]);
var collection3 = collection.concat([3, 4], collection2);
collection.toArray(); // [1, 2]
collection3.toArray(); // [1, 2, 3, 4, 5, 6]</code></pre>
</div>
<div id="methods_count">
    <h5 class="title-headline">#count</h5>
    <p>The count method is a parody of the utility given count method which allows you to count items on the array, regardless of the length of the collection.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4, 5]);
var arra = [];
collection.count(function (item, index, array) {
    while (array[index] === undefined && array.length <= index) {
        array.push(0);
    }
}, 3, 13);
collection.toArray(); // [0, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0]</code></pre>
</div>
<div id="methods_countFrom">
    <h5 class="title-headline">#countFrom</h5>
    <p>The countFrom method is a convenience method for counting up along a subset of the collection the method is called on. Instead of passing two numbers like the count method.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4, 5, 6, 7]);
collection.countFrom(function (item, index, collection) {
    collection.push(item);
}, 4);
collection.toArray(); // [0, 1, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7]</code></pre>
</div>
<div id="methods_countTo">
    <h5 class="title-headline">#countTo</h5>
    <p>The countTo method is another convenience method for counting up along a subset of the collection from 0.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4, 5, 6, 7]);
collection.countTo(function (item, index, collection) {
    collection.push(item);
}, 4);
collection.toArray(); // [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3]</code></pre>
</div>
<div id="methods_cycle">
    <h5 class="title-headline">#cycle</h5>
    <p>The cycle method cycles items through the array, putting items after the index passed at the front of the array. The cycle method modifies the array in place.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4, 5, 6, 7]);
collection.cycle(2).toArray(); // [2, 3, 4, 5, 6, 7, 0, 1]</code></pre>
</div>
<div id="methods_duff">
    <h5 class="title-headline">#duff</h5>
    <p>The duff method the closest thing to a for loop possible. It iterates through every item in the collection that is present when the method is first called. While this method is exposed, it's parody, <a href="#methods_each">each</a>, is much more user friendly.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript" data-noexec>collection.duff(function (item, index, array) {
    // exposes all items
});</code></pre>
</div>
<div id="methods_duffRight">
    <h5 class="title-headline">#duffRight</h5>
    <p>The duffRight method iterates over the array in reverse. It does not take into account the reversed property.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript" data-noexec>collection.duffRight(function (item, index, array) {
    // exposes all items... in reverse
});</code></pre>
</div>
<div id="methods_each">
    <h5 class="title-headline">#each</h5>
    <p>The each method is a parody for duff and exposes each item on the collection, in order, with each item's respective index.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript" data-noexec>collection.each(function (value, index, array) {
    // exposes each item
});</code></pre>
</div>
<div id="methods_eachCall">
    <h5 class="title-headline">#eachCall</h5>
    <p>The eachCall method is a method that calls a singular method on a collection of items. The method takes up to two arguments. The first is the key of the method to be called, and the second is a singular argument to be passed to each function call on the objects in the collection.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var shared = function (arg) {
    console.log(arg, collection.indexOf(this));
};
var collection = factories.Collection([{
    method: shared
}, {
    method: shared
}, {
    method: shared
}, {
    method: shared
}]);
collection.eachCall('method', "a"); // logs "a", 0, "a", 1, "a", 2, "a", 3</code></pre>
</div>
<div id="methods_eachCallRight">
    <h5 class="title-headline">#eachCallRight</h5>
    <p>The eachCallRight method</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var shared = function (arg) {
    console.log(arg, collection.indexOf(this));
};
var collection = factories.Collection([{
    method: shared
}, {
    method: shared
}, {
    method: shared
}, {
    method: shared
}]);
collection.eachCallRight('method', "a"); // logs "a", 3, "a", 2, "a", 1, "a", 0</code></pre>
</div>
<div id="methods_eachRight">
    <h5 class="title-headline">#eachRight</h5>
    <p>The eachRight method iterates over the array in reverse. It does not take into account the reversed property.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript" data-noexec>collection.eachRight(function (item, index, array) {
    // exposes all items... in reverse
});</code></pre>
</div>
<div id="methods_empty">
    <h5 class="title-headline">#empty</h5>
    <p>The empty method simply replaces the array with a blank array.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([1, 2, 3, 4]);
collection.toArray(); // [1, 2, 3, 4]
collection.empty();
collection.toArray(); // []</code></pre>
</div>
<div id="methods_eq">
    <h5 class="title-headline">#eq</h5>
    <p>The eq method can be passed a number or collection of numbers to create another collection with.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([5, 3, 2, 0, 4, 1]);
collection.eq(3).toArray(); // [0]
collection.eq([3, 0, 1]).toArray(); // [0, 5, 3]</code></pre>
</div>
<div id="methods_filter">
    <h5 class="title-headline">#filter</h5>
    <p>The filter method collects items on the collection. Return a truthy value to keep the item in the next collection that is created by the method.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4, 5]);
var collection2 = collection.filter(function (item) {
    return item % 2;
});
collection2.toArray(); // [1, 3, 5]</code></pre>
</div>
<div id="methods_find">
    <h5 class="title-headline">#find</h5>
    <p>The find method returns the first item that returns a truthy value.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([5, 3, 2, 0, 4, 1, 6]);
var result = collection.find(function (item, index) {
    return item * index > 10;
});
result; // 4</code></pre>
</div>
<div id="methods_findLast">
    <h5 class="title-headline">#findLast</h5>
    <p>The findLast method returns the first item that returns a truthy value starting from the last item.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([5, 3, 2, 0, 4, 1, 6]);
var found = collection.findLast(function (item, index) {
    return item * index > 10;
});
found; // 6</code></pre>
</div>
<div id="methods_findLastWhere">
    <h5 class="title-headline">#findLastWhere</h5>
    <p>The findLastWhere method returns the first object that matches the object passed in.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([{
    key: "notthevalue",
    unknown: "value0"
}, {
    key: "value",
    unknown: "value1"
}, {
    key: "value",
    unknown: "value2"
}]);
var foundWhere = collection.findWhere({
    key: "value"
});
foundWhere;// { key:"value", unknown:"value1" }</code></pre>
</div>
<div id="methods_findLastWhere">
    <h5 class="title-headline">#findLastWhere</h5>
    <p>The findLastWhere method returns the last object that matches.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([{
    key: "notthevalue",
    unknown: "value0"
}, {
    key: "value",
    unknown: "value1"
}, {
    key: "value",
    unknown: "value2"
}]);
var foundLastWhere = collection.findLastWhere({
    key: "value"
});
foundLastWhere; // { key:"value", unknown:"value2" }</code></pre>
</div>
<div id="methods_first">
    <h5 class="title-headline">#first</h5>
    <p>The first method is basically a parody of calling index and passing in 0.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([5, 3, 4, 2]);
collection.first(); // 5</code></pre>
</div>
<div id="methods_flatten">
    <h5 class="title-headline">#flatten</h5>
    <p>The flatten method can take nested arrays and flatten them with a transformer.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([[1, 5, 4], [[2], [[0], 3]]]);
collection.length(); // 2
var collection2 = collection.flatten();
collection2.toArray();       // [1, 5, 4, [2], [[0], 3]]
collection2.length(); // 5
collection = factories.Collection([[1, 5, 4], [[2], [[0], 3]]]);
collection.flatten(true).toArray(); // [1, 5, 4, 2, 0, 3]
collection = factories.Collection([[1, 5, 4], [[2], [[0], 3]]]);
collection.flatten(true, function (items) {
    // exposure to each that will populate the collection
}).toArray(); // [1, 5, 4, 2, 0, 3]</code></pre>
</div>
<div id="methods_foldl">
    <h5 class="title-headline">#foldl</h5>
    <p>The foldl method gives you a memo for those hard to compute processes.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([1, 10, 100, 1000]);
var aggregate = collection.foldl(function (x, y) {
    return x + y;
}, 0);
aggregate; // 1111</code></pre>
</div>
<div id="methods_foldr">
    <h5 class="title-headline">#foldr</h5>
    <p>The foldr method gives you a memoized pathway for those hard to computer processes... in reverse.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([1, 10, 100, 1000]);
var aggregate = collection.foldr(function (x, y) {
    return x + y;
}, 0);
aggregate; // 1111</code></pre>
</div>
<div id="methods_forEach">
    <h5 class="title-headline">#forEach</h5>
    <p>The forEach method is a parody of the <a href="#methods_each">each</a> method.</p>
</div>
<div id="methods_forEach">
    <h5 class="title-headline">#forEachRight</h5>
    <p>The forEach method is a parody of the <a href="#methods_eachRight">eachRight</a> method.</p>
</div>
<div id="methods_gather">
    <h5 class="title-headline">#gather</h5>
    <p>The gather method is a combination of map and concat, where all of the items returned from the map of all of the collections passed into the gather method, are combined in a single concat instead of many pushes.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [0, 1, 2, 3, 4]]);
var collection2 = collection.gather(function (collection) {
    return _.map(collection, function (item) {
        return item * 2;
    });
});
collection2.toArray(); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 0, 2, 4, 6, 8]</code></pre>
</div>
<div id="methods_has">
    <h5 class="title-headline">#has</h5>
    <p>The has method checks the collection using the <a href="#methods_indexOf">indexOf</a> method and returns a true value if the collection contains the item passed in and a false value if it does not.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection(['a', 'big', 'red', 'dog']);
collection.has('red'); // true
collection.has('cat'); // false</code></pre>
</div>
<div id="methods_indexOf">
    <h5 class="title-headline">#indexOf</h5>
    <p>The indexOf method checks the array for the item that was passed in. Other optional parameters can be passed in as well such as the starting index, the limiting index, and whether or not the collection should be checked in reverse.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection(['one', 'two', 'three', 'four', 'five']);
collection.indexOf('two'); // 1
collection.indexOf('two', 1); // 1
collection.indexOf('two', 2); // -1
collection.indexOf('five', 2); // 4
collection.indexOf('five', 2, 4); // -1</code></pre>
</div>
<div id="methods_insertAt">
    <h5 class="title-headline">#insertAt</h5>
    <p>The insertAt method is basically a singular splice convenience function that makes the process of adding a singular item to a collection less convoluted.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3]);
collection.insertAt(4, 2); // true
collection.toArray(); // [0, 1, 4, 2, 3]</code></pre>
</div>
<div id="methods_item">
    <h5 class="title-headline">#item</h5>
    <p>The item method returns the item at the index that is passed into the method. If no argument is passed in then the first item is returned.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([5, 6, 3, 1]);
collection.item(2); // 3
collection.item();  // 5
collection.item(10); // undefined</code></pre>
</div>
<div id="methods_join">
    <h5 class="title-headline">#join</h5>
    <p>The join method is simply applied to the array. Useful to replace with custom behaviors, such as the one that the <a href="doma">DOMA</a> uses.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3]);
collection.join('->'); // "0->1->2->3"</code></pre>
</div>
<div id="methods_last">
    <h5 class="title-headline">#last</h5>
    <p>The last method returns the last item on the collection.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3]);
collection.last(); // 3
collection = factories.Collection();
collection.last(); // undefined</code></pre>
</div>
<div id="methods_length">
    <h5 class="title-headline">#length</h5>
    <p>The length method returns the length of the items array beneath it.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">factories.Collection([0, 1, 2, 3]).length(); // 4</code></pre>
</div>
<div id="methods_map">
    <h5 class="title-headline">#map</h5>
    <p>The map method returns a new collection object with the returned values of the iterator that was passed in.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3]);
var remapped = collection.map(function (item, index) {
    return item * index;
});
remapped.toArray(); // [0, 1, 4, 9]</code></pre>
</div>
<div id="methods_pop">
    <h5 class="title-headline">#pop</h5>
    <p>The pop method removes the last item from the collection and returns it from the pop method.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4, 5]);
collection.length(); // 6
collection.pop(); // 5
collection.length(); // 5</code></pre>
</div>
<div id="methods_push">
    <h5 class="title-headline">#push</h5>
    <p>The push method applies a push against the array. If an array like object is passed into the method, then it will apply the array like object to the method. The method returns the length of the array.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection();
collection.push([9, 3, 0]); // 3
collection.push(5); // 4</code></pre>
</div>
<div id="methods_range">
    <h5 class="title-headline">#range</h5>
    <p>The range method produces a new array of numbers and puts it in a new Collections.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection();
collection = collection.range(0, 100, 10);       // [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
collection = collection.range(0, 100, 10, true); // [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]</code></pre>
</div>
<div id="methods_reduce">
    <h5 class="title-headline">#reduce</h5>
    <p>The reduce method is a <a href="#methods_foldl">foldl</a> with a different name.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">factories.Collection([0, 1, 2, 3, 4]).reduce(function (memo, item) {
    return memo + item;
}, 0);</code></pre>
</div>
<div id="methods_remove">
    <h5 class="title-headline">#remove</h5>
    <p>The remove method removes the first item from the collection.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4]);
collection.remove(2); // true
collection.remove(2); // false</code></pre>
</div>
<div id="methods_removeAt">
    <h5 class="title-headline">#removeAt</h5>
    <p>The removeAt method removes any item at the passed index.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([10, 11, 12, 13]);
collection.removeAt(2); // 12
collection.toArray(); // [10, 11, 13]</code></pre>
</div>
<div id="methods_reset">
    <h5 class="title-headline">#reset</h5>
    <p>The reset method replaces the list with a new array (with nothing in it) and unmarks the collection as reversed... or it marks it as not reversed.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3]);
collection.toArray(); // [0, 1, 2, 3]
collection.reverse();
collection.is('reversed'); // true
collection.toArray(); // [3, 2, 1, 0]
collection.reset();
collection.is('reversed'); // false
collection.toArray(); // []</code></pre>
</div>
<div id="methods_results">
    <h5 class="title-headline">#results</h5>
    <p>The results method maps a loop of function calls from the items in the collection to a new collection.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection(["HERE", "wHere", "Name"]);
collection.results('toLowerCase').toArray(); // ["here", "where", "name"]</code></pre>
</div>
<div id="methods_reverse">
    <h5 class="title-headline">#reverse</h5>
    <p>The reverse method calls reverse on the collection and toggles a marker on the collection as reversed.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3]);
collection.reverse().toArray(); // [3, 2, 1, 0]
collection.is("reversed"); // true</code></pre>
</div>
<div id="methods_shift">
    <h5 class="title-headline">#shift</h5>
    <p>The shift method is a parody for the original shift method.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2]);
collection.shift();
collection.toArray(); // [1, 2]</code></pre>
</div>
<div id="methods_sort">
    <h5 class="title-headline">#sort</h5>
    <p>The sort method allows you to sort your collection in any particular way, and will create correct comparators if you have marked the collection as reversed. Normally in js, if you were to call sort, like on the last line of the following example, your collection would revert back into an ascending collection. But because odette tracks whether or not a collection is reversed using the StatusManager, you can always be sure that your collection will be sorted correctly.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 2, 1]);
collection.sort();
collection.toArray(); // [0, 1, 2]
collection.reverse();
collection.toArray(); // [2, 1, 0]
collection.sort();
collection.toArray(); // [2, 1, 0]</code></pre>
</div>
<div id="methods_splice">
    <h5 class="title-headline">#splice</h5>
    <p>The splice method add items to arbitrary indexes of your collection. This is simply a parody method of the original splice, which will modify the array in place instead of creating a copy.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection(['bop', 'boop', 'bloop', 'blorp']);
collection.splice(2, 0, 'bleep');
collection.toArray(); // ["bop", "boop", "bleep", "bloop", "blorp"]</code></pre>
</div>
<div id="methods_swapRegister">
    <h5 class="title-headline">#swapRegister</h5>
    <p>The swapRegister method</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript"></code></pre>
</div>
<div id="methods_toJSON">
    <h5 class="title-headline">#toJSON</h5>
    <p>The toJSON method is a super helpful method whenever converting a collection into a serializable object. toJSON should always return a serializable object or base data type. This method useful for things like sorted collections, which are used in the children definition.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([{
    method: function () {}
}]);
collection.toJSON(); // [{}]</code></pre>
</div>
<div id="methods_toString">
    <h5 class="title-headline">#toString</h5>
    <p>The toString method rounds out the process of serialization by assisting in turning the collection into a string.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([{}]);
collection.toString(); // "[{}]"</code></pre>
</div>
<div id="methods_uncycle">
    <h5 class="title-headline">#uncycle</h5>
    <p>While the cycle method shifts elements forward and moves them to the back, the uncycle event does the opposite, and shifts elements backward and moves them to the front when they fall of the back.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2, 3, 4, 5]);
collection.uncycle(1).toArray(); // [5, 0, 1, 2, 3, 4]</code></pre>
</div>
<div id="methods_unshift">
    <h5 class="title-headline">#unshift</h5>
    <p>The unshift method does the opposite of the shift method and adds items to the front of the list, instead of knocking elements off of the front of the list.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([0, 1, 2]);
collection.unshift([3, 4, 5]); // 6 -> length of the array
collection.toArray(); // [3, 4, 5, 0, 1, 2]</code></pre>
</div>
<div id="methods_unwrap">
    <h5 class="title-headline">#unwrap</h5>
    <p>The unwrap method has been used a lot in these examples. It is simply a convenience method for consistantly returning an array of the items being held on the collection. This same methodology should be used for parodied objects that need a consistant api. Things like the DomManager, StringManagers, and other object types benefit greatly from consistantly accessing the collection through a function rather than simply getting the property.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection();
collection.toArray(); // []</code></pre>
</div>
<div id="methods_where">
    <h5 class="title-headline">#where</h5>
    <p>The where method is a filter that targets objects that match all of the properties of the object that is passed into the method.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([{
    one: 1
}, {
    one: 2
}, {
    one: 1
}, {
    one: 3
}]);
var collection2 = collection.where({
    one: 1
});
collection2.toArray(); // [{one:1}, {one:1}]</code></pre>
</div>
<div id="methods_whereNot">
    <h5 class="title-headline">#whereNot</h5>
    <p>The whereNot method is the same as the where method, except its results are negated.</p>
    <pre class="code code-section" is="code-snippet"><code class="language-javascript">var collection = factories.Collection([{
    one: 1
}, {
    one: 2
}, {
    one: 1
}, {
    one: 3
}]);
var collection2 = collection.whereNot({
    one: 1
});
collection2.toArray(); // [{one:2}, {one:3}]</code></pre>
</div>
