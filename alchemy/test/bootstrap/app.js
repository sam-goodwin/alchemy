import { env as __ALCHEMY_ENV__ } from "cloudflare:workers";

var __ALCHEMY_STATE__ = {"my-bootstrap-queue":{"state":{"Symbol(alchemy::ResourceKind)":"cloudflare::Queue","Symbol(alchemy::ResourceID)":"my-bootstrap-queue","Symbol(alchemy::ResourceFQN)":"my-bootstrap-ap/samgoodwin/my-bootstrap-queue","Symbol(alchemy::ResourceSeq)":0,"Symbol(alchemy::ResourceScope)":{"@scope":null}}},"my-bootstrap-bucket":{"state":{"Symbol(alchemy::ResourceKind)":"cloudflare::R2Bucket","Symbol(alchemy::ResourceID)":"my-bootstrap-bucket","Symbol(alchemy::ResourceFQN)":"my-bootstrap-ap/samgoodwin/my-bootstrap-bucket","Symbol(alchemy::ResourceSeq)":1,"Symbol(alchemy::ResourceScope)":{"@scope":null}}},"worker":{"state":{"Symbol(alchemy::ResourceKind)":"cloudflare::Worker","Symbol(alchemy::ResourceID)":"worker","Symbol(alchemy::ResourceFQN)":"my-bootstrap-ap/samgoodwin/worker","Symbol(alchemy::ResourceSeq)":2,"Symbol(alchemy::ResourceScope)":{"@scope":null}}}};

var STATE = {
  get: (id) => Promise.resolve(null),
  // get: (id) => __ALCHEMY_ENV__.STATE.get(id),
}
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedAsync(name) {
  const fn = /* @__PURE__ */ notImplemented(name);
  fn.__promisify__ = () => /* @__PURE__ */ notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedAsync, "notImplementedAsync");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// alchemy/src/cloudflare/bundle/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "alchemy/src/cloudflare/bundle/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env4) {
        return 1;
      }
      hasColors(count3, env4) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return "";
      }
      get versions() {
        return {};
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, exit, platform, nextTick, unenvProcess, abort, addListener, allowedNodeEnvironmentFlags, hasUncaughtExceptionCaptureCallback, setUncaughtExceptionCaptureCallback, loadEnvFile, sourceMapsEnabled, arch, argv, argv0, chdir, config, connected, constrainedMemory, availableMemory, cpuUsage, cwd, debugPort, dlopen, disconnect, emit, emitWarning, env, eventNames, execArgv, execPath, finalization, features, getActiveResourcesInfo, getMaxListeners, hrtime3, kill, listeners, listenerCount, memoryUsage, on, off, once, pid, ppid, prependListener, prependOnceListener, rawListeners, release, removeAllListeners, removeListener, report, resourceUsage, setMaxListeners, setSourceMapsEnabled, stderr, stdin, stdout, title, throwDeprecation, traceDeprecation, umask, uptime, version, versions, domain, initgroups, moduleLoadList, reallyExit, openStdin, assert2, binding, send, exitCode, channel, getegid, geteuid, getgid, getgroups, getuid, setegid, seteuid, setgid, setgroups, setuid, permission, mainModule, _events, _eventsCount, _exiting, _maxListeners, _debugEnd, _debugProcess, _fatalException, _getActiveHandles, _getActiveRequests, _kill, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, _disconnect, _handleQueue, _pendingMessage, _channel, _send, _linkedBinding, _process, process_default;
var init_process2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    ({ exit, platform, nextTick } = getBuiltinModule(
      "node:process"
    ));
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      nextTick
    });
    ({
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      finalization,
      features,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      on,
      off,
      once,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// alchemy/src/cloudflare/bundle/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "alchemy/src/cloudflare/bundle/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs
var access, copyFile, cp, open, opendir, rename, truncate, rm, rmdir, mkdir, readdir, readlink, symlink, lstat, stat, link, unlink, chmod, lchmod, lchown, chown, utimes, lutimes, realpath, mkdtemp, writeFile, appendFile, readFile, watch, statfs, glob;
var init_promises = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented("fs.access");
    copyFile = /* @__PURE__ */ notImplemented("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented("fs.cp");
    open = /* @__PURE__ */ notImplemented("fs.open");
    opendir = /* @__PURE__ */ notImplemented("fs.opendir");
    rename = /* @__PURE__ */ notImplemented("fs.rename");
    truncate = /* @__PURE__ */ notImplemented("fs.truncate");
    rm = /* @__PURE__ */ notImplemented("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented("fs.lstat");
    stat = /* @__PURE__ */ notImplemented("fs.stat");
    link = /* @__PURE__ */ notImplemented("fs.link");
    unlink = /* @__PURE__ */ notImplemented("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented("fs.lchown");
    chown = /* @__PURE__ */ notImplemented("fs.chown");
    utimes = /* @__PURE__ */ notImplemented("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented("fs.readFile");
    watch = /* @__PURE__ */ notImplemented("fs.watch");
    statfs = /* @__PURE__ */ notImplemented("fs.statfs");
    glob = /* @__PURE__ */ notImplemented("fs.glob");
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  EXTENSIONLESS_FORMAT_JAVASCRIPT: () => EXTENSIONLESS_FORMAT_JAVASCRIPT,
  EXTENSIONLESS_FORMAT_WASM: () => EXTENSIONLESS_FORMAT_WASM,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_DIRENT_BLOCK: () => UV_DIRENT_BLOCK,
  UV_DIRENT_CHAR: () => UV_DIRENT_CHAR,
  UV_DIRENT_DIR: () => UV_DIRENT_DIR,
  UV_DIRENT_FIFO: () => UV_DIRENT_FIFO,
  UV_DIRENT_FILE: () => UV_DIRENT_FILE,
  UV_DIRENT_LINK: () => UV_DIRENT_LINK,
  UV_DIRENT_SOCKET: () => UV_DIRENT_SOCKET,
  UV_DIRENT_UNKNOWN: () => UV_DIRENT_UNKNOWN,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  UV_FS_SYMLINK_DIR: () => UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION: () => UV_FS_SYMLINK_JUNCTION,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});
var UV_FS_SYMLINK_DIR, UV_FS_SYMLINK_JUNCTION, O_RDONLY, O_WRONLY, O_RDWR, UV_DIRENT_UNKNOWN, UV_DIRENT_FILE, UV_DIRENT_DIR, UV_DIRENT_LINK, UV_DIRENT_FIFO, UV_DIRENT_SOCKET, UV_DIRENT_CHAR, UV_DIRENT_BLOCK, EXTENSIONLESS_FORMAT_JAVASCRIPT, EXTENSIONLESS_FORMAT_WASM, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, UV_FS_O_FILEMAP, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOATIME, O_NOFOLLOW, O_SYNC, O_DSYNC, O_DIRECT, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, F_OK, R_OK, W_OK, X_OK, UV_FS_COPYFILE_EXCL, COPYFILE_EXCL, UV_FS_COPYFILE_FICLONE, COPYFILE_FICLONE, UV_FS_COPYFILE_FICLONE_FORCE, COPYFILE_FICLONE_FORCE;
var init_constants = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});

// node_modules/unenv/dist/runtime/node/fs/promises.mjs
var promises_default;
var init_promises2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs
var Dir, Dirent, Stats, ReadStream2, WriteStream2, FileReadStream, FileWriteStream;
var init_classes = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream2 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream2 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream2;
    FileWriteStream = WriteStream2;
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
var access2, appendFile2, chown2, chmod2, copyFile2, cp2, lchown2, lchmod2, link2, lstat2, lutimes2, mkdir2, mkdtemp2, realpath2, open2, opendir2, readdir2, readFile2, readlink2, rename2, rm2, rmdir2, stat2, symlink2, truncate2, unlink2, utimes2, writeFile2, statfs2, close, createReadStream, createWriteStream, exists, fchown, fchmod, fdatasync, fstat, fsync, ftruncate, futimes, lstatSync, read, readv, realpathSync, statSync, unwatchFile, watch2, watchFile, write, writev, _toUnixTimestamp, openAsBlob, glob2, appendFileSync, accessSync, chownSync, chmodSync, closeSync, copyFileSync, cpSync, existsSync, fchownSync, fchmodSync, fdatasyncSync, fstatSync, fsyncSync, ftruncateSync, futimesSync, lchownSync, lchmodSync, linkSync, lutimesSync, mkdirSync, mkdtempSync, openSync, opendirSync, readdirSync, readSync, readvSync, readFileSync, readlinkSync, renameSync, rmSync, rmdirSync, symlinkSync, truncateSync, unlinkSync, utimesSync, writeFileSync, writeSync, writevSync, statfsSync, globSync;
var init_fs = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented("fs.cpSync");
    existsSync = /* @__PURE__ */ __name(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented("fs.globSync");
  }
});

