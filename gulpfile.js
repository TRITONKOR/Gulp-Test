const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");

const paths = {
    html: "src/*.html",
    scripts: "src/js/**/*.js",
    styles: "src/scss/**/*.scss",
    images: "src/images/**/*",
    dist: "dist/",
};

async function clean() {
    const del = (await import("del")).deleteAsync;
    return del([paths.dist]);
}

function html() {
    return gulp.src(paths.html).pipe(gulp.dest(paths.dist));
}

function styles() {
    return gulp
        .src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS())
        .pipe(concat("style.min.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(`${paths.dist}css`));
}

function scripts() {
    return gulp
        .src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat("script.min.js"))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(`${paths.dist}js`));
}

async function images() {
    const imagemin = (await import("gulp-imagemin")).default;
    return gulp
        .src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(`${paths.dist}images`));
}

function watchFiles() {
    gulp.watch(paths.html, html);
    gulp.watch(paths.styles, styles);
    gulp.watch(paths.scripts, scripts);
    gulp.watch(paths.images, images);
}

const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images));
const watch = gulp.series(build, watchFiles);

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.watch = watch;
