# backbone-virtualcollection-split

Automatically split a Backbone collection into multiple Virtual Collections based on a key.

## Usage

```js
var SplitCollection = require('backbone-virtualcollection-split');
var collection = new Backbone.Collection([{
    date: '2015-07-10',
    name: 'zaico'
}, {
    date: '2015-07-10',
    name: 'japser'
}, {
    date: '2015-07-07',
    name: 'henk'
}, {
    date: '2015-07-07',
    name: 'de vries'
}]);

var foo = new SplitCollection(collection, '');
```
