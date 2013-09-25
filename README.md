# Image Shuffler

# Image Router

This technique finds applicable image urls based on the current responsive context via meta tags. Images aren't actually getting replaced, only a currently-applicable image is getting inserted.

## Syntax

###
```html
<meta name="image:[device]" content="[image url]"/>
```

```javascript
ImageRouter.processElement(element);
```


## Example
```html
<article>
	<div class="thumb">
		<meta name="image:phone" content="//domain.com/phone.jpg"/>
		<meta name="image:tablet" content="//domain.com/tablet.jpg"/>
		<meta name="image:full" content="//domain.com/full.jpg"/>
	</div><!-- /.thumb -->

	<h2>Article Headline</h2>
</article>
```

### If phone, becomes:

```html
<article>
	<div class="thumb">
		<img class="image_router image_router_phone" src="//domain.com/phone.jpg"/>
		<meta name="image:phone" content="//domain.com/phone.jpg"/>
		<meta name="image:tablet" content="//domain.com/tablet.jpg"/>
		<meta name="image:full" content="//domain.com/full.jpg"/>
	</div><!-- /.thumb -->

	<h2>Article Headline</h2>
</article>
```
