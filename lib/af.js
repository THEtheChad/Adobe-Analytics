function af(s_code) {
	this.s_code = s_code;
	this.buffer = {};

	this._uniq = 0;
	this.actions = {};

	this.restore();
}

af.prototype = {

	uniq: function(prefix) {
		var num = this._uniq++;

		return prefix ? (prefix + num) : num;
	},

	restore: function() {
		var buffer = this.buffer;
		var s_code = this.s_code;

		for (var prop in buffer) {
			if (buffer[prop] != null) {
				s_code[prop] = buffer[prop];
			} else {
				delete s_code[prop];
			}
		}

		this.products = {};
		this.events = s_code.events ? s_code.events.split(',') : [];
		this.linkTrackVars = s_code.linkTrackVars ? s_code.linkTrackVars.split(',') : [];
		this.linkTrackEvents = s_code.linkTrackEvents ? s_code.linkTrackEvents.split(',') : [];
	},

	save: function(prop) {
		if (!this.buffer.hasOwnProperty(prop)) {
			this.buffer[prop] = this.s_code[prop];
		}
	},

	set: function(prop, value) {
		switch (prop) {
			case 'events':
				this.addEvent(value);
				break;
			default:
				this.setProp(prop, value);
		}

		return this;
	},

	unset: function(prop, value) {
		switch (prop) {
			case 'events':
				this.removeEvent(value);
				break;
			default:
				this.unsetProp(prop, value);
		}

		return this;
	},

	setProp: function(prop, value) {
		this.save(prop);

		var mapped = this.mapDynamic(value);

		if (mapped !== value) {
			this.trackVar(value);
		}

		this.s_code[prop] = mapped;
		this.trackVar(prop);

		return this;
	},

	unsetProp: function(prop) {
		this.save(prop);

		delete this.s_code[prop];
		this.untrackVar(prop);

		return this;
	},

	addEvent: function(name) {
		var events = this.events;
		var idx = events.indexOf(name);

		if (idx == -1) {
			this.save('events');

			events.push(name);
			this.s_code.events = events.join(',');

			this.trackEvent(name);
		}

		return this;
	},

	removeEvent: function(name) {
		var events = this.events;
		var idx = events.indexOf(name);

		if (idx != -1) {
			this.save('events');

			events.splice(idx, 1);
			this.s_code.events = events.join(',');

			this.untrackEvent(name);
		}

		return this;
	},

	trackEvent: function(name) {
		var linkTrackEvents = this.linkTrackEvents;
		var idx = linkTrackEvents.indexOf(name);

		if (idx == -1) {
			this.save('linkTrackEvents');

			linkTrackEvents.push(name);
			this.s_code.linkTrackEvents = linkTrackEvents.join(',');

			this.trackVar('events');
		}

		return this;
	},

	untrackEvent: function(name) {
		var linkTrackEvents = this.linkTrackEvents;
		var idx = linkTrackEvents.indexOf(name);

		if (idx != -1) {
			this.save('linkTrackEvents');

			linkTrackEvents.splice(idx, 1);
			this.s_code.linkTrackEvents = linkTrackEvents.join(',');

			if (!linkTrackEvents.length) {
				this.untrackVar('events');
			}
		}

		return this;
	},

	trackVar: function(name) {
		var linkTrackVars = this.linkTrackVars;
		var idx = linkTrackVars.indexOf(name);

		if (idx == -1) {
			this.save('linkTrackVars');

			linkTrackVars.push(name);
			this.s_code.linkTrackVars = linkTrackVars.join(',');
		}

		return this;
	},

	untrackVar: function(name) {
		var linkTrackVars = this.linkTrackVars;
		var idx = linkTrackVars.indexOf(name);

		if (idx != -1) {
			this.save('linkTrackVars');

			linkTrackVars.splice(idx, 1);
			this.s_code.linkTrackVars = linkTrackVars.join(',');
		}

		return this;
	},

	addProduct: function(data) {
		this.save('products');

		this.products[data.id] = data;

		var str = [];
		var products = this.products;
		for (var id in products) {
			str.push( this.productString(products[id]) );
		}

		this.s_code.products = str.join(',');

		return this;
	},

	productString: function(data) {
		var str = [];

		data.category && str.push(data.category);
		data.id && str.push(data.id);
		data.quantity && str.push(data.quantity);
		data.price && str.push(data.price);

		if (data.events) {
			var events = data.events,
				i = events.length,
				eList = [];

			while (i--) {
				eList.push(events[i]);
			}

			str.push(eList.join('|'));
		}

		return str.join(';');
	},

	removeProduct: function(obj) {

		return this;
	},

	onSend: function(func) {

	},

	send: function() {
		this.fire('beforeSend');

		this.restore();
		return this;
	},

	mapDynamic: function(value) {
		if (!value.match) return value;

		var num = value.match(/\d+/);

		if (num) {
			if (/prop\d+/i.test(value)) value = 'D=c' + num[0];
			else
			if (/evar\d+/i.test(value)) value = 'D=v' + num[0];
			else
			if (/hier\d+/i.test(value)) value = 'D=h' + num[0];
		} else {
			if (/pageName/i.test(value)) value = 'D=gn';
			else
			if (/server/i.test(value)) value = 'D=sv';
			else
			if (/pagetype/i.test(value)) value = 'D=gt';
			else
			if (/channel/i.test(value)) value = 'D=ch';
			else
			if (/campaign/i.test(value)) value = 'D=v0';
			else
			if (/state/i.test(value)) value = 'D=state';
			else
			if (/zip/i.test(value)) value = 'D=zip';
			else
			if (/events/i.test(value)) value = 'D=ev';
			else
			if (/products/i.test(value)) value = 'D=pl';
			else
			if (/purchaseid/i.test(value)) value = 'D=pi';
			else
			if (/charset/i.test(value)) value = 'D=ce';
			else
			if (/currencyCode/i.test(value)) value = 'D=cc';
			else
			if (/cookieDomainPeriods/i.test(value)) value = 'D=cdp';
			else
			if (/cookieLifetime/i.test(value)) value = 'D=cl';
			else
			if (/referrer/i.test(value)) value = 'D=r';
			else
			if (/pageURL/i.test(value)) value = 'D=g';
			else
			if (/visitorID/i.test(value)) value = 'D=vid';
			else
			if (/transactionID/i.test(value)) value = 'D=xact';
		}

		return value;
	},

	beforeSend: function(func) {
		this.on('beforeSend', func);

		return this;
	}
};

extend(af.prototype, Events.prototype);

if(module){
	module.exports = af;
}