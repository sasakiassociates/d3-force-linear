/**
 * Created by ycui on 11/22/2016.
 */
'use strict';

var babel = require('rollup-plugin-babel');
var babelrc = require('babelrc-rollup');
let pkg = require('./package.json');

var rollup = require('rollup');
let external = Object.keys(pkg.dependencies);

var settings = {
    entry: 'index.js',
    plugins: [
        babel(babelrc.default())
    ],
    external: external
};

rollup.rollup(settings).then(function (bundle) {
    bundle.write({
        dest: pkg['main'],
        format: 'umd',
        moduleName: 'd3',
        sourceMap: true
        }
    );
    bundle.write({
        dest: pkg['jsnext:main'],
        format: 'es',
        sourceMap: true
    });
});