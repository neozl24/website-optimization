# Website Performance Optimization

This project is to optimize a website so as its [homepage](https://neozl24.github.io/website-optimization/) will score more than 90 in [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) and the [pizza page](https://neozl24.github.io/website-optimization/views/pizza.html) can animate over 60 FPS with user interaction.

This is the [pre-optimized version](http://cameronwp.github.io/udportfolio/), provided by Udacity course developer Cameron Pittman.


### Getting Started

Clone the Github repository and switch to this directory
```
$ git clone https://github.com/neozl24/website-optimization.git
$ cd website-optimization
```

You can optionally install the dev-dependent modules according to *package.json*
```
$ npm install
```
With the help of *gulpfile.js* and the *node_modules* you just installed, one command line of `gulp` would generate some minified code resource for replacing in case you try to further enhance the site performance
```
$ gulp
```

Besides, you'd better have downloaded `python` so as to load website on local server:
```
$ python -m SimpleHTTPServer 8080
```

Type `127.0.0.1:8080` in the browser address bar, you'll see home index page waving its hand.

There's one last thing before you can test your site on [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). That is exposing your website on a public URL and the [ngrok](https://ngrok.com/) tool is aimed to do this. [Download](https://ngrok.com/download) it, unzip it, move it to the root directory and use the command line:
```
$ ngrok 8080
```
A secure public URL will be created although it seems a little bit strange and you're now able to visit the site by typing this URL in your browser, just like the other normal sites.


### What I have done for Optimization

#### For index.html in root directory:
* Make the content of *css/style.css* inline-css
* Add media query for *web font stylesheet* and the *css/print.css* so they won't block initial rendering
* Load js files asynchronously to avoid blocking html parsing
* Execute js in `window.onload` event and turn *web font stylesheet* to `media='all'` in order to apply it at that time
* minify the image files, especially the pizza image


#### To increase the pizza page animation fps, I make changes below to *views/js/main.js*:
* In the very last of the js file, when `addEventListener` of `DOMContentLoaded`, I cancel the `updatePositions()` function to avoid the reflow of the page. To compensate that, I evaluate the `elem.style.left` in the for loop.
* Inside the `updatePositions()` function, I get the value of `document.body.scrollTop` and assign it to a new variable `bodyScrollTop`, for recalculating the unchanged layout value in for-loop is such a waste and will even cause **Forced Synchronized Layout(FSL)**, which is a bad thing in browser rendering work.
* For the same reason in `changePizzaSizes()` function, I move the heavy repeating work outside the for-loop and once again, I help the browser get rid of **FSL** nightmare.


### Authors

* **Zhong Li** - *Initial work* - [neozl24](https://github.com/neozl24)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
