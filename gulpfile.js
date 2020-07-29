
const { src, dest, parallel, series } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const del = require('del')
const rename = require('gulp-rename')

const htmlValidator = require('gulp-w3c-html-validator')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
//const webp = require('gulp-webp')
//const webpHtml = require('gulp-webp-html')
//const webpCss = require('gulp-webpcss')
const tt2woff = require('gulp-ttf2woff')
const tt2woff2 = require('gulp-ttf2woff2')
const fonter = require('gulp-fonter')
const groupCssMediaQueries = require('gulp-group-css-media-queries')
const cleanCss = require('gulp-clean-css')
const fileinclude = require('gulp-file-include')




function browsersync() {
	browserSync.init({
		server: { baseDir: './dist/' },
		notify: false,
		port: 8002,
		injectChanges: true,
		//online: false //если сети нет
	})
}



function js() {
	src(['node_modules/jquery/dist/jquery.min.js', 'src/components/_common/libs/*.js'])
		.pipe(rename({ dirname: '' }))
		.pipe(dest('dist/assets/js/'))  // обработка библиотек
	return src(['src/pages/**/*.js']) // обработка своих Js файлов
		.pipe(fileinclude())
		.pipe(rename({ dirname: '' }))
		.pipe(dest('dist/assets/js/'))
		//.pipe(src(['src/pages/**/*.js']))
		//.pipe(uglify())
		//.pipe(rename({ extname: '.min.js', dirname: '' }))
		//.pipe(dest('dist/assets/js/'))
		.pipe(browserSync.stream())
}



function css() {
	//src('src/pages/**/*.scss')
	//	.pipe(sass())
	//	.pipe(groupCssMediaQueries())
	//	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true, cascade: true }))
	//	//.pipe(webpCss({ webpClass: '.webp', noWebpClass: '.no-webp' }))
	//	.pipe(cleanCss())
	//		.pipe(rename({ extname: '.min.css', dirname: '' }))
	//	.pipe(dest('dist/assets/css/'))
	return src('src/pages/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(groupCssMediaQueries())
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true, cascade: true }))
		//.pipe(webpCss({ webpClass: '.webp', noWebpClass: '.no-webp' }))
		.pipe(rename({ dirname: '' }))
		.pipe(dest('dist/assets/css/'))
		.pipe(browserSync.stream())
}

function fonts_otf() {
	return src('src/components/_common/fonts/*.otf')
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest('src/components/_common/fonts/'))
}

function fonts() {
	src('src/components/_common/fonts/*.ttf')
		.pipe(tt2woff())
		.pipe(dest('dist/assets/fonts/'))
	return src('src/components/_common/fonts/*.ttf')
		.pipe(tt2woff2())
		.pipe(dest('dist/assets/fonts/'))
}

function images() {
	return src(['src/**/*.{gif,png,jpg,svg,webp}', '!src/components/_common/fonts/*'])
		.pipe(newer('dist/assets/img/'))
		//.pipe(webp({quality: 70	}))
		//.pipe(rename({ dirname: '' }))
		//.pipe(dest('dist/assets/img/'))
		//.pipe(src(['src/**/*.{gif,png,jpg,svg,webp}', '!src/components/_common/fonts/*']))
		.pipe(newer('dist/assets/img/'))
		.pipe(imagemin({
			progressive: true,
			svgpPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationlevel: 3
		}))
		.pipe(rename({ dirname: '' }))
		.pipe(dest('dist/assets/img/'))
		.pipe(browserSync.stream())
}



function cleanimg() {
	return del('dist/assets/img/**/*', { force: true })
}

function clean() {
	return del('dist/**/*', { force: true })
}



function html() {
	src(['src/pages/**/*.pug', '!src/pages/mobileProducts/*.pug'])
		.pipe(plumber())
		.pipe(pug({
			doctype: 'html',
			pretty: true
		}))
		.pipe(plumber.stop())
		//.pipe(htmlValidator())
		//.pipe(webpHtml())
		.pipe(rename({ dirname: '' }))
		.pipe(dest('dist/'))
	return src('src/pages/mobileProducts/*.pug')
		.pipe(plumber())
		.pipe(pug({
			doctype: 'html',
			pretty: true
		}))
		.pipe(plumber.stop())
		//.pipe(htmlValidator())
		//.pipe(webpHtml())
		//.pipe(rename({ dirname: '' }))
		.pipe(dest('dist/mobileProducts'))
		.pipe(browserSync.stream())
}


const gulp = require('gulp')
function watchfiles() {
	gulp.watch('src/**/*.scss', css)
	gulp.watch('src/**/*.js', js)
	gulp.watch('src/**/*.pug', html)
	gulp.watch(['src/**/*.{gif,png,jpg,svg,webp}', '!src/components/_common/fonts/*'], images)
}

let build = gulp.series(clean, gulp.parallel(gulp.series(fonts_otf, fonts), images, js, css, html))
let watch = gulp.series(build, gulp.parallel(watchfiles, browsersync))

exports.fonts_otf = fonts_otf;
exports.fonts = fonts;
exports.js = js;
exports.css = css;
exports.html = html;
exports.images = images;
exports.cleanimg = cleanimg;
exports.clean = clean;

exports.build = build
exports.default = watch
//exports.default = parallel(htmltopug, css, browsersync, startwatch)

