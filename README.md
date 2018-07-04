# cachu-slider

[![DUB](https://img.shields.io/dub/l/vibe-d.svg?style=for-the-badge)](http://opensource.org/licenses/MIT)

A standalone vanilla javascript library to create animated fullscreen or content-fit sliders on your web pages. It is inspired by the famous library [fullpage.js](https://github.com/alvarotrigo/fullpage.js/) by Alvaro Trigo.
<p>
	The particularity of <code>cachu-slider</code> is that it's essentially based on Promises (ES6 feature), what is ideal for adding individual animations/transitions to each element of each slider section.
</p>
<p>
	&rarr; <a target="_blank" href="https://codepen.io/mystroken/pen/bKoebp">Simple Demo</a>
</p>


## Usage
#### 1. Including the library
Install via npm  : ```npm install cachu-slider``` <br>
Or include ```dist``` files directly into your HTML document.
```html
<link rel="stylesheet" type="text/css" href="cachu-slider.min.css">
<script type="text/javascript" src="cachu-slider.min.js"></script>
```
If you plan to use the library into a webpack project, you must read our [advanced guide](https://github.com/mystroken/cachu-slider/wiki/Include-cachu-slider-to-your-project) for including necessary files.

#### 2. Required HTML Structure

```html
<div class="cachu__container">

  <!-- All sections are wrapped inside .cachu__sections  -->

  <div class="cachu__sections">
    <section class="cachu__section">Some section</section>
    <section class="cachu__section">Some section</section>
    <section class="cachu__section">Some section</section>
  </div>

  <!-- End of section  -->
  <!-- Navigation will be dynamically added here (via JavaScript) -->
</div>
```
Each section will be defined with an element containing the ```cachu__section``` class. The active section by default will be the first section.

Slider elements should be placed inside a wrapper. The wrapper can not be the body element and it must have the ```cachu__container``` class.

This structure will generate, by default, a fullpage slider. If you want a content-fit slider rather, you should add to the wrapper ```cachu__container--content-fit``` class too.

```<div class="cachu__container cachu__container--content-fit">```


#### 3. Instantiate the slider
Before initializing the slider, make sure that the DOM Content is already loaded.
```javascript

// Now let's turn on our slider!

// 1. Set some options.
// 2. Instantiate the Slider with the DOM Element instance of the wrapper.
// 3. Run the slider !!

const options = {};
let slider = new Cachu(document.querySelector('.cachu__container'), options);
slider.run();
```
A more complete initialization with all options set could look like this:
```javascript
// Complete options.

const options = {
  disableMouseEvents: false, // Disable mousewheel event listening.
  scrollingSpeed: 1000,  // The speed of the transition.
  scrollingLoop: true,  // Loop after reaching the end.
  navigationEnabled: true, // Enable navigation buttons
  navigationPosition: 'right'  // The Navigation's position
};

let slider = new Cachu(document.querySelector('.cachu__container'), options);
slider.run();
```
<p>
<b>Notice</b>: If you don't plan to use animations or transitions on some of the elements of some of your slides, you must ask yourself if you really need to use this library. ( You could consider using <a href="https://github.com/alvarotrigo/fullpage.js/">fullpage.js</a> rather ).
</p>

## Options
* ```disableMouseEvents```: *boolean* (default ```false```) Disable listening mousewheel events. This feature may be interesting if you only want to scroll through navigation buttons.
* ```scrollingSpeed```: *int* (default ```1000```) Sets the speed of the transition between sections. This value must be greather than or equal to zero (>= 0).
* ```scrollingLoop```: *boolean* (default ```true```) Tells the slider if it has to loop the scrolling after reaching the end of sections.
* ```scrollingDirection```: *string* (default ```vertical```) The scrolling direction. Possible values are:
    - ```vertical```
    - ```horizontal```
* ```fixSectionsHeight```: *boolean* (default ```true```) Tells the slider to set or not a same height to all sections. Only if the scrolling direction is ```horizontal```, else this parameter is ignored.
* ```navigationEnabled```: *boolean* (default ```true```) Tells the slider to display or not the navigation buttons.
* ```navigationPosition```: *string* (default ```right```) Sets the position of the navigation (if enabled). Possible values are:
	- ```top```:    Fix navigation to the top.
	- ```right```:  Fix navigation to the right.
	- ```bottom```: Fix navigation to the bottom.
	- ```left```:   Fix navigation to the left.
## Methods
After instantiating the slider (```var slider = new Cachu(...)```), you get access to all these methods:
### run()
You must call this method to run the slide. Else, the content will be hidden.

## Reporting issues
If you find a bug or have compatibility issues, please open a ticket under issues section for this repository.

## Contributing to cachu-slider
<p>
	Have any suggestions or feedback?
	<ol>
		<li>Let's use <a target="_blank" href="https://trello.com/b/gmsaBRvO/cachu-slider">Cachu Slider on Trello</a></li>
		<li>Reach out <a target="_blank" href="https://twitter.com/mystroken/">@mystroken</a></li>
	</ol>
</p>

Else, please see [Contributing to cachu slider](https://github.com/mystroken/cachu-slider/wiki/Contributing-to-cachu-slider).

## License
```cachu-slider``` is an open sourced project using [MIT license](http://opensource.org/licenses/MIT).

**The credit comments in the JavaScript and CSS files should be kept intact (even after combination or minification)**.

(The MIT License)

Copyright (c) 2018 Mystro Ken <mystroken@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
