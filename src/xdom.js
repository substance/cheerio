import attributes from 'css-select/lib/attributes'
import boolbase from 'boolbase'
import XNode from './XNode'

// monkey patching css-select to reflect difference in how classes are stored
// Note: in XNode classes are stored in a Set instead of a string
const falseFunc = boolbase.falseFunc
const _elementRule = attributes.rules.element
attributes.rules.element = function(next, data) {
  if (data.name === 'class') {
    let value = data.value
    if (/\s/.test(value)) return falseFunc
    return function clazz(elem) {
      let classes = elem.classes
      return classes && classes.has(value) && next(elem)
    }
  } else {
    return _elementRule(next, data)
  }
}

export { XNode }

export function parseHTML(html) {
  return XNode.parseMarkup(html, { format: 'html' })
}

export function parseXML(xml) {
  return XNode.parseMarkup(xml, { format: 'xml' })
}
