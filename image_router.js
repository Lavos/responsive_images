CLARITY.provide('image_router', ['jquery', 'doubleunderscore', 'responsive_watcher'], function($, __, ResponsiveWatcher){
	return {
		processElement: function processElement (element) {
			var $metas = $(element).find(__.sprintf('meta[name="image:%s"]', ResponsiveWatcher.is)), counter = 0, limit = $metas.length;
			while (counter < limit) {
				var meta = $metas[counter], image = document.createElement('img');
				image.src = meta.content;
				image.className = __.sprintf("image_router image_router_%s", ResponsiveWatcher.is);
				meta.parentNode.insertBefore(image, meta);
				counter++;
			};
		}
	};
});
