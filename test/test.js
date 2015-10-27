var postcss = require('postcss'),
	inuityLayout = require('../'),
	should = require('should');

var layoutGutter = '24px';

function processCss(input) {
    return postcss(inuityLayout()).process(input).css
}

describe('layout-wrapper', function () {

    it('Should print a whole layout wrapper rule', function () {
        var expected = '.layout {list-style: none;margin: 0;padding: 0;margin-left: ' + layoutGutter + ';}';
        var processed = processCss('.layout {layout-wrapper: ' + layoutGutter + ';}');
        processed.should.be.eql(expected);
    })

    it('Should print a whole layout item rule', function () {
        var expected = '.layout__item {display: inline-block;padding-left: 24px;vertical-align: top;width: 100%;}'
        var processed = processCss('.layout__item {layout-item: 24px;}');
        processed.should.be.eql(expected);
    })

    it('Should print a rule with width with 5 digits after comma', function () {
        var expected = '.u-1\\/12 { width: 8.33333% !important;}'
        var processed = processCss('.u-1\\/12 { width: width(1/12) !important;}');
        processed.should.be.eql(expected);
    })
})
