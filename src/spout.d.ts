import { Stream } from '@most/types';
interface SpigotSpec {
    on$: Stream<Boolean>;
    off$?: Stream<Boolean>;
    fx?: ($: Stream<any>) => any;
}
export declare const sampler: import("@typed/curry").Curry2<Stream<any>, Stream<any>, Stream<any>>;
export declare const regulate: import("@typed/curry").Curry2<Stream<any>, Stream<any>, Stream<any>>;
export declare const muffle: import("@typed/curry").Curry2<Stream<Boolean>, Stream<any>, Stream<any>>;
export declare const release: import("@typed/curry").Curry2<Stream<Boolean>, Stream<any>, Stream<any>>;
export declare const flowLatch: import("@typed/curry").Curry2<Stream<any>, Stream<Boolean>, Stream<Stream<any>>>;
export declare const spout: import("@typed/curry").Curry2<Stream<any>, Stream<Boolean>, Stream<Stream<any>>>;
export declare const stutter: import("@typed/curry").Curry3<number | undefined, number | undefined, Stream<any>, Stream<any>>;
export declare const asLatch: ($: Stream<any>) => Stream<any>;
export declare const latchFlow: import("@typed/curry").Curry2<Stream<Boolean>, Stream<any>, Stream<Stream<any>>>;
export declare const spigot: import("@typed/curry").Curry2<SpigotSpec, Stream<any>, Stream<any>>;
export declare type routeKey = string;
export declare const router: import("@typed/curry").Curry2<{
    route: Stream<any>;
}, Stream<string | Set<string>>, Stream<Stream<any>>>;
export {};
//# sourceMappingURL=spout.d.ts.map