"use strict";
exports.__esModule = true;
exports.pickup = exports.endlessCycle = exports.cycle = exports.clipPeriodic = exports.ending = exports.beginning = void 0;
var core_1 = require("@most/core");
var function_1 = require("fp-ts/lib/function");
var curry_1 = require("@typed/curry");
var phaseWithinCycle = function (clipStart, clipEnd, phase) {
    var period = clipEnd - clipStart;
    return clipStart + (phase % period); // get the equivalent starting point within specified loop region
};
exports.beginning = (0, curry_1.curry)(function (A, B, phase, source$) {
    phase = phaseWithinCycle(A, B, phase);
    return (0, core_1.withLocalTime)(phase, (0, core_1.slice)(phase, B, source$));
});
exports.ending = (0, curry_1.curry)(function (A, B, phase, source$) {
    phase = phaseWithinCycle(A, B, phase);
    return (0, core_1.withLocalTime)(A, (0, core_1.slice)(A, phase, source$));
});
/**
* Create a cyclic clip stream from a given source stream, centered around the time given by `phase`.
* @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
* @param {Time} clipStart -
* @param {Time} clipEnd -
* @param {Time} phase -
* @param {Stream<T>} source$ -
* @return {Stream<T>} Brief description of the returning value here.
*/
exports.clipPeriodic = (0, curry_1.curry)(function (A, B, phase, source$) {
    return (0, core_1.join)((0, core_1.mergeArray)([
        (0, core_1.now)((0, exports.beginning)(A, B, phase, source$)),
        (0, core_1.at)(B, (0, exports.ending)(A, B, phase, source$)),
    ]));
});
exports.cycle = (0, curry_1.curry)(function (A, B, phase, $) {
    return (0, function_1.pipe)(
    //
    (0, core_1.periodic)(B - A), (0, core_1.constant)((0, exports.clipPeriodic)(A, B, phase, $)));
});
exports.endlessCycle = (0, curry_1.curry)(function (A, B, phase, $) { return (0, core_1.join)((0, exports.cycle)(A, B, phase, $)); });
exports.pickup = (0, curry_1.curry)(function (A, B, countdown, $) {
    return (0, exports.cycle)(A, B, B - countdown % (B - A), $);
});
exports["default"] = (0, curry_1.curry)(function (duration, $) {
    return (0, function_1.pipe)(
    //
    (0, core_1.periodic)(duration), (0, core_1.constant)((0, core_1.until)((0, core_1.at)(duration, null), $)));
});
