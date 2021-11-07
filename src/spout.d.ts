import { Stream } from '@most/types';
interface SpigotSpec {
    on$: Stream<Boolean>;
    off$?: Stream<Boolean>;
    fx?: ($: Stream<any>) => any;
}
export declare const isOn: ($: Stream<any>) => Stream<any>;
export declare const isOff: ($: Stream<any>) => Stream<any>;
export declare const spout: import("@typed/curry").Curry2<Stream<any>, Stream<Boolean>, Stream<Stream<any>>>;
export declare const spigot: import("@typed/curry").Curry2<SpigotSpec, Stream<any>, Stream<any>>;
export declare const router: import("@typed/curry").Curry2<{
    string: Stream<any>;
}, Stream<string>, Stream<Stream<any>>>;
export {};
//# sourceMappingURL=spout.d.ts.map