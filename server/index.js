#!/usr/bin/env node
bones  = require('bones');
marked = require('marked');

require('./views/Main');

bones.load(__dirname);

if (!module.parent) {
    bones.start();
}


String.prototype.lpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

format_date = function(date){
	var date = new Date(date);

	var d = date.getDate();
		d = String(d).lpad("0", 2);

	var m = date.getMonth()+1;
		m = String(m).lpad("0", 2);

	var y = date.getFullYear()

	return d+"."+m+"."+y;
}