'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var rootPath = path.join(__dirname, '..', '..');
var bowerPath = path.join(rootPath, 'bower_components');
var browserPath = path.join(rootPath, 'browser');


var publicPath = path.join(rootPath, 'public');

router.use(express.static(publicPath));

router.use('/bower_components', express.static(bowerPath));
router.use('/browser', express.static(browserPath));

module.exports = router;
