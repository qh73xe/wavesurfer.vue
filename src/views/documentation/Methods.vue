<template>
  <w-documentation-layout :heading="heading" :desc="desc">
    <v-list two-line v-if="search.length > 0">
      <v-list-item
        v-for="(item, key) in items.filter(x => ~x[0].indexOf(search))"
        :key="key"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item[0] }}</v-list-item-title>
          <v-list-item-subtitle>{{ item[1] }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list two-line v-else>
      <v-list-item v-for="(item, key) in items" :key="key">
        <v-list-item-content>
          <v-list-item-title>{{ item[0] }}</v-list-item-title>
          <v-list-item-subtitle>{{ item[1] }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </w-documentation-layout>
</template>
<script>
import WDocumentationLayout from "@/components/Base/WDocumentationLayout.vue";

export default {
  name: "Methods.vue",
  components: {
    WDocumentationLayout
  },
  data: () => ({
    heading: "wavesurfer.vue/documentation/methods",
    desc: `After creating an instance of the component (with ref="wavesurfer"), you can call the following methods on it:`,
    items: [
      ["cancelAjax()", "Cancel the audio file loading process."],
      [
        "destroy()",
        "Removes events, elements and disconnects Web Audio nodes."
      ],
      ["empty()", "Clears the waveform as if a zero-length audio is loaded."],
      [
        "getActivePlugins()",
        "Returns a map of plugin names that are currently initialised."
      ],
      [
        "getBackgroundColor()",
        "Returns the background color of the waveform container."
      ],
      ["getCurrentTime()", "Returns current progress in seconds."],
      [
        "getCursorColor()",
        "Returns the fill color of the cursor indicating the playhead position."
      ],
      ["getDuration()", "Returns the duration of an audio clip in seconds."],
      ["getPlaybackRate()", "Returns the playback speed of an audio clip."],
      [
        "getProgressColor()",
        "Returns the fill color of the waveform behind the cursor."
      ],
      ["getVolume()", "Returns the volume of the current audio clip."],
      ["getMute()", "Returns the current mute status."],
      ["getFilters()", "Returns an array of the current set filters."],
      [
        "getWaveColor()",
        "Returns the fill color of the waveform after the cursor."
      ],
      [
        "exportPCM(length, accuracy, noWindow, start)",
        "Exports PCM data into a JSON array. Optional parameters length [number] - default: 1024, accuracy [number] - default: 10000, noWindow [true|false] - default: false, start [number] - default: 0exportImage(format, quality, type)",
        "Return waveform image as data URI or Blob."
      ],
      ["isPlaying()", "Returns true if currently playing, false otherwise."],
      [
        "load(url, peaks, preload)",
        "Loads audio from URL via XHR. Optional array of peaks. Optional preload parameter [none|metadata|auto], passed to the Audio element if using backend MediaElement."
      ],
      ["loadBlob(url)", "Loads audio from a Blob or File object."],
      [
        "on(eventName, callback)",
        "Subscribes to an event. See WaveSurfer Events for the list of all events."
      ],
      ["un(eventName, callback)", "Unsubscribes from an event."],
      ["unAll()", "Unsubscribes from all events."],
      ["pause()", "Stops playback."],
      [
        "play([start[, end]])",
        "Starts playback from the current position. Optional start and end measured in seconds can be used to set the range of audio to play."
      ],
      ["playPause()", "Plays if paused, pauses if playing."],
      [
        "seekAndCenter(progress)",
        "Seeks to a progress and centers view [0..1] (0 = beginning, 1 = end)."
      ],
      [
        "seekTo(progress)",
        "Seeks to a progress [0..1] (0 = beginning, 1 = end)."
      ],
      [
        "setBackgroundColor(color)",
        "Sets the background color of the waveform container."
      ],
      [
        "setCursorColor(color)",
        "Sets the fill color of the cursor indicating the playhead position."
      ],
      ["setHeight(height)", "Sets the height of the waveform."],
      [
        "setFilter(filters)",
        "For inserting your own WebAudio nodes into the graph. See Connecting Filters below."
      ],
      [
        "setPlaybackRate(rate)",
        "Sets the speed of playback (0.5 is half speed, 1 is normal speed, 2 is double speed and so on)."
      ],
      [
        "setPlayEnd(position)",
        "Sets set a point in seconds for playback to stop at."
      ],
      [
        "setVolume(newVolume)",
        "Sets the playback volume to a new value [0..1] (0 = silent, 1 = maximum)."
      ],
      [
        "setMute(mute)",
        "Mute the current sound. Can be a boolean value of true to mute sound or false to unmute"
      ],
      [
        "setProgressColor(color)",
        "Sets the fill color of the waveform behind the cursor."
      ],
      [
        "setWaveColor(color)",
        "Sets the fill color of the waveform after the cursor."
      ],
      [
        "skip(offset)",
        "Skip a number of seconds from the current position (use a negative value to go backwards)."
      ],
      ["skipBackward()", "Rewind skipLength seconds."],
      ["skipForward()", "Skip ahead skipLength seconds."],
      ["setSinkId(deviceId)", "Set the sink id to change audio output device."],
      ["stop()", "Stops and goes to the beginning."],
      ["toggleMute()", "Toggles the volume on and off."],
      ["toggleInteraction()", "Toggle mouse interaction."],
      ["toggleScroll()", "Toggles scrollParent."],
      [
        "zoom(pxPerSec)",
        "Horizontally zooms the waveform in and out. The parameter is a number of horizontal pixels per second of audio. It also changes the parameter minPxPerSec and enables the scrollParent option."
      ]
    ]
  }),
  computed: {
    search: {
      get() {
        return this.$store.state.app_bar.search;
      },
      set(val) {
        this.$store.commit("app_bar/set_search", val);
      }
    }
  }
};
</script>
<style scoped></style>
