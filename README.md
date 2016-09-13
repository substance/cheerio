# substance-cheerio

A customized and pre-bundled version of [cheerio](https://github.com/cheeriojs/cheerio).

Example:

```
var $ = require('substance-cheerio')
var $el = $('<div>').addClass('foo').attr('data-id', 'foo')
$el.append($('<span>').text('blupp'))
```
