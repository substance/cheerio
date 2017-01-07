import { parseHTML, find , getOuterHTML } from './src/xdom'

let els = parseHTML('<p>Foo <span class="anno">Bar</span> sad asd <span class="anno">asd</span> asd asd </p>')
console.log("Parsed: ", els)

let p = els[0]
let anno = find(p, '.anno')
console.log("Anno: ", anno)

console.log('OuterHTML: ', getOuterHTML(p))
