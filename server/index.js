bones  = require('bones');
marked = require('marked');

require('bones-auth');

bones.plugin.config.secret = '4b6be4b408195388def323740e7cc20053fa6f57f46faf57816a99ae2a257af2';

require('./views/Main');

bones.load(__dirname);

session = {};

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