// node_modules/unenv/dist/runtime/node/fs.mjs
var fs_default;
var init_fs2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants();
    init_constants();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream2,
      Stats,
      WriteStream: WriteStream2,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});

// alchemy/src/fs/file-ref.ts
var file_ref_exports = {};
__export(file_ref_exports, {
  isFileRef: () => isFileRef
});
function isFileRef(value) {
  return typeof value === "object" && value !== null && "kind" in value && value.kind === "fs::FileRef";
}
var init_file_ref = __esm({
  "alchemy/src/fs/file-ref.ts"() {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(isFileRef, "isFileRef");
  }
});

// alchemy/src/fs/file-collection.ts
var file_collection_exports = {};
__export(file_collection_exports, {
  isFileCollection: () => isFileCollection
});
function isFileCollection(value) {
  return typeof value === "object" && value !== null && "type" in value && value.type === "fs::FileCollection";
}
var init_file_collection = __esm({
  "alchemy/src/fs/file-collection.ts"() {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(isFileCollection, "isFileCollection");
  }
});

// node_modules/unenv/dist/runtime/node/os.mjs
var init_os = __esm({
  "node_modules/unenv/dist/runtime/node/os.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// node_modules/unenv/dist/runtime/node/internal/crypto/web.mjs
var subtle;
var init_web = __esm({
  "node_modules/unenv/dist/runtime/node/internal/crypto/web.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    subtle = globalThis.crypto?.subtle;
  }
});

// node_modules/unenv/dist/runtime/node/internal/crypto/node.mjs
var webcrypto;
var init_node = __esm({
  "node_modules/unenv/dist/runtime/node/internal/crypto/node.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    webcrypto = new Proxy(globalThis.crypto, { get(_, key) {
      if (key === "CryptoKey") {
        return globalThis.CryptoKey;
      }
      if (typeof globalThis.crypto[key] === "function") {
        return globalThis.crypto[key].bind(globalThis.crypto);
      }
      return globalThis.crypto[key];
    } });
  }
});

// node_modules/unenv/dist/runtime/node/crypto.mjs
var init_crypto = __esm({
  "node_modules/unenv/dist/runtime/node/crypto.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_web();
    init_node();
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/crypto.mjs
var workerdCrypto, Certificate, checkPrime, checkPrimeSync, Cipheriv, createCipheriv, createDecipheriv, createDiffieHellman, createDiffieHellmanGroup, createECDH, createHash, createHmac, createPrivateKey, createPublicKey, createSecretKey, createSign, createVerify, Decipheriv, diffieHellman, DiffieHellman, DiffieHellmanGroup, ECDH, fips, generateKey, generateKeyPair, generateKeyPairSync, generateKeySync, generatePrime, generatePrimeSync, getCipherInfo, getCiphers, getCurves, getDiffieHellman, getFips, getHashes, getRandomValues, hash, Hash, hkdf, hkdfSync, Hmac, KeyObject, pbkdf2, pbkdf2Sync, privateDecrypt, privateEncrypt, publicDecrypt, publicEncrypt, randomBytes, randomFill, randomFillSync, randomInt, randomUUID, scrypt, scryptSync, secureHeapUsed, setEngine, setFips, sign, Sign, subtle2, timingSafeEqual, verify, Verify, X509Certificate, webcrypto2;
var init_crypto2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/crypto.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_crypto();
    workerdCrypto = process.getBuiltinModule("node:crypto");
    ({
      Certificate,
      checkPrime,
      checkPrimeSync,
      Cipheriv: (
        // @ts-expect-error
        Cipheriv
      ),
      createCipheriv,
      createDecipheriv,
      createDiffieHellman,
      createDiffieHellmanGroup,
      createECDH,
      createHash,
      createHmac,
      createPrivateKey,
      createPublicKey,
      createSecretKey,
      createSign,
      createVerify,
      Decipheriv: (
        // @ts-expect-error
        Decipheriv
      ),
      diffieHellman,
      DiffieHellman,
      DiffieHellmanGroup,
      ECDH,
      fips,
      generateKey,
      generateKeyPair,
      generateKeyPairSync,
      generateKeySync,
      generatePrime,
      generatePrimeSync,
      getCipherInfo,
      getCiphers,
      getCurves,
      getDiffieHellman,
      getFips,
      getHashes,
      getRandomValues,
      hash,
      Hash,
      hkdf,
      hkdfSync,
      Hmac,
      KeyObject,
      pbkdf2,
      pbkdf2Sync,
      privateDecrypt,
      privateEncrypt,
      publicDecrypt,
      publicEncrypt,
      randomBytes,
      randomFill,
      randomFillSync,
      randomInt,
      randomUUID,
      scrypt,
      scryptSync,
      secureHeapUsed,
      setEngine,
      setFips,
      sign,
      Sign,
      subtle: subtle2,
      timingSafeEqual,
      verify,
      Verify,
      X509Certificate
    } = workerdCrypto);
    webcrypto2 = {
      // @ts-expect-error
      CryptoKey: webcrypto.CryptoKey,
      getRandomValues,
      randomUUID,
      subtle: subtle2
    };
  }
});

