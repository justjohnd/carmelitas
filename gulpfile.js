const plugins = require('gulp-load-plugins');
const gulp = require('gulp');
const del = require('delete');
const webpackStream = require('webpack-stream');
const webpack2 = require('webpack');
const yargs = require('yargs');
const named = require('vinyl-named');
const browser = require('browser-sync');
const uncss = require('uncss');
const autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");

// Load all Gulp plugins into one variable
// JD Question: Why use this? Why list some const's at top, but not others (such as sourcemaps)?
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!yargs.argv.production;

const PORT = 9999;

const PATHS = {
    DIST: 'dist',
    ASSETS: 'dist/assets',
};

gulp.task('build', gulp.series(clean, gulp.parallel(javascript, sass, htmlTask, copy)));

gulp.task('default', gulp.series('build', server, watch));

// Remove dist folder before building
function clean(done) {
    del([PATHS.DIST], done);
}

// Optimize image size
function copy(done) {
    gulp
        .src('./src/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(`${PATHS.ASSETS}/img`)); //What does the $ mean in front of the {}?
        done();
}

// HTML minify
function htmlTask(done) {
    gulp
        .src('./index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(PATHS.DIST));

    gulp
        .src('./src/html/**/*')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(`${PATHS.ASSETS}/html`));
    done();
}

function sass() {
    const postCssPlugins = [
        // Autoprefixer
        autoprefixer(),

        // UnCSS - Uncomment to remove unused styles in production
        PRODUCTION && uncss.postcssPlugin(UNCSS_OPTIONS),
        cssnano()
    ].filter(Boolean);

    return gulp
        .src('src/sass/styles.scss')
        .pipe($.sourcemaps.init())
        .pipe(
            $.sass({
                includePaths: '[]', // add paths to any 3rd party styles here
            }).on('error', $.sass.logError),
        )
        .pipe($.postcss(postCssPlugins))
        .pipe($.if(PRODUCTION, $.cleanCss({
            compatibility: 'ie9'
        })))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write())) //Why doesn't a .map file show in assets?
        .pipe(gulp.dest(`${PATHS.ASSETS}/css`))
        .pipe(browser.reload({
            stream: true
        }));
}

let webpackConfig = {
    mode: PRODUCTION ? 'production' : 'development',
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    compact: false,
                },
            },
        }, ],
    },
    devtool: !PRODUCTION && 'source-map',
};

function javascript() {
    return gulp
        .src('src/js/index.js')
        .pipe(named())
        .pipe($.sourcemaps.init())
        .pipe(webpackStream(webpackConfig, webpack2))
        .pipe(
            $.if(
                PRODUCTION,
                $.terser().on('error', (e) => {
                    console.log(e);
                }),
            ),
        )
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(`${PATHS.ASSETS}/js`));
}

function server(done) {
    browser.init({
            server: PATHS.DIST,
            port: PORT,
        },
        done,
    );
}

function watch() {
    gulp.watch('./**/*.html').on('all', copy); // Bug: will update the file but need to manually reload
    gulp.watch('src/**/*.js').on('all', gulp.series(javascript, browser.reload));
    gulp.watch('src/**/*.scss').on('all', sass);
}

// Clear cache

function clearCache(done) {
    return cache.clearAll(done);
}