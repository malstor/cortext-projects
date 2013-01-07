var path = require('path'),
    fs = require('fs');


Bones.Command.options['secret']     = '4b6be4b408195388def323740e7cc20053fa6f57f46faf57816a99ae2a257af2';
Bones.Command.options['api_key']    = 'c0rtext';

Bones.Command.options['passport'] = {
    'title': 'passport=[path]',
    'description': 'Path to passport configuration file.',
    'default': function(options, config) {
        var files = config ? config.files : Bones.Command.options['files'].default();
        return path.join(files, 'passport.json');
    }
};

Bones.Command.augment({
    bootstrap: function(parent, plugin, callback) {
        parent.call(this, plugin, function() {
            try {
                plugin.config.passport = JSON.parse(fs.readFileSync(plugin.config.passport));
            } catch (e) {
                // do nothing
            }

            callback();
        });
    }
});