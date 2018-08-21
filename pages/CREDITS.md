
#### Credits

- [CSS4 Variables and Sass by Jake Albaugh on CodePen](https://codepen.io/jakealbaugh/post/css4-variables-and-sass).
- [CSS System Font Stack Monospace v2](https://www.client9.com/css-system-font-stack-monospace-v2/).
- [Custom domains on GitHub Pages gain support for HTTPS](https://blog.github.com/2018-05-01-github-pages-custom-domains-https/).
- [Shipping system fonts to GitHub.com · @mdo](http://markdotto.com/2018/02/07/github-system-fonts/).
- [Vertical Rhythm Reset](http://jhildenbiddle.github.io/vertical-rhythm-reset/).
- [Nesting in Sass and Less · @mdo](http://markdotto.com/2015/07/20/css-nesting/).
- [How to Deploy Websites on Custom Domains using Cloudflare and Github Pages](https://medium.com/crowdbotics/annie-azana-how-to-deploy-websites-using-cloudflare-and-github-pages-c415c55fea36).

#### FAQ (for geeky souls)

- [ ] **What technologies are being used to build this resume?**
  Absolutely no Javascript is used in the browser. The resume is based on one markdown file and spell-checked and built using markdown by my trusty TravisCI. I use Neovim for coding, and (mostly) node to build.
- [ ] **Why are you using CSS variables in SCSS? Are you mad?**
  CSS variables can be inherited and scoped. This allows me to achieve things like changing the background and all other elements on the page with _zero_ javascript based on the `:checked` pseudo selector (still finding the perfect solution). I feel that I'm going to just use CSS variables for now rather than SCSS from now on - why? Because I'm debugging variable changes in the browser where it belongs.
- [ ] **Are you available for work?**
  Yes.
- [ ] **The README.md file seems to be in a different order. Is this intentional?**
  Yes, I used flex-ordering and sibling selectors (~) to re-order sections.
- [ ] **That seems like overkill. Why couldn't you just wrap each section in a `&lt;section class="interests">` tag and style them that way?**
  I think the world has a Resume problem. Linkedin, Stack Overflow Jobs, and the list goes on. I want a simple and editable format like Markdown that is easy to edit. I am working on a script that uses PhantomJS and Casper to scrape my LinkedIn profile and get all the info. Till then, a flat markdown file would do just fine. Also, it was a lot of fun using flex-ordering!
