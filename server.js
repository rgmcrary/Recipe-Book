'use strict';

require('zone.js/dist/zone-node');
require('reflect-metadata');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main.bundle');

function angularRouter(req, res) {
  res.render('index', {req, res});
}

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
app.set('view engine', 'html');
app.set('views', 'dist');

app.get('/', angularRouter);

app.use(express.static(`${__dirname}/dist`));

app.get('*', angularRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
