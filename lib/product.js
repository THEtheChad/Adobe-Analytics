function Product(data) {

	this.id 			= data.id       || '';
	this.price    = data.price    || '';
	this.category = data.category || '';
	this.quantity = data.quantity || '';

	this.events   = data.events || [];
}

Product.prototype = {

	addEvent: function(name, value) {
		var evt = name;

		if(value) evt = evt + '=' + value;

		this.events.push(evt);

		return this;
	},

	removeEvent: function(name) {
		var events = this.events,
			i = events.length;

		while (i--) {
			if(events[i].match(name)){
				events.splice(i, 1);
				break;
			}
		}

		return this;
	},

	toString: function() {
		var str = [],
			self = this;

		str.push(self.category);
		str.push(self.id);
		str.push(self.quantity);
		str.push(self.price);

		var events = self.events,
			i = events.length,
			eList = [];

		while (i--) {
			eList.push(events[i]);
		}

		str.push(eList.join('|'));

		return str.join(';');
	}
};

if(module){
	module.exports = Product;
}