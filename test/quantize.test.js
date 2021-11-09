"use strict";
exports.__esModule = true;
var tape_1 = require("tape");
var core_1 = require("@most/core");
var function_1 = require("fp-ts/function");
var most_pulsing_scheduler_1 = require("most-pulsing-scheduler");
var grid_1 = require("../src/grid");
var counter = (0, core_1.scan)(function (x) { return x + 1; }, 0);
(0, tape_1["default"])('quantize', function (t) {
    var _a = (0, most_pulsing_scheduler_1.createPulsingScheduler)(), timer = _a[0], scheduler = _a[1];
    var tooEarly$ = (0, core_1.take)(50, (0, core_1.periodic)(1)); // 50 arbitrary events, too all too early
    var count = 0;
    // we'll count the number of events in `$`
    var quantized$ = (0, grid_1.quantize)(100, tooEarly$);
    var test$ = (0, function_1.pipe)(quantized$, counter, (0, core_1.tap)(function (x) { return count = x; }));
    (0, core_1.runEffects)(test$, scheduler);
    timer.pulse(99);
    t.equals(count, 0);
    t.equals(timer.now(), 99);
    timer.pulse(1);
    t.equals(count, 50);
    t.equals(timer.now(), 100);
    t.end();
});
