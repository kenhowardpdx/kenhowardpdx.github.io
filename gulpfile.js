var gulp = require('gulp'),
	spawn = require('child_process').spawn,
	path = require('path');
var plugins = require("gulp-load-plugins")({lazy:false});

gulp.task('scripts', function(){
    //combine all js files of the app
    gulp.src(['./js/dev/*.js'])
        .pipe(plugins.concat('scripts.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('css', function(){
    gulp.src(['./sass/*.scss'])
        .pipe(plugins.sass())
        .pipe(plugins.concat('style.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('vendorJS', function(){
    //concatenate vendor JS files
    gulp.src(['./bower_components/jquery/dist/jquery.js',
		'./bower_components/bootstrap-sass/dist/js/*.min.js',
		'!./bower_components/bootstrap-sass/js/tests/*.js',
		'!./**/Gulpfile.js'])
        .pipe(plugins.concat('lib.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('vendorFonts', function(){
    gulp.src(['./bower_components/**/*.{ttf,woff,eof,svg}'])
    .pipe(plugins.flatten())
    .pipe(gulp.dest('./fonts'));
});

gulp.task('jekyll', function() {
    jekyll = spawn('jekyll', ['build', '--drafts', '--future']);

    jekyll.stdout.on('data', function (data) {
        console.log('jekyll:\t' + data); // works fine
    });
});

gulp.task('reload', function() {
	var server = plugins.livereload();

	server.changed();
});

gulp.task('watch',function(){
    gulp.watch(['./js/dev/*.js'],['scripts']);
    gulp.watch(['./css/dev/*.scss','./css/dev/*.sass'],['css']);
	gulp.watch(
		[
			'!./_site/**/*',
			'!gulpfile.js',
			'./css/*.css',
			'!./js/dev/*.js',
			'./js/*.js',
			'./**/*.markdown',
			'./_layouts/*.html',
			'./_includes/*.html',
			'./index.html',
			'./demos/**/*.html',
			'./blog/**/*.html',
			'./projects/**/*.html'
		],
		['jekyll']);
	gulp.watch(['_site/**'],['reload']);
});

gulp.task('connect', function() {
  plugins.connect.server({
    root: '_site',
	port: '5000',
    livereload: false
  });
});

gulp.task('build',['scripts','css','vendorJS']);
gulp.task('default',['build','watch','connect']);
