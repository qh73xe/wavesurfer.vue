declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    source: {
        type: (StringConstructor | {
            new (): HTMLMediaElement;
            prototype: HTMLMediaElement;
            readonly NETWORK_EMPTY: 0;
            readonly NETWORK_IDLE: 1;
            readonly NETWORK_LOADING: 2;
            readonly NETWORK_NO_SOURCE: 3;
            readonly HAVE_NOTHING: 0;
            readonly HAVE_METADATA: 1;
            readonly HAVE_CURRENT_DATA: 2;
            readonly HAVE_FUTURE_DATA: 3;
            readonly HAVE_ENOUGH_DATA: 4;
        })[];
        default: string;
    };
    /** The height of the waveform in pixels, or "auto" to fill the container height */
    height: {
        type: NumberConstructor;
        default: number;
    };
    /** The color of the waveform */
    waveColor: {
        type: StringConstructor;
        default: string;
    };
    /** The color of the progress mask */
    progressColor: {
        type: StringConstructor;
        default: string;
    };
    /** The color of the playpack cursor */
    cursorColor: {
        type: StringConstructor;
        default: string;
    };
    /** The cursor width */
    cursorWidth: {
        type: NumberConstructor;
        default: number;
    };
    /** If set, the waveform will be rendered with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
    barWidth: {
        type: NumberConstructor;
        default: number;
    };
    /** Spacing between bars in pixels */
    barGap: {
        type: NumberConstructor;
        default: number;
    };
    /** Rounded borders for bars */
    barRadius: {
        type: NumberConstructor;
        default: number;
    };
    /** A vertical scaling factor for the waveform */
    barHeight: {
        type: NumberConstructor;
        default: number;
    };
    /** Vertical bar alignment */
    barAlign: {
        validator: (prop: any) => boolean;
        default: undefined;
    };
    /** Minimum pixels per second of audio (i.e. the zoom level) */
    minPxPerSec: {
        type: NumberConstructor;
        default: number;
    };
    /** Stretch the waveform to fill the container, true by default */
    fillParent: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Pre-computed audio duration in seconds */
    duration: {
        validator: (prop: any) => boolean;
        default: undefined;
    };
    /** Whether to show default audio element controls */
    mediaControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Play the audio on load */
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Pass false to disable clicks on the waveform */
    interact: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Allow to drag the cursor to seek to a new position */
    dragToSeek: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Hide the scrollbar */
    hideScrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Audio rate, i.e. the playback speed */
    audioRate: {
        type: NumberConstructor;
        default: number;
    };
    /** Automatically scroll the container to keep the current position in viewport */
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
    autoCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
    sampleRate: {
        type: NumberConstructor;
        default: number;
    };
    /** Stretch the waveform to the full height */
    normalize: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    source: {
        type: (StringConstructor | {
            new (): HTMLMediaElement;
            prototype: HTMLMediaElement;
            readonly NETWORK_EMPTY: 0;
            readonly NETWORK_IDLE: 1;
            readonly NETWORK_LOADING: 2;
            readonly NETWORK_NO_SOURCE: 3;
            readonly HAVE_NOTHING: 0;
            readonly HAVE_METADATA: 1;
            readonly HAVE_CURRENT_DATA: 2;
            readonly HAVE_FUTURE_DATA: 3;
            readonly HAVE_ENOUGH_DATA: 4;
        })[];
        default: string;
    };
    /** The height of the waveform in pixels, or "auto" to fill the container height */
    height: {
        type: NumberConstructor;
        default: number;
    };
    /** The color of the waveform */
    waveColor: {
        type: StringConstructor;
        default: string;
    };
    /** The color of the progress mask */
    progressColor: {
        type: StringConstructor;
        default: string;
    };
    /** The color of the playpack cursor */
    cursorColor: {
        type: StringConstructor;
        default: string;
    };
    /** The cursor width */
    cursorWidth: {
        type: NumberConstructor;
        default: number;
    };
    /** If set, the waveform will be rendered with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
    barWidth: {
        type: NumberConstructor;
        default: number;
    };
    /** Spacing between bars in pixels */
    barGap: {
        type: NumberConstructor;
        default: number;
    };
    /** Rounded borders for bars */
    barRadius: {
        type: NumberConstructor;
        default: number;
    };
    /** A vertical scaling factor for the waveform */
    barHeight: {
        type: NumberConstructor;
        default: number;
    };
    /** Vertical bar alignment */
    barAlign: {
        validator: (prop: any) => boolean;
        default: undefined;
    };
    /** Minimum pixels per second of audio (i.e. the zoom level) */
    minPxPerSec: {
        type: NumberConstructor;
        default: number;
    };
    /** Stretch the waveform to fill the container, true by default */
    fillParent: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Pre-computed audio duration in seconds */
    duration: {
        validator: (prop: any) => boolean;
        default: undefined;
    };
    /** Whether to show default audio element controls */
    mediaControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Play the audio on load */
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Pass false to disable clicks on the waveform */
    interact: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Allow to drag the cursor to seek to a new position */
    dragToSeek: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Hide the scrollbar */
    hideScrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Audio rate, i.e. the playback speed */
    audioRate: {
        type: NumberConstructor;
        default: number;
    };
    /** Automatically scroll the container to keep the current position in viewport */
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
    autoCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
    sampleRate: {
        type: NumberConstructor;
        default: number;
    };
    /** Stretch the waveform to the full height */
    normalize: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    source: string | HTMLMediaElement;
    height: number;
    waveColor: string;
    progressColor: string;
    cursorColor: string;
    cursorWidth: number;
    barWidth: number;
    barGap: number;
    barRadius: number;
    barHeight: number;
    barAlign: undefined;
    minPxPerSec: number;
    fillParent: boolean;
    duration: undefined;
    mediaControls: boolean;
    autoplay: boolean;
    interact: boolean;
    dragToSeek: boolean;
    hideScrollbar: boolean;
    audioRate: number;
    autoScroll: boolean;
    autoCenter: boolean;
    sampleRate: number;
    normalize: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
