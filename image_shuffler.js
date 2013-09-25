CLARITY.provide('image_shuffler', ['jquery', 'underscore', 'doubleunderscore', 'responsive_watcher'], function($, _, __, ResponsiveWatcher){
	var ImageShuffler = function ImageShuffler () {
		var self = this;

		self.images = [];
		self.$win = $(window);
		self.scroll_timer = null;

		ResponsiveWatcher.on('phone tablet full', function(width, device, heightChanged, widthChanged, deviceChanged){
			self.process(deviceChanged, self.images, device, self.$win.scrollTop() + self.$win.height());
		});

		self.$win.on('scroll', function(e){
			if (self.scroll_timer) {
				clearTimeout(self.scroll_timer);
				self.scroll_timer = null;
			};

			self.scroll_timer = setTimeout(function(){
				self.process(false, self.images, ResponsiveWatcher.is, self.$win.scrollTop() + self.$win.height());
			}, 250);
		});
	};

	ImageShuffler.prototype.process = function process (resize, images, device, bottom_pos) {
		var self = this;

		var start = new Date();
		var counter = 0, limit = images.length;
		while (counter < limit) {
			var image_entry = images[counter];
			counter++;

			if (resize) {
				image_entry.clear();
				image_entry.resize(device);
			};

			if (image_entry.shown) {
				continue;
			};

			if (image_entry.$element.offset().top <= bottom_pos) {
				image_entry.resource(device);
			};
		};
		console.log((new Date() - start) + 'ms, process loop');
	};

	ImageShuffler.prototype.attach = function attach ($elements) {
		var self = this;

		var new_images = [];

		$elements.each(function(){
			var $element = $(this);
			new_images.push(self.createImageEntry($element, $element.data('sizes')));
		});

		self.process(true, new_images, ResponsiveWatcher.is, self.$win.scrollTop() + self.$win.height());
		self.images = self.images.concat(new_images);
	};

	ImageShuffler.prototype.createImageEntry = function createImageEntry ($element, sizes) {
		var self = this;

		return new ImageEntry($element, $element.data('sizes'));
	};

	var ImageEntry = function ImageEntry ($element, sizes) {
		var self = this;

		self.$element = $element.addClass('image_shuffle_entry');
		self.element = self.$element[0];
		self.sizes = sizes;
		self.tag_type = self.$element.is('img') ? 'image' : 'block';
		self.shown = false;
		self.strategy = null;

		if (self.tag_type === 'block') {
			self.$element.css('backgroundRepeat', 'no-repeat');
			self.$element.css('backgroundPosition', 'center center');
			self.$element.css('backgroundSize', 'cover');
		};
	};

	ImageEntry.prototype.setShown = function setShown (shown) {
		var self = this;

		self.shown = shown;
		self.$element[self.shown ? 'addClass' : 'removeClass']('image_shuffler_shown');
	};

	ImageEntry.prototype.setStrategy = function setStrategy (strategy) {
		var self = this;

		self.strategy = strategy;
		if (self.strategy) {
			self.$element.removeClass('image_shuffler_ratio image_shuffler_static').addClass('image_shuffler_' + strategy);
		};
	};

	ImageEntry.prototype.getImageSpecifics = function getImageSpecifics (device) {
		var self = this;

		return self.sizes[device] || self.sizes['full'] || self.sizes['tablet'] || self.sizes['phone'] || false;
	};

	ImageEntry.prototype.resize = function resize (device) {
		var self = this;

		var image_specifics = self.getImageSpecifics(device);
		if (!image_specifics) { return; }

		self.setStrategy(image_specifics.strategy);

		switch (image_specifics.strategy) {
		case 'ratio':
			if (self.tag_type === 'image') {
				self.$element.css('max-width', '100%');
			} else {
				self.$element.css('paddingBottom', __.sprintf('%s%%', 1/image_specifics['ratio']*100));
			};
		break;

		case 'static':
			self.$element.height(image_specifics['height']);
			self.$element.width(image_specifics['width']);
		break;
		};
	};

	ImageEntry.prototype.clear = function clear () {
		var self = this;

		self.setShown(false);
		self.setStrategy(null);
		self.$element.css({
			'height': '',
			'width': '',
			'paddingBottom': '',
			'max-width': ''
		});

		switch (self.tag_type) {
		case 'image':
			self.$element.attr('src', '');
		break;

		case 'block':
			self.$element.css('background-image', '');
		break;
		};
	};

	ImageEntry.prototype.resource = function resource (device) {
		var self = this;

		var image_specifics = self.getImageSpecifics(device);
		if (!image_specifics) { return; }
		self.setShown(true);

		switch (self.tag_type) {
		case 'image':
			self.$element.attr('src', image_specifics['url']);
		break;

		case 'block':
			self.$element.css('background-image', __.sprintf('url(%s)', image_specifics['url']));
		break;
		};
	};

	return ImageShuffler;
});