// node_modules/unenv/dist/runtime/node/module.mjs
var _extensions, constants2, builtinModules;
var init_module = __esm({
  "node_modules/unenv/dist/runtime/node/module.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _extensions = {
      ".js": /* @__PURE__ */ notImplemented("module.require.extensions['.js']"),
      ".json": /* @__PURE__ */ notImplemented("module.require.extensions['.json']"),
      ".node": /* @__PURE__ */ notImplemented("module.require.extensions['.node']")
    };
    constants2 = Object.freeze({ compileCacheStatus: Object.freeze({
      FAILED: 0,
      ENABLED: 1,
      ALREADY_ENABLED: 2,
      DISABLED: 3
    }) });
    builtinModules = [
      "_http_agent",
      "_http_client",
      "_http_common",
      "_http_incoming",
      "_http_outgoing",
      "_http_server",
      "_stream_duplex",
      "_stream_passthrough",
      "_stream_readable",
      "_stream_transform",
      "_stream_wrap",
      "_stream_writable",
      "_tls_common",
      "_tls_wrap",
      "assert",
      "assert/strict",
      "async_hooks",
      "buffer",
      "child_process",
      "cluster",
      "console",
      "constants",
      "crypto",
      "dgram",
      "diagnostics_channel",
      "dns",
      "dns/promises",
      "domain",
      "events",
      "fs",
      "fs/promises",
      "http",
      "http2",
      "https",
      "inspector",
      "inspector/promises",
      "module",
      "net",
      "os",
      "path",
      "path/posix",
      "path/win32",
      "perf_hooks",
      "process",
      "punycode",
      "querystring",
      "readline",
      "readline/promises",
      "repl",
      "stream",
      "stream/consumers",
      "stream/promises",
      "stream/web",
      "string_decoder",
      "sys",
      "timers",
      "timers/promises",
      "tls",
      "trace_events",
      "tty",
      "url",
      "util",
      "util/types",
      "v8",
      "vm",
      "wasi",
      "worker_threads",
      "zlib"
    ];
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/module.mjs
var workerdModule, createRequire;
var init_module2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/module.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_module();
    init_module();
    workerdModule = process.getBuiltinModule("node:module");
    createRequire = /* @__PURE__ */ __name((file) => {
      return Object.assign(workerdModule.createRequire(file), {
        resolve: Object.assign(
          /* @__PURE__ */ notImplemented("module.require.resolve"),
          {
            paths: /* @__PURE__ */ notImplemented("module.require.resolve.paths")
          }
        ),
        cache: /* @__PURE__ */ Object.create(null),
        extensions: _extensions,
        main: void 0
      });
    }, "createRequire");
  }
});

// alchemy/test/bootstrap/app.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import path6 from "path";

// alchemy/src/alchemy.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_promises2();
import path2 from "node:path";

// alchemy/src/destroy.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/context.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/resource.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/apply.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/serde.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/encrypt.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
async function encrypt(value, key) {
  const sodium = (await import("libsodium-wrappers")).default;
  await sodium.ready;
  const cryptoKey = sodium.crypto_generichash(sodium.crypto_secretbox_KEYBYTES, sodium.from_string(key));
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const encryptedBin = sodium.crypto_secretbox_easy(sodium.from_string(value), nonce, cryptoKey);
  const combined = new Uint8Array(nonce.length + encryptedBin.length);
  combined.set(nonce);
  combined.set(encryptedBin, nonce.length);
  return sodium.to_base64(combined, sodium.base64_variants.ORIGINAL);
}
__name(encrypt, "encrypt");
async function decryptWithKey(encryptedValue, key) {
  const sodium = (await import("libsodium-wrappers")).default;
  await sodium.ready;
  const cryptoKey = sodium.crypto_generichash(sodium.crypto_secretbox_KEYBYTES, sodium.from_string(key));
  const combined = sodium.from_base64(encryptedValue, sodium.base64_variants.ORIGINAL);
  const nonce = combined.slice(0, sodium.crypto_secretbox_NONCEBYTES);
  const ciphertext = combined.slice(sodium.crypto_secretbox_NONCEBYTES);
  const decryptedBin = sodium.crypto_secretbox_open_easy(ciphertext, nonce, cryptoKey);
  return sodium.to_string(decryptedBin);
}
__name(decryptWithKey, "decryptWithKey");

// alchemy/src/scope.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/async_hooks.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var workerdAsyncHooks = process.getBuiltinModule("node:async_hooks");
var { AsyncLocalStorage, AsyncResource } = workerdAsyncHooks;

// alchemy/src/fs/file-system-state-store.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_fs2();
import path from "node:path";

