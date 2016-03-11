This is an example of a simple workflow for generating sites with [Hugo](https://gohugo.io/) and then post-processing
it with some [Gulp](http://gulpjs.com/) tasks. I plan to have a blog post up soon that goes through the project step-by-step.

Hugo is a fast and modern static website engine, it takes page templates, data, and content, and generates a set of static pages
that can be served on a simple webserver such as S3.

Gulp is a JavaScript task runner that lets you automate build-related tasks. This project uses Gulp to lint and transpile
ES6 Javascript into minified "standard" JavaScript along with sourcemaps. It is also used to minify the CSS and HTML when
building for production. There is also a gulp task to run the processed files in a browser using
[BrowserSync](https://www.browsersync.io/), so that any changes show up in-browser immediately. When run alongside
Hugo in watch mode, this means that changes can be made to the Hugo content and these changes will be automatically generated,
post-processed, and synced to the browser.