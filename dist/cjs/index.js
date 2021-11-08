var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/fp-ts/lib/function.js
var require_function = __commonJS({
  "node_modules/fp-ts/lib/function.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
    var getBooleanAlgebra = function(B) {
      return function() {
        return {
          meet: function(x, y) {
            return function(a) {
              return B.meet(x(a), y(a));
            };
          },
          join: function(x, y) {
            return function(a) {
              return B.join(x(a), y(a));
            };
          },
          zero: function() {
            return B.zero;
          },
          one: function() {
            return B.one;
          },
          implies: function(x, y) {
            return function(a) {
              return B.implies(x(a), y(a));
            };
          },
          not: function(x) {
            return function(a) {
              return B.not(x(a));
            };
          }
        };
      };
    };
    exports.getBooleanAlgebra = getBooleanAlgebra;
    var getSemigroup = function(S) {
      return function() {
        return {
          concat: function(f, g) {
            return function(a) {
              return S.concat(f(a), g(a));
            };
          }
        };
      };
    };
    exports.getSemigroup = getSemigroup;
    var getMonoid = function(M) {
      var getSemigroupM = exports.getSemigroup(M);
      return function() {
        return {
          concat: getSemigroupM().concat,
          empty: function() {
            return M.empty;
          }
        };
      };
    };
    exports.getMonoid = getMonoid;
    var getSemiring = function(S) {
      return {
        add: function(f, g) {
          return function(x) {
            return S.add(f(x), g(x));
          };
        },
        zero: function() {
          return S.zero;
        },
        mul: function(f, g) {
          return function(x) {
            return S.mul(f(x), g(x));
          };
        },
        one: function() {
          return S.one;
        }
      };
    };
    exports.getSemiring = getSemiring;
    var getRing = function(R) {
      var S = exports.getSemiring(R);
      return {
        add: S.add,
        mul: S.mul,
        one: S.one,
        zero: S.zero,
        sub: function(f, g) {
          return function(x) {
            return R.sub(f(x), g(x));
          };
        }
      };
    };
    exports.getRing = getRing;
    var apply2 = function(a) {
      return function(f) {
        return f(a);
      };
    };
    exports.apply = apply2;
    function identity(a) {
      return a;
    }
    exports.identity = identity;
    exports.unsafeCoerce = identity;
    function constant2(a) {
      return function() {
        return a;
      };
    }
    exports.constant = constant2;
    exports.constTrue = /* @__PURE__ */ constant2(true);
    exports.constFalse = /* @__PURE__ */ constant2(false);
    exports.constNull = /* @__PURE__ */ constant2(null);
    exports.constUndefined = /* @__PURE__ */ constant2(void 0);
    exports.constVoid = exports.constUndefined;
    function flip(f) {
      return function(b, a) {
        return f(a, b);
      };
    }
    exports.flip = flip;
    function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
      switch (arguments.length) {
        case 1:
          return ab;
        case 2:
          return function() {
            return bc(ab.apply(this, arguments));
          };
        case 3:
          return function() {
            return cd(bc(ab.apply(this, arguments)));
          };
        case 4:
          return function() {
            return de(cd(bc(ab.apply(this, arguments))));
          };
        case 5:
          return function() {
            return ef(de(cd(bc(ab.apply(this, arguments)))));
          };
        case 6:
          return function() {
            return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
          };
        case 7:
          return function() {
            return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
          };
        case 8:
          return function() {
            return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
          };
        case 9:
          return function() {
            return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
          };
      }
      return;
    }
    exports.flow = flow;
    function tuple() {
      var t = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
      }
      return t;
    }
    exports.tuple = tuple;
    function increment(n) {
      return n + 1;
    }
    exports.increment = increment;
    function decrement(n) {
      return n - 1;
    }
    exports.decrement = decrement;
    function absurd(_) {
      throw new Error("Called `absurd` function which should be uncallable");
    }
    exports.absurd = absurd;
    function tupled(f) {
      return function(a) {
        return f.apply(void 0, a);
      };
    }
    exports.tupled = tupled;
    function untupled(f) {
      return function() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          a[_i] = arguments[_i];
        }
        return f(a);
      };
    }
    exports.untupled = untupled;
    function pipe2(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st) {
      switch (arguments.length) {
        case 1:
          return a;
        case 2:
          return ab(a);
        case 3:
          return bc(ab(a));
        case 4:
          return cd(bc(ab(a)));
        case 5:
          return de(cd(bc(ab(a))));
        case 6:
          return ef(de(cd(bc(ab(a)))));
        case 7:
          return fg(ef(de(cd(bc(ab(a))))));
        case 8:
          return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
          return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        case 10:
          return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
        case 11:
          return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));
        case 12:
          return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));
        case 13:
          return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));
        case 14:
          return mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))));
        case 15:
          return no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))));
        case 16:
          return op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))));
        case 17:
          return pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))));
        case 18:
          return qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))));
        case 19:
          return rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))))));
        case 20:
          return st(rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))))));
      }
      return;
    }
    exports.pipe = pipe2;
    exports.hole = absurd;
    var SK = function(_, b) {
      return b;
    };
    exports.SK = SK;
    function not(predicate) {
      return function(a) {
        return !predicate(a);
      };
    }
    exports.not = not;
    var getEndomorphismMonoid = function() {
      return {
        concat: function(first, second) {
          return flow(first, second);
        },
        empty: identity
      };
    };
    exports.getEndomorphismMonoid = getEndomorphismMonoid;
  }
});

// src/index.ts
__export(exports, {
  beginning: () => beginning,
  clipPeriodic: () => clipPeriodic,
  cycle: () => cycle,
  ending: () => ending,
  endlessCycle: () => endlessCycle,
  isOff: () => isOff,
  isOn: () => isOn,
  pickup: () => pickup,
  router: () => router,
  spigot: () => spigot,
  spout: () => spout,
  tapConsole: () => tapConsole
});

// node_modules/@most/prelude/dist/index.es.js
function append(x, a) {
  var l = a.length;
  var b = new Array(l + 1);
  for (var i = 0; i < l; ++i) {
    b[i] = a[i];
  }
  b[l] = x;
  return b;
}
function concat(a, b) {
  var al = a.length;
  var bl = b.length;
  var r = new Array(al + bl);
  var i = 0;
  for (i = 0; i < al; i++) {
    r[i] = a[i];
  }
  for (var j = 0; j < bl; j++) {
    r[i++] = b[j];
  }
  return r;
}
function map(f, a) {
  var l = a.length;
  var b = new Array(l);
  for (var i = 0; i < l; ++i) {
    b[i] = f(a[i]);
  }
  return b;
}
function reduce(f, z, a) {
  var r = z;
  for (var i = 0, l = a.length; i < l; ++i) {
    r = f(r, a[i], i);
  }
  return r;
}
function remove(i, a) {
  if (i < 0) {
    throw new TypeError("i must be >= 0");
  }
  var l = a.length;
  if (l === 0 || i >= l) {
    return a;
  }
  if (l === 1) {
    return [];
  }
  return unsafeRemove(i, a, l - 1);
}
function unsafeRemove(i, a, l) {
  var b = new Array(l);
  var j;
  for (j = 0; j < i; ++j) {
    b[j] = a[j];
  }
  for (j = i; j < l; ++j) {
    b[j] = a[j + 1];
  }
  return b;
}
function removeAll(f, a) {
  var l = a.length;
  var b = new Array(l);
  var j = 0;
  for (var x = void 0, i = 0; i < l; ++i) {
    x = a[i];
    if (!f(x)) {
      b[j] = x;
      ++j;
    }
  }
  b.length = j;
  return b;
}
function findIndex(x, a) {
  for (var i = 0, l = a.length; i < l; ++i) {
    if (x === a[i]) {
      return i;
    }
  }
  return -1;
}
var id = function(x) {
  return x;
};
var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};
var apply = function(f, x) {
  return f(x);
};
function curry2(f) {
  function curried(a, b) {
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return function(b2) {
          return f(a, b2);
        };
      default:
        return f(a, b);
    }
  }
  return curried;
}
function curry3(f) {
  function curried(a, b, c) {
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return curry2(function(b2, c2) {
          return f(a, b2, c2);
        });
      case 2:
        return function(c2) {
          return f(a, b, c2);
        };
      default:
        return f(a, b, c);
    }
  }
  return curried;
}

