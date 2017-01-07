import ElementType from 'domelementtype'

class XNode {
  constructor(type, args) {
    this.type = type
    let self = this
    switch(type) {
      case ElementType.Tag: {
        this.name = args.name
        this.attribs = {
          get class() {
            return stringifyClasses(self.classes)
          },
          set class(classNames) {
            self.classes = parseClasses(classNames)
          },
          get style() {
            return stringifyStyles(self.styles)
          },
          set style(style) {
            self.styles = parseStyles(style)
          }
        }
        this.classes = new Set()
        this.styles = new Map()
        this.props = {}
        this.eventListeners = []
        this.children = []
        if (args.attribs) {
          Object.assign(this.attribs, args.attribs)
        }
        break
      }
      case ElementType.Text:
      case ElementType.Comment: {
        this.data = args.data || ''
        break
      }
      case ElementType.CDATA: {
        this.children = args.children || []
        break
      }
      case ElementType.Directive: {
        this.name = args.name
        this.data = args.data
        break
      }
      default:
        //
    }
  }
}

function parseClasses(classNames) {
  return new Set(classNames.split(/\s+/))
}

function stringifyClasses(classes) {
  return Array.from(classes).join(' ')
}

function parseStyles(styles) {
  styles = (styles || '').trim()
  if (!styles) return {}
  return styles
    .split(';')
    .reduce(function(obj, str){
      var n = str.indexOf(':')
      // skip if there is no :, or if it is the first/last character
      if (n < 1 || n === str.length-1) return obj
      obj[str.slice(0,n).trim()] = str.slice(n+1).trim()
      return obj
    }, new Map())
}

function stringifyStyles(styles) {
  if (!styles) return ''
  let str = Object.keys(styles).map((name) => {
    return name + ':' + styles[name]
  }).join(';')
  if (str.length > 0) str += ';'
  return str
}


export default XNode