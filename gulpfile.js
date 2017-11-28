
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

gulp.task('build', ['clean', 'less', 'js-min'], function() {
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
		notify: false
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
			/*.pipe(gulp.dest('src/css/'))
			.pipe(concat('main.min.css'))
	        .pipe(cssnano())*/
			.pipe(gulp.dest('src/css/'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('flex', function() {
	'use strict';
	return gulp.src('src/libs/flex.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			.pipe(gulp.dest('src/css/'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('js-min', function() {
	'use strict';
	return gulp.src(
				[
					'src/js/player.js',
					'src/js/user.js',
					'src/js/visits.js',
					'src/js/admin.js',
					'src/js/canvas.js',
					'!src/js/app.min.js'
				]
			)
			.pipe(babel())
			.pipe(concat('app.js'))
			.pipe(gulp.dest('src/js'))
			.pipe(rename('app.min.js'))
			.pipe(uglify())
			.pipe(browserSync.reload({stream: true}))
			.pipe(gulp.dest('src/js'));

});


// gulp.task('watch', ['browser-sync', 'less'], function() {
gulp.task('watch', ['browser-sync'], function() {
	'use strict';
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/*.php', browserSync.reload);
	gulp.watch('src/layouts/*.php', browserSync.reload);

    gulp.watch(
    	[
    		'src/js/player.js',
    		'src/js/user.js',
    		'src/js/visits.js',
    		'src/js/admin.js',
    		'src/js/canvas.js'
    	],
    	['js-min']
	);
	
	gulp.watch('src/less/*.less', ['less']);
	

	gulp.watch('src/libs/flex/*.less', ['flex']);
});

gulp.task('default', ['watch']);

