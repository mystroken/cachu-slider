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
```html
<link rel="stylesheet" type="text/css" href="cachu-slider.css" />

<script type="text/javascript" src="cachu-slider.js"></script>
```

### Required HTML Structure
Each section will be defined with an element containing the section class. The active section by default will be the first section.

Sections should be placed inside a wrapper. The wrapper can not be the body element and it must have the class ```.cachu__container```.
```html
<div class="cachu__container">
  <section class="cachu__section">Some section</section>
  <section class="cachu__section">Some section</section>
  <section class="cachu__section">Some section</section>
</div>
```

### Initialization
Make sure, before initialization, that the DOM Content is already loaded.
```javascript
// Set options.
const options = {};

// Instantiate the Slider class.
let slider = new Cachu(document.querySelector('.cachu__container'), options);

// Run the slider.
slider.run();
```
A more complete initialization with all options set could look like this:
```javascript
// Set options.
const options = {
  scrollingSpeed: 1000, // The speed of the transition.
  scrollingLoop: true // Loop after reaching the end.
};

// Instantiate the Slider class.
let slider = new Cachu(document.querySelector('.cachu__container'), options);

// Run the slider.
slider.run();
```

## Options
- ```scrollingSpeed```: (default ```1000```) Sets the speed of the transition between sections. This value must be greather than or equal to zero (>= 0).
- ```scrollingLoop```: (default ```true```) Tells the slider if it has to loop the scrolling after reaching the end of sections.
## Methods
After instantiating the slider (```var slider = new Cachu(...)```), you get access to all these methods:
### run()
You must call this method to run the slide. Else, the content will be hidden.
