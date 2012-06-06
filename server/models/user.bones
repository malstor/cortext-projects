model = models.User.extend({
	url: function() {
        return '/api/user/' + encodeURIComponent(this.get('id'));
    }
});