// alchemy/src/state.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
async function deserializeState(scope, content) {
  const state = await deserialize(scope, JSON.parse(content));
  if (ResourceID in state.output) {
    return state;
  }
  const output = state.output;
  delete output.Kind;
  delete output.ID;
  delete output.FQN;
  delete output.Scope;
  delete output.Seq;
  if (state.kind === "scope") {
    state.kind = Scope.KIND;
  }
  output[ResourceKind] = state.kind;
  output[ResourceID] = state.id;
  output[ResourceFQN] = state.fqn;
  output[ResourceScope] = scope;
  output[ResourceSeq] = state.seq;
  state.output = output;
  await scope.state.set(state.id, state);
  return state;
}
__name(deserializeState, "deserializeState");
var ReadOnlyMemoryStateStore = class {
  constructor(scope, states) {
    this.scope = scope;
    this.states = states;
  }
  static {
    __name(this, "ReadOnlyMemoryStateStore");
  }
  async count() {
    return Object.keys(await this.list()).length;
  }
  async list() {
    return Object.keys(this.states);
  }
  async get(key) {
    return this.states[key];
  }
  async set(key, _state) {
    throw new Error(`Tried to set '${key}' in read-only memory store`);
  }
  async delete(key) {
    throw new Error(`Tried to delete '${key}' in read-only memory store`);
  }
  async all() {
    return this.getBatch(await this.list());
  }
  async getBatch(ids) {
    return Object.fromEntries((await Promise.all(Array.from(ids).flatMap(async (id) => {
      const s = await this.get(id);
      if (s === void 0) {
        return [];
      }
      return [
        [
          id,
          s
        ]
      ];
    }))).flat());
  }
};

// alchemy/src/util/ignore.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
async function ignore(codes, fn) {
  try {
    return await fn();
  } catch (error3) {
    const errorCode = error3.code || error3.name;
    if (Array.isArray(codes) ? codes.includes(errorCode) : errorCode === codes) {
      return void 0;
    }
    throw error3;
  }
}
__name(ignore, "ignore");

// alchemy/src/fs/file-system-state-store.ts
var stateRootDir = path.join(process.cwd(), ".alchemy");
var FileSystemStateStore = class {
  constructor(scope) {
    this.scope = scope;
    this.dir = path.join(stateRootDir, ...scope.chain);
  }
  static {
    __name(this, "FileSystemStateStore");
  }
  dir;
  initialized = false;
  async init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    await fs_default.promises.mkdir(this.dir, {
      recursive: true
    });
  }
  async deinit() {
    await ignore("ENOENT", () => fs_default.promises.rmdir(this.dir));
  }
  async count() {
    return Object.keys(await this.list()).length;
  }
  async list() {
    try {
      const files = await fs_default.promises.readdir(this.dir, {
        withFileTypes: true
      });
      return files.filter((dirent) => dirent.isFile() && dirent.name.endsWith(".json")).map((dirent) => dirent.name.replace(/\.json$/, "")).map((key) => key.replaceAll(":", "/"));
    } catch (error3) {
      if (error3.code === "ENOENT") {
        return [];
      }
      throw error3;
    }
  }
  async get(key) {
    try {
      const content = await fs_default.promises.readFile(this.getPath(key), "utf8");
      const state = await deserializeState(this.scope, content);
      if (state.output === void 0) {
        state.output = {};
      }
      state.output[ResourceScope] = this.scope;
      return state;
    } catch (error3) {
      if (error3.code === "ENOENT") {
        return void 0;
      }
      throw error3;
    }
  }
  async set(key, value) {
    await this.init();
    await fs_default.promises.writeFile(this.getPath(key), JSON.stringify(await serialize(this.scope, value), null, 2));
  }
  async delete(key) {
    try {
      return await fs_default.promises.unlink(this.getPath(key));
    } catch (error3) {
      if (error3.code === "ENOENT") {
        return;
      }
      throw error3;
    }
  }
  async all() {
    return this.getBatch(await this.list());
  }
  async getBatch(ids) {
    return Object.fromEntries((await Promise.all(Array.from(ids).flatMap(async (id) => {
      const s = await this.get(id);
      if (s === void 0) {
        return [];
      }
      return [
        [
          id,
          s
        ]
      ];
    }))).flat());
  }
  getPath(key) {
    if (key.includes(":")) {
      throw new Error(`ID cannot include colons: ${key}`);
    }
    if (key.includes("/")) {
      key = key.replaceAll("/", ":");
    }
    return path.join(this.dir, `${key}.json`);
  }
};

