"use strict";
exports.__esModule = true;
var tape_1 = require("tape");
var core_1 = require("@most/core");
var function_1 = require("fp-ts/function");
var most_pulsing_scheduler_1 = require("most-pulsing-scheduler");
var grid_1 = require("../src/grid");
var count = (0, core_1.scan)(function (x) { return x + 1; }, 0);
(0, tape_1["default"])('grid stream', function (t) {
    var GRID_SIZE = 10;
    var PHASE = 20;
    var _a = (0, most_pulsing_scheduler_1.createPulsingScheduler)(), timer = _a[0], scheduler = _a[1];
    var grid$ = (0, grid_1.grid)(GRID_SIZE, PHASE);
    // console.log('pulsing by 43 from', timer.now())
    timer.pulse(43); // advance the to some arbitrary time
    var gridCountElapsed = 0;
    // we'll count the number of events in `grid$`
    var gridCountTest$ = (0, function_1.pipe)(grid$, count, (0, core_1.tap)(function (x) { return gridCountElapsed = x; }), (0, core_1.take)(4));
    (0, core_1.runEffects)(gridCountTest$, scheduler);
    t.equals(gridCountElapsed, 0);
    t.equals(timer.now(), 43);
    // console.log('pulsing by 6 from', timer.now())
    timer.pulse(6);
    t.equals(gridCountElapsed, 0);
    t.equals(timer.now(), 49);
    // console.log('pulsing by 1 from', timer.now())
    timer.pulse(1);
    t.equals(gridCountElapsed, 1);
    t.equals(timer.now(), 50);
    // console.log('pulsing by 9 from', timer.now())
    timer.pulse(9);
    t.equals(gridCountElapsed, 1);
    t.equals(timer.now(), 59);
    // console.log('pulsing by 1 from', timer.now())
    timer.pulse(1);
    t.equals(gridCountElapsed, 2);
    t.equals(timer.now(), 60);
    t.end();
});
