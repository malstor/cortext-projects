#!/usr/bin/env node
bones = require('bones');

lorem = require('synergipsum');
marked = require('marked');

require('./views/Main');

bones.load(__dirname);

if (!module.parent) {
    bones.start();
}