// node_modules/@most/scheduler/dist/index.es.js
var ScheduledTaskImpl = function() {
  function ScheduledTaskImpl2(time, localOffset, period, task, scheduler) {
    this.time = time;
    this.localOffset = localOffset;
    this.period = period;
    this.task = task;
    this.scheduler = scheduler;
    this.active = true;
  }
  ScheduledTaskImpl2.prototype.run = function() {
    return this.task.run(this.time - this.localOffset);
  };
  ScheduledTaskImpl2.prototype.error = function(e) {
    return this.task.error(this.time - this.localOffset, e);
  };
  ScheduledTaskImpl2.prototype.dispose = function() {
    this.active = false;
    this.scheduler.cancel(this);
    return this.task.dispose();
  };
  return ScheduledTaskImpl2;
}();
var RelativeScheduler = function() {
  function RelativeScheduler2(origin, scheduler) {
    this.origin = origin;
    this.scheduler = scheduler;
  }
  RelativeScheduler2.prototype.currentTime = function() {
    return this.scheduler.currentTime() - this.origin;
  };
  RelativeScheduler2.prototype.scheduleTask = function(localOffset, delay3, period, task) {
    return this.scheduler.scheduleTask(localOffset + this.origin, delay3, period, task);
  };
  RelativeScheduler2.prototype.relative = function(origin) {
    return new RelativeScheduler2(origin + this.origin, this.scheduler);
  };
  RelativeScheduler2.prototype.cancel = function(task) {
    return this.scheduler.cancel(task);
  };
  RelativeScheduler2.prototype.cancelAll = function(f) {
    return this.scheduler.cancelAll(f);
  };
  return RelativeScheduler2;
}();
var defer = function(task) {
  return Promise.resolve(task).then(runTask);
};
function runTask(task) {
  try {
    return task.run();
  } catch (e) {
    return task.error(e);
  }
}
var SchedulerImpl = function() {
  function SchedulerImpl2(timer, timeline) {
    var _this = this;
    this._runReadyTasksBound = function() {
      return _this._runReadyTasks();
    };
    this.timer = timer;
    this.timeline = timeline;
    this._timer = null;
    this._nextArrival = Infinity;
  }
  SchedulerImpl2.prototype.currentTime = function() {
    return this.timer.now();
  };
  SchedulerImpl2.prototype.scheduleTask = function(localOffset, delay3, period, task) {
    var time = this.currentTime() + Math.max(0, delay3);
    var st = new ScheduledTaskImpl(time, localOffset, period, task, this);
    this.timeline.add(st);
    this._scheduleNextRun();
    return st;
  };
  SchedulerImpl2.prototype.relative = function(offset) {
    return new RelativeScheduler(offset, this);
  };
  SchedulerImpl2.prototype.cancel = function(task) {
    task.active = false;
    if (this.timeline.remove(task)) {
      this._reschedule();
    }
  };
  SchedulerImpl2.prototype.cancelAll = function(f) {
    this.timeline.removeAll(f);
    this._reschedule();
  };
  SchedulerImpl2.prototype._reschedule = function() {
    if (this.timeline.isEmpty()) {
      this._unschedule();
    } else {
      this._scheduleNextRun();
    }
  };
  SchedulerImpl2.prototype._unschedule = function() {
    this.timer.clearTimer(this._timer);
    this._timer = null;
  };
  SchedulerImpl2.prototype._scheduleNextRun = function() {
    if (this.timeline.isEmpty()) {
      return;
    }
    var nextArrival = this.timeline.nextArrival();
    if (this._timer === null) {
      this._scheduleNextArrival(nextArrival);
    } else if (nextArrival < this._nextArrival) {
      this._unschedule();
      this._scheduleNextArrival(nextArrival);
    }
  };
  SchedulerImpl2.prototype._scheduleNextArrival = function(nextArrival) {
    this._nextArrival = nextArrival;
    var delay3 = Math.max(0, nextArrival - this.currentTime());
    this._timer = this.timer.setTimer(this._runReadyTasksBound, delay3);
  };
  SchedulerImpl2.prototype._runReadyTasks = function() {
    this._timer = null;
    this.timeline.runTasks(this.currentTime(), runTask);
    this._scheduleNextRun();
  };
  return SchedulerImpl2;
}();
var TimelineImpl = function() {
  function TimelineImpl2() {
    this.tasks = [];
  }
  TimelineImpl2.prototype.nextArrival = function() {
    return this.isEmpty() ? Infinity : this.tasks[0].time;
  };
  TimelineImpl2.prototype.isEmpty = function() {
    return this.tasks.length === 0;
  };
  TimelineImpl2.prototype.add = function(st) {
    insertByTime(st, this.tasks);
  };
  TimelineImpl2.prototype.remove = function(st) {
    var i = binarySearch(getTime(st), this.tasks);
    if (i >= 0 && i < this.tasks.length) {
      var events = this.tasks[i].events;
      var at2 = findIndex(st, events);
      if (at2 >= 0) {
        events.splice(at2, 1);
        if (events.length === 0) {
          this.tasks.splice(i, 1);
        }
        return true;
      }
    }
    return false;
  };
  TimelineImpl2.prototype.removeAll = function(f) {
    for (var i = 0; i < this.tasks.length; ++i) {
      removeAllFrom(f, this.tasks[i]);
    }
  };
  TimelineImpl2.prototype.runTasks = function(t, runTask2) {
    var tasks = this.tasks;
    var l = tasks.length;
    var i = 0;
    while (i < l && tasks[i].time <= t) {
      ++i;
    }
    this.tasks = tasks.slice(i);
    for (var j = 0; j < i; ++j) {
      this.tasks = runReadyTasks(runTask2, tasks[j].events, this.tasks);
    }
  };
  return TimelineImpl2;
}();
function runReadyTasks(runTask2, events, tasks) {
  for (var i = 0; i < events.length; ++i) {
    var task = events[i];
    if (task.active) {
      runTask2(task);
      if (task.period >= 0 && task.active) {
        task.time = task.time + task.period;
        insertByTime(task, tasks);
      }
    }
  }
  return tasks;
}
function insertByTime(task, timeslots) {
  var l = timeslots.length;
  var time = getTime(task);
  if (l === 0) {
    timeslots.push(newTimeslot(time, [task]));
    return;
  }
  var i = binarySearch(time, timeslots);
  if (i >= l) {
    timeslots.push(newTimeslot(time, [task]));
  } else {
    insertAtTimeslot(task, timeslots, time, i);
  }
}
function insertAtTimeslot(task, timeslots, time, i) {
  var timeslot = timeslots[i];
  if (time === timeslot.time) {
    addEvent(task, timeslot.events);
  } else {
    timeslots.splice(i, 0, newTimeslot(time, [task]));
  }
}
function addEvent(task, events) {
  if (events.length === 0 || task.time >= events[events.length - 1].time) {
    events.push(task);
  } else {
    spliceEvent(task, events);
  }
}
function spliceEvent(task, events) {
  for (var j = 0; j < events.length; j++) {
    if (task.time < events[j].time) {
      events.splice(j, 0, task);
      break;
    }
  }
}
function getTime(scheduledTask) {
  return Math.floor(scheduledTask.time);
}
function removeAllFrom(f, timeslot) {
  timeslot.events = removeAll(f, timeslot.events);
}
function binarySearch(t, sortedArray) {
  var lo = 0;
  var hi = sortedArray.length;
  var mid, y;
  while (lo < hi) {
    mid = Math.floor((lo + hi) / 2);
    y = sortedArray[mid];
    if (t === y.time) {
      return mid;
    } else if (t < y.time) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return hi;
}
var newTimeslot = function(t, events) {
  return { time: t, events };
};
var ClockTimer = function() {
  function ClockTimer2(clock) {
    this._clock = clock;
  }
  ClockTimer2.prototype.now = function() {
    return this._clock.now();
  };
  ClockTimer2.prototype.setTimer = function(f, dt) {
    return dt <= 0 ? runAsap(f) : setTimeout(f, dt);
  };
  ClockTimer2.prototype.clearTimer = function(t) {
    return t instanceof Asap ? t.cancel() : clearTimeout(t);
  };
  return ClockTimer2;
}();
var Asap = function() {
  function Asap2(f) {
    this.f = f;
    this.active = true;
  }
  Asap2.prototype.run = function() {
    if (this.active) {
      return this.f();
    }
  };
  Asap2.prototype.error = function(e) {
    throw e;
  };
  Asap2.prototype.cancel = function() {
    this.active = false;
  };
  return Asap2;
}();
function runAsap(f) {
  var task = new Asap(f);
  defer(task);
  return task;
}
var RelativeClock = function() {
  function RelativeClock2(clock, origin) {
    this.origin = origin;
    this.clock = clock;
  }
  RelativeClock2.prototype.now = function() {
    return this.clock.now() - this.origin;
  };
  return RelativeClock2;
}();
var HRTimeClock = function() {
  function HRTimeClock2(hrtime, origin) {
    this.origin = origin;
    this.hrtime = hrtime;
  }
  HRTimeClock2.prototype.now = function() {
    var hrt = this.hrtime(this.origin);
    return (hrt[0] * 1e9 + hrt[1]) / 1e6;
  };
  return HRTimeClock2;
}();
var currentTime = function(scheduler) {
  return scheduler.currentTime();
};
var asap = curry2(function(task, scheduler) {
  return scheduler.scheduleTask(0, 0, -1, task);
});
var delay = curry3(function(delay3, task, scheduler) {
  return scheduler.scheduleTask(0, delay3, -1, task);
});
var periodic = curry3(function(period, task, scheduler) {
  return scheduler.scheduleTask(0, 0, period, task);
});
var cancelTask = function(scheduledTask) {
  return scheduledTask.dispose();
};
var cancelAllTasks = curry2(function(predicate, scheduler) {
  console.warn("DEPRECATED cancelAllTasks to be removed in 2.0.0");
  return scheduler.cancelAll(predicate);
});
var schedulerRelativeTo = curry2(function(offset, scheduler) {
  return new RelativeScheduler(offset, scheduler);
});
var newScheduler = curry2(function(timer, timeline) {
  return new SchedulerImpl(timer, timeline);
});

// node_modules/@most/disposable/dist/index.es.js
var disposeNone = function() {
  return NONE;
};
var NONE = new (function() {
  function DisposeNone() {
  }
  DisposeNone.prototype.dispose = function() {
  };
  return DisposeNone;
}())();
var isDisposeNone = function(d) {
  return d === NONE;
};
var disposeOnce = function(disposable) {
  return new DisposeOnce(disposable);
};
var DisposeOnce = function() {
  function DisposeOnce2(disposable) {
    this.disposed = false;
    this.disposable = disposable;
  }
  DisposeOnce2.prototype.dispose = function() {
    if (!this.disposed) {
      this.disposed = true;
      if (this.disposable) {
        this.disposable.dispose();
        this.disposable = void 0;
      }
    }
  };
  return DisposeOnce2;
}();
var disposeWith = curry2(function(dispose, resource) {
  return disposeOnce(new DisposeWithImpl(dispose, resource));
});
var DisposeWithImpl = function() {
  function DisposeWithImpl2(dispose, resource) {
    this._dispose = dispose;
    this._resource = resource;
  }
  DisposeWithImpl2.prototype.dispose = function() {
    this._dispose(this._resource);
  };
  return DisposeWithImpl2;
}();
var disposeAll = function(ds) {
  var merged = reduce(merge, [], ds);
  return merged.length === 0 ? disposeNone() : new DisposeAll(merged);
};
var disposeBoth = curry2(function(d1, d2) {
  return disposeAll([d1, d2]);
});
var merge = function(ds, d) {
  return isDisposeNone(d) ? ds : d instanceof DisposeAll ? concat(ds, d.disposables) : append(d, ds);
};
var DisposeAll = function() {
  function DisposeAll2(disposables) {
    this.disposables = disposables;
  }
  DisposeAll2.prototype.dispose = function() {
    throwIfErrors(disposeCollectErrors(this.disposables));
  };
  return DisposeAll2;
}();
var disposeCollectErrors = function(disposables) {
  return reduce(appendIfError, [], disposables);
};
var appendIfError = function(errors, d) {
  try {
    d.dispose();
  } catch (e) {
    errors.push(e);
  }
  return errors;
};
var throwIfErrors = function(errors) {
  if (errors.length > 0) {
    throw new DisposeAllError(errors.length + " errors", errors);
  }
};
var DisposeAllError = function() {
  function DisposeAllError2(message, errors) {
    this.name = "DisposeAllError";
    this.message = message;
    this.errors = errors;
    Error.call(this, message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DisposeAllError2);
    }
    this.stack = "" + this.stack + formatErrorStacks(this.errors);
  }
  return DisposeAllError2;
}();
DisposeAllError.prototype = Object.create(Error.prototype);
var formatErrorStacks = function(errors) {
  return reduce(formatErrorStack, "", errors);
};
var formatErrorStack = function(s, e, i) {
  return s + ("\n[" + (i + 1) + "] " + e.stack);
};
var tryDispose = curry3(function(t, disposable, sink) {
  try {
    disposable.dispose();
  } catch (e) {
    sink.error(t, e);
  }
});

