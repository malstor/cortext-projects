#!/usr/bin/env node
bones = require('bones');

require('./views/Main');

bones.load(__dirname);

if (!module.parent) {
    bones.start();
}