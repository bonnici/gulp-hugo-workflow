'use strict';

import gulp from 'gulp';
import del from 'del';
import bs from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint'
import util from 'gulp-util';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';
import htmlmin from 'gulp-htmlmin';

let browserSync = bs.create();
let hugoBase = './hugo-generated';
let distBase = './gulp-dist';

gulp.task('clean', () => {
	del([distBase + '/**/*']);
});

gulp.task('clean-hugo', () => {
	del([hugoBase + '/**/*']);
});

var lintOptions = {
	extends: 'eslint:recommended',
	rules: {
		quotes: [2, "single"],
		"no-console": 0
	},
	env: {
		"es6": true,
		"browser": true
	}
};

gulp.task('lint', () => {
	return gulp.src([hugoBase + '/scripts/**/*.js'])
		.pipe(eslint(lintOptions))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('html', () => {
	return gulp.src(hugoBase + '/**/*.html')
		       .pipe(gulpif(util.env.production, htmlmin({collapseWhitespace: true})))
		       .pipe(gulp.dest(distBase));
});

gulp.task('scripts', () => {
	return gulp.src(hugoBase + '/scripts/**/*.js')
			   .pipe(sourcemaps.init())
		       .pipe(babel())
		       .pipe(gulpif(!util.env.production, sourcemaps.write('.')))
		       .pipe(gulpif(util.env.production, uglify()))
		       .pipe(gulp.dest(distBase + '/scripts'));
});

gulp.task('styles', () => {
	return gulp.src(hugoBase + '/styles/**/*.css')
	           .pipe(gulpif(util.env.production, cssnano()))
		       .pipe(gulp.dest(distBase + '/styles'));
});

gulp.task('extras', () => {
	return gulp.src(hugoBase + '/sitemap.xml')
		       .pipe(gulp.dest(distBase));
});

gulp.task('build', ['html', 'scripts', 'styles', 'extras']);

gulp.task('serve', ['build'], () => {
	browserSync.init({
		notify: false,
		server: {
			baseDir: distBase
		},
		reloadDelay: 1000,
		reloadDebounce: 1000
	});

	gulp.watch(hugoBase + "/**/*.html", ['html']);
	gulp.watch(hugoBase + "/scripts/**/*.js", ['scripts']);
	gulp.watch(hugoBase + "/styles/**/*.css", ['styles']);
	gulp.watch([distBase + "/**/*.html", distBase + "/scripts/**/*.js", distBase + "/styles/**/*.css"]).on('change', browserSync.reload);
});

gulp.task('default', ['clean', 'lint'], () => {
	gulp.start('build');
});