// node_modules/@most/core/dist/index.es.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function fatalError(e) {
  setTimeout(rethrow, 0, e);
}
function rethrow(e) {
  throw e;
}
var propagateTask = function(run2, value, sink) {
  return new PropagateRunEventTask(run2, value, sink);
};
var propagateEventTask = function(value, sink) {
  return new PropagateEventTask(value, sink);
};
var propagateEndTask = function(sink) {
  return new PropagateEndTask(sink);
};
var propagateErrorTask = function(value, sink) {
  return new PropagateErrorTask(value, sink);
};
var PropagateTask = function() {
  function PropagateTask2(sink) {
    this.sink = sink;
    this.active = true;
  }
  PropagateTask2.prototype.dispose = function() {
    this.active = false;
  };
  PropagateTask2.prototype.run = function(t) {
    if (!this.active) {
      return;
    }
    this.runIfActive(t);
  };
  PropagateTask2.prototype.error = function(t, e) {
    if (!this.active) {
      return fatalError(e);
    }
    this.sink.error(t, e);
  };
  return PropagateTask2;
}();
var PropagateRunEventTask = function(_super) {
  __extends(PropagateRunEventTask2, _super);
  function PropagateRunEventTask2(runEvent, value, sink) {
    var _this = _super.call(this, sink) || this;
    _this.runEvent = runEvent;
    _this.value = value;
    return _this;
  }
  PropagateRunEventTask2.prototype.runIfActive = function(t) {
    this.runEvent(t, this.value, this.sink);
  };
  return PropagateRunEventTask2;
}(PropagateTask);
var PropagateEventTask = function(_super) {
  __extends(PropagateEventTask2, _super);
  function PropagateEventTask2(value, sink) {
    var _this = _super.call(this, sink) || this;
    _this.value = value;
    return _this;
  }
  PropagateEventTask2.prototype.runIfActive = function(t) {
    this.sink.event(t, this.value);
  };
  return PropagateEventTask2;
}(PropagateTask);
var PropagateEndTask = function(_super) {
  __extends(PropagateEndTask2, _super);
  function PropagateEndTask2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  PropagateEndTask2.prototype.runIfActive = function(t) {
    this.sink.end(t);
  };
  return PropagateEndTask2;
}(PropagateTask);
var PropagateErrorTask = function(_super) {
  __extends(PropagateErrorTask2, _super);
  function PropagateErrorTask2(value, sink) {
    var _this = _super.call(this, sink) || this;
    _this.value = value;
    return _this;
  }
  PropagateErrorTask2.prototype.runIfActive = function(t) {
    this.sink.error(t, this.value);
  };
  return PropagateErrorTask2;
}(PropagateTask);
var empty = function() {
  return EMPTY;
};
var isCanonicalEmpty = function(stream) {
  return stream === EMPTY;
};
var containsCanonicalEmpty = function(streams) {
  return streams.some(isCanonicalEmpty);
};
var Empty = function() {
  function Empty2() {
  }
  Empty2.prototype.run = function(sink, scheduler) {
    return asap(propagateEndTask(sink), scheduler);
  };
  return Empty2;
}();
var EMPTY = new Empty();
var Never = function() {
  function Never2() {
  }
  Never2.prototype.run = function() {
    return disposeNone();
  };
  return Never2;
}();
var NEVER = new Never();
var at = function(t, x) {
  return new At(t, x);
};
var At = function() {
  function At2(t, x) {
    this.time = t;
    this.value = x;
  }
  At2.prototype.run = function(sink, scheduler) {
    return delay(this.time, propagateTask(runAt, this.value, sink), scheduler);
  };
  return At2;
}();
function runAt(t, x, sink) {
  sink.event(t, x);
  sink.end(t);
}
var now = function(x) {
  return at(0, x);
};
var periodic2 = function(period) {
  return new Periodic(period);
};
var Periodic = function() {
  function Periodic2(period) {
    this.period = period;
  }
  Periodic2.prototype.run = function(sink, scheduler) {
    return periodic(this.period, propagateEventTask(void 0, sink), scheduler);
  };
  return Periodic2;
}();
var StreamImpl = function() {
  function StreamImpl2(run2) {
    this.run = run2;
  }
  return StreamImpl2;
}();
var SettableDisposable = function() {
  function SettableDisposable2() {
    this.disposable = void 0;
    this.disposed = false;
  }
  SettableDisposable2.prototype.setDisposable = function(disposable) {
    if (this.disposable !== void 0) {
      throw new Error("setDisposable called more than once");
    }
    this.disposable = disposable;
    if (this.disposed) {
      disposable.dispose();
    }
  };
  SettableDisposable2.prototype.dispose = function() {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    if (this.disposable !== void 0) {
      this.disposable.dispose();
    }
  };
  return SettableDisposable2;
}();
var runEffects = curry2(function(stream, scheduler) {
  return new Promise(function(resolve, reject) {
    return runStream(stream, scheduler, resolve, reject);
  });
});
function runStream(stream, scheduler, resolve, reject) {
  var disposable = new SettableDisposable();
  var observer = new RunEffectsSink(resolve, reject, disposable);
  disposable.setDisposable(stream.run(observer, scheduler));
}
var RunEffectsSink = function() {
  function RunEffectsSink2(end, error, disposable) {
    this._end = end;
    this._error = error;
    this._disposable = disposable;
    this.active = true;
  }
  RunEffectsSink2.prototype.event = function() {
  };
  RunEffectsSink2.prototype.end = function() {
    if (!this.active) {
      return;
    }
    this.dispose(this._error, this._end, void 0);
  };
  RunEffectsSink2.prototype.error = function(_t, e) {
    this.dispose(this._error, this._error, e);
  };
  RunEffectsSink2.prototype.dispose = function(error, end, x) {
    this.active = false;
    tryDispose2(error, end, x, this._disposable);
  };
  return RunEffectsSink2;
}();
function tryDispose2(error, end, x, disposable) {
  try {
    disposable.dispose();
  } catch (e) {
    error(e);
    return;
  }
  end(x);
}
var run = function(sink, scheduler, stream) {
  return stream.run(sink, scheduler);
};
var RelativeSink = function() {
  function RelativeSink2(offset, sink) {
    this.sink = sink;
    this.offset = offset;
  }
  RelativeSink2.prototype.event = function(t, x) {
    this.sink.event(t + this.offset, x);
  };
  RelativeSink2.prototype.error = function(t, e) {
    this.sink.error(t + this.offset, e);
  };
  RelativeSink2.prototype.end = function(t) {
    this.sink.end(t + this.offset);
  };
  return RelativeSink2;
}();
var withLocalTime = function(origin, stream) {
  return new WithLocalTime(origin, stream);
};
var WithLocalTime = function() {
  function WithLocalTime2(origin, source) {
    this.origin = origin;
    this.source = source;
  }
  WithLocalTime2.prototype.run = function(sink, scheduler) {
    return this.source.run(relativeSink(this.origin, sink), schedulerRelativeTo(this.origin, scheduler));
  };
  return WithLocalTime2;
}();
var relativeSink = function(origin, sink) {
  return sink instanceof RelativeSink ? new RelativeSink(origin + sink.offset, sink.sink) : new RelativeSink(origin, sink);
};
var Pipe = function() {
  function Pipe2(sink) {
    this.sink = sink;
  }
  Pipe2.prototype.end = function(t) {
    return this.sink.end(t);
  };
  Pipe2.prototype.error = function(t, e) {
    return this.sink.error(t, e);
  };
  return Pipe2;
}();
var loop = function(stepper, seed, stream) {
  return isCanonicalEmpty(stream) ? empty() : new Loop(stepper, seed, stream);
};
var Loop = function() {
  function Loop2(stepper, seed, source) {
    this.step = stepper;
    this.seed = seed;
    this.source = source;
  }
  Loop2.prototype.run = function(sink, scheduler) {
    return this.source.run(new LoopSink(this.step, this.seed, sink), scheduler);
  };
  return Loop2;
}();
var LoopSink = function(_super) {
  __extends(LoopSink2, _super);
  function LoopSink2(stepper, seed, sink) {
    var _this = _super.call(this, sink) || this;
    _this.step = stepper;
    _this.seed = seed;
    return _this;
  }
  LoopSink2.prototype.event = function(t, x) {
    var result = this.step(this.seed, x);
    this.seed = result.seed;
    this.sink.event(t, result.value);
  };
  return LoopSink2;
}(Pipe);
var scan = function(f, initial, stream) {
  return new Scan(f, initial, stream);
};
var Scan = function() {
  function Scan2(f, z, source) {
    this.source = source;
    this.f = f;
    this.value = z;
  }
  Scan2.prototype.run = function(sink, scheduler) {
    var d1 = asap(propagateEventTask(this.value, sink), scheduler);
    var d2 = this.source.run(new ScanSink(this.f, this.value, sink), scheduler);
    return disposeBoth(d1, d2);
  };
  return Scan2;
}();
var ScanSink = function(_super) {
  __extends(ScanSink2, _super);
  function ScanSink2(f, z, sink) {
    var _this = _super.call(this, sink) || this;
    _this.f = f;
    _this.value = z;
    return _this;
  }
  ScanSink2.prototype.event = function(t, x) {
    var f = this.f;
    this.value = f(this.value, x);
    this.sink.event(t, this.value);
  };
  return ScanSink2;
}(Pipe);
var continueWith = function(f, stream) {
  return new ContinueWith(f, stream);
};
var ContinueWith = function() {
  function ContinueWith2(f, source) {
    this.f = f;
    this.source = source;
  }
  ContinueWith2.prototype.run = function(sink, scheduler) {
    return new ContinueWithSink(this.f, this.source, sink, scheduler);
  };
  return ContinueWith2;
}();
var ContinueWithSink = function(_super) {
  __extends(ContinueWithSink2, _super);
  function ContinueWithSink2(f, source, sink, scheduler) {
    var _this = _super.call(this, sink) || this;
    _this.f = f;
    _this.scheduler = scheduler;
    _this.active = true;
    _this.disposable = disposeOnce(source.run(_this, scheduler));
    return _this;
  }
  ContinueWithSink2.prototype.event = function(t, x) {
    if (!this.active) {
      return;
    }
    this.sink.event(t, x);
  };
  ContinueWithSink2.prototype.end = function(t) {
    if (!this.active) {
      return;
    }
    tryDispose(t, this.disposable, this.sink);
    this.startNext(t, this.sink);
  };
  ContinueWithSink2.prototype.startNext = function(t, sink) {
    try {
      this.disposable = this.continue(this.f, t, sink);
    } catch (e) {
      sink.error(t, e);
    }
  };
  ContinueWithSink2.prototype.continue = function(f, t, sink) {
    return run(sink, this.scheduler, withLocalTime(t, f()));
  };
  ContinueWithSink2.prototype.dispose = function() {
    this.active = false;
    return this.disposable.dispose();
  };
  return ContinueWithSink2;
}(Pipe);
var startWith = function(x, stream) {
  return continueWith(function() {
    return stream;
  }, now(x));
};
var Filter = function() {
  function Filter2(p, source) {
    this.p = p;
    this.source = source;
  }
  Filter2.prototype.run = function(sink, scheduler) {
    return this.source.run(new FilterSink(this.p, sink), scheduler);
  };
  Filter2.create = function(p, source) {
    if (isCanonicalEmpty(source)) {
      return source;
    }
    if (source instanceof Filter2) {
      return new Filter2(and(source.p, p), source.source);
    }
    return new Filter2(p, source);
  };
  return Filter2;
}();
var FilterSink = function(_super) {
  __extends(FilterSink2, _super);
  function FilterSink2(p, sink) {
    var _this = _super.call(this, sink) || this;
    _this.p = p;
    return _this;
  }
  FilterSink2.prototype.event = function(t, x) {
    var p = this.p;
    p(x) && this.sink.event(t, x);
  };
  return FilterSink2;
}(Pipe);
var and = function(p, q) {
  return function(x) {
    return p(x) && q(x);
  };
};
var FilterMap = function() {
  function FilterMap2(p, f, source) {
    this.p = p;
    this.f = f;
    this.source = source;
  }
  FilterMap2.prototype.run = function(sink, scheduler) {
    return this.source.run(new FilterMapSink(this.p, this.f, sink), scheduler);
  };
  return FilterMap2;
}();
var FilterMapSink = function(_super) {
  __extends(FilterMapSink2, _super);
  function FilterMapSink2(p, f, sink) {
    var _this = _super.call(this, sink) || this;
    _this.p = p;
    _this.f = f;
    return _this;
  }
  FilterMapSink2.prototype.event = function(t, x) {
    var f = this.f;
    var p = this.p;
    p(x) && this.sink.event(t, f(x));
  };
  return FilterMapSink2;
}(Pipe);
var Map = function() {
  function Map2(f, source) {
    this.f = f;
    this.source = source;
  }
  Map2.prototype.run = function(sink, scheduler) {
    return this.source.run(new MapSink(this.f, sink), scheduler);
  };
  Map2.create = function(f, source) {
    if (isCanonicalEmpty(source)) {
      return empty();
    }
    if (source instanceof Map2) {
      return new Map2(compose(f, source.f), source.source);
    }
    if (source instanceof Filter) {
      return new FilterMap(source.p, f, source.source);
    }
    return new Map2(f, source);
  };
  return Map2;
}();
var MapSink = function(_super) {
  __extends(MapSink2, _super);
  function MapSink2(f, sink) {
    var _this = _super.call(this, sink) || this;
    _this.f = f;
    return _this;
  }
  MapSink2.prototype.event = function(t, x) {
    var f = this.f;
    this.sink.event(t, f(x));
  };
  return MapSink2;
}(Pipe);
var map2 = function(f, stream) {
  return Map.create(f, stream);
};
var constant = function(x, stream) {
  return map2(function() {
    return x;
  }, stream);
};
var tap = function(f, stream) {
  return new Tap(f, stream);
};
var Tap = function() {
  function Tap2(f, source) {
    this.source = source;
    this.f = f;
  }
  Tap2.prototype.run = function(sink, scheduler) {
    return this.source.run(new TapSink(this.f, sink), scheduler);
  };
  return Tap2;
}();
var TapSink = function(_super) {
  __extends(TapSink2, _super);
  function TapSink2(f, sink) {
    var _this = _super.call(this, sink) || this;
    _this.f = f;
    return _this;
  }
  TapSink2.prototype.event = function(t, x) {
    var f = this.f;
    f(x);
    this.sink.event(t, x);
  };
  return TapSink2;
}(Pipe);
var IndexSink = function(_super) {
  __extends(IndexSink2, _super);
  function IndexSink2(i, sink) {
    var _this = _super.call(this, sink) || this;
    _this.index = i;
    _this.active = true;
    _this.value = void 0;
    return _this;
  }
  IndexSink2.prototype.event = function(t, x) {
    if (!this.active) {
      return;
    }
    this.value = x;
    this.sink.event(t, this);
  };
  IndexSink2.prototype.end = function(t) {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.sink.event(t, this);
  };
  return IndexSink2;
}(Pipe);
function invoke(f, args) {
  switch (args.length) {
    case 0:
      return f();
    case 1:
      return f(args[0]);
    case 2:
      return f(args[0], args[1]);
    case 3:
      return f(args[0], args[1], args[2]);
    case 4:
      return f(args[0], args[1], args[2], args[3]);
    case 5:
      return f(args[0], args[1], args[2], args[3], args[4]);
    default:
      return f.apply(void 0, args);
  }
}
var combine = function(f, stream1, stream2) {
  return combineArray(f, [stream1, stream2]);
};
var combineArray = function(f, streams) {
  return streams.length === 0 || containsCanonicalEmpty(streams) ? empty() : streams.length === 1 ? map2(f, streams[0]) : new Combine(f, streams);
};
var Combine = function() {
  function Combine2(f, sources) {
    this.f = f;
    this.sources = sources;
  }
  Combine2.prototype.run = function(sink, scheduler) {
    var l = this.sources.length;
    var disposables = new Array(l);
    var sinks = new Array(l);
    var mergeSink = new CombineSink(disposables, sinks.length, sink, this.f);
    for (var indexSink = void 0, i = 0; i < l; ++i) {
      indexSink = sinks[i] = new IndexSink(i, mergeSink);
      disposables[i] = this.sources[i].run(indexSink, scheduler);
    }
    return disposeAll(disposables);
  };
  return Combine2;
}();
var CombineSink = function(_super) {
  __extends(CombineSink2, _super);
  function CombineSink2(disposables, length, sink, f) {
    var _this = _super.call(this, sink) || this;
    _this.disposables = disposables;
    _this.f = f;
    _this.awaiting = length;
    _this.values = new Array(length);
    _this.hasValue = new Array(length).fill(false);
    _this.activeCount = length;
    return _this;
  }
  CombineSink2.prototype.event = function(t, indexedValue) {
    if (!indexedValue.active) {
      this.dispose(t, indexedValue.index);
      return;
    }
    var i = indexedValue.index;
    var awaiting = this.updateReady(i);
    this.values[i] = indexedValue.value;
    if (awaiting === 0) {
      this.sink.event(t, invoke(this.f, this.values));
    }
  };
  CombineSink2.prototype.updateReady = function(index) {
    if (this.awaiting > 0) {
      if (!this.hasValue[index]) {
        this.hasValue[index] = true;
        this.awaiting -= 1;
      }
    }
    return this.awaiting;
  };
  CombineSink2.prototype.dispose = function(t, index) {
    tryDispose(t, this.disposables[index], this.sink);
    if (--this.activeCount === 0) {
      this.sink.end(t);
    }
  };
  return CombineSink2;
}(Pipe);
function ap(fs, xs) {
  return combine(apply, fs, xs);
}
var mergeConcurrently = function(concurrency, stream) {
  return mergeMapConcurrently(id, concurrency, stream);
};
var mergeMapConcurrently = function(f, concurrency, stream) {
  return isCanonicalEmpty(stream) ? empty() : new MergeConcurrently(f, concurrency, stream);
};
var MergeConcurrently = function() {
  function MergeConcurrently2(f, concurrency, source) {
    this.f = f;
    this.concurrency = concurrency;
    this.source = source;
  }
  MergeConcurrently2.prototype.run = function(sink, scheduler) {
    return new Outer(this.f, this.concurrency, this.source, sink, scheduler);
  };
  return MergeConcurrently2;
}();
var isNonEmpty = function(array) {
  return array.length > 0;
};
var Outer = function() {
  function Outer2(f, concurrency, source, sink, scheduler) {
    this.f = f;
    this.concurrency = concurrency;
    this.sink = sink;
    this.scheduler = scheduler;
    this.pending = [];
    this.current = [];
    this.disposable = disposeOnce(source.run(this, scheduler));
    this.active = true;
  }
  Outer2.prototype.event = function(t, x) {
    this.addInner(t, x);
  };
  Outer2.prototype.addInner = function(t, x) {
    if (this.current.length < this.concurrency) {
      this.startInner(t, x);
    } else {
      this.pending.push(x);
    }
  };
  Outer2.prototype.startInner = function(t, x) {
    try {
      this.initInner(t, x);
    } catch (e) {
      this.error(t, e);
    }
  };
  Outer2.prototype.initInner = function(t, x) {
    var innerSink = new Inner(t, this, this.sink);
    innerSink.disposable = mapAndRun(this.f, t, x, innerSink, this.scheduler);
    this.current.push(innerSink);
  };
  Outer2.prototype.end = function(t) {
    this.active = false;
    tryDispose(t, this.disposable, this.sink);
    this.checkEnd(t);
  };
  Outer2.prototype.error = function(t, e) {
    this.active = false;
    this.sink.error(t, e);
  };
  Outer2.prototype.dispose = function() {
    this.active = false;
    this.pending.length = 0;
    this.disposable.dispose();
    disposeAll(this.current).dispose();
  };
  Outer2.prototype.endInner = function(t, inner) {
    var i = this.current.indexOf(inner);
    if (i >= 0) {
      this.current.splice(i, 1);
    }
    tryDispose(t, inner, this);
    var pending = this.pending;
    if (isNonEmpty(pending)) {
      this.startInner(t, pending.shift());
    } else {
      this.checkEnd(t);
    }
  };
  Outer2.prototype.checkEnd = function(t) {
    if (!this.active && this.current.length === 0) {
      this.sink.end(t);
    }
  };
  return Outer2;
}();
var mapAndRun = function(f, t, x, sink, scheduler) {
  return f(x).run(sink, schedulerRelativeTo(t, scheduler));
};
var Inner = function() {
  function Inner2(time, outer, sink) {
    this.time = time;
    this.outer = outer;
    this.sink = sink;
    this.disposable = disposeNone();
  }
  Inner2.prototype.event = function(t, x) {
    this.sink.event(t + this.time, x);
  };
  Inner2.prototype.end = function(t) {
    this.outer.endInner(t + this.time, this);
  };
  Inner2.prototype.error = function(t, e) {
    this.outer.error(t + this.time, e);
  };
  Inner2.prototype.dispose = function() {
    return this.disposable.dispose();
  };
  return Inner2;
}();
var chain = function(f, stream) {
  return mergeMapConcurrently(f, Infinity, stream);
};
var join = function(stream) {
  return mergeConcurrently(Infinity, stream);
};
var concatMap = function(f, stream) {
  return mergeMapConcurrently(f, 1, stream);
};
function merge2(stream1, stream2) {
  return mergeArray([stream1, stream2]);
}
var mergeArray = function(streams) {
  return mergeStreams(withoutCanonicalEmpty(streams));
};
var mergeStreams = function(streams) {
  return streams.length === 0 ? empty() : streams.length === 1 ? streams[0] : new Merge(reduce(appendSources, [], streams));
};
var withoutCanonicalEmpty = function(streams) {
  return streams.filter(isNotCanonicalEmpty);
};
var isNotCanonicalEmpty = function(stream) {
  return !isCanonicalEmpty(stream);
};
var appendSources = function(sources, stream) {
  return sources.concat(stream instanceof Merge ? stream.sources : stream);
};
var Merge = function() {
  function Merge2(sources) {
    this.sources = sources;
  }
  Merge2.prototype.run = function(sink, scheduler) {
    var l = this.sources.length;
    var disposables = new Array(l);
    var sinks = new Array(l);
    var mergeSink = new MergeSink(disposables, sinks, sink);
    for (var indexSink = void 0, i = 0; i < l; ++i) {
      indexSink = sinks[i] = new IndexSink(i, mergeSink);
      disposables[i] = this.sources[i].run(indexSink, scheduler);
    }
    return disposeAll(disposables);
  };
  return Merge2;
}();
var MergeSink = function(_super) {
  __extends(MergeSink2, _super);
  function MergeSink2(disposables, sinks, sink) {
    var _this = _super.call(this, sink) || this;
    _this.disposables = disposables;
    _this.activeCount = sinks.length;
    return _this;
  }
  MergeSink2.prototype.event = function(t, indexValue) {
    if (!indexValue.active) {
      this.dispose(t, indexValue.index);
      return;
    }
    this.sink.event(t, indexValue.value);
  };
  MergeSink2.prototype.dispose = function(t, index) {
    tryDispose(t, this.disposables[index], this.sink);
    if (--this.activeCount === 0) {
      this.sink.end(t);
    }
  };
  return MergeSink2;
}(Pipe);
var sample = function(values, sampler) {
  return snapshot(function(x) {
    return x;
  }, values, sampler);
};
var snapshot = function(f, values, sampler) {
  return isCanonicalEmpty(sampler) || isCanonicalEmpty(values) ? empty() : new Snapshot(f, values, sampler);
};
var Snapshot = function() {
  function Snapshot2(f, values, sampler) {
    this.f = f;
    this.values = values;
    this.sampler = sampler;
  }
  Snapshot2.prototype.run = function(sink, scheduler) {
    var sampleSink = new SnapshotSink(this.f, sink);
    var valuesDisposable = this.values.run(sampleSink.latest, scheduler);
    var samplerDisposable = this.sampler.run(sampleSink, scheduler);
    return disposeBoth(samplerDisposable, valuesDisposable);
  };
  return Snapshot2;
}();
var SnapshotSink = function(_super) {
  __extends(SnapshotSink2, _super);
  function SnapshotSink2(f, sink) {
    var _this = _super.call(this, sink) || this;
    _this.f = f;
    _this.latest = new LatestValueSink(_this);
    return _this;
  }
  SnapshotSink2.prototype.event = function(t, x) {
    if (this.latest.hasValue) {
      var f = this.f;
      this.sink.event(t, f(this.latest.value, x));
    }
  };
  return SnapshotSink2;
}(Pipe);
var LatestValueSink = function(_super) {
  __extends(LatestValueSink2, _super);
  function LatestValueSink2(sink) {
    var _this = _super.call(this, sink) || this;
    _this.hasValue = false;
    return _this;
  }
  LatestValueSink2.prototype.event = function(_t, x) {
    this.value = x;
    this.hasValue = true;
  };
  LatestValueSink2.prototype.end = function() {
  };
  return LatestValueSink2;
}(Pipe);
var boundsFrom = function(unsafeMin, unsafeMax) {
  var min = Math.max(0, unsafeMin);
  var max = Math.max(min, unsafeMax);
  return { min, max };
};
var mergeBounds = function(b1, b2) {
  return boundsFrom(b1.min + b2.min, Math.min(b1.max, b1.min + b2.max));
};
var isNilBounds = function(b) {
  return b.min >= b.max;
};
var isInfiniteBounds = function(b) {
  return b.min <= 0 && b.max === Infinity;
};
var take = function(n, stream) {
  return slice(0, n, stream);
};
var skip = function(n, stream) {
  return slice(n, Infinity, stream);
};
var slice = function(start, end, stream) {
  return sliceBounds(boundsFrom(start, end), stream);
};
var sliceBounds = function(bounds, stream) {
  return isSliceEmpty(bounds, stream) ? empty() : stream instanceof Map ? commuteMapSlice(bounds, stream) : stream instanceof Slice ? fuseSlice(bounds, stream) : createSlice(bounds, stream);
};
var isSliceEmpty = function(bounds, stream) {
  return isCanonicalEmpty(stream) || isNilBounds(bounds);
};
var createSlice = function(bounds, stream) {
  return isInfiniteBounds(bounds) ? stream : new Slice(bounds, stream);
};
var commuteMapSlice = function(bounds, mapStream) {
  return Map.create(mapStream.f, sliceBounds(bounds, mapStream.source));
};
var fuseSlice = function(bounds, sliceStream) {
  return sliceBounds(mergeBounds(sliceStream.bounds, bounds), sliceStream.source);
};
var Slice = function() {
  function Slice2(bounds, source) {
    this.source = source;
    this.bounds = bounds;
  }
  Slice2.prototype.run = function(sink, scheduler) {
    var disposable = new SettableDisposable();
    var sliceSink = new SliceSink(this.bounds.min, this.bounds.max - this.bounds.min, sink, disposable);
    disposable.setDisposable(this.source.run(sliceSink, scheduler));
    return disposable;
  };
  return Slice2;
}();
var SliceSink = function(_super) {
  __extends(SliceSink2, _super);
  function SliceSink2(skip2, take2, sink, disposable) {
    var _this = _super.call(this, sink) || this;
    _this.skip = skip2;
    _this.take = take2;
    _this.disposable = disposable;
    return _this;
  }
  SliceSink2.prototype.event = function(t, x) {
    if (this.skip > 0) {
      this.skip -= 1;
      return;
    }
    if (this.take === 0) {
      return;
    }
    this.take -= 1;
    this.sink.event(t, x);
    if (this.take === 0) {
      this.disposable.dispose();
      this.sink.end(t);
    }
  };
  return SliceSink2;
}(Pipe);
var takeWhile = function(p, stream) {
  return isCanonicalEmpty(stream) ? empty() : new TakeWhile(p, stream);
};
var TakeWhile = function() {
  function TakeWhile2(p, source) {
    this.p = p;
    this.source = source;
  }
  TakeWhile2.prototype.run = function(sink, scheduler) {
    var disposable = new SettableDisposable();
    var takeWhileSink = new TakeWhileSink(this.p, sink, disposable);
    disposable.setDisposable(this.source.run(takeWhileSink, scheduler));
    return disposable;
  };
  return TakeWhile2;
}();
var TakeWhileSink = function(_super) {
  __extends(TakeWhileSink2, _super);
  function TakeWhileSink2(p, sink, disposable) {
    var _this = _super.call(this, sink) || this;
    _this.p = p;
    _this.active = true;
    _this.disposable = disposable;
    return _this;
  }
  TakeWhileSink2.prototype.event = function(t, x) {
    if (!this.active) {
      return;
    }
    var p = this.p;
    this.active = p(x);
    if (this.active) {
      this.sink.event(t, x);
    } else {
      this.disposable.dispose();
      this.sink.end(t);
    }
  };
  return TakeWhileSink2;
}(Pipe);
var skipWhile = function(p, stream) {
  return isCanonicalEmpty(stream) ? empty() : new SkipWhile(p, stream);
};
var SkipWhile = function() {
  function SkipWhile2(p, source) {
    this.p = p;
    this.source = source;
  }
  SkipWhile2.prototype.run = function(sink, scheduler) {
    return this.source.run(new SkipWhileSink(this.p, sink), scheduler);
  };
  return SkipWhile2;
}();
var SkipWhileSink = function(_super) {
  __extends(SkipWhileSink2, _super);
  function SkipWhileSink2(p, sink) {
    var _this = _super.call(this, sink) || this;
    _this.p = p;
    _this.skipping = true;
    return _this;
  }
  SkipWhileSink2.prototype.event = function(t, x) {
    if (this.skipping) {
      var p = this.p;
      this.skipping = p(x);
      if (this.skipping) {
        return;
      }
    }
    this.sink.event(t, x);
  };
  return SkipWhileSink2;
}(Pipe);
var skipAfter = function(p, stream) {
  return isCanonicalEmpty(stream) ? empty() : new SkipAfter(p, stream);
};
var SkipAfter = function() {
  function SkipAfter2(p, source) {
    this.p = p;
    this.source = source;
  }
  SkipAfter2.prototype.run = function(sink, scheduler) {
    return this.source.run(new SkipAfterSink(this.p, sink), scheduler);
  };
  return SkipAfter2;
}();
var SkipAfterSink = function(_super) {
  __extends(SkipAfterSink2, _super);
  function SkipAfterSink2(p, sink) {
    var _this = _super.call(this, sink) || this;
    _this.p = p;
    _this.skipping = false;
    return _this;
  }
  SkipAfterSink2.prototype.event = function(t, x) {
    if (this.skipping) {
      return;
    }
    var p = this.p;
    this.skipping = p(x);
    this.sink.event(t, x);
    if (this.skipping) {
      this.sink.end(t);
    }
  };
  return SkipAfterSink2;
}(Pipe);
var withItems = function(items, stream) {
  return zipItems(keepLeft, items, stream);
};
var zipItems = function(f, items, stream) {
  return isCanonicalEmpty(stream) || items.length === 0 ? empty() : new ZipItems(f, items, take(items.length, stream));
};
var keepLeft = function(a) {
  return a;
};
var ZipItems = function() {
  function ZipItems2(f, items, source) {
    this.f = f;
    this.items = items;
    this.source = source;
  }
  ZipItems2.prototype.run = function(sink, scheduler) {
    return this.source.run(new ZipItemsSink(this.f, this.items, sink), scheduler);
  };
  return ZipItems2;
}();
var ZipItemsSink = function(_super) {
  __extends(ZipItemsSink2, _super);
  function ZipItemsSink2(f, items, sink) {
    var _this = _super.call(this, sink) || this;
    _this.f = f;
    _this.items = items;
    _this.index = 0;
    return _this;
  }
  ZipItemsSink2.prototype.event = function(t, b) {
    var f = this.f;
    this.sink.event(t, f(this.items[this.index], b));
    this.index += 1;
  };
  return ZipItemsSink2;
}(Pipe);
var HEAD_MAX_SHRINK = 2;
var TAIL_MIN_SHRINK = 1e4;
var Queue = function() {
  function Queue2() {
    this.head = 0;
    this.tail = 0;
    this.capacityMask = 3;
    this.list = new Array(4);
  }
  Queue2.prototype.push = function(x) {
    var tail = this.tail;
    this.list[tail] = x;
    this.tail = tail + 1 & this.capacityMask;
    if (this.tail === this.head) {
      this.growArray();
    }
    if (this.head < this.tail) {
      return this.tail - this.head;
    } else {
      return this.capacityMask + 1 - (this.head - this.tail);
    }
  };
  Queue2.prototype.shift = function() {
    var head2 = this.head;
    if (head2 === this.tail) {
      return void 0;
    }
    var x = this.list[head2];
    this.list[head2] = void 0;
    this.head = head2 + 1 & this.capacityMask;
    if (head2 < HEAD_MAX_SHRINK && this.tail > TAIL_MIN_SHRINK && this.tail <= this.list.length >>> 2) {
      this.shrinkArray();
    }
    return x;
  };
  Queue2.prototype.isEmpty = function() {
    return this.head === this.tail;
  };
  Queue2.prototype.length = function() {
    if (this.head === this.tail) {
      return 0;
    } else if (this.head < this.tail) {
      return this.tail - this.head;
    } else {
      return this.capacityMask + 1 - (this.head - this.tail);
    }
  };
  Queue2.prototype.growArray = function() {
    if (this.head) {
      this.list = this.copyArray();
      this.head = 0;
    }
    this.tail = this.list.length;
    this.list.length *= 2;
    this.capacityMask = this.capacityMask << 1 | 1;
  };
  Queue2.prototype.shrinkArray = function() {
    this.list.length >>>= 1;
    this.capacityMask >>>= 1;
  };
  Queue2.prototype.copyArray = function() {
    var newArray = [];
    var list = this.list;
    var len = list.length;
    var i;
    for (i = this.head; i < len; i++) {
      newArray.push(list[i]);
    }
    for (i = 0; i < this.tail; i++) {
      newArray.push(list[i]);
    }
    return newArray;
  };
  return Queue2;
}();
function zip(f, stream1, stream2) {
  return zipArray(f, [stream1, stream2]);
}
var zipArray = function(f, streams) {
  return streams.length === 0 || containsCanonicalEmpty(streams) ? empty() : streams.length === 1 ? map2(f, streams[0]) : new Zip(f, streams);
};
var Zip = function() {
  function Zip2(f, sources) {
    this.f = f;
    this.sources = sources;
  }
  Zip2.prototype.run = function(sink, scheduler) {
    var l = this.sources.length;
    var disposables = new Array(l);
    var sinks = new Array(l);
    var buffers = new Array(l);
    var zipSink = new ZipSink(this.f, buffers, sinks, sink);
    for (var indexSink = void 0, i = 0; i < l; ++i) {
      buffers[i] = new Queue();
      indexSink = sinks[i] = new IndexSink(i, zipSink);
      disposables[i] = this.sources[i].run(indexSink, scheduler);
    }
    return disposeAll(disposables);
  };
  return Zip2;
}();
var ZipSink = function(_super) {
  __extends(ZipSink2, _super);
  function ZipSink2(f, buffers, sinks, sink) {
    var _this = _super.call(this, sink) || this;
    _this.f = f;
    _this.sinks = sinks;
    _this.buffers = buffers;
    return _this;
  }
  ZipSink2.prototype.event = function(t, indexedValue) {
    if (!indexedValue.active) {
      this.dispose(t, indexedValue.index);
      return;
    }
    var buffers = this.buffers;
    var buffer = buffers[indexedValue.index];
    buffer.push(indexedValue.value);
    if (buffer.length() === 1) {
      if (!ready(buffers)) {
        return;
      }
      emitZipped(this.f, t, buffers, this.sink);
      if (ended(this.buffers, this.sinks)) {
        this.sink.end(t);
      }
    }
  };
  ZipSink2.prototype.dispose = function(t, index) {
    var buffer = this.buffers[index];
    if (buffer.isEmpty()) {
      this.sink.end(t);
    }
  };
  return ZipSink2;
}(Pipe);
var emitZipped = function(f, t, buffers, sink) {
  return sink.event(t, invoke(f, map(head, buffers)));
};
var head = function(buffer) {
  return buffer.shift();
};
function ended(buffers, sinks) {
  for (var i = 0, l = buffers.length; i < l; ++i) {
    if (buffers[i].isEmpty() && !sinks[i].active) {
      return true;
    }
  }
  return false;
}
function ready(buffers) {
  for (var i = 0, l = buffers.length; i < l; ++i) {
    if (buffers[i].isEmpty()) {
      return false;
    }
  }
  return true;
}
var Switch = function() {
  function Switch2(source) {
    this.source = source;
  }
  Switch2.prototype.run = function(sink, scheduler) {
    var switchSink = new SwitchSink(sink, scheduler);
    return disposeBoth(switchSink, this.source.run(switchSink, scheduler));
  };
  return Switch2;
}();
var SwitchSink = function() {
  function SwitchSink2(sink, scheduler) {
    this.sink = sink;
    this.scheduler = scheduler;
    this.current = null;
    this.ended = false;
  }
  SwitchSink2.prototype.event = function(t, stream) {
    this.disposeCurrent(t);
    this.current = new Segment(stream, t, Infinity, this, this.sink, this.scheduler);
  };
  SwitchSink2.prototype.end = function(t) {
    this.ended = true;
    this.checkEnd(t);
  };
  SwitchSink2.prototype.error = function(t, e) {
    this.ended = true;
    this.sink.error(t, e);
  };
  SwitchSink2.prototype.dispose = function() {
    return this.disposeCurrent(currentTime(this.scheduler));
  };
  SwitchSink2.prototype.disposeCurrent = function(t) {
    if (this.current !== null) {
      return this.current.dispose(t);
    }
  };
  SwitchSink2.prototype.disposeInner = function(t, inner) {
    inner.dispose(t);
    if (inner === this.current) {
      this.current = null;
    }
  };
  SwitchSink2.prototype.checkEnd = function(t) {
    if (this.ended && this.current === null) {
      this.sink.end(t);
    }
  };
  SwitchSink2.prototype.endInner = function(t, inner) {
    this.disposeInner(t, inner);
    this.checkEnd(t);
  };
  SwitchSink2.prototype.errorInner = function(t, e, inner) {
    this.disposeInner(t, inner);
    this.sink.error(t, e);
  };
  return SwitchSink2;
}();
var Segment = function() {
  function Segment2(source, min, max, outer, sink, scheduler) {
    this.min = min;
    this.max = max;
    this.outer = outer;
    this.sink = sink;
    this.disposable = source.run(this, schedulerRelativeTo(min, scheduler));
  }
  Segment2.prototype.event = function(t, x) {
    var time = Math.max(0, t + this.min);
    if (time < this.max) {
      this.sink.event(time, x);
    }
  };
  Segment2.prototype.end = function(t) {
    this.outer.endInner(t + this.min, this);
  };
  Segment2.prototype.error = function(t, e) {
    this.outer.errorInner(t + this.min, e, this);
  };
  Segment2.prototype.dispose = function(t) {
    tryDispose(t, this.disposable, this.sink);
  };
  return Segment2;
}();
function filter(p, stream) {
  return Filter.create(p, stream);
}
var skipRepeats = function(stream) {
  return skipRepeatsWith(same, stream);
};
var skipRepeatsWith = function(equals, stream) {
  return isCanonicalEmpty(stream) ? empty() : new SkipRepeats(equals, stream);
};
var SkipRepeats = function() {
  function SkipRepeats2(equals, source) {
    this.equals = equals;
    this.source = source;
  }
  SkipRepeats2.prototype.run = function(sink, scheduler) {
    return this.source.run(new SkipRepeatsSink(this.equals, sink), scheduler);
  };
  return SkipRepeats2;
}();
var SkipRepeatsSink = function(_super) {
  __extends(SkipRepeatsSink2, _super);
  function SkipRepeatsSink2(equals, sink) {
    var _this = _super.call(this, sink) || this;
    _this.equals = equals;
    _this.value = void 0;
    _this.init = true;
    return _this;
  }
  SkipRepeatsSink2.prototype.event = function(t, x) {
    if (this.init) {
      this.init = false;
      this.value = x;
      this.sink.event(t, x);
    } else if (!this.equals(this.value, x)) {
      this.value = x;
      this.sink.event(t, x);
    }
  };
  return SkipRepeatsSink2;
}(Pipe);
function same(a, b) {
  return a === b;
}
var until = function(signal, stream) {
  return new Until(signal, stream);
};
var since = function(signal, stream) {
  return new Since(signal, stream);
};
var during = function(timeWindow, stream) {
  return until(join(timeWindow), since(timeWindow, stream));
};
var Until = function() {
  function Until2(maxSignal, source) {
    this.maxSignal = maxSignal;
    this.source = source;
  }
  Until2.prototype.run = function(sink, scheduler) {
    var disposable = new SettableDisposable();
    var d1 = this.source.run(sink, scheduler);
    var d2 = this.maxSignal.run(new UntilSink(sink, disposable), scheduler);
    disposable.setDisposable(disposeBoth(d1, d2));
    return disposable;
  };
  return Until2;
}();
var Since = function() {
  function Since2(minSignal, source) {
    this.minSignal = minSignal;
    this.source = source;
  }
  Since2.prototype.run = function(sink, scheduler) {
    var min = new LowerBoundSink(this.minSignal, sink, scheduler);
    var d = this.source.run(new SinceSink(min, sink), scheduler);
    return disposeBoth(min, d);
  };
  return Since2;
}();
var SinceSink = function(_super) {
  __extends(SinceSink2, _super);
  function SinceSink2(min, sink) {
    var _this = _super.call(this, sink) || this;
    _this.min = min;
    return _this;
  }
  SinceSink2.prototype.event = function(t, x) {
    if (this.min.allow) {
      this.sink.event(t, x);
    }
  };
  return SinceSink2;
}(Pipe);
var LowerBoundSink = function(_super) {
  __extends(LowerBoundSink2, _super);
  function LowerBoundSink2(signal, sink, scheduler) {
    var _this = _super.call(this, sink) || this;
    _this.allow = false;
    _this.disposable = signal.run(_this, scheduler);
    return _this;
  }
  LowerBoundSink2.prototype.event = function() {
    this.allow = true;
    this.dispose();
  };
  LowerBoundSink2.prototype.end = function() {
  };
  LowerBoundSink2.prototype.dispose = function() {
    this.disposable.dispose();
  };
  return LowerBoundSink2;
}(Pipe);
var UntilSink = function(_super) {
  __extends(UntilSink2, _super);
  function UntilSink2(sink, disposable) {
    var _this = _super.call(this, sink) || this;
    _this.disposable = disposable;
    return _this;
  }
  UntilSink2.prototype.event = function(t) {
    this.disposable.dispose();
    this.sink.end(t);
  };
  UntilSink2.prototype.end = function() {
  };
  return UntilSink2;
}(Pipe);
var delay2 = function(delayTime, stream) {
  return delayTime <= 0 ? stream : new Delay(delayTime, stream);
};
var Delay = function() {
  function Delay2(dt, source) {
    this.dt = dt;
    this.source = source;
  }
  Delay2.prototype.run = function(sink, scheduler) {
    var delaySink = new DelaySink(this.dt, sink, scheduler);
    return disposeBoth(delaySink, this.source.run(delaySink, scheduler));
  };
  return Delay2;
}();
var DelaySink = function(_super) {
  __extends(DelaySink2, _super);
  function DelaySink2(dt, sink, scheduler) {
    var _this = _super.call(this, sink) || this;
    _this.dt = dt;
    _this.scheduler = scheduler;
    _this.tasks = [];
    return _this;
  }
  DelaySink2.prototype.dispose = function() {
    this.tasks.forEach(cancelTask);
  };
  DelaySink2.prototype.event = function(_t, x) {
    this.tasks.push(delay(this.dt, propagateEventTask(x, this.sink), this.scheduler));
  };
  DelaySink2.prototype.end = function() {
    this.tasks.push(delay(this.dt, propagateEndTask(this.sink), this.scheduler));
  };
  return DelaySink2;
}(Pipe);
var throttle = function(period, stream) {
  return isCanonicalEmpty(stream) ? empty() : stream instanceof Map ? commuteMapThrottle(period, stream) : stream instanceof Throttle ? fuseThrottle(period, stream) : new Throttle(period, stream);
};
var commuteMapThrottle = function(period, mapStream) {
  return Map.create(mapStream.f, throttle(period, mapStream.source));
};
var fuseThrottle = function(period, throttleStream) {
  return new Throttle(Math.max(period, throttleStream.period), throttleStream.source);
};
var Throttle = function() {
  function Throttle2(period, source) {
    this.period = period;
    this.source = source;
  }
  Throttle2.prototype.run = function(sink, scheduler) {
    return this.source.run(new ThrottleSink(this.period, sink), scheduler);
  };
  return Throttle2;
}();
var ThrottleSink = function(_super) {
  __extends(ThrottleSink2, _super);
  function ThrottleSink2(period, sink) {
    var _this = _super.call(this, sink) || this;
    _this.time = 0;
    _this.period = period;
    return _this;
  }
  ThrottleSink2.prototype.event = function(t, x) {
    if (t >= this.time) {
      this.time = t + this.period;
      this.sink.event(t, x);
    }
  };
  return ThrottleSink2;
}(Pipe);
var debounce = function(period, stream) {
  return isCanonicalEmpty(stream) ? empty() : new Debounce(period, stream);
};
var Debounce = function() {
  function Debounce2(dt, source) {
    this.dt = dt;
    this.source = source;
  }
  Debounce2.prototype.run = function(sink, scheduler) {
    return new DebounceSink(this.dt, this.source, sink, scheduler);
  };
  return Debounce2;
}();
var DebounceSink = function() {
  function DebounceSink2(dt, source, sink, scheduler) {
    this.dt = dt;
    this.sink = sink;
    this.scheduler = scheduler;
    this.timer = null;
    this.disposable = source.run(this, scheduler);
  }
  DebounceSink2.prototype.event = function(_t, x) {
    this.clearTimer();
    this.value = x;
    this.timer = delay(this.dt, new DebounceTask(this, x), this.scheduler);
  };
  DebounceSink2.prototype.handleEventFromTask = function(t, x) {
    this.clearTimer();
    this.sink.event(t, x);
  };
  DebounceSink2.prototype.end = function(t) {
    if (this.clearTimer()) {
      this.sink.event(t, this.value);
      this.value = void 0;
    }
    this.sink.end(t);
  };
  DebounceSink2.prototype.error = function(t, x) {
    this.clearTimer();
    this.sink.error(t, x);
  };
  DebounceSink2.prototype.dispose = function() {
    this.clearTimer();
    this.disposable.dispose();
  };
  DebounceSink2.prototype.clearTimer = function() {
    if (this.timer === null) {
      return false;
    }
    this.timer.dispose();
    this.timer = null;
    return true;
  };
  return DebounceSink2;
}();
var DebounceTask = function() {
  function DebounceTask2(sink, value) {
    this.sink = sink;
    this.value = value;
  }
  DebounceTask2.prototype.run = function(t) {
    this.sink.handleEventFromTask(t, this.value);
  };
  DebounceTask2.prototype.error = function(t, e) {
    this.sink.error(t, e);
  };
  DebounceTask2.prototype.dispose = function() {
  };
  return DebounceTask2;
}();
var Await = function() {
  function Await2(source) {
    this.source = source;
  }
  Await2.prototype.run = function(sink, scheduler) {
    return this.source.run(new AwaitSink(sink, scheduler), scheduler);
  };
  return Await2;
}();
var AwaitSink = function() {
  function AwaitSink2(sink, scheduler) {
    var _this = this;
    this.eventBound = function(x) {
      return _this.sink.event(currentTime(_this.scheduler), x);
    };
    this.endBound = function() {
      return _this.sink.end(currentTime(_this.scheduler));
    };
    this.errorBound = function(e) {
      return _this.sink.error(currentTime(_this.scheduler), e);
    };
    this.sink = sink;
    this.scheduler = scheduler;
    this.queue = Promise.resolve();
  }
  AwaitSink2.prototype.event = function(_t, promise) {
    var _this = this;
    this.queue = this.queue.then(function() {
      return _this.handlePromise(promise);
    }).catch(this.errorBound);
  };
  AwaitSink2.prototype.end = function() {
    this.queue = this.queue.then(this.endBound).catch(this.errorBound);
  };
  AwaitSink2.prototype.error = function(_t, e) {
    var _this = this;
    this.queue = this.queue.then(function() {
      return _this.errorBound(e);
    }).catch(fatalError);
  };
  AwaitSink2.prototype.handlePromise = function(promise) {
    return promise.then(this.eventBound);
  };
  return AwaitSink2;
}();
var SafeSink = function() {
  function SafeSink2(sink) {
    this.sink = sink;
    this.active = true;
  }
  SafeSink2.prototype.event = function(t, x) {
    if (!this.active) {
      return;
    }
    this.sink.event(t, x);
  };
  SafeSink2.prototype.end = function(t) {
    if (!this.active) {
      return;
    }
    this.disable();
    this.sink.end(t);
  };
  SafeSink2.prototype.error = function(t, e) {
    this.disable();
    this.sink.error(t, e);
  };
  SafeSink2.prototype.disable = function() {
    this.active = false;
    return this.sink;
  };
  return SafeSink2;
}();
function tryEvent(t, x, sink) {
  try {
    sink.event(t, x);
  } catch (e) {
    sink.error(t, e);
  }
}
function tryEnd(t, sink) {
  try {
    sink.end(t);
  } catch (e) {
    sink.error(t, e);
  }
}
var recoverWith = function(f, stream) {
  return isCanonicalEmpty(stream) ? empty() : new RecoverWith(f, stream);
};
var ErrorStream = function() {
  function ErrorStream2(e) {
    this.value = e;
  }
  ErrorStream2.prototype.run = function(sink, scheduler) {
    return asap(propagateErrorTask(this.value, sink), scheduler);
  };
  return ErrorStream2;
}();
var RecoverWith = function() {
  function RecoverWith2(f, source) {
    this.f = f;
    this.source = source;
  }
  RecoverWith2.prototype.run = function(sink, scheduler) {
    return new RecoverWithSink(this.f, this.source, sink, scheduler);
  };
  return RecoverWith2;
}();
var RecoverWithSink = function() {
  function RecoverWithSink2(f, source, sink, scheduler) {
    this.f = f;
    this.sink = new SafeSink(sink);
    this.scheduler = scheduler;
    this.disposable = source.run(this, scheduler);
  }
  RecoverWithSink2.prototype.event = function(t, x) {
    tryEvent(t, x, this.sink);
  };
  RecoverWithSink2.prototype.end = function(t) {
    tryEnd(t, this.sink);
  };
  RecoverWithSink2.prototype.error = function(t, e) {
    var nextSink = this.sink.disable();
    tryDispose(t, this.disposable, this.sink);
    this._startNext(t, e, nextSink);
  };
  RecoverWithSink2.prototype._startNext = function(t, x, sink) {
    try {
      this.disposable = this._continue(this.f, t, x, sink);
    } catch (e) {
      sink.error(t, e);
    }
  };
  RecoverWithSink2.prototype._continue = function(f, t, x, sink) {
    return run(sink, this.scheduler, withLocalTime(t, f(x)));
  };
  RecoverWithSink2.prototype.dispose = function() {
    return this.disposable.dispose();
  };
  return RecoverWithSink2;
}();
var multicast = function(stream) {
  return stream instanceof Multicast || isCanonicalEmpty(stream) ? stream : new Multicast(stream);
};
var Multicast = function() {
  function Multicast2(source) {
    this.source = new MulticastSource(source);
  }
  Multicast2.prototype.run = function(sink, scheduler) {
    return this.source.run(sink, scheduler);
  };
  return Multicast2;
}();
var MulticastSource = function() {
  function MulticastSource2(source) {
    this.source = source;
    this.sinks = [];
    this.disposable = disposeNone();
  }
  MulticastSource2.prototype.run = function(sink, scheduler) {
    var n = this.add(sink);
    if (n === 1) {
      this.disposable = this.source.run(this, scheduler);
    }
    return disposeOnce(new MulticastDisposable(this, sink));
  };
  MulticastSource2.prototype.dispose = function() {
    var disposable = this.disposable;
    this.disposable = disposeNone();
    return disposable.dispose();
  };
  MulticastSource2.prototype.add = function(sink) {
    this.sinks = append(sink, this.sinks);
    return this.sinks.length;
  };
  MulticastSource2.prototype.remove = function(sink) {
    var i = findIndex(sink, this.sinks);
    if (i >= 0) {
      this.sinks = remove(i, this.sinks);
    }
    return this.sinks.length;
  };
  MulticastSource2.prototype.event = function(time, value) {
    var s = this.sinks;
    if (s.length === 1) {
      return s[0].event(time, value);
    }
    for (var i = 0; i < s.length; ++i) {
      tryEvent(time, value, s[i]);
    }
  };
  MulticastSource2.prototype.end = function(time) {
    var s = this.sinks;
    for (var i = 0; i < s.length; ++i) {
      tryEnd(time, s[i]);
    }
  };
  MulticastSource2.prototype.error = function(time, err) {
    var s = this.sinks;
    for (var i = 0; i < s.length; ++i) {
      s[i].error(time, err);
    }
  };
  return MulticastSource2;
}();
var MulticastDisposable = function() {
  function MulticastDisposable2(source, sink) {
    this.source = source;
    this.sink = sink;
  }
  MulticastDisposable2.prototype.dispose = function() {
    if (this.source.remove(this.sink) === 0) {
      this.source.dispose();
    }
  };
  return MulticastDisposable2;
}();
var run$1 = curry3(run);
var withLocalTime$1 = curry2(withLocalTime);
var loop$1 = curry3(loop);
var scan$1 = curry3(scan);
var startWith$1 = curry2(startWith);
var map$1 = curry2(map2);
var constant$1 = curry2(constant);
var tap$1 = curry2(tap);
var ap$1 = curry2(ap);
var chain$1 = curry2(chain);
var continueWith$1 = curry2(continueWith);
var concatMap$1 = curry2(concatMap);
var mergeConcurrently$1 = curry2(mergeConcurrently);
var mergeMapConcurrently$1 = curry3(mergeMapConcurrently);
var merge$1 = curry2(merge2);
var combine$1 = curry3(combine);
var combineArray$1 = curry2(combineArray);
var sample$1 = curry2(sample);
var snapshot$1 = curry3(snapshot);
var zipItems$1 = curry3(zipItems);
var withItems$1 = curry2(withItems);
var zip$1 = curry3(zip);
var zipArray$1 = curry2(zipArray);
var filter$1 = curry2(filter);
var skipRepeatsWith$1 = curry2(skipRepeatsWith);
var take$1 = curry2(take);
var skip$1 = curry2(skip);
var slice$1 = curry3(slice);
var takeWhile$1 = curry2(takeWhile);
var skipWhile$1 = curry2(skipWhile);
var skipAfter$1 = curry2(skipAfter);
var until$1 = curry2(until);
var since$1 = curry2(since);
var during$1 = curry2(during);
var delay$1 = curry2(delay2);
var throttle$1 = curry2(throttle);
var debounce$1 = curry2(debounce);
var recoverWith$1 = curry2(recoverWith);
var propagateTask$1 = curry3(propagateTask);
var propagateEventTask$1 = curry2(propagateEventTask);
var propagateErrorTask$1 = curry2(propagateErrorTask);

