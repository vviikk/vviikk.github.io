import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import headings from 'markdown-it-headinganchor';
import arrows from 'markdown-it-smartarrows';
import fs from 'fs'
import toKebabCase from 'lodash/kebabCase';

// full options list (defaults)
const md = new MarkdownIt({
  html: true,
  xhtmlOut: false,
  linkify: true,
  typographer: true,
  breaks: true,
  // Enable some language-neutral replacement + quotes beautification
  typographer:  true,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
})
.use(taskLists, {label: true, labelAfter: true, enabled: true })
.use(arrows)
.use(headings, {
  addHeadingID: true,           // default: true
  addHeadingAnchor: true,       // default: true
  slugify: str => `${toKebabCase(str)}`, // default: -> 'My-Heading'
})

const pages = ['INDEX.md']

const baseTemplate = fs.readFileSync('base-template.html').toString()

pages.forEach((page) => {
  fs.readFile('./pages/' + page, 'utf8', (err, data)=> {
    fs.writeFileSync(
      './build/'+ page.toLowerCase().replace('.md', '')+'.html',
      baseTemplate.split('{markdown}').join(md.render(data)),
      'utf8'
    )
  });
})
