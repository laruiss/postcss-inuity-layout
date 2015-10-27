var postcss = require('postcss'),
    functionCall = require('reduce-function-call'),
    extend = require('util')._extend;

module.exports = postcss.plugin('postcss-width', function(opts) {
    opts = extend({
        columns: 12,
        maxWidth: 960,
        gutter: 20,
        legacy: false
    }, opts);

    var columnWidth = (opts.maxWidth - ((opts.columns - 1) * opts.gutter)) / opts.columns;

    var getWidth = function(span, cols) {
        var width = span / cols;
        return (width * 100).toFixed(5) * 1;
    };

    var value = /\s*(\d+)\s*\/\s*(\d+)\s*/;

    return function(css) {
        css.walkDecls(function(decl) {
            if (decl.value.indexOf('width(') !== -1) {
                decl.value = functionCall(decl.value, "width", function(body) {
                    var match;
                    if (match = value.exec(body)) {
                        var span = match[1];
                        var columns = match[2];
                        return getWidth(span, columns) + '%'
                    } else {
                        throw decl.error('Invalid declaration', {
                            plugin: 'postcss-width'
                        });
                    }
                });
            } else if (decl.prop === 'layout-wrapper') {
                decl.parent.append({'prop': 'list-style', value: 'none'}).source = decl.source;
                decl.parent.append({'prop': 'margin', value: '0'}).source = decl.source;
                decl.parent.append({'prop': 'padding', value: '0'}).source = decl.source;
                decl.parent.append({'prop': 'margin-left', value: decl.value}).source = decl.source;
                decl.remove();
            } else if (decl.prop === 'layout-item') {
                decl.parent.append({'prop': 'display', value: 'inline-block'}).source = decl.source;
                decl.parent.append({'prop': 'padding-left', value: decl.value}).source = decl.source;
                decl.parent.append({'prop': 'vertical-align', value: 'top'}).source = decl.source;
                decl.parent.append({'prop': 'width', value: '100%'}).source = decl.source;
                decl.remove();
			}
        });
    };
});