// src/cyclical.ts
var import_function = __toModule(require_function());

// node_modules/@typed/curry/lib.es2015/curry1.js
function curry1(fn) {
  function curried(a) {
    switch (arguments.length) {
      case 0:
        return curried;
      default:
        return fn(a);
    }
  }
  return curried;
}

// node_modules/@typed/curry/lib.es2015/curry2.js
function curry22(fn) {
  function curried(a, b) {
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return curry1(function(b2) {
          return fn(a, b2);
        });
      default:
        return fn(a, b);
    }
  }
  return curried;
}

// node_modules/@typed/curry/lib.es2015/curry3.js
function curry32(fn) {
  function curried(a, b, c) {
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return curry22(function(b2, c2) {
          return fn(a, b2, c2);
        });
      case 2:
        return curry1(function(c2) {
          return fn(a, b, c2);
        });
      default:
        return fn(a, b, c);
    }
  }
  return curried;
}

// node_modules/@typed/curry/lib.es2015/curry4.js
function curry4(fn) {
  function curried(a, b, c, d) {
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return curry32(function(b2, c2, d2) {
          return fn(a, b2, c2, d2);
        });
      case 2:
        return curry22(function(c2, d2) {
          return fn(a, b, c2, d2);
        });
      case 3:
        return curry1(function(d2) {
          return fn(a, b, c, d2);
        });
      default:
        return fn(a, b, c, d);
    }
  }
  return curried;
}

