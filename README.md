# postcss-inuity-layout

An easy way to create a [inuitcss]-like layout/grid system for [PostCSS]

[PostCSS]: https://github.com/postcss/postcss
[inuitcss]: https://github.com/inuitcss

## Installation

```js
npm install postcss-inuity-layout
```

## Usage

```js
var fs = require('fs');
var postcss = require('postcss');
var width = require('postcss-inuity-layout');

var css = fs.readFileSync('input.css', 'utf8');

var output = postcss()
  .use(width())
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
