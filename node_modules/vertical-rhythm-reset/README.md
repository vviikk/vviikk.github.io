# Vertical Rhythm Reset

[![NPM](https://img.shields.io/npm/v/vertical-rhythm-reset.svg?style=flat-square)](https://www.npmjs.com/package/vertical-rhythm-reset)
[![Codacy grade](https://img.shields.io/codacy/grade/594f7908b74a4e89bc3cb3265f966c52.svg?style=flat-square)](https://www.codacy.com/app/jhildenbiddle/vertical-rhythm-reset?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jhildenbiddle/vertical-rhythm-reset&amp;utm_campaign=Badge_Grade)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/vertical-rhythm-reset/blob/master/LICENSE)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fvertical-rhythm-reset&hashtags=css,sass,scss,frontend)

The perfect starting point for CSS normalization, responsive vertical rhythm grids and modular scale typography.

Simple implementation, flexible customization options, optimized CSS output, smart mixins for effortless grid alignment and a range of helper classes provide a robust and maintainable foundation on which to build upon.

- [Home Page](http://jhildenbiddle.github.io/vertical-rhythm-reset/)
- [SassDocs](http://jhildenbiddle.github.io/vertical-rhythm-reset/sassdoc/)

------

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Customization](#customization)
- [Mixins](#mixins)
- [Browser Compatibility](#browser-compatibility)
- [Credits & Attribution](#credits--attribution)
- [Contact](#contact)
- [License](#license)

------

## Requirements

- LibSass 3.2+
- Ruby Sass 3.4+

## Installation

Download using [NPM](https://www.npmjs.com/):

```shell
npm install vertical-rhythm-reset
```

Download using [Bower](http://bower.io/):

```shell
bower install vertical-rhythm-reset
```

Clone this repository:

```shell
git clone https://github.com/jhildenbiddle/vertical-rhythm-reset.git
```

[Download](https://github.com/jhildenbiddle/vertical-rhythm-reset/archive/master.zip) the latest source code in zip format.

## Quick Start

**Default Settings**

The default settings provide a sensible starting point for new projects:

- CSS reset and normalization of all HTML5 elements
- A base font-size of 14px
- A base line-height equivalent of 21px (1.5rem)
- Two breakpoints configured for responsive typography and vertical rhythm grids:
  1. At 60em (960px):
     - Font size is increased to 16px
     - Line height adjusts to 24px (1.5rem)
  2. At 90em (1440px):
     - Font size increases to 18px
     - Line height adjusts to 27px (1.5rem)

**Applying the vertical rhythm reset**

1. Import Vertical Rhythm Reset.

   ```scss
   @import "path/to/vertical-rhythm-reset";
   ```

2. Call the `vr-reset()` [mixin](#vr-reset) at the root to generate the CSS reset/normalization rules:

   ```scss
   @include vr-reset();
   ```

3. Use the `vr()` [mixin](#vr) when specifying font-size, height, margins, padding and border offers to align elements to the vertical rhythm grid:

   ```scss
   .myclass {
     @include vr(
       $font-size: 2,
       $height   : 5,
       $margin   : 1,
       $padding  : 1
     );
   }
   ```

4. Use the  the `vr-grid()` [mixin](#vr-grid) to view the vertical rhythm grid overlay.

   ```scss
   body {
     @include vr-grid();
   }
   ```

## Customization

There are many configuration options available that allow you to customize the Vertical Rhythm Reset as you see fit. The sections below provide an overview of how to configure settings. For complete details on variable and mixin settings, please review the [SassDoc documentation](http://jhildenbiddle.github.io/vertical-rhythm-reset/sassdoc/).

### Box Sizing

The `$vr-box-sizing` global variable is used to generate a CSS rule that applies the box-sizing method to all elements when the `vr-reset()` [mixin](#vr-reset) is called. The box-sizing method is also used in the `vr()` [mixin](#vr) to calculate border offset values.

**SCSS**

```scss
$vr-box-sizing: border-box;
```

**CSS Output**

```css
*,
*:before,
*:after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}
```

### Vertical Rhythm Grid

A vertical rhythm grid provides symmetry to your project by aligning elements to an invisible-yet-recognizable visual layout pattern.

The height of a grid row is calculated by multiplying the font-size by the line-height. The result is then converted to a `rem`-based value and applied to all elements using a `*` selector rule.

To configure the base vertical rhythm grid, set the font-size and line-height using the `$vr-font-size` and `$vr-line-height` global variables before calling the `vr-reset()` mixin.

**SCSS**

```scss
$vr-font-size  : 14px;
$vr-line-height: 1.5;
```

**CSS Output**

```css
:root {
  font-size: 14px;
}

*,
*:before,
*:after {
  line-height: 1.5rem;
}
```

Use the `vr()` [mixin](#vr) to set element height, margin and padding to multiples of the vertical rhythm grid row height to ensure alignment. The `vr()` [mixin](#vr) also calculates offset rules to allow bordered elements to align to the vertical rhythm grid.

### Modular Scale Typography

Modular scale typography provides a harmonious range of proportional font sizes. This calculated range of font sizes also helps answer the question, "What font-sizes should I use for this project?" and allows changing these sizes project-wide by modifying a single global variable.

The `$vr-modular-scale-map` global variable contains a list of modular type scale names and their ratios. As the ratio increases, so does the size difference between each font size.

The `$vr-modular-scale` global variable sets the modular type scale used to calculate modular scale font sizes.

**SCSS**

```scss
// List of modular scale names and values
$vr-modular-scale-map: (
    minor-second    : 1.067, // Ratio = 15:16
    major-second    : 1.125, // Ratio = 8:9
    minor-third     : 1.2,   // Ratio = 5:6
    major-third     : 1.25,  // Ratio = 4:5
    perfect-fourth  : 1.333, // Ratio = 3:4
    augmented-fourth: 1.414, // Ratio = 1:√2
    perfect-fifth   : 1.5,   // Ratio = 2:3
    minor-sixth     : 1.6,   // Ratio = 5:8
    golden          : 1.618, // Ratio = 1:1.618
    major-sixth     : 1.667, // Ratio = 3:5
    minor-seventh   : 1.778, // Ratio = 9:16
    major-seventh   : 1.875, // Ratio = 8:15
    octave          : 2      // Ratio = 1:2
);

// Set the desired modular scale by name or numeric value
$vr-modular-scale: minor-third;
```

Use the `vr()` [mixin](#vr) to set the font-size of elements to a modular scale multiple. The mixin will calculate the number of vertical rhythm rows a given font size should occupy.

### Responsive Layouts

The `$vr-breakpoints` global variable is a map that contains breakpoint settings used to generate media queries and recalculate values for responsive layouts.

**Configuration:**

- Copy one of the example maps below as your starting point
- Modify the map keys and values as needed (see the [SassDoc documentation](http://jhildenbiddle.github.io/vertical-rhythm-reset/sassdoc/) for details)
  - The top-level key is the `min-width` media query value
  - The nested properties and values specify the settings to use for a given breakpoint
  - Only settings that change between breakpoints need to be specified
  - Any settings not for a breakpoint will inherit the value from the previous breakpoint
- Set the value to `false` to disable responsive typography and vertical rhythm grids

**Tips**

1. Font-size and line-height values can have a significant impact on the generated CSS output. To keep the CSS output as lightweight as possible, maintain a consistent line-height across breakpoints and use font-size values that equal whole numbers when multiplied by the line-height. This will allow the `rem`-based values generated for the root breakpoint to work across all breakpoints which removes the need to generate recalculated values for every media query.
2. Use the `vr-grid()` [mixin](#vr-grid) to visualize the vertical rhythm grid settings. For a stronger breakpoint change indicator, consider specifying unique `grid-color` for each breakpoint.

**SCSS**

```scss
// Example 1: Default settings
$vr-breakpoints: (
    60em: ( // 960px
        font-size: 16px
    ),
    90em: ( // 1440px
        font-size: 18px
    )
);

// Example 2: Kitchen Sink
$vr-breakpoints: (
    60em: ( // 960px
        font-size    : 16px,
        line-height  : 1.4,
        modular-scale: major-third,
        grid-color   : purple
    ),
    90em: ( // 1440px
        font-size    : 18px,
        line-height  : 1.3,
        modular-scale: perfect-fourth,
        grid-color   : blue
    )
);
```

### Helper Classes & Rules

The `$vr-helpers` global variable is a map that contains settings used to generate vertical rhythm helper CSS rules and classes. These CSS rules and classes provide a convenient way to set typography and vertical rhythm properties using CSS class names and HTML properties (instead of or in addition to doing the same in SCSS).

**Configuration**

- Copy one of the maps below as your starting point
- Modify the map keys and values as needed (see the [SassDoc documentation](http://jhildenbiddle.github.io/vertical-rhythm-reset/sassdoc/) for details)
  - The top-level key is the property which CSS classes will be generated for
  - `count` is the number of variations to generate
  - `prefix` is the portion of the generated class name that will precede the numeric value
  - `suffix` is the portion of the generated class name that will proceed the numeric value
- Set the value to `false` to disable responsive typography and vertical rhythm grids

**Tips**

1. If you don't intent to use these helper classes and rules, set the `$vr-helpers` value to `false`. This will prevent helper classes and rules from being generated which will reduce the size of `vr-reset()` mixin output.
2. Offset classes work by adjusting the top position and the bottom margin. This means that applying both a bottom offset and margin class to the same element can result in a conflict. To avoid this conflict, consider using one of the following approaches for applying a bottom offset and bottom margin to the same element:
   - Wrap the element in a parent tag, then apply the offset class to the main element and the margin class(es) to the parent element.
   - Use the `vr()` [mixin](#vr) instead of helper classes. The mixin accounts for this scenario and adjust the generated CSS output accordingly.

**SCSS**

```scss
$vr-helpers: (
    font-size: (
        count : 5,
        prefix: "vr-font-size-"
    ),
    line-height: (
        count : 10,
        prefix: "vr-line-height-"
    ),
    height: (
        count : 10,
        prefix: "vr-height-"
    ),
    width: (
        count : 10,
        prefix: "vr-width-"
    ),
    margin: (
        count : 5,
        prefix: "vr-margin-"
    ),
    margin-top: (
        count : 5,
        prefix: "vr-margin-top-"
    ),
    margin-bottom: (
        count : 5,
        prefix: "vr-margin-bottom-"
    ),
    padding: (
        count : 5,
        prefix: "vr-padding-"
    ),
    padding-top: (
        count : 5,
        prefix: "vr-padding-top-"
    ),
    padding-bottom: (
        count : 5,
        prefix: "vr-padding-bottom-"
    ),
    offset: (
        count : 5,
        prefix: "vr-offset-"
    ),
    offset-top: (
        count : 5,
        prefix: "vr-offset-top-"
    ),
    offset-bottom: (
        count : 5,
        prefix: "vr-offset-bottom-"
    )
);
```

**CSS Output**

```css
/*
  Sample output from $vr-helpers map with default settings.
  Showing first iteration only as an example.
*/

/* Font Size (0 through "count")*/
.vr-font-size-0 {
  font-size: 1rem;
  line-height: 1.5rem;
}

/* Line Height (1 through "count") */
.vr-line-height-1 {
  line-height: 1.5rem;
}

/* Height (1 through "count") */
[height="1"],
select[multiple][size="1"],
textarea[rows="1"],
.vr-height-1 {
  height: 1.5rem;
}

/* Width (1 through "count") */
.vr-width-1 {
  width: 1.5rem;
}

/* Margin (1 through "count") */
.vr-margin-1 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.vr-margin-top-1 {
  margin-top: 1.5rem;
}
.vr-margin-bottom-1 {
  margin-bottom: 1.5rem;
}

/* Padding (1 through "count") */
.vr-padding-1 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.vr-padding-top-1 {
  padding-top: 1.5rem;
}
.vr-padding-bottom-1 {
  padding-bottom: 1.5rem;
}

/* Border Offsets (1 through "count") */
.vr-offset-1 {
  -webkit-transform: translateY(-1px);
      -ms-transform: translateY(-1px);
          transform: translateY(-1px);
  margin-bottom: -2px;
}
.vr-offset-top-1 {
  -webkit-transform: translateY(-1px);
      -ms-transform: translateY(-1px);
          transform: translateY(-1px);
  margin-bottom: -1px;
}
.vr-offset-bottom-1 {
  margin-bottom: -1px;
}
```

**HTML**

```html
<div class="vr-font-size-1">...</div>
<div class="vr-line-height-1">...</div>
<div class="vr-height-1">...</div>
<div class="vr-width-1">...</div>
<div class="vr-margin-1">...</div>
<div class="vr-margin-top-1">...</div>
<div class="vr-margin-bottom-1">...</div>
<div class="vr-padding-1">...</div>
<div class="vr-padding-top-1">...</div>
<div class="vr-padding-bottom-1">...</div>
<div class="vr-offset-1">...</div>
<div class="vr-offset-top-1">...</div>
<div class="vr-offset-bottom-1">...</div>
```

## Mixins

### vr-reset()

Generates the CSS reset/normalization, vertical rhythm grid and CSS helpers rules and classes. Also generates media queries and recalculated breakpoint values when provided.

This mixin is typically called at the root of your SCSS file without any arguments specified. This allows the mixin to use the values specified with `$vr-font-size`, `$vr-line-height`, `$vr-modular-scale`,`$vr-grid-color`, `$vr-breakpoints` and `$vr-helpers` variables. As a convenience, this mixin allows setting these global variables by passing the desired values as arguments.

See [SassDoc documentation](http://jhildenbiddle.github.io/vertical-rhythm-reset/sassdoc/) for additional details.

**Arguments (Optional)**

| Name             | Description                           | Type                       | Default             |
| ---------------- | ------------------------------------- | -------------------------- | ------------------- |
| `$box‑sizing`    | Box sizing method                     | String                     | `$vr‑box‑sizing`    |
| `$font‑size`     | Root element font size                | Number, Length(px\|rem\|%) | `$vr‑font‑size`     |
| `$line‑height`   | Line height                           | Number, Length(px\|rem\|%) | `$vr‑line‑height`   |
| `$modular‑scale` | Modular type scale                    | Number, String             | `$vr‑modular‑scale` |
| `$grid‑color`    | Vertical rhythm grid color            | Color                      | `$vr‑grid‑color`    |
| `$breakpoints`   | Breakpoint settings                   | Map\|`false`               | `$vr‑breakpoints`   |
| `$helpers`       | Helper CSS rules and classes settings | Map\|`false`               | `$vr‑helpers`       |

**SCSS: Global Variables**

```scss
// Global variables
$vr-box-sizing   : border-box;
$vr-font-size    : 14px;
$vr-line-height  : 1.5;
$vr-modular-scale: minor-third;
$vr-grid-color   : rgb(233, 30, 99);
$vr-breakpoints  : (...);
$vr-helpers      : (...);

// Call the mixin at root
@include vr-reset();
```

**SCSS: Mixin Arguments**

```scss
 // Call the mixin at root with arguments
 // Global variables will be updated with values provided
 // Omitted values will default to default values
 @include vr-reset(
   $box-sizing   : border-box,
   $font-size    : 14px,
   $line-height  : 1.5,
   $modular-scale: minor-third,
   $grid-color   : rgb(233, 30, 99),
   $breakpoints  : (...),
   $helpers      : (...)
 );
```

### vr-grid()

Renders the vertical rhythm grid as a background image and applies a highlight color as a semi-transparent background to all child elements.

See [SassDoc documentation](http://jhildenbiddle.github.io/vertical-rhythm-reset/sassdoc/) for additional details.

**Arguments**

| Name         | Description                              | Type    | Default          |
| ------------ | ---------------------------------------- | ------- | ---------------- |
| `$color`     | Grid line and element highlight color    | Color   | `$vr‑grid‑color` |
| `$lines`     | Displays vertical rhythm grid lines      | Boolean | `true`           |
| `$highlight` | Sets the background color of all elements to a semi-transparent variation of the grid color specified to help verify alignment with the vertical rhythm grid. | Boolean | `true`           |
| `$detail`    | Displays a floating panel with the active breakpoint width, font-size, line-height and modular scale. This is rendered as pseudo content (`:before`) on the `<body>` element. | Boolean | `true`           |

**SASS**

```scss
// Call the vertical rhythm reset mixin at root
@include vr-reset();

// Call the grid mixin
body {
  @include vr-grid();
}
```

### vr()

Generates CSS rules for vertical rhythm grid alignment and modular scale typography. Use this mixin to specify CSS properties and values to ensure elements align to the vertical rhythm grid.

See [SassDoc documentation](http://jhildenbiddle.github.io/vertical-rhythm-reset/sassdoc/) for additional details.

**Arguments**

- **font-size**: Setting the font-size with this mixin provides calculated modular type scale sizes and the necessary line height for vertical rhythm alignment. *Unit-less* values represent `rem`-based modular type scale multiples (0, 1, 2, etc). *Unit* values (18px, 80%, etc.) will be converted to `rem` units.
- **height**: Setting the height with this mixin allows specifying values as a multiple of vertical rhythm grid rows and for calculating the top/bottom margins required for fixed-height (px) elements. *Unit-less* values will be converted to a `rem`-based height equivalent of vertical rhythm rows. *Unit* values (px) will be applied unchanged with margin values calculated to ensure the fixed-height element aligns to the vertical rhythm grid.
- **margin and padding**: Setting margins and padding with this mixin allows specifying values as a multiple of vertical rhythm grid rows. *Unit-less* values will be converted to a `rem`-based height equivalent of vertical rhythm rows. *Unit* values (px) will be applied unchanged. The `$margin` and `$padding` arguments both accept [CSS shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) notation for convenience.
- **offset**: Setting the border offset with this mixin allows elements with borders to align to the vertical rhythm grid. *Unit-less* values will be converted to `px`-based values. *Unit* values (px) will be applied unchanged. The `$offset` argument accepts a single value as the top/bottom values or two values as separate top and bottom values.

| Name              | Description                              | Type                       | Default |
| ----------------- | ---------------------------------------- | -------------------------- | ------- |
| `$font‑size`      | Modular scale font size (number) or custom font size (px\|rem\|%) | Length(px\|rem\|%), Number | `null`  |
| `$line-height`    | Line height                              | Number                     | `null`  |
| `$height`         | Vertical rhythm row height (number) or fixed height (px) | Length(px), Number         | `null`  |
| `$width`          | Width                                    | Number                     | `null`  |
| `$margin`         | Margin ([shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)) | Length\|List\|Number       | `null`  |
| `$margin‑top`     | Margin top                               | Length\|Number             | `null`  |
| `$margin‑bottom`  | Margin bottom                            | Length\|Number             | `null`  |
| `$margin‑right`   | Margin right                             | Length\|Number             | `null`  |
| `$margin‑left`    | Margin left                              | Length\|Number             | `null`  |
| `$padding`        | Padding ([shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)) | Length\|List\|Number       | `null`  |
| `$padding‑top`    | Padding top                              | Length\|Number             | `null`  |
| `$padding‑bottom` | Padding bottom                           | Length\|Number             | `null`  |
| `$padding‑right`  | Padding right                            | Length\|Number             | `null`  |
| `$padding‑left`   | Padding left                             | Length\|Number             | `null`  |
| `$offset`         | Border offset (top\|top  bottom)         | Length(px)\|List\|Number   | `null`  |
| `$offset‑top`     | Border offset top                        | Length(px)\|Number         | `null`  |
| `$offset‑bottom`  | Border offset bottom                     | Length(px)\|Number         | `null`  |

**SCSS**

```scss
// Set the height to modular type scale multiple of 5
.text {
  @include vr($font-size: 5);
}

// Set the height to 3 vertical rhythm grid rows
.height {
  @include vr($height: 3);
}

// Set the height and width to 5 vertical rhythm grid rows and center the text
.square-centered-text {
  @include vr(
    $height: 5,
    $width: 5,
    $line-height: 5
  );

  text-align: centered;
}

// Set the top and bottom margin to 1 vertical rhythm grid row
.margins {
  @include vr(
    $margin-top   : 1,
    $margin-bottom: 1
  );
}

// Margin shorthand for top/bottom (1) and left/right (10px)
.margins-shorthand {
  @include vr($margin: 1 10px);
}

// Set the top and bottom padding to 1 vertical rhythm grid row
.padding {
  @include vr(
    $padding-top   : 1,
    $padding-bottom: 1
  );
}

// Padding shorthand for top/bottom (1) and left/right (10px)
.padding-shorthand {
  @include vr($padding: 1 10px);
}

// Set the border offset values to match the top/bottom border
.border-offset {
  @include vr(
    $offset-top   : 3px,
    $offset-bottom: 2px
  );

  border-top: 3px solid red;
  border-bottom: 2px solid blue;
}

// Set multiple values using shorthand for margin, padding and offset
.kitchen-sink {
  @include vr(
    $font-size: 5,
    $height   : 3,
    $margin   : 1 10px,
    $padding  : 1 10px,
    $offset   : 3px 2px
  );

  border-top: 3px solid red;
  border-bottom: 2px solid blue;
}
```

## Browser Compatibility

Vertical Rhythm Reset is compatible with "evergreen" browsers such as Chrome, Edge, Firefox and Safari as well as legacy browsers such as IE9+. Combined these browsers account for [over 98% of browsers in use today](http://gs.statcounter.com/#desktop+tablet-browser_version_partially_combined-ww-monthly-201601-201603-bar).

- Chrome 19+
- Edge
- Firefox 4+
- Internet Explorer 9+
- Safari 6+

## Credits & Attribution

- [Normalize.css](https://necolas.github.io/normalize.css) by Nicolas Gallagher and Jonathan Neal.
- [Modular Scale](http://www.modularscale.com/) by Scott Vellum and Tim Brown.
- [HTML5 Test Page](https://github.com/cbracco/html5-test-page) by Chris Bracco.
- [*Groove to a Vertical Rhythm*](http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm) by Jonathan Lehman.
- [*Optimizing SVGs in data URIs*](http://codepen.io/tigt/post/optimizing-svgs-in-data-uris) by Taylor Hunt.

## Contact

- Create a [Github issue](https://github.com/jhildenbiddle/vertical-rhythm-reset/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a [star on GitHub](https://github.com/jhildenbiddle/vertical-rhythm-reset) or [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fvertical-rhythm-reset&hashtags=css,sass,scss,frontend) to support the project!

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/jhildenbiddle/vertical-rhythm-reset/blob/master/LICENSE) for details.

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))
