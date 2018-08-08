import arrows from 'markdown-it-smartarrows'
import chokidar from 'chokidar'
import fs from 'fs'
import headings from 'markdown-it-headinganchor'
import liveServer from 'live-server'
import MarkdownIt from 'markdown-it'
import mdContainers from 'markdown-it-container'
import nodeSassTildeImporter from 'node-sass-tilde-importer'
import sassMiddleware from 'node-sass-middleware'
import taskLists from 'markdown-it-task-lists'
import toKebabCase from 'lodash/kebabCase'

// full options list (defaults)
const md = new MarkdownIt({
  html: true,
  xhtmlOut: false,
  linkify: true,

  breaks: true,
  // Enable some language-neutral replacement + quotes beautification
  typographer: true,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight(/* str, lang */) { return '' },
})
  .use(taskLists, { label: true, labelAfter: true, enabled: true })
  .use(arrows)
  .use(headings, {
    addHeadingID: true, // default: true
    addHeadingAnchor: true, // default: true
    slugify: str => `${toKebabCase(str)}`, // default: -> 'My-Heading'
  })
  .use(mdContainers, 'section', {
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^section\s+(.*)$/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<section id="${md.utils.escapeHtml(m[1])}">\n`
      }
      // closing tag
      return '</section>\n'
    },
  })

const readBaseTemplate = () => fs.readFileSync('base-template.html').toString()


const baseTemplate = readBaseTemplate()

const renderPage = (path) => {
  console.log('File', path, 'has been added')
  const page = path.split('/').pop()
  fs.readFile(path, 'utf8', (err, data) => {
    fs.writeFileSync(
      `./build/${page.toLowerCase().replace('.md', '')}.html`,
      baseTemplate.split('{markdown}').join(md.render(data)),
      'utf8'
    )
  })
}

const watcher = chokidar.watch(['./pages', './*.html'], { ignored: /^\./, persistent: true })

watcher
  .on('add', renderPage)
  .on('change', renderPage)
  .on('unlink', (path) => { console.log('File', path, 'has been removed') })
  .on('error', (error) => { console.error('Error happened', error) })

const sassServer = sassMiddleware({
  /* Options */
  src: `${__dirname}/assets`,
  response: false,
  dest: './build',
  importer: nodeSassTildeImporter,
  outputStyle: 'extended',
})

if (process.env.SERVE) {
  const params = {
    port: 3003, // Set the server port. Defaults to 8080.
    host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: './build', // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    ignore: 'scss,pages', // comma-separated string for paths to ignore
    file: 'index.html', // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [sassServer],
  }

  liveServer.start(params)
}
