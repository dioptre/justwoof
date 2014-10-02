App = Ember.Application.create();


App.Router.map(function() {  
  // this.resource('woofs', { path: '/' }, function () {
  // }
});

var woofWoofWoof = function(position) {
	var woofText = $('#woofText');
	if (woofText.html() === 'woof') {
		$('body').css('background-color','red');
		woofText.html('WOOF!');
	}
	else  {
		$('body').css('background-color','blue');
		woofText.html('woof');
	}
	var owner = App.Owner.store.getById('owner','me');
	if (owner)
		owner = owner.get('title');
	if (owner && owner.length > 0) {
		if (position) {
			$.ajax({type: "POST", url: 'http://api.justyo.co/yo/', data : {api_token: 'f3d9978d-cb6a-a36b-d142-c59294aab180', username : owner, dataType: 'text' , link : 'http://maps.google.com/?q=' + position.coords.latitude +',' + position.coords.longitude }});
		}
		else {
			$.ajax({type: "POST", url: 'http://api.justyo.co/yo/', data : {api_token: 'f3d9978d-cb6a-a36b-d142-c59294aab180', username : owner, dataType: 'text' }});
		}
	}
}

var  woofWoof = function(position) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(woofWoofWoof)
	}
	else {
		 woofWoofWoof();
	}
}
var woofContext = { data: "woof!"} ;
var woofWait = 1500;
var woof = function(audio_sample) {
	if (audio_sample && audio_sample.rms > 0.05) {
		Ember.run.debounce(this, woofWoof, audio_sample, woofWait, true);
	}
};

App.IndexController = Ember.ObjectController.extend({
ownerTitle: function (key, value, previousValue) {
    // setter
    if (arguments.length > 1) {
	  var owner = this.get('model');
      owner.set('title', value);
	  owner.save();
    }

    // getter
    return this.get('model.title');
}.property('model.title'),
actions: {
	saveOwner: function() {
		var m = 
		m.save();
	}
}
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('owner','me').catch(function() {
		return App.Owner.store.createRecord('owner', {id: 'me', title: null});
	});
  }
});

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'justwoof'
});

App.Owner = DS.Model.extend({
  title: DS.attr('string')
});