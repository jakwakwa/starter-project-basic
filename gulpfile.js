'use-strict';

// A:: REUIRE NODE PACKAGES

var gulp 	= require('gulp'),
	concat 	= require('gulp-concat'),
	uglify	= require('gulp-uglify'),
	rename	= require('gulp-rename'),
	sass	= require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	maps	= require('gulp-sourcemaps'),
	del 	= require('del'),
	livereload = require('gulp-livereload'),
	prefix	= require('gulp-autoprefixer');

// B:: GULP TASKS:

//  Concat JavaScript Files into one App.js File
gulp.task("concatScripts", function() {
	return gulp.src([
		'js/main.js'
		])
	.pipe(maps.init())
	.pipe(concat("app.js"))
	.pipe(maps.write('./'))
	.pipe(gulp.dest("js"));
});

//  Uglify Javascript Files = Minify JavaScript
gulp.task("minifyScripts", ["concatScripts"], function() {
	return gulp.src('js/app.js')
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest("js"));
});

// Compile Sass
gulp.task("compileSass", function() {
	return gulp.src("scss/application.scss")
	.pipe(maps.init())
	.pipe(sass())
	.pipe(prefix())
	.pipe(cleanCSS())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'))
	.pipe(livereload({ start: true,  }));
});

gulp.task("watchFiles", function () {
	var server = livereload();
	gulp.watch('scss/**/*.scss', ['compileSass'] );
	gulp.watch('js/main.js', ['concatScripts'] );
});

// CLEAN Task
gulp.task("clean", function() {
	del(['dist', 'css/application.css*', 'js/app*.js*']);
});

// BUILD TASK
gulp.task("build", ['concatScripts', 'minifyScripts', 'compileSass', 'copyXML'], function() {
		return gulp.src(["favicon.ico", "css/application.css", "js/app.js", 'index.html', "img/**"], { base: './'})
		.pipe(gulp.dest('dist'));
	});

gulp.task("serve", ['watchFiles']);

// DEFAULT TASK
gulp.task("default", ["clean"], function() {
	gulp.start('build');
});