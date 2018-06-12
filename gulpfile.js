var gulp = require("gulp");
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var postcss = require('gulp-postcss');
var banner = require('gulp-banner');
var version = require('./package.json').version;

var comment =
"/*!\n" +
" * Cachu Slider v" + version + "\n" +
" * Copyright (c) " + (new Date().getFullYear()) + " Mystro Ken <mystroken@gmail.com>\n" +
" * MIT License\n" +
" */\n";


gulp.task("sass", function() {
	gulp
		.src("./src/scss/main.scss")
		.pipe(
			sass({
				outputStyle: "expanded"
			})
		)
		.pipe(banner(comment))
		.pipe(gulp.dest("./dist"));
});

gulp.task("css", function() {
	gulp
		.src("./dist/cachu-slider.css")
		.pipe(sourcemaps.init())
		.pipe(postcss())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./dist"));
});


gulp.task("watch", function () {
	gulp.watch("./src/scss/*.scss", ["sass"]);
	gulp.watch("./dist/*.css", ["css"]);
});

gulp.task("default", ["sass", "css"]);
