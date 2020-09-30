// Use to check whether root is being found by Panini (currently not being used); Panini cannot find root when using gulp-html-i18n package
module.exports = function(key, options) {
    console.log(key);
    console.log(options);
    return key;
}
