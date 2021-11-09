"use strict";
exports.__esModule = true;
var tape_1 = require("tape");
var core_1 = require("@most/core");
var function_1 = require("fp-ts/function");
var most_pulsing_scheduler_1 = require("most-pulsing-scheduler");
var cyclical_1 = require("../src/cyclical");
var util_1 = require("../src/util");
var count = (0, core_1.scan)(function (x) { return x + 1; }, 0);
(0, tape_1["default"])('beginning & ending', function (t) {
    var _a = (0, most_pulsing_scheduler_1.createPulsingScheduler)(), timer = _a[0], scheduler = _a[1];
    var test$ = (0, function_1.pipe)((0, core_1.periodic)(2), (0, core_1.take)(100));
    var beginningTest$ = (0, function_1.pipe)((0, cyclical_1.beginning)(0, 10, 8, test$), count, (0, core_1.debounce)(20), 
    // should take the last 2 events from `test$`
    (0, core_1.tap)(function (result) { return t.equal(result, 2); }), (0, util_1.tapConsole)('number of items in beginning stream:'));
    var endTest$ = (0, function_1.pipe)((0, cyclical_1.ending)(0, 10, 8, test$), count, (0, core_1.debounce)(20), 
    // should take the first 8 events from `test$`
    (0, core_1.tap)(function (result) { return t.equal(result, 8); }), (0, util_1.tapConsole)('number of items in ending stream'));
    (0, core_1.runEffects)(beginningTest$, scheduler);
    timer.pulse(100);
    (0, core_1.runEffects)(endTest$, scheduler);
    timer.pulse(100);
    t.end();
});
tape_1["default"].only('clipPeriodic', function (t) {
    var _a = (0, most_pulsing_scheduler_1.createPulsingScheduler)(), timer = _a[0], scheduler = _a[1];
    var sequential$ = (0, function_1.pipe)((0, core_1.periodic)(1), count, (0, core_1.take)(100));
    var simpleClipTest$ = (0, function_1.pipe)(
    // take items 10 - 20, starting with item 15
    (0, cyclical_1.clipPeriodic)(10, 20, 15, sequential$), 
    // join,
    count, (0, core_1.debounce)(100), 
    // count items and make sure there are 10
    (0, core_1.tap)(function (result) { return t.equal(result, 10); }));
    (0, core_1.runEffects)(simpleClipTest$, scheduler);
    var complexClipTest$ = (0, function_1.pipe)(
    // take items 10 - 20, starting with item 16, i.e.
    // 16 ... 20, 10 ... 15
    (0, cyclical_1.clipPeriodic)(10, 20, 16, sequential$), 
    // join,
    (0, core_1.debounce)(100), 
    // the final item should be item #15
    (0, core_1.tap)(function (result) { return t.equal(result, 15); }));
    (0, core_1.runEffects)(complexClipTest$, scheduler);
    timer.pulse(100);
    t.end();
});
