
const pluginBetterSlug = require("@borisschapira/eleventy-plugin-better-slug");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(config) {
  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // use a filter for simple css minification
  config.addFilter("cssmin", require("./src/utils/minify-css.js"))

  // Copies static files to output.
  config.addPassthroughCopy('css');
  config.addPassthroughCopy('fonts');
  config.addPassthroughCopy('images');
  config.addPassthroughCopy('js');

  //plugin for better slug strip characters
  config.addPlugin(pluginBetterSlug);
  
  //plugin for better navigation in pagination
  config.addPlugin(eleventyNavigationPlugin);

  // make the seed target act like prod
  env = (env=="seed") ? "prod" : env;
  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data/${env}`
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };

};
