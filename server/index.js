#!/usr/bin/env node
bones  = require('bones');

lorem  = require('synergipsum');
marked = require('marked');

require('./views/Main');

types = [
	"Image",
	"Analysis",
	"Message"
];

names = [
	"Jean-Philippe Cointet",
	"Tam Kien Duong",
	"Chloé Duloquin",
	"Lise Cornilleau",
	"Marc Barbier",
	"Philippe Breucker"
];

bones.load(__dirname);

if (!module.parent) {
    bones.start();
}