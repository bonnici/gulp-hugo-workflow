This is an example of a simple workflow for generating a site with [Hugo](https://gohugo.io/) and post-processing
it with [Gulp](http://gulpjs.com/) tasks. I have a [blog post](http://holtcode.blogspot.com.au/2016/03/static-website-generation-with-hugo-and.html)
up that goes through the project step-by-step.

Hugo is a fast and modern static website engine, it takes page templates, data, and content, and generates a set of static pages
that can be served on a simple webserver such as S3.

Gulp is a JavaScript task runner that lets you automate build-related tasks. This project uses Gulp to lint and transpile
ES6 Javascript into minified "standard" JavaScript along with sourcemaps. It is also used to minify the CSS and HTML when
building for production. There is also a gulp task to run the processed files in a browser using
[BrowserSync](https://www.browsersync.io/), so that any changes show up in-browser immediately. When run alongside
Hugo in watch mode, this means that changes can be made to the Hugo content and these changes will be automatically generated,
post-processed, and synced to the browser.

To get Hugo to watch for changes and generate the site, run "npm run hugo". To get Gulp to automatically watch those generated
files and post-process them and sync to a browser, run "gulp serve" in a separate window. Other Gulp tasks are:
* gulp build - Lint and process JS and copy JS/CSS/HTML to the gulp-dist folder
* gulp clean - Remove the files in gulp-dist
* gulp clean-hugo - Remove the files in hugo-generated (you will need to manually trigger another Hugo generation)
* gulp (default) - Clean then build
* gulp extras/html/scripts/styles - Process and copy sitemap, HTML, JS, and CSS respectively.
* gulp lint - Run JS through the linter
* gulp build --production or gulp --production - Build or clean then build in production mode, which will minify JS/CSS/HTML and exclude the output of sourcemaps