// node_modules/@typed/curry/lib.es2015/curry5.js
function curry5(fn) {
  function curried(a, b, c, d, e) {
    switch (arguments.length) {
      case 0:
        return curried;
      case 1:
        return curry4(function(b2, c2, d2, e2) {
          return fn(a, b2, c2, d2, e2);
        });
      case 2:
        return curry32(function(c2, d2, e2) {
          return fn(a, b, c2, d2, e2);
        });
      case 3:
        return curry22(function(d2, e2) {
          return fn(a, b, c, d2, e2);
        });
      case 4:
        return curry1(function(e2) {
          return fn(a, b, c, d, e2);
        });
      default:
        return fn(a, b, c, d, e);
    }
  }
  return curried;
}

// node_modules/@typed/curry/lib.es2015/curry.js
function curry(fn) {
  switch (fn.length) {
    case 0:
      return fn;
    case 1:
      return curry1(fn);
    case 2:
      return curry22(fn);
    case 3:
      return curry32(fn);
    case 4:
      return curry4(fn);
    case 5:
      return curry5(fn);
    default:
      throw new Error("Its highly suggested that you do not write functions with more than 5 parameters.");
  }
}

// src/cyclical.ts
var phaseWithinCycle = (clipStart, clipEnd, phase) => {
  const period = clipEnd - clipStart;
  return clipStart + phase % period;
};
var beginning = curry((A, B, phase, source$) => {
  phase = phaseWithinCycle(A, B, phase);
  console.log("beginning", phase, "to", B);
  return withLocalTime$1(phase, slice$1(phase, B, source$));
});
var ending = curry((A, B, phase, source$) => {
  phase = phaseWithinCycle(A, B, phase);
  console.log("ending", A, "to", phase);
  return withLocalTime$1(A, slice$1(A, phase, source$));
});
var clipPeriodic = curry((A, B, phase, source$) => {
  return join(mergeArray([
    now(beginning(A, B, phase, source$)),
    at(B, ending(A, B, phase, source$))
  ]));
});
var cycle = curry((A, B, phase, $) => {
  return (0, import_function.pipe)(periodic2(B - A), constant$1(clipPeriodic(A, B, phase, $)));
});
var endlessCycle = curry((A, B, phase, $) => join(cycle(A, B, phase, $)));
var pickup = curry((A, B, countdown, $) => cycle(A, B, B - countdown % (B - A), $));
var cyclical_default = curry((duration, $) => (0, import_function.pipe)(periodic2(duration), constant$1(until$1(at(duration, null), $))));

