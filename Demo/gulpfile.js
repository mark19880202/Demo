"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var compass = require("gulp-compass");
var concat = require('gulp-concat');  
var sourcemap = require("gulp-sourcemaps");
var minifyCSS = require("gulp-minify-css");
var uglify = require('gulp-uglify');
var runSequence = require("run-sequence");
var express = require("express");
var tinylr = require("tiny-lr");
var tinylrServer = tinylr();
var webpack = require("webpack");
var del = require("del");
var argv = require("minimist")(process.argv.slice(2));
var webDir = "app";

gulp.task("clean", function(){
	return del([webDir+ "/js/main.js", webDir + "/css/main.css"])
});

gulp.task("styles", function(){
	return gulp.src(webDir + "/css/*.css")
	.pipe(concat('main.css'))
	.pipe(minifyCSS())
	.pipe(gulp.dest(webDir +"/css"))
});


gulp.task("watch", function(){
	gulp.watch([webDir +"/**/*.*"], function(file){
		tinylrServer.changed({
			body:{
				files: [file.path.replace(file.base,"")]
			}
		})
	})
});

gulp.task("webpack", function(cb){
	var config = require("./webpack.config.js");
	var bundler = webpack(config, function(err){
		if(err){
			console.err("[webpack error]", err);
			return
		}
		cb();
	});
	function bundle(err, stats){
		if(err){
			gutil.log("[webpack error]", err.error);
		}

		if(stats.hasErrors()){
			gutil.log("[webpack error]", stats.compilation.error[0].message);
		}
		if(argv.verbose){
			console.log("[webpack]", stats.toString());
		}
	}

	bundler.watch(200, bundle);

});

gulp.task("express", function(){
	var server = express();
	server.listen("7071", "0.0.0.0");
	server.use(express.static("./" + webDir));
	var open = require("open");
	open("http://localhost:7071/", "chrome");

})
gulp.task("dev", function(callback){
	runSequence("clean", "styles","webpack", "watch", "express", callback);
})