/**
 * @file User sessions process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var _ = require('lodash');
var options = require('./config');

var SessionsBuilder = require('./bin/src/build/SessionsBuilder').SessionsBuilder;
var ProcessRunner = require('pip-services-runtime-node').ProcessRunner;

var runner = new ProcessRunner(new SessionsBuilder());
runner.run(options);