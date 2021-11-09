"use strict";
exports.__esModule = true;
exports.quantize = exports.aligned = exports.grid = void 0;
var core_1 = require("@most/core");
var core_2 = require("@most/core");
var curry_1 = require("@typed/curry");
var Grid = /** @class */ (function () {
    function Grid(period, phase) {
        if (phase === void 0) { phase = 0; }
        this.period = period;
        this.phase = phase;
    }
    Grid.prototype.run = function (sink, scheduler) {
        var delay = this.period - (scheduler.currentTime() % this.period) + (this.phase % this.period);
        return scheduler.scheduleTask(0, delay, this.period, (0, core_2.propagateEventTask)(undefined, sink));
    };
    return Grid;
}());
/**
 * Create a stream of events that occur at a regular period on a grid
 * @param {Time} period periodicity of events
 * @returns {Stream} new stream of periodic events, the event value is undefined
 */
var grid = function (period, phase) {
    if (phase === void 0) { phase = 0; }
    return new Grid(period, phase);
};
exports.grid = grid;
/**
 * Produce a stream that emits a given value simultaneously with the next event in a given stream.
 * @param {Stream} alignment$ the stream to align to
 * @param {any} value the value to emit
 * @returns {Stream} a stream that emits the given value upon the next event in the alignment stream
 */
exports.aligned = (0, curry_1.curry)(function (alignment$, value) { return (0, core_1.constant)(value, (0, core_1.take)(1, alignment$)); });
exports.quantize = (0, curry_1.curry)(function (period, $) {
    var grid$ = (0, core_1.multicast)((0, exports.grid)(period));
    return (0, core_1.join)(
    //
    (0, core_1.map)((0, exports.aligned)(grid$), $));
});
