#!/usr/bin/env node
bones  = require('bones');
marked = require('marked');

require('./views/Main');

bones.load(__dirname);

if (!module.parent) {
    bones.start();
}