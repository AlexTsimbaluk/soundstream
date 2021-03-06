
var gulp = require('gulp'),
	babel = require("gulp-babel"),
	del = require('del'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	browserSync = require('browser-sync')
	;




gulp.task('clean', function() {
	'use strict';
    return del.sync(['dist']);
});

gulp.task('build', ['clean', 'less', 'js'], function() {
	'use strict';
    var buildCss = gulp.src([
        'src/css/main.css',
        'src/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'));

    var buildImg = gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'));

    var buildFonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));

    var buildPhp = gulp.src('src/*.php')
    .pipe(gulp.dest('dist'));

});

gulp.task('browser-sync', function() {
	'use strict';
	browserSync({
		/*server: {
			baseDir: 'src'
		},*/
		proxy: 'soundstream',
		port: 	9999,
		notify: false,

		/*ghostMode: {
		    clicks: true,
		    forms: true,
		    scroll: false
		},*/
		ghostMode: false
	});
});

gulp.task('less', function() {
	'use strict';
	return gulp.src('src/less/main.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			// TODO - починить минификацию
			/*.pipe(gulp.dest('src/css/'))
			.pipe(concat('main.min.css'))
	        .pipe(cssnano())*/
			.pipe(gulp.dest('src/css/'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('utils', function() {
	'use strict';
	return gulp.src('src/libs/utils/layout.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			.pipe(gulp.dest('src/libs/utils/'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('_bootstrap-material', function() {
	'use strict';
	return gulp.src('src/libs/bootstrap-material-design-master/less/bootstrap-material-design.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			.pipe(gulp.dest('src/libs/libs/bootstrap-material-design-master/dist/css'))
			.pipe(browserSync.reload({stream: true}));
});

/*gulp.task('js', function() {
	'use strict';
	return gulp.src('src/js/*.js')
			.pipe(babel())
			.pipe(concat('app.js'))
			.pipe(gulp.dest('src/js'))
			.pipe(rename('app.min.js'))
			.pipe(uglify())
			.pipe(browserSync.reload({stream: true}))
			.pipe(gulp.dest('src/js'));
});*/

gulp.task('js', function() {
	'use strict';
	return gulp.src([
			// 'src/js/*.js', '!src/js/app.min.js'
				'src/js/player.js',
				'src/js/user.js',
				'src/js/visits.js',
				'src/js/admin.js',
				'src/js/fractals.js',
				'src/js/fractals-advanced.js',
				'src/js/canvas.js'

			])
			.pipe(babel())
			.pipe(concat('app.js'))
			.pipe(gulp.dest('src/js'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('js-min', function() {
	'use strict';
	return gulp.src('src/js/app.js')
			.pipe(rename('app.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('src/js'));
});


// gulp.task('watch', ['browser-sync', 'less'], function() {
gulp.task('watch', ['browser-sync'], function() {
	'use strict';
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/**/*.php', browserSync.reload);
	gulp.watch('src/layouts/*.php', browserSync.reload);

    gulp.watch(
    	[
    		'src/js/player.js',
    		'src/js/user.js',
    		'src/js/visits.js',
    		'src/js/admin.js',
    		'src/js/fractals.js',
    		'src/js/fractals-advanced.js',
    		'src/js/canvas.js'
    	],
    	// ['js', 'js-min']
    	['js']
	);
	
	gulp.watch([
			'src/less/*.less',
			'src/libs/bootstrap-material-design-master/less/*.less'
		], ['less']);
	

	gulp.watch('src/libs/utils/*.less', ['utils']);
});

gulp.task('default', ['watch']);

