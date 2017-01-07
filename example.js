import { parseHTML, parseXML } from './src/xdom'

let els = parseHTML('<p>Foo <span class="anno">Bar</span> sad asd <span class="anno">asd</span> asd asd </p>')
console.log("Parsed: ", els)

let p = els[0]
let anno = p.find('.anno')
console.log("Anno: ", anno)
console.log('OuterHTML: ', p.getOuterHTML())

els = parseXML('<MyNode>Foo <MyAnno class="anno">Bar</MyAnno> sad asd <MyAnno class="anno">asd</MyAnno> asd asd </MyNode>')
console.log('Parsed XML:', els)