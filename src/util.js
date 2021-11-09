"use strict";
exports.__esModule = true;
exports.isOff = exports.isOn = exports.tapConsole = void 0;
var core_1 = require("@most/core");
var tapConsole = function (msg) { return (0, core_1.tap)(function (x) { return console.log(msg, x); }); }; // eslint-disable-line
exports.tapConsole = tapConsole;
var isOn = function ($) { return (0, core_1.filter)(function (l) { return l; }, $); };
exports.isOn = isOn;
var isOff = function ($) { return (0, core_1.filter)(function (l) { return !l; }, $); };
exports.isOff = isOff;
