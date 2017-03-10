/**
 * @file User sessions seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var SessionsSenecaPlugin = require('./bin/src/run/SessionsSenecaPlugin').SessionsSenecaPlugin;
var plugin = new SessionsSenecaPlugin();

module.exports = plugin.entry();