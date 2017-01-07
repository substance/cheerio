
import cssSelect from 'css-select'
import attributes from 'css-select/lib/attributes'
import boolbase from 'boolbase'
import ElementType from 'domelementtype'
import DomUtils from 'domutils'

import XDomHandler from './XDomHandler'
import Parser from './Parser'
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

export function createElement(owner, tagName) {
  return new XNode(ElementType.Tag, { name: tagName })
}

export function cloneElement(el) {
  return el.clone()
}

export function createTextNode(owner, text) {
  return new XNode(ElementType.Text, text)
}

export function getAttribute(el, name) {
  return el.attribs[name]
}

export function setAttribute(el, name, value) {
  el.attribs[name] = value
}

export function removeAttribute(el, name) {
  delete el.attribs[name]
}

export function setProperty(el, name, value) {
  el.props[name] = value
}

export function getProperty(el, name) {
  return el.props[name]
}

export function removeProperty(el, name) {
  if (el.props.hasOwnProperty(name)) {
    delete el.props[name]
  }
}

export function hasClass(el, name) {
  return el.classes.has(name)
}

export function addClass(el, name) {
  el.classes.add(name)
}

export function removeClass(el, name) {
  el.classes.delete(name)
}

export function getInnerHTML(el) {
  return DomUtils.getInnerHTML(el)
}

export function setInnerHTML(el, html) {
}

export function getOuterHTML(el) {
  return DomUtils.getOuterHTML(el)
}

export function getTextContent(el) {
  return DomUtils.getText(el)
}

export function setTextContent(el, text) {
  let child = createTextNode(el, text)
  removeAllChildren(el)
  appendChild(el, child)
}

export function getValue(el) {
  return el.data
}

export function setValue(el, value) {
  el.data = value
}

export function getStyle(el, name) {
  return el.styles[name]
}

export function setStyle(el, name, value) {
  el.styles[name] = value
}

export function is(el, cssSelector) {
  return cssSelect.is(el, cssSelector)
}

export function find(el, cssSelector) {
  return cssSelect.selectOne(cssSelector, el)
}

export function findAll(el, cssSelector) {
  return cssSelect.selectAll(cssSelector, el)
}

export function appendChild(el, child) {
  DomUtils.appendChild(el, child)
}

export function insertAt(el, pos, child) {
  let children = el.children
  // NOTE: manipulating htmlparser's internal children array
  if (pos >= children.length) {
    DomUtils.appendChild(el, child)
  } else {
    DomUtils.append(children[pos], child)
  }
}

export function removeAt(el, pos) {
  let children = el.children
  let child = children[pos]
  DomUtils.removeElement(child)
}

export function removeAllChildren(el) {
  let children = el.children
  children.forEach((child) => {
    child.next = child.prev = child.parent = null
  })
  children.length = 0
}

export function removeElement(el) {
  DomUtils.removeElement(el)
}

export function replaceElement(el, newEl) {
  DomUtils.replaceElement(el, newEl)
}

export function parseHTML(html) {
  let handler = new XDomHandler()
  new Parser(handler).end(html)
  return handler.dom
}

export function parseXML(xml) {
  let handler = new XDomHandler()
  new Parser(handler, {xmlMode: true}).end(xml)
  return handler.dom
}
