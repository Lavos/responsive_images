<!doctype html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>image_shuffle</title>

	<style type="text/css">
		article { margin: 0 0 10px 0; background-color: rgba(255, 255, 200, 1) }
	</style>

	<script type="text/javascript">
		(function(){
			window['CLARITY'] = [];
			var ns = document.createElement('script'), s = document.getElementsByTagName('script')[0];
			ns.async = true; ns.type = 'text/javascript'; ns.src = '//lib.spinmedia.com/clarity.min.js'; s.parentNode.insertBefore(ns, s);
		})();
	</script>
</head>

<?php
	$settings = array(
		'full' => array(
			'strategy' => 'static',
			'height' => 75,
			'width' => 100,
			'url' => '//sb-129.net/image/100x75/ff0000'
		),
		'tablet' => array(
			'strategy' => 'ratio',
			'ratio' => 4/3,
			'url' => '//sb-129.net/image/1000x750/0000ff',
		),
		'phone' => array(
			'strategy' => 'ratio',
			'ratio' => 4/3,
			'url' => '//sb-129.net/image/320x240/00ffff'
		),
	);

	$article_image = array(
		'full' => array(
			'strategy' => 'static',
			'height' => 250,
			'width' => 250,
			'url' => '//sb-129.net/image/250x250/ffaacc'
		),
		'tablet' => array(
			'strategy' => 'ratio',
			'ratio' => 1/1,
			'url' => '//sb-129.net/image/300x300/ffff33',
		),
		'phone' => array(
			'strategy' => 'ratio',
			'ratio' => 1/1,
			'url' => '//sb-129.net/image/600x600/aaffcc'
		),
	);
?>

<body>
	<script type="text/html" id="template">
		<article>
			<div class="thumb" data-sizes="<?php echo htmlentities(json_encode($settings)); ?>"></div>
		</article>
	</script>

	<div id="master">
		<img id="article_image" data-sizes="<?php echo htmlentities(json_encode($article_image)); ?>" src="//sb-129.net/image/50x50/000000"/>

	<?php for ($x = 0; $x < 20; $x++) { ?>
		<article>
			<div class="thumb" data-sizes="<?php echo htmlentities(json_encode($settings)); ?>"></div>
		</article>
	<?php }; ?>
	</div><!-- /#master -->

	<script type="text/javascript">
		CLARITY.push({
			use: ['jquery', 'doubleunderscore', 'plugin'],
			run: function($, __, plugin) {
				plugin.loadModule('image_shuffler.js', {
					use: ['image_shuffler'],
					run: function(ImageShuffler){
						var is = new ImageShuffler();
						is.attach($('#article_image'));
						is.attach($('.thumb'));

						console.log('image_shuffler', is);

						var $master = $('#master');
						var comp_template = __.template(document.getElementById('template').innerHTML);

						$master.on('click', function(e){
							var counter = 10, blob = [];
							while (counter--) {
								blob.push(comp_template());
							};

							var wrapper = document.createElement('div');
							$master.append(wrapper);
							wrapper.innerHTML = blob.join('');
							is.attach($(wrapper).find('.thumb'));
						});
					}
				});
			}
		});			
	</script>
</body>
</html>

