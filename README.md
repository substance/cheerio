# substance-cheerio

A light-weight DOM implementation build on top of [htmlparser2](https://github.com/fb55/htmlparser2)

> TODO: as this not related to cheerio anymore we should rename the project.

Example:

```
import { parseHTML } from 'substance-cheerio'
let elements = parseHTML('<p>Hello <b>World</b>!</p>')
let p = elements[0]
let b = p.find('b')
console.log(b.getTextContent())
```