// src/util.ts
var tapConsole = (msg) => tap$1((x) => console.log(msg, x));
var isOn = ($) => filter$1((l) => l, $);
var isOff = ($) => filter$1((l) => !l, $);

// src/spout.ts
var spout = curry((flow$, latch$) => {
  const trimmedFlow$ = until$1(isOff(latch$), flow$);
  return constant$1(trimmedFlow$, isOn(latch$));
});
var spigot = curry(({ on$, off$, fx }, latch$) => {
  on$ = on$ || empty();
  off$ = off$ || empty();
  const output = merge$1(spout(on$, isOn(latch$)), spout(off$, isOff(latch$)));
  return fx ? map$1(fx, output) : output;
});
var router = curry((routes, control$) => {
  control$ = multicast(skipRepeats(control$));
  const mergedFlow$ = mergeArray(Object.entries(routes).map(([routeKey, flow$]) => spout(flow$, isOn(filter$1((controlKey) => controlKey === routeKey || controlKey.has(routeKey), control$)))));
  const finished$ = take$1(1, filter$1((x) => x === null, control$));
  return until$1(finished$, mergedFlow$);
});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/** @license MIT License (c) copyright 2010 original author or authors */
/** @license MIT License (c) copyright 2010-2016 original author or authors */
/** @license MIT License (c) copyright 2010-2017 original author or authors */
/** @license MIT License (c) copyright 2016 original author or authors */
/** @license MIT License (c) copyright 2017 original author or authors */
//# sourceMappingURL=index.js.map
