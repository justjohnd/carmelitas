const gulp = require("gulp");

const { series, parallel, dest } = require("gulp");

const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const less = require("gulp-less");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const kit = require("gulp-kit");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const zip = require("gulp-zip");
const del = require("del");
const plumber = require("gulp-plumber");
const notifier = require("gulp-notifier");

filesPath = {
  sass: "./src/sass/**/*.scss",
  less: "./src/less/styles.less",
  js: "./src/js/**/*.js",
  images: "./src/img/**/*.+(png|jpg|gif|svg)",
  html: "./html/**/*.kit"
}

// Sass

function sassTask(done) {
  gulp
  .src([filesPath.sass, "!./src/sass/widget.scss"])
  .pipe(plumber({errorHandler: notifier.error}))
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(sass())
  .pipe(cssnano())
  .pipe(sourcemaps.write("."))
  .pipe(
    rename(function(path) {
      if (!path.extname.endsWith(".map")) {
        path.basename += ".min";
      }
    })
  )
  .pipe(dest("./dist/css"));
  done();
}

// Less

function lessTask(done) {
  gulp
  .src(filesPath.less)
  .pipe(plumber({errorHandler: notifier.error}))
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(cssnano())
  .pipe(sourcemaps.write("."))
  .pipe(rename("./styles.min.css"))
  .pipe(dest("./dist/css"));
  done();
}

// Javascript

function jsTask(done) {
  gulp
  .src(["./src/js/alert.js", "./src/js/project.js"])
  .pipe(plumber({errorHandler: notifier.error}))
  .pipe(babel({
    presets: ["@babel/env"]
  }))
  .pipe(concat("project.js"))
  .pipe(uglify())
  .pipe(
    rename({
      suffix: ".min"
    })
  )
  .pipe(dest("./dist/js"));
  done();
}

// Images optimization

function imagesTask(done) {
  gulp.src(filesPath.images)
    .pipe(cache(imagemin()))
    .pipe(dest("./dist/img/"));
  done();
}

// HTML minify
function htmlminTask(done) {
  gulp
    .src(filesPath.html)
    .pipe(plumber({
      errorHandler: notifier.error
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest("./dist/html"));
  done();
}


// Watch task with BrowserSync

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    browser: "google chrome"
  });

  gulp
    .watch(
      [
        filesPath.sass,
        filesPath.html,
        filesPath.less,
        filesPath.js,
        filesPath.images
      ],
      parallel(sassTask, lessTask, jsTask, imagesTask, kitTask)
    )
    .on("change", browserSync.reload);
}

// Clear cache

function clearCache(done) {
  return cache.clearAll(done);
}

// Zip project

function zipTask(done) {
  gulp.src(["./**/*", "!./node_modules/**/*"])
  .pipe(zip("project.zip"))
  .pipe(dest("./"));
  done();
}

// Clean "dist" folder

function clean(done) {
  del(["./dist/**/*"]);
  done();
}

// Gulp individual tasks

exports.sassTask = sassTask;
exports.lessTask = lessTask;
exports.jsTask = jsTask;
exports.imagesTask = imagesTask;
exports.kitTask = htmlminTask;
exports.watch = watch;
exports.clearCache = clearCache;
exports.zipTask = zipTask;
exports.clean = clean;

// Gulp serve

exports.build = parallel(sassTask, lessTask, jsTask, imagesTask, htmlminTask);

// Gulp default command

exports.default = series(exports.build, watch);
