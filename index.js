import chokidar from 'chokidar'
import figlet from 'figlet'
import fs from 'fs'
import liveServer from 'live-server'
import MarkdownIt from 'markdown-it'
import mdArrows from 'markdown-it-smartarrows'
import mdContainers from 'markdown-it-container'
// import mdHeaderSections from './md-plugins/section-headers'
import mdHeadings from 'markdown-it-headinganchor'
import mdReplacements from 'markdown-it-replacements'
import nodeSassTildeImporter from 'node-sass-tilde-importer'
import recursive from 'recursive-readdir'
import sassMiddleware from 'node-sass-middleware'
import taskLists from 'markdown-it-task-lists'
import toKebabCase from 'lodash/kebabCase'

figlet('Starting Jaunty!', (err, data) => {
  console.log(data)
})

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
    highlight( /* str, lang */ ) {
      return ''
    },
  })
  .use(mdReplacements)
  .use(taskLists, {
    label: true,
    labelAfter: true,
    enabled: true,
  })
  .use(mdArrows)
  .use(mdHeadings, {
    addHeadingID: true, // default: true
    addHeadingAnchor: true, // default: true
    slugify: str => `${toKebabCase(str)}`, // default: -> 'My-Heading'
  })
  // .use(mdHeaderSections)
  .use(mdContainers, 'section', {
    render(tokens,
      idx) {
      const m = tokens[idx].info.trim().match(/^section\s+(.*)$/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<section id="${md.utils.escapeHtml(m[1])}">\n`
      }
      // closing tag
      return '</section>\n'
    },
  })
  .use(mdContainers,
    'footer', {
      render(tokens,
        idx) {
        if (
          tokens[
            idx
          ]
          .nesting ===
          1
        ) {
          // opening tag
          return '<footer>\n'
        }
        // closing tag
        return '</section>\n'
      },
    })

const readBaseTemplate = () =>
  fs
  .readFileSync('base-template.html')
  .toString()

const baseTemplate = readBaseTemplate()

const renderPage = (path) => {
  console.log('File',
    path,
    'has been added')
  const page = path.split('/').pop()
  fs.readFile(path,
    'utf8',
    (err, data) => {
      fs.writeFileSync(
        `./build/${page.toLowerCase().replace('.md', '')}.html`,
        baseTemplate.split('{markdown}').join(md.render(data).replace(
          /(?<!<[^<>]*)&amp;/g,
          '<span class="amp asd">&</span>'), ),
        'utf8')
    })
}

recursive('./pages', (err, files) => {
  // `files` is an array of file paths
  files.forEach(renderPage)
})

if (process.env.SERVE) {
  const watcher = chokidar.watch(['./pages', './*.html'], {
    ignored: /^\./,
    persistent: process.env.SERVE || false,
  })

  watcher
    .on('add', renderPage)
    .on('change', renderPage)
    .on('unlink', (path) => {
      console.log('File',
        path,
        'has been removed')
    })
    .on('error',
      (error) => {
        console.error('Error happened', error)
      })
    .on('ready', () => console.log('ready'))

  const sassServer = sassMiddleware({
    /* Options */
    src: `${__dirname}/assets`,
    response: true,
    dest: './build',
    importer: nodeSassTildeImporter,
    outputStyle: 'extended',
  })

  const params = {
    port: 3003, // Set the server port. Defaults to 8080.
    host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: './build', // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    ignore: 'pages', // comma-separated string for paths to ignore
    file: 'index.html', // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [
      sassServer,
    ],
  }

  liveServer.start(params)
}
