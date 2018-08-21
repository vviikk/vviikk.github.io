module.exports = function headerSections(md) {
  function headingLevel(header) {
    return parseInt(header.charAt(1), 10)
  }

  function last(arr) {
    return arr.slice(-1)[0]
  }

  function addSections(state) {
    const tokens = [] // output
    const { Token } = state
    const sections = []
    let nestedLevel = 0

    function openSection(attrs) {
      const t = new Token('section_open', 'section', 1)
      t.block = true
      t.attrs = attrs && attrs.map(attr => [attr[0], attr[1]]) // copy
      return t
    }

    function closeSection() {
      const t = new Token('section_close', 'section', -1)
      t.block = true
      return t
    }

    function closeSections(section) {
      while (
        last(sections) && section.header <= last(sections).header
      ) {
        sections.pop()
        tokens.push(closeSection())
      }
    }

    function closeSectionsToCurrentNesting(nesting) {
      while (
        last(sections) && nesting < last(sections).nesting
      ) {
        sections.pop()
        tokens.push(closeSection())
      }
    }

    function closeAllSections() {
      while (sections.pop()) {
        tokens.push(closeSection())
      }
    }

    for (let i = 0, l = state.tokens.length; i < l; i++) {
      const token = state.tokens[i]

      // record level of nesting
      if (
        token.type.search('heading') !== 0
      ) {
        nestedLevel += token.nesting
      }
      if (
        last(sections) &&
        nestedLevel <
        last(sections).nesting
      ) {
        closeSectionsToCurrentNesting(nestedLevel)
      }

      // add sections before headers
      if (token.type === 'heading_open') {
        const section = {
          header: headingLevel(token.tag),
          nesting: nestedLevel,
        }
        if (
          last(sections) &&
          section.header <= last(sections).header
        ) {
          closeSections(section)
        }
        // console.log(section, nestedLevel, wrapSections)
        tokens.push(openSection(token.attrs))
        if (token.attrIndex('id') !== -1) {
          // remove ID from token
          token.attrs.splice(token.attrIndex('id'), 1)
        }
        sections.push(section)
      }

      tokens.push(token)
    } // end for every token
    closeAllSections()

    state.tokens = tokens
  }

  md.core.ruler.push('header_sections', addSections)
}