// alchemy/src/scope.ts
var DEFAULT_STAGE = process.env.ALCHEMY_STAGE ?? process.env.USER ?? "dev";
var Scope = class _Scope2 {
  static {
    __name(this, "Scope");
  }
  static KIND = "alchemy::Scope";
  static storage = new AsyncLocalStorage();
  static globals = [];
  static get() {
    return _Scope2.storage.getStore();
  }
  static get current() {
    const scope = _Scope2.get();
    if (!scope) {
      if (_Scope2.globals.length > 0) {
        return _Scope2.globals[_Scope2.globals.length - 1];
      }
      throw new Error("Not running within an Alchemy Scope");
    }
    return scope;
  }
  resources = /* @__PURE__ */ new Map();
  appName;
  stage;
  scopeName;
  parent;
  password;
  state;
  stateStore;
  quiet;
  phase;
  isErrored = false;
  finalized = false;
  deferred = [];
  constructor(options) {
    this.appName = options.appName;
    this.stage = options?.stage ?? DEFAULT_STAGE;
    this.scopeName = options.scopeName ?? null;
    if (this.scopeName?.includes(":")) {
      throw new Error(`Scope name ${this.scopeName} cannot contain double colons`);
    }
    this.parent = options.parent ?? _Scope2.get();
    this.quiet = options.quiet ?? this.parent?.quiet ?? false;
    if (this.parent && !this.scopeName) {
      throw new Error("Scope name is required when creating a child scope");
    }
    this.password = options.password ?? this.parent?.password;
    const phase2 = options.phase ?? this.parent?.phase;
    if (phase2 === void 0) {
      throw new Error("Phase is required");
    }
    this.phase = phase2;
    this.stateStore = options.stateStore ?? this.parent?.stateStore ?? ((scope) => new FileSystemStateStore(scope));
    this.state = this.stateStore(this);
  }
  async delete(resourceID) {
    await this.state.delete(resourceID);
    this.resources.delete(resourceID);
  }
  _seq = 0;
  seq() {
    return this._seq++;
  }
  get chain() {
    const thisScope = this.scopeName ? [
      this.scopeName
    ] : [];
    const app2 = this.appName ? [
      this.appName
    ] : [];
    if (this.parent) {
      return [
        ...this.parent.chain,
        ...thisScope
      ];
    }
    return [
      ...app2,
      this.stage,
      ...thisScope
    ];
  }
  fail() {
    console.error("Scope failed", this.chain.join("/"));
    this.isErrored = true;
  }
  async init() {
    await this.state.init?.();
  }
  async deinit() {
    await this.parent?.state.delete(this.scopeName);
    await this.state.deinit?.();
  }
  fqn(resourceID) {
    return [
      ...this.chain,
      resourceID
    ].join("/");
  }
  async run(fn) {
    return _Scope2.storage.run(this, () => fn(this));
  }
  [Symbol.asyncDispose]() {
    return this.finalize();
  }
  async finalize() {
    if (this.phase === "read") {
      return;
    }
    if (this.finalized) {
      return;
    }
    if (this.parent === void 0 && _Scope2.globals.length > 0) {
      const last = _Scope2.globals.pop();
      if (last !== this) {
        throw new Error("Running in AsyncLocaStorage.enterWith emultation mode and attempted to finalize a global Scope that wasn't top of the stack");
      }
    }
    this.finalized = true;
    await Promise.all(this.deferred);
    if (!this.isErrored) {
      const resourceIds = await this.state.list();
      const aliveIds = new Set(this.resources.keys());
      const orphanIds = Array.from(resourceIds.filter((id) => !aliveIds.has(id)));
      const orphans = await Promise.all(orphanIds.map(async (id) => (await this.state.get(id)).output));
      await destroyAll(orphans, {
        quiet: this.quiet,
        strategy: "sequential"
      });
    } else {
      console.warn("Scope is in error, skipping finalize");
    }
  }
  defer(fn) {
    let _resolve;
    let _reject;
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    promise.then = (onfulfilled, onrejected) => {
      if (!this.finalized) {
        throw new Error("Attempted to await a deferred Promise before finalization");
      }
      return fn().then(onfulfilled, onrejected);
    };
    this.deferred.push(promise);
    return promise;
  }
  toString() {
    return `Scope(
  chain=${this.chain.join("/")},
  resources=[${Array.from(this.resources.values()).map((r) => r[ResourceID]).join(",\n  ")}]
)`;
  }
};

// alchemy/src/secret.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Secret = class {
  constructor(unencrypted) {
    this.unencrypted = unencrypted;
  }
  static {
    __name(this, "Secret");
  }
  type = "secret";
};
function secret(unencrypted) {
  if (unencrypted === void 0) {
    throw new Error("Secret cannot be undefined");
  }
  return new Secret(unencrypted);
}
__name(secret, "secret");
((secret2) => {
  secret2.env = new Proxy(_env3, {
    get: /* @__PURE__ */ __name((_, name) => _env3(name), "get"),
    apply: /* @__PURE__ */ __name((_, __, args) => _env3(...args), "apply")
  });
  async function _env3(name, value, error3) {
    const result = await alchemy.env(name, value, error3);
    if (typeof result === "string") {
      return secret2(result);
    }
    throw new Error(`Secret environment variable ${name} is not a string`);
  }
  __name(_env3, "_env");
})(secret || (secret = {}));

// alchemy/src/serde.ts
function isType(value) {
  return value && typeof value === "object" && typeof value.toJsonSchema === "function";
}
__name(isType, "isType");
async function serialize(scope, value, options) {
  if (Array.isArray(value)) {
    return Promise.all(value.map((value2) => serialize(scope, value2, options)));
  } else if (value instanceof Secret) {
    if (!scope.password) {
      throw new Error("Cannot serialize secret without password");
    }
    return {
      "@secret": options?.encrypt !== false ? await encrypt(value.unencrypted, scope.password) : value.unencrypted
    };
  } else if (isType(value)) {
    return {
      "@schema": value.toJSON()
    };
  } else if (value instanceof Date) {
    return {
      "@date": value.toISOString()
    };
  } else if (typeof value === "symbol") {
    assertNotUniqueSymbol(value);
    return {
      "@symbol": value.toString()
    };
  } else if (value instanceof Scope) {
    return {
      "@scope": null
    };
  } else if (value && typeof value === "object") {
    for (const symbol of Object.getOwnPropertySymbols(value)) {
      assertNotUniqueSymbol(symbol);
    }
    for (const key of Object.keys(value)) {
      if (parseSymbol(key)) {
        throw new Error(`Cannot serialize property '${key}' because it looks like a stringified symbol.`);
      }
    }
    return Object.fromEntries(await Promise.all([
      ...Object.getOwnPropertySymbols(value),
      ...Object.keys(value)
    ].map(async (key) => [
      key.toString(),
      await serialize(scope, value[key], options)
    ])));
  } else if (typeof value === "function") {
    return void 0;
  }
  return value;
}
__name(serialize, "serialize");
async function deserialize(scope, value) {
  if (Array.isArray(value)) {
    return await Promise.all(value.map(async (item) => await deserialize(scope, item)));
  }
  if (value && typeof value === "object") {
    if (typeof value["@secret"] === "string") {
      if (!scope.password) {
        throw new Error("Cannot deserialize secret without password");
      }
      return new Secret(await decryptWithKey(value["@secret"], scope.password));
    } else if ("@schema" in value) {
      return value["@schema"];
    } else if ("@date" in value) {
      return new Date(value["@date"]);
    } else if ("@symbol" in value) {
      return parseSymbol(value["@symbol"]);
    } else if ("@scope" in value) {
      return scope;
    }
    return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([key, value2]) => [
      parseSymbol(key) ?? key,
      await deserialize(scope, value2)
    ])));
  }
  return value;
}
__name(deserialize, "deserialize");
var symbolPattern = /^Symbol\((.*)\)$/;
function parseSymbol(value) {
  const match = value.match(symbolPattern);
  if (!match) {
    return void 0;
  }
  return Symbol.for(match[1]);
}
__name(parseSymbol, "parseSymbol");
function assertNotUniqueSymbol(symbol) {
  if (symbol.description === void 0 || symbol !== Symbol.for(symbol.description)) {
    throw new Error(`Cannot serialize unique symbol: ${symbol.description}`);
  }
}
__name(assertNotUniqueSymbol, "assertNotUniqueSymbol");

