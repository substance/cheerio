/*
  Module dependencies
*/
import ElementType from 'domelementtype'
import entities from 'entities'

/*
  Boolean Attributes
*/
const booleanAttributes = {
  __proto__: null,
  allowfullscreen: true,
  async: true,
  autofocus: true,
  autoplay: true,
  checked: true,
  controls: true,
  default: true,
  defer: true,
  disabled: true,
  hidden: true,
  ismap: true,
  loop: true,
  multiple: true,
  muted: true,
  open: true,
  readonly: true,
  required: true,
  reversed: true,
  scoped: true,
  seamless: true,
  selected: true,
  typemustmatch: true
}

const unencodedElements = {
  __proto__: null,
  style: true,
  script: true,
  xmp: true,
  iframe: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  noscript: true
}

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
const singleTag = {
  __proto__: null,
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
}

/*
  Format attributes
*/
function formatAttribs(el, opts) {
  const attribs = el.attribs
  if (!attribs) return

  let output = []

  // Loop through the attributes
  for (var key in attribs) {
    // as 'class' and 'style' are computed dynamically we need to check if there are any values set
    // otherwise this will generate empty attributes
    if (key === 'class' && el.classes.size === 0) continue
    if (key === 'style' && el.styles.size === 0) continue

    let value = attribs[key]
    if (!value && booleanAttributes[key]) {
      output.push(key)
    } else {
      output.push(key + '="' + (opts.decodeEntities ? entities.encodeXML(value) : value) + '"')
    }
  }

  return output.join(' ')
}


function render(dom, opts) {
  if (!Array.isArray(dom)) dom = [dom]
  opts = opts || {}

  let output = []

  for(var i = 0; i < dom.length; i++){
    let elem = dom[i]

    if (elem.type === 'root') {
      output.push(render(elem.children, opts))
    } else if (ElementType.isTag(elem)) {
      output.push(renderTag(elem, opts))
    } else if (elem.type === ElementType.Directive) {
      output.push(renderDirective(elem))
    } else if (elem.type === ElementType.Comment) {
      output.push(renderComment(elem))
    } else if (elem.type === ElementType.CDATA) {
      output.push(renderCdata(elem))
    } else {
      output.push(renderText(elem, opts))
    }
  }

  return output.join('')
}

function renderTag(elem, opts) {
  // Handle SVG
  if (elem.name === "svg") opts = {decodeEntities: opts.decodeEntities, xmlMode: true}

  let tag = '<' + elem.name
  let attribs = formatAttribs(elem, opts)

  if (attribs) {
    tag += ' ' + attribs
  }

  if (
    opts.xmlMode
    && (!elem.children || elem.children.length === 0)
  ) {
    tag += '/>'
  } else {
    tag += '>'
    if (elem.children) {
      tag += render(elem.children, opts)
    }

    if (!singleTag[elem.name] || opts.xmlMode) {
      tag += '</' + elem.name + '>'
    }
  }

  return tag
}

function renderDirective(elem) {
  return '<' + elem.data + '>'
}

function renderText(elem, opts) {
  var data = elem.data || ''
  // if entities weren't decoded, no need to encode them back
  if (opts.decodeEntities && !(elem.parent && elem.parent.name in unencodedElements)) {
    data = entities.encodeXML(data)
  }
  return data
}

function renderCdata(elem) {
  return '<![CDATA[' + elem.children[0].data + ']]>'
}

function renderComment(elem) {
  return '<!--' + elem.data + '-->'
}

export default render
