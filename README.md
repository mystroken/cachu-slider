# cachu-slider

[![DUB](https://img.shields.io/dub/l/vibe-d.svg?style=for-the-badge)](http://opensource.org/licenses/MIT)

A simple and easy to use vanilla js library to create fullscreen or content-fit sliders on your web pages. It is inspired by the famous library [fullpage.js](https://github.com/alvarotrigo/fullpage.js/).
However it's essentially based on Promises (ES6 feature), what is ideal for adding individual animations to the elements of each slider section.

## Usage
You need to include the following files in order to let magic work:
- The stylesheet: ```cachu-slider.css```
- The main script: ```cachu-slider.js```

For production, it is recommended to include its minified versions.

### Install via npm:
Optionally, you can install ```cachu-slider``` via npm (for example to use with webpack)
```bash
// With npm
npm install cachu-slider

// With yarn
yarn add cachu-slider
```

### Including files:
```
<link rel="stylesheet" type="text/css" href="cachu-slider.css" />

<script type="text/javascript" src="cachu-slider.js"></script>
```

### Required HTML Structure
Each section will be defined with an element containing the section class. The active section by default will be the first section.

Sections should be placed inside a wrapper. The wrapper can not be the body element and it must have the class ```.cachu__container```.
```html
<div class="cachu__container">
	<section class="cachu__section">
		Some section
	</section>
	<section class="cachu__section">
		Some section
	</section>
	<section class="cachu__section">
		Some section
	</section>
</div>
```

### Initialization
