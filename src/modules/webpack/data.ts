/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WebpackCategory, Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: WebpackCategory.CORE,
    difficulty: "Basic",
    diagramType: "graph",
    question: "What is Webpack?",
    answer: "A static module bundler for JS apps — it builds a dependency graph from an entry point and bundles everything into output files.",
    detailedAnswer: "Webpack is a highly configurable, static module bundler for modern JavaScript applications. When Webpack processes your application, it internally builds a dependency graph which maps every module your project needs (JavaScript, stylesheets, images, fonts, etc.) and generates one or more static bundles.\n\nKey pillars of Webpack are:\n1. Entry: The starting point of the graph.\n2. Output: Where to emit the bundled files.\n3. Loaders: Transforms applied on files (e.g., compile TypeScript to JS, or process CSS).\n4. Plugins: Broad hooks into the compiler lifecycle to perform advanced operations (e.g., bundle optimization, asset management, env variable injection).",
    codeExample: `// webpack.config.js (The minimal foundational setup)
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};`
  },
  {
    id: 2,
    category: WebpackCategory.CORE,
    difficulty: "Basic",
    diagramType: "graph",
    question: "What is an \"entry\" in Webpack config?",
    answer: "The file where Webpack starts building its dependency graph (e.g. `./src/index.js`).",
    detailedAnswer: "The `entry` point indicates which module Webpack should use to begin building its internal dependency graph. Webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly) and traverse the entire tree.\n\nYou can specify a single entry point or multiple entry points (for multi-page applications or separating concerns):\n- Single Entry (Shorthand): `entry: './src/index.js'`\n- Object Syntax (Highly Scalable): `entry: { main: './src/index.js', admin: './src/admin.js' }` which outputs separate bundles for different application sections.",
    codeExample: `// Different entry configurations
module.exports = {
  // Single Entry
  entry: './src/index.ts',
  
  // Or Multi-Page App entry points:
  /*
  entry: {
    app: './src/app.tsx',
    dashboard: './src/dashboard.tsx',
  }
  */
};`
  },
  {
    id: 3,
    category: WebpackCategory.CORE,
    difficulty: "Basic",
    diagramType: "graph",
    question: "What is \"output\" in Webpack config?",
    answer: "Configuration for where and how the bundled files are written (path, filename pattern).",
    detailedAnswer: "The `output` property tells Webpack where to write the compiled files to disk and how to name them. While the entry point can accept multiple entries, only one output configuration can be specified.\n\nKey configuration sub-properties:\n- `path`: The absolute path to the target directory (usually resolved using Node's `path` module).\n- `filename`: The name of the output bundle(s). We can use dynamic naming tokens like `[name]` (maps to the entry key), `[contenthash]` (for caching), and `[chunkhash]` to manage caching and code-splitting outputs.",
    codeExample: `const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // e.g. main.f83bc8d9.js
    clean: true, // Cleans the output directory before each build (Webpack 5)
    publicPath: '/', // The base path for all assets loaded in your app
  }
};`
  },
  {
    id: 4,
    category: WebpackCategory.LOADERS,
    difficulty: "Basic",
    diagramType: "loader",
    question: "What is a loader?",
    answer: "A transform applied to individual files before they're added to the bundle (e.g. compiling TS, transpiling JSX, processing CSS).",
    detailedAnswer: "Out of the box, Webpack only understands JavaScript and JSON files. Loaders allow Webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.\n\nLoaders have two main properties in a config:\n1. `test`: A regular expression identifying which file type should be processed.\n2. `use`: The loader or array of loaders to apply. \n\n*Crucial detail*: Loaders execute from right-to-left (or bottom-to-top) in an array! For example, `['style-loader', 'css-loader']` executes `css-loader` first, then `style-loader`.",
    codeExample: `module.exports = {
  module: {
    rules: [
      {
        test: /\\.css$/,
        // Executes css-loader (resolves imports) then style-loader (injects styles)
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
};`
  },
  {
    id: 5,
    category: WebpackCategory.PLUGINS,
    difficulty: "Basic",
    diagramType: "plugin",
    question: "What is a plugin?",
    answer: "A hook into the broader build lifecycle that can act on the entire bundle output (e.g. generating HTML, extracting CSS, minifying).",
    detailedAnswer: "While loaders are used to transform certain types of modules, Plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management, and injection of environment variables.\n\nA Webpack plugin is a JavaScript object with an `apply` method, which is called by the Webpack compiler, giving access to the entire compilation lifecycle hooks. To use a plugin, you must `require()` it and add it to the `plugins` array in the Webpack config. Since plugins can be used multiple times in a configuration for different purposes, you need to create an instance of them by calling them with the `new` operator.",
    codeExample: `const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // to access built-in plugins

module.exports = {
  plugins: [
    // Automatically generates an HTML file and injects all bundle script tags
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    // Injects constants at compile time
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify('1.0.0'),
    }),
  ],
};`
  },
  {
    id: 6,
    category: WebpackCategory.LOADERS,
    difficulty: "Intermediate",
    diagramType: "loader",
    question: "Loader vs plugin — key difference?",
    answer: "Loaders operate per-file during the module transformation step; plugins operate on the compilation/bundle as a whole and can hook into many lifecycle events.",
    detailedAnswer: "This is one of the most common Webpack interview questions. Here is the concrete, technical breakdown:\n\n- Loaders work at the individual file level *before* or *during* the compilation of the bundle. They act as pre-processors. For example, converting file `App.tsx` (TypeScript) into `App.js` (JavaScript), or transforming a `.scss` stylesheet into raw CSS.\n- Plugins work at the bundle/compilation level and have access to the compiler's entire lifecycle hooks. They can modify how the compilation itself is run, optimize the resulting asset chunks, inject code, clean directories, compress files, or extract styles into physical files *after* the dependency graph is completed.",
    codeExample: `// Loader (module.rules) vs Plugin (plugins)
module.exports = {
  // 1. LOADERS (File-level transformations)
  module: {
    rules: [
      { test: /\\.js$/, use: 'babel-loader' }
    ]
  },
  // 2. PLUGINS (Global compilation lifecycle hooks)
  plugins: [
    new CleanWebpackPlugin() 
  ]
};`
  },
  {
    id: 7,
    category: WebpackCategory.LOADERS,
    difficulty: "Intermediate",
    diagramType: "loader",
    question: "What is `babel-loader` for?",
    answer: "Transpiles modern JS/JSX down to a target browser-compatible JS version using Babel.",
    detailedAnswer: "`babel-loader` is a loader that allows transpiling JavaScript files using Babel as part of your Webpack pipeline. It lets you write code using the latest ECMAScript features (ES6, ES7, async/await, optional chaining, nullish coalescing) as well as JSX (React syntax) and down-compiles it to backward-compatible ES5/ES6 JS that can run in older browsers.\n\nIt relies on a `.babelrc` or `babel.config.json` configuration file where you specify presets like `@babel/preset-env` (for target browsers) and `@babel/preset-react` (for JSX).",
    codeExample: `// Webpack config configuration for babel-loader
module.exports = {
  module: {
    rules: [
      {
        test: /\\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['@babel/preset-react', { runtime: "automatic" }]
            ],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};`
  },
  {
    id: 8,
    category: WebpackCategory.LOADERS,
    difficulty: "Intermediate",
    diagramType: "loader",
    question: "What is `ts-loader`?",
    answer: "Compiles TypeScript files as part of the Webpack build.",
    detailedAnswer: "`ts-loader` is the official TypeScript loader for Webpack. It compiles TypeScript (`.ts` and `.tsx` files) into standard JavaScript, using your project's `tsconfig.json` configuration.\n\nBy default, `ts-loader` performs both transpilation (code emitting) and type checking during the build. Since type-checking can significantly slow down large builds, a common optimization is to use `ts-loader` in `transpileOnly: true` mode, and run type-checking in a separate parallel process using the `ForkTsCheckerWebpackPlugin`.",
    codeExample: `// webpack.config.js with ForkTsCheckerWebpackPlugin for speed
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true // Speeds up compilation, delegates checking to plugin
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin() // Runs type checking in a separate thread
  ]
};`
  },
  {
    id: 9,
    category: WebpackCategory.LOADERS,
    difficulty: "Intermediate",
    diagramType: "loader",
    question: "What does `css-loader` do?",
    answer: "Resolves `@import` and `url()` in CSS files, turning CSS into a JS module Webpack can bundle.",
    detailedAnswer: "`css-loader` interprets and resolves `@import` and `url()` statements inside your CSS files just like ES6 `import` statements. It parses the CSS file and transforms it into a JavaScript module (string exports containing styling data and asset references).\n\nBy itself, `css-loader` does not inject the styles into the DOM. It merely parses them and resolves any asset URLs (like background images) so they can be tracked in the dependency graph. It is almost always paired with `style-loader` or `MiniCssExtractPlugin` which actually applies the parsed styles.",
    codeExample: `// Parsing CSS file and resolving imports
module.exports = {
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: [
          'style-loader', // Injects styles into DOM
          {
            loader: 'css-loader', // Parses CSS and resolves @import & url()
            options: {
              modules: true, // Enables CSS Modules support if needed!
            }
          }
        ],
      },
    ],
  },
};`
  },
  {
    id: 10,
    category: WebpackCategory.LOADERS,
    difficulty: "Intermediate",
    diagramType: "loader",
    question: "What does `style-loader` do?",
    answer: "Injects CSS from `css-loader`'s output into the DOM via `<style>` tags at runtime.",
    detailedAnswer: "`style-loader` takes the compiled CSS modules generated by `css-loader` and injects them dynamically into your document header as inline `<style>` tags at runtime when your JavaScript bundles load in the browser.\n\nThis is highly efficient for development because it enables extremely fast Hot Module Replacement (HMR) for CSS. However, for production builds, injecting large amounts of CSS via JavaScript can cause a flash of unstyled content (FOUC) and increase JS execution costs. Therefore, it is typically swapped out for `MiniCssExtractPlugin.loader` in production.",
    codeExample: `const isDevelopment = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: [
          // Use style-loader in dev, extract CSS in prod
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
};`
  },
  {
    id: 11,
    category: WebpackCategory.PLUGINS,
    difficulty: "Advanced",
    diagramType: "plugin",
    question: "What is `MiniCssExtractPlugin` for?",
    answer: "Extracts CSS into separate physical `.css` files instead of injecting via JS at runtime — better for production caching/performance.",
    detailedAnswer: "`MiniCssExtractPlugin` is a specialized plugin and loader combination designed to extract CSS into separate physical files on disk instead of embedding CSS strings into the JS bundles (as style-loader does).\n\nBenefits for Production:\n1. Parallel Loading: The browser can download JS and CSS files in parallel.\n2. Avoid Flash of Unstyled Content (FOUC): Styling loads ahead of or concurrently with script execution.\n3. Long-Term Caching: CSS changes don't invalidate JS cache hashes, and vice-versa, allowing independent browser caching.",
    codeExample: `const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extractor loader
          'css-loader',
        ],
      },
    ],
  },
};`
  },
  {
    id: 12,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Intermediate",
    diagramType: "optimization",
    question: "What is code splitting?",
    answer: "Breaking the bundle into multiple smaller chunks loaded on demand, rather than one large bundle loaded upfront.",
    detailedAnswer: "Code splitting is one of the most powerful features of Webpack. It allows you to split your application code into multiple physical 'chunks' which can then be loaded on-demand (lazy-loaded) or loaded in parallel instead of downloading a single monolithic `bundle.js` file.\n\nCode splitting drastically improves performance by reducing the Initial Page Load Time (saving battery, bandwidth, and CPU processing on first load). It allows caching of large static dependencies (like libraries) independently from application code that changes frequently.",
    codeExample: `// Conceptual benefits of code splitting
// Monolithic build: bundle.js (2.5 MB) -> loads on homepage
// Code split build:
//   - main.js (150 KB) -> Loaded initially on home page
//   - vendor.js (1.2 MB) -> Cached permanently (React, Router)
//   - dashboard.chunk.js (500 KB) -> Loaded ONLY if user logs in`
  },
  {
    id: 13,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Intermediate",
    diagramType: "optimization",
    question: "How do you trigger code splitting in Webpack?",
    answer: "Dynamic `import()` syntax, or configuring `optimization.splitChunks`.",
    detailedAnswer: "There are three general approaches to code splitting in Webpack:\n\n1. Entry Points: Manually split code by configuring multiple entry points in the config (e.g. separate admin and app bundles).\n2. Dynamic Imports: Using the ES6 dynamic `import()` function syntax in your code (e.g. `import('./module')`). Webpack detects this syntax and automatically places that module (and its unique sub-dependencies) into a separate chunk loaded asynchronously.\n3. Prevent Duplication: Using `optimization.splitChunks` to extract common dependencies (like vendor libraries) into separate files shared across chunks.",
    codeExample: `// 1. Dynamic Import (Triggers code splitting automatically)
button.addEventListener('click', () => {
  import(/* webpackChunkName: "heavy-chart" */ './chart')
    .then(({ renderChart }) => {
      renderChart();
    });
});

// 2. Webpack entry config code-splitting (Webpack 5 shared option)
/*
module.exports = {
  entry: {
    index: { import: './src/index.js', dependOn: 'shared' },
    admin: { import: './src/admin.js', dependOn: 'shared' },
    shared: 'lodash',
  },
};
*/`
  },
  {
    id: 14,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Advanced",
    diagramType: "optimization",
    question: "What is `optimization.splitChunks` used for?",
    answer: "Automatically extracts shared/common dependencies (e.g. vendor libraries) into separate chunks to improve caching across pages.",
    detailedAnswer: "`optimization.splitChunks` is a Webpack configuration block powered by the built-in `SplitChunksPlugin`. It analyzed your dependency graph and automatically extracts duplicated modules or vendor files (`node_modules`) into separate physical chunks.\n\nBy default, Webpack 5 automatically splits chunks for dynamic imports under certain thresholds (size, request counts). However, we can configure it to compile all common vendor scripts into a dedicated chunk (like `vendor.js`) so that when your application logic changes, browser clients do not need to re-download unchanged node modules.",
    codeExample: `module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all', // Splitting applies to both initial (synchronous) and dynamic chunks
      minSize: 20000, // Minimum size in bytes for a chunk to be generated
      cacheGroups: {
        defaultVendors: {
          test: /[\\\\/]node_modules[\\\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: 'vendors', // output file will be vendors.[hash].js
        },
        default: {
          minChunks: 2, // Modules shared across 2 or more files
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};`
  },
  {
    id: 15,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Advanced",
    diagramType: "optimization",
    question: "What is tree shaking?",
    answer: "Eliminating unused exports/dead code from the final bundle, relying on ES module static structure to determine what's actually used.",
    detailedAnswer: "Tree shaking is a term commonly used in the JavaScript community for dead-code elimination. It describes the process of removing unused/dead code from the final bundle. It relies on the static structure of ES2015/ES6 module syntax (`import` and `export`) because these statements can be analyzed statically at compile time before the program runs.\n\nIn Webpack, when you run in `production` mode, Webpack identifies unused exports, marks them, and then passes them to a minifier (like Terser/Esbuild) which physically strips them out of the output file.",
    codeExample: `// math.js - Source file
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b; // UNUSED

// index.js - Entry file
import { add } from './math';
console.log(add(5, 10));

// -> Tree Shaking removes 'subtract' completely from dist/bundle.js`
  },
  {
    id: 16,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Advanced",
    diagramType: "optimization",
    question: "What's required for tree shaking to work well?",
    answer: "Using ES modules (`import`/`export`) rather than CommonJS (`require`), and marking `sideEffects: false` in package.json where accurate.",
    detailedAnswer: "Tree shaking is not automatic and can easily break if modules aren't written or configured correctly. The essential prerequisites are:\n\n1. ES6 Module Syntax: You must use 'import' and 'export'. Tree shaking does not work with CommonJS 'require()' and 'module.exports' because CommonJS is dynamic and can't be statically analyzed.\n2. Terser/Minification: Webpack marks unused code, but the minifier (configured in production mode) performs the actual removal.\n3. Side Effects Declaration: You must tell Webpack if modules have 'side effects' (e.g. injecting global CSS, modifying prototypes). Marking 'sideEffects: false' in your 'package.json' gives Webpack permission to shake off imported modules that are never actively invoked.",
    codeExample: `// package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "sideEffects": false 
  // OR specify files that shouldn't be shaken due to global side-effects:
  // "sideEffects": ["*.css", "*.scss"]
}`
  },
  {
    id: 17,
    category: WebpackCategory.PLUGINS,
    difficulty: "Intermediate",
    diagramType: "plugin",
    question: "What is `HtmlWebpackPlugin`?",
    answer: "Generates an HTML file automatically, injecting script/link tags for the bundled output — avoids manually updating HTML when bundle filenames change (e.g. with hashes).",
    detailedAnswer: "`HtmlWebpackPlugin` simplifies the creation of HTML files to serve your bundles. This is especially useful for production Webpack builds where you add a cache-busting `[contenthash]` to output filenames.\n\nInstead of manually updating `<script>` source tags in index.html after every single build, the plugin automatically generates an HTML5 file, loads a custom template if configured, and injects all script tags (`<script src=\"main.a39cd8.js\">`) and style link tags directly into the generated HTML document.",
    codeExample: `const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Masterclass',
      template: './src/index.html', // path to source template
      inject: 'body', // injects scripts at the bottom of <body>
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    })
  ]
};`
  },
  {
    id: 18,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Intermediate",
    diagramType: "optimization",
    question: "What is content hashing in output filenames (`[contenthash]`)?",
    answer: "Appends a hash of the file's content to its filename, so browsers only re-download it when the content actually changes — enables long-term caching.",
    detailedAnswer: "To optimize load times, web browsers cache static files (scripts, stylesheets). However, if you update your app code and deploy it with the exact same filename (e.g., `main.js`), clients might still load the old cached script, causing bugs.\n\nContent hashing resolves this. By adding `[contenthash]` to the Webpack output filename config, Webpack calculates a cryptographic hash based on the exact characters of the output file. If the code inside that module changes, the output filename changes. If the code remains identical, the filename is unchanged, allowing browsers to safely fetch from their local cache.",
    codeExample: `// Output file hash demonstration
module.exports = {
  output: {
    filename: '[name].[contenthash].js', // e.g. main.3d8c11f48641ebde229a.js
    chunkFilename: '[name].[contenthash].chunk.js'
  }
};`
  },
  {
    id: 19,
    category: WebpackCategory.CORE,
    difficulty: "Basic",
    diagramType: "graph",
    question: "What is `resolve.extensions`?",
    answer: "Lets you import files without specifying the extension (e.g. `import './App'` resolving to `App.tsx`).",
    detailedAnswer: "In standard Node.js and browser modules, importing a file requires providing the extension (like `import App from './App.js'`).\n\nThe `resolve.extensions` configuration is an array that tells Webpack's resolver module which extensions to automatically try appending in order if a file import path is specified without an extension.\n\nFor example, if you configure `extensions: ['.ts', '.tsx', '.js']`, and write `import App from './App'`, Webpack will look for `./App.ts` first, then `./App.tsx`, and finally `./App.js`.",
    codeExample: `module.exports = {
  resolve: {
    // Allows you to write: import { Button } from './components/Button'
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.wasm'],
  },
};`
  },
  {
    id: 20,
    category: WebpackCategory.CORE,
    difficulty: "Intermediate",
    diagramType: "graph",
    question: "What is `resolve.alias`?",
    answer: "Lets you define shortcut import paths (e.g. `@components` mapping to `src/components`), avoiding long relative import chains.",
    detailedAnswer: "`resolve.alias` creates aliases to import or require certain modules more easily. In large codebases, relative paths can become very long and fragile (e.g. `import Header from '../../../../components/Header'`).\n\nBy mapping folder paths to aliases, you can write clean, absolute-like imports from anywhere in your codebase. Commonly, `@` is mapped to the `src` directory, or `@components` is mapped to `src/components`.",
    codeExample: `const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};

// Now you can write anywhere:
// import { Button } from '@components/Button';`
  },
  {
    id: 21,
    category: WebpackCategory.CORE,
    difficulty: "Intermediate",
    diagramType: "graph",
    question: "What is a Webpack \"mode\" and what does it affect?",
    answer: "`development` or `production` — affects default optimizations (minification, tree shaking) and built-in environment variables.",
    detailedAnswer: "Webpack lets you set a `mode` parameter to `development`, `production`, or `none`. This configuration tells Webpack to use its built-in optimizations corresponding to each environment automatically:\n\n- `development`: Focuses on extreme build speed and dev experience. Enables useful browser-based error logging, detailed source maps, and path names in bundle outputs. It disables minification and caching-optimizations.\n- `production`: Focuses on file size and runtime performance. Enables minification (Terser), tree shaking, scope hoisting (`ModuleConcatenationPlugin`), and optimizes chunk loading. It sets `process.env.NODE_ENV` to 'production'.",
    codeExample: `// Dynamic configuration based on mode arg
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    optimization: {
      minimize: isProduction, // automatically minifies code in production
    }
  };
};`
  },
  {
    id: 22,
    category: WebpackCategory.DEV_EXP,
    difficulty: "Basic",
    diagramType: "devexp",
    question: "What does `devServer` configure?",
    answer: "Webpack Dev Server settings — port, hot module replacement, proxying API requests, etc., for local development.",
    detailedAnswer: "Webpack Dev Server provides a fast and highly-interactive local development server with built-in live reloading and Hot Module Replacement (HMR).\n\nThe `devServer` configuration block allows customizing how this local server operates. You can configure: \n- Port and host: Where to serve the app (e.g. `localhost:3000`).\n- Compression: Enabling gzip compression (`compress: true`).\n- Routing: Support for SPA client-side routing (`historyApiFallback: true`).\n- Proxies: Forwarding API requests to avoid CORS issues in dev.",
    codeExample: `module.exports = {
  devServer: {
    static: './dist', // Where to serve static assets from
    port: 3000,
    hot: true, // Enables Hot Module Replacement
    historyApiFallback: true, // Redirects 404s to index.html for SPA routing
    open: true, // Opens browser automatically on startup
    compress: true, // Gzip compress assets
  }
};`
  },
  {
    id: 23,
    category: WebpackCategory.DEV_EXP,
    difficulty: "Intermediate",
    diagramType: "devexp",
    question: "What is Hot Module Replacement (HMR)?",
    answer: "Updates modules in a running app without a full page reload, preserving app state during development.",
    detailedAnswer: "Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is actively running, without a full browser page reload.\n\nWithout HMR, when a line of code is edited, Webpack triggers a full page reload. This resets the application state (e.g., clearing forms, collapse states, dialog states, modal open states). With HMR, Webpack only updates the module that changed. The app's active state (React hooks, state states) is preserved, vastly speeding up CSS adjustment and micro-refactoring feedback loops.",
    codeExample: `// HMR in action (handled automatically by modern React frameworks)
if (module.hot) {
  module.hot.accept('./my-module.js', function() {
    console.log('Accepting the updated my-module module!');
    // Render code or reinitialize state
  });
}`
  },
  {
    id: 24,
    category: WebpackCategory.DEV_EXP,
    difficulty: "Intermediate",
    diagramType: "devexp",
    question: "What is source mapping and why is it used?",
    answer: "Maps bundled/minified code back to original source files, so browser dev tools show readable stack traces/breakpoints during debugging.",
    detailedAnswer: "When Webpack compiles your application for production or local development, it converts multiple files, JSX, styles, and TypeScript into a single or few bundled, heavily minified files. If an error is thrown in production, the console stack trace will point to a cryptic minified line in `bundle.js`.\n\nSource Maps solve this. A source map is a companion file (e.g., `bundle.js.map`) containing an encoded mapping between the compiled, minified code and the original source files. Browser developer tools read this file to display your original TypeScript/React code during debugging, allowing you to set active breakpoints and read legible stack traces.",
    codeExample: `// Generating high quality source maps
module.exports = {
  // Generates physical .map files for production debugging (hidden or uploaded to Sentry)
  devtool: 'source-map', 
};`
  },
  {
    id: 25,
    category: WebpackCategory.DEV_EXP,
    difficulty: "Advanced",
    diagramType: "devexp",
    question: "What's the difference between `devtool: 'source-map'` and other source map options?",
    answer: "Different tradeoffs between build speed and map accuracy/detail — full `source-map` is most accurate but slowest to build; `eval-source-map` faster for dev, less ideal for production.",
    detailedAnswer: "Webpack offers dozens of source map configurations (`devtool` settings) which present distinct trade-offs between Build Speed, Rebuild Speed, and Source Map Accuracy.\n\n- `eval`: Fast, but doesn't map to original files (not useful for TS).\n- `eval-cheap-module-source-map`: Popular for development. Medium speed, maps to original files and lines, but omits column-level accuracy.\n- `inline-source-map`: Embeds the source map inside the JS file as a base64 string. Slow, makes files huge, only for testing.\n- `source-map`: Emits a physical `.map` file. Slowest build, highest quality, ideal for production.",
    codeExample: `module.exports = {
  // Development: Fast compile, fast rebuild, maps lines
  devtool: 'eval-cheap-module-source-map',
  
  // Or Production: Slow compile, ideal for stack traces
  // devtool: 'source-map'
};`
  },
  {
    id: 26,
    category: WebpackCategory.PLUGINS,
    difficulty: "Advanced",
    diagramType: "plugin",
    question: "What does `externals` in Webpack config do?",
    answer: "Excludes specified dependencies from the bundle, expecting them to be available externally (e.g. via a CDN `<script>` tag) — commonly used for large libraries like React in certain setups.",
    detailedAnswer: "The `externals` configuration provides a way of preventing certain imported modules from being bundled into your final Webpack output files. Instead, Webpack expects these dependencies to be available on the client browser runtime (e.g. pre-loaded as global variables or fetched from a CDN `<script>` tag).\n\nThis is useful when you want to keep your output bundles lightweight, or if you share massive dependencies (like React or jQuery) across multiple independent applications served on the same domain.",
    codeExample: `module.exports = {
  // Exclude React and ReactDOM from output bundles
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};

// Now, in your index.html template:
// <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
// <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>`
  },
  {
    id: 27,
    category: WebpackCategory.PLUGINS,
    difficulty: "Intermediate",
    diagramType: "plugin",
    question: "How would you handle environment variables in Webpack?",
    answer: "`DefinePlugin` to inject values at build time (e.g. `process.env.NODE_ENV`), often combined with `.env` files via `dotenv-webpack`.",
    detailedAnswer: "In JavaScript applications, you often need to toggle endpoints or behavior based on the target environment (Dev vs Production). Since standard browsers do not have access to node's `process.env`, Webpack lets you compile these variables directly into the code at build-time.\n\nThis is achieved using `DefinePlugin`, which performs a literal find-and-replace text substitution on key words like `process.env.API_URL` during bundling. Additionally, `dotenv-webpack` is commonly used to load variables from `.env` files and inject them into `DefinePlugin` automatically.",
    codeExample: `const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    // 1. Native DefinePlugin injection:
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://api.myapp.com'),
      'process.env.FEATURE_FLAG': JSON.stringify(true),
    }),
    
    // 2. Or load .env variables automatically:
    new Dotenv()
  ]
};`
  },
  {
    id: 28,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Intermediate",
    diagramType: "optimization",
    question: "What is lazy loading in the context of Webpack + React?",
    answer: "Using `React.lazy()` with dynamic `import()`, which Webpack automatically splits into a separate chunk loaded only when needed.",
    detailedAnswer: "Lazy loading is a pattern where you defer loading code chunks until the moment they are actually required by the user (e.g., clicking onto a new tab or loading a non-homepage route).\n\nIn React, you implement this natively using `React.lazy()` in combination with an ES dynamic `import()`. When Webpack encounters the dynamic import, it automatically bundles that component (and all its exclusive imports) into a separate script file. React then handles loading this script over the network only when the component is rendered, showing a placeholder (`Suspense`) in the meantime.",
    codeExample: `import React, { Suspense } from 'react';

// Webpack detects this and splits AdminDashboard into its own chunk
const AdminDashboard = React.lazy(() => 
  import(/* webpackChunkName: "admin-dashboard" */ './AdminDashboard')
);

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <AdminDashboard />
      </Suspense>
    </div>
  );
}`
  },
  {
    id: 29,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Intermediate",
    diagramType: "optimization",
    question: "How do you analyze bundle size in Webpack?",
    answer: "`webpack-bundle-analyzer` plugin visualizes what's contributing to bundle size, helping identify large/duplicate dependencies.",
    detailedAnswer: "As projects grow, bundles can quickly bloat due to large transitive node modules (like lodash, moment.js) or double-bundling of dependencies.\n\nTo audit your bundles, `webpack-bundle-analyzer` is the standard tool. It starts a local web server displaying an interactive, zoomable treemap showing the exact byte sizes of every file included in your output bundles. This visual approach lets developers instantly see which libraries are the heaviest and optimize accordingly (e.g., swapping `moment` for `date-fns`).",
    codeExample: `// Setup in webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // starts a local web server on port 8888
      openAnalyzer: true,     // opens browser automatically
    })
  ]
};`
  },
  {
    id: 30,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Intermediate",
    diagramType: "optimization",
    question: "What is a \"vendor\" chunk?",
    answer: "A separate bundle containing third-party dependencies (node_modules), split out so it can be cached independently of your app's own frequently-changing code.",
    detailedAnswer: "A vendor chunk is a specific bundle file that contains solely third-party libraries (code imported from `node_modules`).\n\nWhy split out vendors?\nApplication logic changes frequently (e.g., twice a day), requiring you to rebuild and push new scripts. However, your core dependencies like `react`, `react-dom`, or `axios` change very rarely. By isolating libraries into a `vendor.[contenthash].js` chunk, the browser can cache this heavy chunk permanently, downloading only the tiny `main.[contenthash].js` file on subsequent visits.",
    codeExample: `module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};`
  },
  {
    id: 31,
    category: WebpackCategory.DEV_EXP,
    difficulty: "Intermediate",
    diagramType: "devexp",
    question: "Why might teams move away from Webpack to Vite for development?",
    answer: "Webpack bundles the entire app before serving in dev; Vite serves native ES modules directly, giving near-instant dev server start regardless of app size.",
    detailedAnswer: "Vite has become extremely popular due to a fundamental architectural difference in how it handles local development compared to bundlers like Webpack:\n\n- Webpack's Dev Server: Traverses your entire dependency graph, processes loaders on every module, and creates a bundle in memory *before* it can start serving the application. On huge apps, this initial spin-up can take 30 to 120 seconds.\n- Vite: Takes advantage of native browser ES modules (ESM). It starts the dev server immediately without bundling anything upfront. When the browser requests a file, Vite compiles it on-demand and serves it instantly. It also uses extremely fast pre-bundling for `node_modules` via esbuild (written in Go).",
    codeExample: `// Architectural Difference:
// Webpack Dev: Entry -> Build graph -> Bundle -> Start Server (Slow)
// Vite Dev: Start Server -> Request '/' -> Serve native ESM on-demand (Instant)`
  },
  {
    id: 32,
    category: WebpackCategory.DEV_EXP,
    difficulty: "Intermediate",
    diagramType: "devexp",
    question: "Is Webpack still relevant given tools like Vite?",
    answer: "Yes for production builds and complex custom pipelines; many teams use Vite for dev experience and still rely on Webpack (or Rollup, which Vite uses for prod builds) elsewhere.",
    detailedAnswer: "Absolutely. While Vite is highly favored for development, Webpack remains highly relevant and is still the engine behind thousands of major applications, including Next.js (which uses a custom Webpack implementation alongside Turbopack).\n\nWebpack's advantages:\n1. Extensive Ecosystem: Over a decade of community loaders, plugins, and mature bug resolution.\n2. Ultimate Configuration: Webpack can handle incredibly complex, non-traditional asset pipelines and custom module loading mechanisms that Vite/Rollup cannot easily parse.\n3. Federation: Webpack Module Federation is the industry standard for Micro-Frontends, letting separate apps share code at runtime dynamically.",
    codeExample: `// Module Federation Example (Unique Webpack powerhouse feature)
// app-1 config
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
    }),
  ],
};`
  },
  {
    id: 33,
    category: WebpackCategory.CORE,
    difficulty: "Basic",
    diagramType: "graph",
    question: "What is the difference between a bundler and a transpiler?",
    answer: "A transpiler (like Babel) converts code from one JS version/syntax to another; a bundler (like Webpack) combines multiple modules/files into fewer output files, but may use a transpiler as part of that process via loaders.",
    detailedAnswer: "These two build pipeline tools serve completely different functions but are frequently paired together:\n\n- Transpiler (e.g. Babel, TypeScript Compiler): Converts code with modern, experimental, or specific syntax (like TypeScript, JSX, or ESNext) into standard browser-compatible JavaScript (like ES5). It acts on code structures but does not combine files or resolve module paths.\n- Bundler (e.g. Webpack, Rollup, Parcel): Connects independent code files together. It reads imports/exports, maps a dependency graph, resolves asset URLs, and compiles multiple individual files into single optimized chunks. It uses transpilers as loaders inside its pipeline.",
    codeExample: `// Pipeline flow representation:
// [Source Files: App.tsx, Button.tsx, logo.png]
//        |  (Webpack bundles them together)
//        |--> Webpack calls ts-loader (Transpiles tsx -> js)
//        |--> Webpack processes PNG (Asset module resolves URL)
// [Output Files: bundle.js, logo.png]`
  },
  {
    id: 34,
    category: WebpackCategory.LOADERS,
    difficulty: "Intermediate",
    diagramType: "loader",
    question: "How would you configure Webpack to support both JS and TS in the same project?",
    answer: "Add `ts-loader` (or `babel-loader` with TS preset) for `.ts`/`.tsx` files, and include both extensions in `resolve.extensions`.",
    detailedAnswer: "To support a mixed JS and TS codebase, you need to configure Webpack loaders to handle both file extensions and ensure Webpack can resolve imports lacking explicit extensions.\n\nThere are two main approaches:\n1. Separate Loaders: Use `babel-loader` (or `swc-loader`) for `.js/.jsx` files, and `ts-loader` for `.ts/.tsx` files.\n2. Babel Unified: Use `babel-loader` for all JS/TS files, configuring Babel with `@babel/preset-typescript`. This is faster and simpler, but delegates type checking entirely to standard CLI commands or IDEs.",
    codeExample: `module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // crucial for import resolution
  },
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};`
  },
  {
    id: 35,
    category: WebpackCategory.CORE,
    difficulty: "Basic",
    diagramType: "graph",
    question: "What is a \"chunk\" in Webpack terminology?",
    answer: "A piece of the output bundle — could be the main entry bundle, a vendor bundle, or a lazily-loaded route/feature bundle.",
    detailedAnswer: "In Webpack terminology, a chunk is an intermediate or final bundle file that is produced during the build process.\n\nWebpack maps modules (your source code files) to chunks:\n1. Initial Chunks: Chunks that are loaded during page startup. These are defined by entry points and synchronous dependencies (e.g., `main.js`).\n2. Async Chunks: Chunks that are dynamically loaded in the background or on-demand (triggered via dynamic `import()`).\n3. Runtime Chunk: Special chunk containing the Webpack manifest/loader runtime module.",
    codeExample: `// Entry definition creates physical "Chunks"
module.exports = {
  entry: {
    main: './src/index.js',      // Chunks produced: 'main'
    admin: './src/admin.js'     // Chunks produced: 'admin'
  }
};`
  },
  {
    id: 36,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Advanced",
    diagramType: "optimization",
    question: "How does Webpack determine what to include from `node_modules`?",
    answer: "Anything actually imported (directly or transitively) from your entry point's dependency graph gets included, following the same tree-shaking/inclusion rules as your own code.",
    detailedAnswer: "Webpack does not blindly bundle your entire `node_modules` folder. It is entirely dependency-driven.\n\nWhen Webpack parses your entry points, it reads every import statement. If it encounters `import _ from 'lodash'`, it searches for lodash in `node_modules`, parses its package.json entry, and adds lodash to the dependency graph. Webpack then crawls lodash's own internal imports to add its sub-dependencies. Any library in `node_modules` that is never actively imported in your entry graph will be completely ignored, keeping the bundle clean.",
    codeExample: `// package.json defines dependencies
// If "dependencies": { "lodash": "^4.17.21" } is present,
// but NOT imported in any file in src/ -> LODASH IS NOT BUNDLED.`
  },
  {
    id: 37,
    category: WebpackCategory.LOADERS,
    difficulty: "Advanced",
    diagramType: "loader",
    question: "What is asset modules (`asset/resource`, `asset/inline`) in Webpack 5?",
    answer: "Built-in handling for importing files like images/fonts without needing separate loaders (`file-loader`/`url-loader`), configurable to output as separate files or inline base64.",
    detailedAnswer: "In Webpack 4 and earlier, to import assets like PNGs, SVGs, or custom TTF fonts, you had to install and configure heavy third-party loaders like `file-loader` (emits a file to dist) and `url-loader` (inlines asset as a data-URI string).\n\nWebpack 5 introduced Asset Modules, built-in types that handle assets without requiring custom loaders:\n- `asset/resource`: Emits a separate file and exports the URL (replaces `file-loader`).\n- `asset/inline`: Exports a data URI of the asset as base64 (replaces `url-loader`).\n- `asset/source`: Exports the raw source content of the asset (replaces `raw-loader`).\n- `asset`: Automatically chooses between resource or inline based on size thresholds (replaces `url-loader` limit config).",
    codeExample: `module.exports = {
  module: {
    rules: [
      {
        test: /\\.png$/,
        type: 'asset/resource', // outputs asset to dist/images/ and returns url
        generator: {
          filename: 'static/images/[hash][ext][query]'
        }
      },
      {
        test: /\\.svg$/,
        type: 'asset/inline', // encodes asset as base64 inside output JS
      },
    ],
  },
};`
  },
  {
    id: 38,
    category: WebpackCategory.DEV_EXP,
    difficulty: "Advanced",
    diagramType: "devexp",
    question: "What is a common cause of a Webpack build being slow, and how would you address it?",
    answer: "Large numbers of files being processed by loaders (especially Babel/TS) without caching — enabling `cache: true` (loader-level or Webpack's persistent cache) and narrowing loader `include`/`exclude` scopes helps significantly.",
    detailedAnswer: "Webpack performance bottlenecks are usually related to expensive loader tasks (compiling TypeScript/Babel or optimizing heavy images) or poor cache management.\n\nTop strategies to resolve slow Webpack builds:\n1. Narrow Loader Scope: Ensure loaders exclude `node_modules` and only include necessary directories.\n2. Webpack 5 Persistent Caching: Enable physical file system caching (`cache: { type: 'filesystem' }`).\n3. Speedy Compilers: Replace `babel-loader` or `ts-loader` with faster alternatives like `esbuild-loader` or `swc-loader`.\n4. Fork Type-Checking: Delegate TypeScript typechecking to a separate process via `ForkTsCheckerWebpackPlugin` so compiling is non-blocking.",
    codeExample: `module.exports = {
  // 1. Enable ultra-fast persistent filesystem caching
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        use: 'babel-loader',
        // 2. Strict exclude scope speeds up build 10x!
        exclude: /node_modules/, 
        include: path.resolve(__dirname, 'src'),
      }
    ]
  }
};`
  },
  {
    id: 39,
    category: WebpackCategory.DEV_EXP,
    difficulty: "Advanced",
    diagramType: "devexp",
    question: "How would you set up a proxy for API requests during local development?",
    answer: "Configure `devServer.proxy` to forward requests matching a path (e.g. `/api`) to your backend server, avoiding CORS issues in dev.",
    detailedAnswer: "During local development, your frontend app often runs on `http://localhost:3000` while your backend API serves on `http://localhost:5000` (or another domain). Making direct requests from the browser across ports causes browser security engines to block requests due to CORS (Cross-Origin Resource Sharing) rules.\n\nWebpack's `devServer.proxy` resolves this. It boots a local node proxy server alongside Webpack. When your code fetches `/api/users`, Webpack devServer captures it and forwards the request server-to-server to `http://localhost:5000/api/users`, bypassing browser CORS block, and returning the response.",
    codeExample: `module.exports = {
  devServer: {
    proxy: [
      {
        context: ['/api'], // Matches any path starting with /api
        target: 'http://localhost:5000', // Redirect target server
        changeOrigin: true, // Rewrites Host header to match target
        secure: false, // Allows self-signed certificates
        pathRewrite: { '^/api': '' }, // Optional: Strips '/api' from the target path
      }
    ]
  }
};`
  },
  {
    id: 40,
    category: WebpackCategory.OPTIMIZATIONS,
    difficulty: "Advanced",
    diagramType: "optimization",
    question: "What's the purpose of `optimization.runtimeChunk`?",
    answer: "Extracts Webpack's runtime/manifest code into its own small chunk, improving long-term caching since it changes independently of your actual app code.",
    detailedAnswer: "Webpack injects boilerplate 'runtime' code into the bundles to handle dynamically loading chunks, loading styles, and executing exports. By default, this runtime manifest is bundled inside the entry point (e.g., `main.js`).\n\nWhen a minor code change is made in a lazy-loaded component, the file sizes of other modules are unaffected, but the runtime's internal mapping indexes change. If the runtime is embedded in `main.js`, its contenthash changes, forcing browsers to re-download the main app script. Setting `optimization.runtimeChunk: 'single'` separates this manifest into a tiny, isolated chunk, preventing unrelated browser cache invalidations.",
    codeExample: `module.exports = {
  optimization: {
    // Splits Webpack's internal asset loader manifest into its own chunk
    runtimeChunk: {
      name: 'runtime',
    },
  },
};`
  }
];
