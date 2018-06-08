# cachu-slider

[![DUB](https://img.shields.io/dub/l/vibe-d.svg?style=for-the-badge)](http://opensource.org/licenses/MIT)

A standalone vanilla js library to create fullscreen or content-fit sliders on your web pages. It is inspired by the famous library [fullpage.js](https://github.com/alvarotrigo/fullpage.js/) by Alvaro Trigo.
<p>
The particularity of <code>cachu-slider</code> is that it's essentially based on Promises (ES6 feature), what is ideal for adding individual animations/transitions to each element of each slider section.
</p>

<p>
<b>Notice</b>: If you don't plan to use animations or transitions on some of the elements of some of your slides, you must ask yourself if you really need to use this library. ( You could consider using <a href="https://github.com/alvarotrigo/fullpage.js/">fullpage.js</a> rather ).
</p>

## Usage
You need to include the following files (into ```dist``` folder) in order to let magic work:
- The stylesheet : ```cachu-slider.css```
- The main script : ```cachu-slider.js```

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

## Contributing to cachu-slider
Please see [Contributing to cachu-slider](https://github.com/mystroken/cachu-slider/wiki/Contributing-to-cachu-slider).

## License
```cachu-slider``` is an open sourced project using [MIT license](http://opensource.org/licenses/MIT).

**The credit comments in the JavaScript and CSS files should be kept intact (even after combination or minification)**.

(The MIT License)

Copyright (c) 2018 Mystro Ken <mystroken@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
