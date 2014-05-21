/**
 * @class Events
 */
function Events(){}

Events.prototype = {

	/**
	 * Returns an array of actions for the event type specified
	 * @name   Events#getActions
	 * @param  {String} type 
	 * @return {Array}
	 */
	getActions: function(type){
		this.actions || (this.actions = {});
		return this.actions[type] || (this.actions[type] = []);
	},

	/**
	 * Performs the set of actions bound to type passing in err & data
	 * @name   Events#fire
	 * @param  {String} type
	 * @param  {Any} err
	 * @param  {Any} data
	 * @return {This}
	 */
	fire: function(type, err, data){
		var actions, i;

		actions = this.getActions(type);
		i = actions.length;

		while(i--) actions[i].call(this, err, data, type);

		actions = this.getActions('all');
		i = actions.length;

		while(i--) actions[i].call(this, err, data, type);		

		return this;
	},

	/**
	 * Adds an action to the specified event type
	 * @param  {String} type
	 * @param  {Function} func
	 * @return {This}
	 */
	on: function(type, func){
		this.getActions(type).push(func);

		return this;
	},

	/**
	 * Adds an action to the specified event type to
	 * be performed only once
	 * @param  {String} type
	 * @param  {Function} func
	 * @return {This}
	 */
	once: function(type, func){
		var self = this;

		self.on(type, function once(err, data){
			func.call(this, err, data);
			self.off(type, once);
		});

		return this;
	},

	/**
	 * Removes the specified action from the specified
	 * event type
	 * @param  {String} type
	 * @param  {Function} func
	 * @return {This}
	 */
	off: function(type, func){
		var actions, idx;

		actions = this.getActions(type);
		idx = actions.indexOf(func);

		if(idx != -1){
			actions.splice(idx, 1);
		}

		return this;
	}
};