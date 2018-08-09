# Critical CSS Style Loader

Dynamically generate critical path css by gathering all imported CSS modules
used during a SSR request. Obtain the resulting CSS as a string to be rendered
by your server application to avoid FOUC in the client.

Includes utilities to avoid duplicated styles in the browser by filtering any
style-loader handled CSS that has been pre-rendered as critical CSS.

### Inspirations
- https://github.com/kriasoft/isomorphic-style-loader
- https://github.com/shuboc/critical-css-style-loader

## Install
`npm install @alleyinteractive/critical-css-style-loader`

## Usage
### webpack.server.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: '@alleyinteractive/critical-css-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ],
      },
    ],
  },
};
```

### webpack.client.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              transform: 'node_modules/@alleyinteractive/critical-css-style-loader/lib/filterCriticalCss.js',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ],
      },
    ],
  },
};
```

### server.js
```js
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  StyleContext,
  CriticalCssBuilder,
} from '@alleyinteractive/critical-css-style-loader/lib';
import App from 'components/app';

const app = express();
// ... configure express

app.use((req, res) => {
  const cssBuilder = new CriticalCssBuilder();
  const html = renderToString(
    <StyleContext.Provider value={cssBuilder.addCss}>
      <App />
    </StyleContext.Provider>
  );

  res.render('app', {
    html,
    criticalCss: cssBuilder.getCss(),
    criticalCssMap: cssBuilder.getEncodedMap(),
  });
});

app.listen();
```

### html.ejs
```js
<!doctype html>
<html lang="en">
<head>
    <style id="critical-css"><%- criticalCss %></style>
</head>
<body>
<div id="root"><%- html %></div>

<script id="preload">
  <%- criticalCssMap %>;
</script>
</body>
</html>
```

### client.js
```js
import React from 'react';
import { withStyles } from 'critical-css-style-loader/lib';
import styles from './app.css';

const App = () => (
 <h1 style={styles.heading}>Hello World!</h1> 
);

const wrapWithStyles = withStyles(styles);
export default wrapWithStyles(App);
```