// alchemy/src/resource.ts
var PROVIDERS = /* @__PURE__ */ new Map();
var ResourceID = Symbol.for("alchemy::ResourceID");
var ResourceFQN = Symbol.for("alchemy::ResourceFQN");
var ResourceKind = Symbol.for("alchemy::ResourceKind");
var ResourceScope = Symbol.for("alchemy::ResourceScope");
var ResourceSeq = Symbol.for("alchemy::ResourceSeq");

// alchemy/src/context.ts
function context2({ scope, phase: phase2, kind, id, fqn, seq, state, replace }) {
  function create(...args) {
    const [ID, props] = typeof args[0] === "string" ? args : [
      id,
      args[0]
    ];
    return {
      ...props,
      [ResourceKind]: kind,
      [ResourceID]: ID,
      [ResourceFQN]: fqn,
      [ResourceScope]: scope,
      [ResourceSeq]: seq
    };
  }
  __name(create, "create");
  return Object.assign(create, {
    stage: scope.stage,
    scope,
    id,
    fqn,
    phase: phase2,
    output: state.output,
    props: state.props,
    replace,
    get: /* @__PURE__ */ __name((key) => state.data[key], "get"),
    set: /* @__PURE__ */ __name(async (key, value) => {
      state.data[key] = value;
    }, "set"),
    delete: /* @__PURE__ */ __name(async (key) => {
      const value = state.data[key];
      delete state.data[key];
      return value;
    }, "delete"),
    quiet: scope.quiet,
    destroy: /* @__PURE__ */ __name(() => {
      throw new DestroyedSignal();
    }, "destroy"),
    create
  });
}
__name(context2, "context");

// alchemy/src/destroy.ts
var DestroyedSignal = class extends Error {
  static {
    __name(this, "DestroyedSignal");
  }
};
function isScopeArgs(a) {
  return a[0] instanceof Scope;
}
__name(isScopeArgs, "isScopeArgs");
async function destroy(...args) {
  if (isScopeArgs(args)) {
    const [scope2] = args;
    const options2 = {
      strategy: "sequential",
      ...args[1] ?? {}
    };
    await destroyAll(Array.from(scope2.resources.values()), options2);
    const orphans = await scope2.state.all();
    await destroyAll(Object.values(orphans).map((orphan) => ({
      ...orphan.output,
      Scope: scope2
    })), options2);
    await scope2.deinit();
    return;
  }
  const [instance, options] = args;
  if (!instance) {
    return;
  }
  if (instance[ResourceKind] === Scope.KIND) {
    const scope2 = new Scope({
      parent: instance[ResourceScope],
      scopeName: instance[ResourceID]
    });
    console.log("Destroying scope", scope2.chain.join("/"));
    return await destroy(scope2, options);
  }
  const Provider = PROVIDERS.get(instance[ResourceKind]);
  if (!Provider) {
    throw new Error(`Cannot destroy resource "${instance[ResourceFQN]}" type ${instance[ResourceKind]} - no provider found. You may need to import the provider in your alchemy.config.ts.`);
  }
  const scope = instance[ResourceScope];
  if (!scope) {
    console.warn(`Resource "${instance[ResourceFQN]}" has no scope`);
  }
  const quiet = options?.quiet ?? scope.quiet;
  try {
    if (!quiet) {
      console.log(`Delete:  "${instance[ResourceFQN]}"`);
    }
    const state = await scope.state.get(instance[ResourceID]);
    if (state === void 0) {
      return;
    }
    const ctx = context2({
      scope,
      phase: "delete",
      kind: instance[ResourceKind],
      id: instance[ResourceID],
      fqn: instance[ResourceFQN],
      seq: instance[ResourceSeq],
      props: state.props,
      state,
      replace: /* @__PURE__ */ __name(() => {
        throw new Error("Cannot replace a resource that is being deleted");
      }, "replace")
    });
    let nestedScope;
    try {
      await alchemy.run(instance[ResourceID], {
        isResource: instance[ResourceKind] !== "alchemy::Scope",
        parent: scope
      }, async (scope2) => {
        nestedScope = scope2;
        return await Provider.handler.bind(ctx)(instance[ResourceID], state.props);
      });
    } catch (err) {
      if (err instanceof DestroyedSignal) {
      } else {
        throw err;
      }
    }
    if (nestedScope) {
      await destroy(nestedScope, options);
    }
    await scope.delete(instance[ResourceID]);
    if (!quiet) {
      console.log(`Deleted: "${instance[ResourceFQN]}"`);
    }
  } catch (error3) {
    console.error(error3);
    throw error3;
  }
}
__name(destroy, "destroy");
async function destroyAll(resources, options) {
  if (options?.strategy !== "parallel") {
    const sorted = resources.sort((a, b) => b[ResourceSeq] - a[ResourceSeq]);
    for (const resource of sorted) {
      await destroy(resource, options);
    }
  } else {
    await Promise.all(resources.map((resource) => destroy(resource, options)));
  }
}
__name(destroyAll, "destroyAll");

// alchemy/src/env.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var env2 = new Proxy(_env, {
  get: /* @__PURE__ */ __name((_, name) => _env(name), "get"),
  apply: /* @__PURE__ */ __name((_, __, args) => _env(...args), "apply")
});
async function _env(name, value, error3) {
  if (value !== void 0) {
    return value;
  }
  if (typeof process !== "undefined") {
    return process.env[name];
  }
  try {
    const { env: env4 } = await import("cloudflare:workers");
    if (name in env4) {
      return env4[name];
    }
  } catch (error4) {
  }
  throw new Error(error3 ?? `Environment variable ${name} is not set`);
}
__name(_env, "_env");

