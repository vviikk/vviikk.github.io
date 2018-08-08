import MarkdownIt from 'markdown-it'
import fs from 'fs'

// full options list (defaults)
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
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
});

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
