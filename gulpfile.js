const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');

// Move JS Files to dist/js
function js() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        'node_modules/owl.carousel2/dist/owl.carousel.min.js',
        'node_modules/wowjs/dist/wow.min.js',
        'node_modules/jarallax/dist/jarallax.min.js',
        'node_modules/jarallax/dist/jarallax-video.min.js',
        'node_modules/jquery-waypoints/waypoints.min.js',
        'node_modules/counterup/jquery.counterup.min.js',
        'node_modules/jquery.easing/jquery.easing.min.js',
        'node_modules/jquery-countdown/dist/jquery.countdown.min.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
        'node_modules/jquery-animated-headlines/dist/js/jquery.animatedheadline.min.js',
        'node_modules/imagesloaded/imagesloaded.pkgd.min.js'
    ])
    .pipe(dest('dist/js'));
}

// Move CSS to dist/css
function css() {
    return src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/owl.carousel2/dist/assets/owl.carousel.min.css',
        'node_modules/wowjs/css/libs/animate.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/jquery-animated-headlines/dist/css/jquery.animatedheadline.css',
        'node_modules/flag-icon-css/css/flag-icon.min.css'
    ])
    .pipe(dest('dist/css'));
}

// Move Font Awesome Fonts to dist/fonts
function fafonts() {
    return src('node_modules/font-awesome/fonts/*')
    .pipe(dest('dist/fonts'));
}

// Move Flag Icons to dist/flags
function flagIcons() {
    return src('node_modules/flag-icon-css/flags/*/*')
    .pipe(dest('dist/flags'));
}

// css autoprefixer
function cssAutoprefixer() {
    return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(postcss([ autoprefixer( {overrideBrowserslist: ['last 2 versions']} )]))
    .pipe(dest('dist/css/'))
}

// SCSS to CSS Convert
function sassToCss() {
    return src('src/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([ autoprefixer( {overrideBrowserslist: ['last 2 versions']} )]))
    .pipe(dest('dist/'))
}

// Pug to HTML Convert
function pugToHtml() {
    return src('src/pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(dest('dist/'));
}

// SCSS - Pug Watching
function watching() {
    watch('src/scss/*.scss', series(sassToCss));
    watch(['src/pug/*.pug', 'src/pug/inc/*.pug'], series(pugToHtml));
}

const watching2 = parallel(watching);

// exports
exports.watch = watching2;
exports.default = series(js, css, fafonts, flagIcons, cssAutoprefixer, sassToCss, pugToHtml, watching);