// alchemy/src/alchemy.ts
var alchemy = _alchemy;
_alchemy.destroy = destroy;
_alchemy.run = run;
_alchemy.secret = secret;
_alchemy.env = env2;
async function _alchemy(...args) {
  if (typeof args[0] === "string") {
    const [appName, options] = args;
    const phase2 = options?.phase ?? "up";
    const root = new Scope({
      ...options,
      appName,
      stage: options?.stage,
      phase: phase2
    });
    try {
      Scope.storage.enterWith(root);
    } catch {
      Scope.globals.push(root);
    }
    if (options?.phase === "destroy") {
      await destroy(root);
      return process.exit(0);
    }
    return root;
  }
  const [template, ...values] = args;
  const [, secondLine] = template[0].split("\n");
  const leadingSpaces = secondLine ? secondLine.match(/^(\s*)/)?.[1]?.length || 0 : 0;
  const indent = " ".repeat(leadingSpaces);
  const [{ isFileRef: isFileRef2 }, { isFileCollection: isFileCollection2 }] = await Promise.all([
    Promise.resolve().then(() => (init_file_ref(), file_ref_exports)),
    Promise.resolve().then(() => (init_file_collection(), file_collection_exports))
  ]);
  const appendices = {};
  const stringValues = await Promise.all(values.map(/* @__PURE__ */ __name(async function resolve(value) {
    if (typeof value === "string") {
      return indent + value;
    }
    if (value === null) {
      return "null";
    }
    if (value === void 0) {
      return "undefined";
    }
    if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
      return value.toString();
    }
    if (value instanceof Promise) {
      return resolve(await value);
    }
    if (isFileRef2(value)) {
      if (!(value.path in appendices)) {
        appendices[value.path] = await promises_default.readFile(value.path, "utf-8");
      }
      return `[${path2.basename(value.path)}](${value.path})`;
    }
    if (isFileCollection2(value)) {
      return Object.entries(value.files).map(([filePath, content]) => {
        appendices[filePath] = content;
        return `[${path2.basename(filePath)}](${filePath})`;
      }).join("\n\n");
    }
    if (Array.isArray(value)) {
      return (await Promise.all(value.map(async (value2, i) => `${i}. ${await resolve(value2)}`))).join("\n");
    }
    if (typeof value === "object" && typeof value.path === "string") {
      if (typeof value.content === "string") {
        appendices[value.path] = value.content;
        return `[${path2.basename(value.path)}](${value.path})`;
      }
      appendices[value.path] = await promises_default.readFile(value.path, "utf-8");
      return `[${path2.basename(value.path)}](${value.path})`;
    }
    if (typeof value === "object") {
      return (await Promise.all(Object.entries(value).map(async ([key, value2]) => {
        return `* ${key}: ${await resolve(value2)}`;
      }))).join("\n");
    }
    console.log(value);
    throw new Error(`Unsupported value type: ${value}`);
  }, "resolve")));
  const lines = template.map((part) => part.split("\n").map((line) => line.startsWith(indent) ? line.slice(indent.length) : line).join("\n")).flatMap((part, i) => i < stringValues.length ? [
    part,
    stringValues[i] ?? ""
  ] : [
    part
  ]).join("").split("\n");
  return [
    lines.length > 1 && lines[0].replaceAll(" ", "").length === 0 ? lines.slice(1).join("\n") : lines.join("\n"),
    Object.entries(appendices).sort(([a], [b]) => a.localeCompare(b)).map(([filePath, content]) => {
      const extension = path2.extname(filePath).slice(1);
      const codeTag = extension ? extension : "";
      return `// ${filePath}
\`\`\`${codeTag}
${content}
\`\`\``;
    }).join("\n\n")
  ].join("\n");
}
__name(_alchemy, "_alchemy");
async function run(...args) {
  const [id, options, fn] = typeof args[1] === "function" ? [
    args[0],
    void 0,
    args[1]
  ] : args;
  const _scope = new Scope({
    ...options,
    scopeName: id
  });
  try {
    if (options?.isResource !== true && _scope.parent) {
      const seq = _scope.parent.seq();
      const output = {
        [ResourceID]: id,
        [ResourceFQN]: "",
        [ResourceKind]: Scope.KIND,
        [ResourceScope]: _scope,
        [ResourceSeq]: seq
      };
      const resource = {
        kind: Scope.KIND,
        id,
        seq,
        data: {},
        fqn: "",
        props: {},
        status: "created",
        output
      };
      const prev = await _scope.parent.state.get(id);
      if (!prev) {
        await _scope.parent.state.set(id, resource);
      } else if (prev.kind !== Scope.KIND) {
        throw new Error(`Tried to create a Scope that conflicts with a Resource (${prev.kind}): ${id}`);
      } else if (_scope.phase === "read") {
        throw new Error(`Tried to create a non-existend Scope (${id}) in read mode`);
      }
      _scope.parent.resources.set(id, Object.assign(Promise.resolve(resource), output));
    }
    return await _scope.run(async () => fn.bind(_scope)(_scope));
  } catch (error3) {
    if (!(error3 instanceof DestroyedSignal)) {
      console.log(error3);
      _scope.fail();
    }
    throw error3;
  } finally {
    await _scope.finalize();
  }
}
__name(run, "run");

// alchemy/src/cloudflare/bucket.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/aws4fetch/dist/aws4fetch.esm.mjs
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var encoder = new TextEncoder();

// alchemy/src/bootstrap/bind.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import { isPromise } from "node:util/types";

// alchemy/src/bootstrap/env.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var _env2 = await resolveEnv();
async function resolveEnv() {
  if (typeof process !== "undefined") {
    return process.env;
  }
  try {
    const worker = await import("cloudflare:workers");
    return worker.env;
  } catch {
  }
  return import.meta.env;
}
__name(resolveEnv, "resolveEnv");
var env3 = new Proxy({}, {
  get(target, prop, receiver) {
    return _env2[prop];
  }
});

