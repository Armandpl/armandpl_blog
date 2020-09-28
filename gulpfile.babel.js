import autoprefixer from "autoprefixer";
import browserSync from "browser-sync";
import spawn from "cross-spawn";
import cssnano from "cssnano";
import { dest, series, src, task, watch } from "gulp";
import postcss from "gulp-postcss";
import atimport from "postcss-import";
import tailwindcss from "tailwindcss";
var nested = require("postcss-nested");
var responsive = require('gulp-responsive');
const imagemin = require('gulp-imagemin');
var cachebust = require('gulp-cache-bust');

const SITE_ROOT = "./_site";
const POST_BUILD_STYLESHEET = `${SITE_ROOT}/assets/css/`;
const PRE_BUILD_STYLESHEET = "./src/style.css";
const TAILWIND_CONFIG = "./tailwind.config.js";

// Fix for Windows compatibility
const jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";

const isDevelopmentBuild = process.env.NODE_ENV === "development";

task("buildJekyll", () => {
  browserSync.notify("Building Jekyll site...");

  const args = ["exec", jekyll, "build"];

  if (isDevelopmentBuild) {
    args.push("--incremental");
  }

  return spawn("bundle", args, { stdio: "inherit" });
});

task("processStyles", () => {
  browserSync.notify("Compiling styles...");

  return src(PRE_BUILD_STYLESHEET)
    .pipe(
      postcss([
        atimport(),
        tailwindcss(TAILWIND_CONFIG),
        ...(isDevelopmentBuild ? [nested()] : [nested(), autoprefixer(), cssnano()]),
      ])
    )
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(dest(POST_BUILD_STYLESHEET));
});

task("cacheBust", () => {
    return src('./_site/*/*.html')
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(dest('./_site'));
})

/*task("processImages", () => {
    browserSync.notify("Optimizing images...");
    return src('./assets/images/*')
        .pipe(
            responsive({
                errorOnEnlargement: false,
                quality: 80,
                // Convert all images to JPEG format
                '*': [
                {
                    width: 300,
                    rename: {
                    extname: '.jpg'
                    }
                },
                {
                    // Produce 2x images and rename them
                    width: 300 * 2,
                    rename: {
                    suffix: '@2x',
                    extname: '.jpg'
                    }
                },
                {
                    // Produce 2x images and rename them
                    width: 300 * 3,
                    rename: {
                    suffix: '@3x',
                    extname: '.jpg'
                    }
                }
                ]
            })
        )
        .pipe(imagemin())
        .pipe(dest('./_site/assets/images'))
});*/

task("startServer", () => {
  browserSync.init({
    files: [SITE_ROOT + "/**"],
    open: "local",
    port: 4000,
    server: {
      baseDir: SITE_ROOT,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
  });

  watch(
    [
      "**/*.css",
      "**/*.html",
      "**/*.js",
      "**/*.md",
      "**/*.markdown",
      "!_site/**/*",
      "!node_modules/**/*",
    ],
    { interval: 500 },
    buildSite
  );
});

const buildSite = series("buildJekyll", "processStyles", "cacheBust");

exports.serve = series(buildSite, "startServer");
exports.default = series(buildSite);
