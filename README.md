# postcss-inuity-layout [![Build Status](https://travis-ci.org/laruiss/postcss-inuity-layout.png?branch=master)](https://travis-ci.org/laruiss/postcss-inuity-layout)

An easy way to create a [inuitcss]-like layout/grid system for [PostCSS]

[PostCSS]: https://github.com/postcss/postcss
[inuitcss]: https://github.com/inuitcss

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install postcss-inuity-layout --save
```

## Usage

```js
var fs = require('fs');
var postcss = require('postcss');
var inuityLayout = require('postcss-inuity-layout');

var css = fs.readFileSync('input.css', 'utf8');

var output = postcss()
  .use(inuityLayout())
  .process(css)
  .css;
```

### *Inuity* layouts and layout items

Layouts are created by using the `layout` declaration and passing the value of the gutter.

Layout items are created by using the `layout-item` declaration and passing the same gutter value.

**Example**:

(In your `objects.css`:)

```css
$layout-gutter: 24px;

.layout {
  layout-wrapper: $layout-gutter;
}

.layout__item {
  layout-item: $layout-gutter;
}
```

Turns into:

```css
.layout {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: -24px; /* -$layout-gutter */
}

.layout__item {
    display: inline-block;
    padding-left: 24px; /* $layout-gutter */
    vertical-align: top;
    width: 100%
}
```

(And in `trumps.css`:)

```css
.u-1\/2 {
    width: width(1/2) !important;
}
```

Turns into:

```css
.u-1\/2 {
    width: 50% !important;
}
```

### Use in conjunction with @each and @for

The real power of this plugin comes with using it in conjunction with [postcss-each] and [postcss-for] plugins:

[postcss-each]: https://github.com/outpunk/postcss-each
[postcss-for]: https://github.com/antyakushev/postcss-for

**Example**:

```css
@each $val, $mq in (palm, lap-and-up), (max-width: 44.9375em, min-width: 45em) {
    @media ($mq) {
        @for $j from 1 to 12 {
            @each $i in 2,3,4,5,6,7,8,9,10,11,12 {
                @if $i > $j {
                    .u-$(j)\/$(i)-$(val) {
                        width: width($j/$i) !important;
                    }
                }
            }
        }
    }
}
```

Turns into:

```css
.u-1\/2 {
    width: 50% !important;
}
.u-1\/3 {
    width: 33.33333% !important;
}
.u-1\/4 {
    width: 25% !important;
}

(...)

.u-1\/12 {
    width: 8.33333% !important;
}

.u-2\/3 {
    width: 66.66667% !important;
}

(...)

.u-2\/12 {
    width: 16.66667% !important;
}

.u-3\/4 {
    width: 75% !important;
}

(...)

.u-11\/12 {
    width: 91.66667% !important;
}

@media (max-width: 44.9375em) {
    .u-1\/2-palm {
        width: 50% !important;
    }
    .u-1\/3-palm {
        width: 33.33333% !important
    }

    (...)

    .u-11\/12-palm {
        width: 91.66667% !important;
    }

}

@media (min-width: 45em) {
    .u-1\/2-lap-and-up {
        width: 50% !important;
    }
    .u-1\/3-lap-and-up {
        width: 33.33333% !important
    }

    (...)

    .u-11\/12-lap-and-up {
        width: 91.66667% !important;
    }

}
```

### Use the generated CSS like this in your HTML:

```html
<div class="layout">
    <div class="layout__item  u-1/2-lap-and-up">
        Left part if your screen is big enough, top part otherwise.
    </div>
    <div class="layout__item  u-1/2-lap-and-up">
        Right part of the layout if your screen is big enough, bottom part otherwise.
    </div>
</div>
```

## Tests

```sh
npm install
npm test
```
```

> postcss-inuity-layout@0.0.2 test /home/sormieres/dev/workspaces/node_projects/postcss-inuity-layout
> mocha test/test.js
  layout-wrapper
    ✓ Should print a whole layout wrapper rule
    ✓ Should print a whole layout item rule
    ✓ Should print a rule with width with 5 digits after comma
  3 passing (15ms)

```

## Dependencies

- [postcss](https://github.com/postcss/postcss): Tool for transforming styles with JS plugins
- [reduce-function-call](https://github.com/MoOx/reduce-function-call): Reduce function calls in a string, using a callback

## Dev Dependencies

- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [should](https://github.com/shouldjs/should.js): test framework agnostic BDD-style assertions


## License

MIT