// alchemy/src/bootstrap/bind.ts
function getBinding(resource) {
  return env3[getBindKey(resource)];
}
__name(getBinding, "getBinding");
function getBindKey(resource) {
  return resource[ResourceFQN].replace(/[^a-zA-Z0-9]/g, "_");
}
__name(getBindKey, "getBindKey");
async function bind(resource, reify) {
  if (isPromise(resource)) {
    return resource.then((r) => bind(r, reify));
  }
  let _runtime;
  const runtime = /* @__PURE__ */ __name(() => (_runtime ??= [
    reify ? reify(resource, getBindKey(resource)) : getBinding(resource)
  ])[0], "runtime");
  return new Proxy(() => {
  }, {
    get: /* @__PURE__ */ __name((target, prop) => {
      if (prop in target) {
        return resource[prop];
      } else if (prop === "then" || prop === "catch" || prop === "finally") {
        return target[prop];
      }
      return (...args) => {
        const rt = runtime();
        if (rt === void 0) {
          throw new Error(`Resource ${resource[ResourceFQN]} is not bound`);
        }
        const method = rt[prop];
        if (typeof method !== "function") {
          throw new Error(`Method ${prop} on '${resource[ResourceFQN]}' is not a function`);
        }
        return method(...args);
      };
    }, "get")
  });
}
__name(bind, "bind");

// alchemy/src/cloudflare/api-error.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/api.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/util/retry.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/auth.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_promises2();
init_os();
import path3 from "node:path";

// alchemy/src/cloudflare/user.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/neon/api-error.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/bucket.ts
async function R2Bucket(name, props = {}) {
  const bucket2 = await _R2Bucket(name, props);
  const binding2 = await bind(bucket2);
  return {
    ...bucket2,
    createMultipartUpload: binding2.createMultipartUpload,
    delete: binding2.delete,
    get: binding2.get,
    list: binding2.list,
    put: binding2.put,
    head: binding2.head,
    resumeMultipartUpload: binding2.resumeMultipartUpload
  };
}
__name(R2Bucket, "R2Bucket");
var _R2Bucket = /* @__PURE__ */ __name((id) => STATE.get(id), "_R2Bucket");

// alchemy/src/cloudflare/pipeline.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/queue.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
async function Queue(name, props = {}) {
  const queue2 = await _Queue(name, props);
  const binding2 = await bind(queue2);
  return {
    ...queue2,
    send: binding2.send,
    sendBatch: binding2.sendBatch
  };
}
__name(Queue, "Queue");
var _Queue = /* @__PURE__ */ __name((id) => STATE.get(id), "_Queue");

// alchemy/src/cloudflare/worker.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_crypto2();
init_promises2();

// alchemy/src/util/content-type.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import path4 from "node:path";

// alchemy/src/util/slugify.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/bindings.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Self = Symbol.for("Self");

// alchemy/src/cloudflare/bundle/bundle-worker.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_promises2();

// alchemy/src/bootstrap/plugin.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_promises2();

// alchemy/src/esbuild/bundle.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_crypto2();
init_promises2();
import "node:path";

// alchemy/src/cloudflare/bundle/alias-plugin.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/bundle/build-failures.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_module2();
var nodeBuiltinResolveErrorText = new RegExp('^Could not resolve "(' + builtinModules.join("|") + "|" + builtinModules.map((module) => `node:${module}`).join("|") + ')"$');

// alchemy/src/cloudflare/bundle/external.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var nodejs_compat = [
  "node:async_hooks",
  "node:assert",
  "node:buffer",
  "node:console",
  "node:crypto",
  "node:debug",
  "node:diagnostics_channel",
  "node:dns",
  "node:events",
  "node:inspector",
  "node:net",
  "node:path",
  "node:perf_hooks",
  "node:process",
  "node:querystring",
  "node:stream",
  "node:string_decoder",
  "node:timers",
  "node:tls",
  "node:url",
  "node:util",
  "node:zlib"
];
var external = [
  ...nodejs_compat,
  ...nodejs_compat.map((p) => p.split(":")[1]),
  "cloudflare:workers",
  "cloudflare:workflows",
  "cloudflare:*",
  "libsodium*",
  "@swc/*",
  "esbuild",
  "undici",
  "ws"
];

// alchemy/src/cloudflare/bundle/nodejs-compat-mode.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/bundle/nodejs-compat.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_module2();
import assert3 from "node:assert";
import nodePath from "node:path";

// alchemy/src/util/dedent.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/bundle/nodejs-compat.ts
var _require = typeof __require === "undefined" ? createRequire(import.meta.url) : __require;
var NODEJS_MODULES_RE = new RegExp(`^(node:)?(${builtinModules.join("|")})$`);

// alchemy/src/cloudflare/event-source.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/queue-consumer.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/workflow.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// alchemy/src/cloudflare/worker.ts
function Worker(...args) {
  const [id, meta, props] = args.length === 2 ? [
    args[0],
    void 0,
    args[1]
  ] : args;
  if (meta) {
    const scope = Scope.current;
    const promise = scope.defer(() => _Worker(id, {
      meta,
      ...props
    }));
    promise.fetch = props.fetch;
    return promise;
  }
  return _Worker(id, {
    meta,
    ...props
  });
}
__name(Worker, "Worker");
var _Worker = /* @__PURE__ */ __name((id) => STATE.get(id), "_Worker");

// alchemy/test/bootstrap/app.ts
var isRuntime = typeof __ALCHEMY_ENV__ !== "undefined";
var phase = isRuntime ? "read" : process.argv.includes("--destroy") ? "destroy" : "up";
console.log(phase);
var app = await alchemy("my-bootstrap-ap", {
  phase,
  password: "TODO",
  stateStore: isRuntime ? (scope) => new ReadOnlyMemoryStateStore(scope, __ALCHEMY_ENV__) : void 0
});
var queue = await Queue("my-bootstrap-queue");
var bucket = await R2Bucket("my-bootstrap-bucket");
var app_default = Worker("worker", import.meta, {
  compatibilityFlags: [
    "nodejs_compat"
  ],
  bundle: {
    outfile: path6.join(import.meta.dirname, "app.js"),
    minify: false
  },
  async fetch(request) {
    const key = new URL(request.url).pathname;
    const obj = await bucket.put(key, request.body);
    if (!obj) {
      return new Response("Failed to upload object", {
        status: 500
      });
    }
    await queue.send(obj);
    return new Response(JSON.stringify({
      key: obj.key,
      etag: obj.etag
    }));
  }
});
await app.finalize();
export {
  app_default as default
};
/*! Bundled license information:

aws4fetch/dist/aws4fetch.esm.mjs:
  (**
   * @license MIT <https://opensource.org/licenses/MIT>
   * @copyright Michael Hart 2024
   *)
*/
