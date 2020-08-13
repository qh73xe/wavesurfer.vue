export default {
  badge: "Badge",
  close: "Close",
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    nextMonthAriaLabel: "Next month",
    nextYearAriaLabel: "Next year",
    prevMonthAriaLabel: "Previous month",
    prevYearAriaLabel: "Previous year"
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM"
  },
  pagination: {
    ariaLabel: {
      wrapper: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Goto Page {0}",
      currentPage: "Current Page, Page {0}"
    }
  },
  wExampleHelpDialog: {
    headline: "How to use this demo"
  },
  home: {
    desc: `
      <b>wavesurfer.vue</b> is a wrapper for <b><a href="https://wavesurfer-js.org/">wavesurfer.js</a></b> to use <b>vue.js</b>.
      </br>
      It provides a customizable audio waveform visualization built on <b>Web Audio API</b> and <b>HTML5 Canvas</b>.
    `,
    quickStart: {
      install: "To install this components, you can do so by typing:",
      example:
        "Use the &lt;wave-surfer&gt; components in your components as follows:",
      result: "The result is as follows:",
      next: `For more information on how to use the &lt;wave-surfer&gt; component, see the following documents.`,
      warning: `Please note that <code><a href="https://vuetifyjs.com">vuetify</a></code> is required to run the sample code.`
    }
  },
  document: {
    options: {
      desc:
        "This is the list of props you can pass to <wave-suefer /> to create an instance of the player.",
      headers: {
        option: "props",
        type: "type",
        default: "default",
        description: "description"
      },
      options: {
        source: "Media source converted to audio waveform.",
        showTextGrid: "Whether to display the transcription tiers.",
        showTimeLine: "Whether to display the timeline.",
        showPointLine: "Whether to display the pointline.",
        showSpectrogram: "Whether to display the spectrogram.",
        showFreqLabel:
          "Whether to display the frequency label when using showSpectrogram option.",
        rec:
          "Whether to execute the recording mode.This feature is experimental.",
        audioRate: "Speed at which to play audio. Lower number is slower.",
        audioContext:
          "Use your own previously initialized AudioContext or leave blank.",
        audioScriptProcessor:
          "Use your own previously initialized ScriptProcessorNode or leave blank.",
        autoCenter:
          "If a scrollbar is present, center the waveform around the progress.",
        backend:
          "WebAudio, MediaElement or MediaElementWebAudio. MediaElement is a fallback for unsupported browsers.",
        backgroundColor: "Change background color of the waveform container.",
        barGap:
          "The optional spacing between bars of the wave, if not provided will be calculated in legacy format.",
        barHeight:
          "Height of the waveform bars. Higher number than 1 will increase the waveform bar heights.",
        barMinHeight:
          "Minimum height to draw a waveform bar. Default behavior is to not draw a bar during silence.",
        barRadius: "The radius that makes bars rounded.",
        barWidth:
          "If specified, the waveform will be drawn like this: \u2581\u2009\u2582\u2009\u2587\u2009\u2583\u2009\u2585\u2009\u2582",
        closeAudioContext:
          "Close and nullify all audio contexts when the destroy method is called.",
        cursorColor:
          "The fill color of the cursor indicating the playhead position.",
        cursorWidth: "Measured in pixels.",
        drawingContextAttributes:
          "Specify canvas 2d drawing context attributes.",
        fillParent:
          "Whether to fill the entire container or draw only according to minPxPerSec.",
        forceDecode:
          "Force decoding of audio using web audio when zooming to get a more detailed waveform.",
        freqRate: `
            Spectrogram display bandwidth ratio.
            For monaural sound sources, "freqRate * 12" kHz is displayed.
            For stereo sound sources, "freqRate * 24" kHz is displayed.
            Note that this value works from 0.25 to 1 in steps of 0.25.
        `,
        height: "The height of the waveform. Measured in pixels.",
        hideScrollbar:
          "Whether to hide the horizontal scrollbar when one would normally be shown.",
        interact:
          "Whether the mouse interaction will be enabled at initialization. You can switch this parameter at any time later on.",
        loopSelection:
          "(Use with regions plugin) Enable looping of selected regions.",
        maxCanvasWidth:
          "Maximum width of a single canvas in pixels, excluding a small overlap (2 * pixelRatio, rounded up to the next even integer). If the waveform is longer than this value, additional canvases will be used to render the waveform, which is useful for very large waveforms that may be too wide for browsers to draw on a single canvas. This parameter is only applicable to the MultiCanvas renderer.",
        mediaControls:
          "(Use with backend MediaElement) this enables the native controls for the media element.",
        mediaType: "'audio' or 'video'. Only used with backend MediaElement.",
        minPxPerSec: "Minimum number of pixels per second of audio.",
        normalize: "If true, normalize by the maximum peak instead of 1.0.",
        partialRender:
          "Use the PeakCache to improve rendering speed of large waveforms.",
        pixelRatio: "Can be set to 1 for faster rendering.",
        progressColor:
          "The fill color of the part of the waveform behind the cursor. When progressColor and waveColor are the same the progress wave is not rendered at all.",
        removeMediaElementOnDestroy:
          "Set to false to keep the media element in the DOM when the player is destroyed. This is useful when reusing an existing media element via the loadMediaElement method.",
        responsive:
          "If set to true resize the waveform, when the window is resized. This is debounced with a 100ms timeout by default. If this parameter is a number it represents that timeout.",
        scrollParent:
          "Whether to scroll the container with a lengthy waveform. Otherwise the waveform is shrunk to the container width (see fillParent).",
        skipLength:
          "Number of seconds to skip with the skipForward() and skipBackward() methods.",
        splitChannels:
          "Render with seperate waveforms for the channels of the audio.",
        targetChannel: "Channel for spectrum display",
        waveColor: "The fill color of the waveform after the cursor.",
        xhr:
          "XHR options. For example: let xhr = { cache: 'default', mode: 'cors', method: 'GET', credentials: 'same-origin', redirect: 'follow', referrer: 'client', headers: [ { key: 'Authorization', value: 'my-token' } ]};",
        freqFontSize:
          "The font size of the frequency label when displaying the audio spectrogram.",
        unitFontSize:
          "Font size for frequency label unit when displaying audio spectrogram.",
        spectrogramHeight: "Canvas height when displaying audio spectrogram.",
        pointWidth: "The width of the point when the point line is displayed.",
        points: "The point object array displayed on the point line.",
        playingOffset: "The offset time when playing point tier object."
      }
    },
    events: {
      desc:
        "You can receive various player events from the `<wave-surfer>` component.",
      descs: {
        audioprocess:
          "Fires continuously as the audio plays. Also fires on seeking.",
        dblclick: "When instance is double-clicked.",
        destroy: "When instance is destroyed.",
        error: "Occurs on error. Callback will receive (string) error message.",
        finish: "When it finishes playing.",
        interaction: "When there's interaction with the waveform.",
        loading:
          "Fires continuously when loading using fetch or drag'n'drop. Callback will receive (integer) loading progress in percents [0..100].",
        mute:
          "On mute change. Callback will receive (boolean) new mute status.",
        pause: "When audio is paused.",
        play: "When playback starts.",
        ready:
          "When audio is loaded, decoded and the waveform drawn. This fires before the waveform is drawn when using MediaElement, see waveform-ready.",
        scroll:
          "When the scrollbar is moved. Callback will receive a ScrollEvent object.",
        seek: "On seeking. Callback will receive (float) progress [0..1].",
        volume: "On volume change. Callback will receive (integer) new volume.",
        "waveform-ready":
          "Fires after the waveform is drawn when using the MediaElement backend. If you're using the WebAudio backend, you can use ready.",
        zoom: "On zooming. Callback will receive (integer) minPxPerSec."
      }
    }
  },
  example: {
    audioElement: {
      desc: `
      Convert the audio file to Base64 format and pass it in the source props at the wave-surfer component.
      <br />
      The source props also supports HTML Audio Element, HTML Video Element and url to file.
      <br />
      <br />
      In the example below, the audio file passed from the user is converted to base64 format in the onFileChange function.
      `
    },
    videoElement: {
      desc: `
      For video files, the controls provided by the wave-surfer component and the controls provided by the HTML Video Element must be single.
      <br />
      To do this, you need to pass the HTML Video Element itself in the "source" props.
      <br />
      You also need to specify the "backend" props to "MediaElement".
      <br />
      <br />
      In the example, the video file passed by the user is converted to base64 and passed to HTML Video Element in the onFileChange function.
      <br />
      The "loadeddata" event of the HTML Video Element is watched, and sets the source props of the wave-surfer component when the video load finishes.
      <br />
      <br />
      <b>Note that changing the src attribute of the HTML Video Element does not re-render the audio waveform.</b>
      <br />
      This is because what you are passing to the "source" props is a same HTML Video Element.
      <br />
      In the example, v-if is set for the video element, and the HTML Video Element itself is rewritten each time the source changes.
      `
    },
    bars: {
      desc: `
      The props of the "wave-surfer" component are dynamically reflected.
      </br>
      In the example, the color and thickness of the waveform bar and cursor are changed.
      You can also change the height of the waveform display area.
      </br>
      </br>
      But note that some props require a complete redraw.
      </br>
      For example, "barWidth" can change the value while playing audio, but "barRadius" and "height" do not.
      `
    },
    spectrogram: {
      desc: `
      If the <code>showSpectrogram</code> props is enabled, Audio Spectrogram was shown.
      </br>
      This feature is customized for this component.
      Unlike the original, the FFT calculation is processed asynchronously.
      In addition, the spectrogram is re-rendered when <code>zoom</code> processing is performed.
      </br>
      Note that the FFT calculation takes some time,
      so the spectrogram to be displayed is only one channel.
      This is specified by the <code>targetChannel</code> props.
      </br>
      </br>
      <h3>EVENTS</h3>
      The spectrogram rendering takes longer than the audio waveform rendering.
      Note that the following events have been set to keep track of
      which was rendered the spectrogram or not:
      <ul>
      <li>spectrogram-render-start: Fire when the spectrogram rendering was started.
      <li>spectrogram-render-end: Fire when the spectrogram rendering was ended.
      </ul>
      </br>
      In the sample code, <code>spectrogram-render-end</code> event was used
      to display the video only when the spectrogram rendering has finished.
      `
    },
    splitChannels: {
      desc: `If the "splitChannels" props is enabled, stereo sound sources will be split and displayed.`
    },
    timeline: {
      desc: `Set the "showTimeLine" props to add a timeline for the audio waveform.`
    },
    pointline: {
      desc: `
      Point line is an original plugin for wavesurfer.js.
      </br>
      </br>
      "points" props is an array of just some object that has "time" and "value" attr.
      </br>
      I don't define the meaning of "points".
      So, You can use "points" props to display any f0s or amplitudes or senser values.
      `
    },
    textgrid: {
      headline: `
        TextGrid format is a transcription file format used by praat.
        </br>
        <code>wave-surfer</code> component provides visually layered transcription functionality similar to praat.
        </br>
        And this component also supports the import and export of TextGrid format files.
        `,
      desc: `
      Please note that data exchange with this component is not reactive.
      </br>
      You can change the annotation area using several methods and get the annotation area status from some events.
      </br></br>
      You can use the following methods when using showTextGrid.
      <ul>
        <li>addTier(key, type): Create a new TIER in the annotation area.</li>
        <li>deleteTier(key): Delete specified TIER</li>
        <li>addTierValue(key, obj): Add annotation object to specified TIER</li>
        <li>setTierValueText(key, index, obj): Change annotation object of specified TIER</li>
        <li>deleteTierValue(key, index): Delete the annotation object of the specified TIER</li>
        <li>downloadTextGrid(filename): Save current annotation as a TextGrid file</li>
        <li>loadTextGrid(file): Display TextGrid file in annotation area</li>
      </ul>
      </br>
      The following events occur when using showTextGrid.
      <ul>
      <li>textgrid-dblclick: Fired when the annotation area is double-clicked. When fired, the time information of the double-clicked point and empty text information are passed.</li>
      <li>textgrid-click: When fired, the annotation object closest to the click point is passed</li>
      <li>textgrid-update: Fired when the textgrid has changed. All changed textgrid information is passed</li>
      <li>textgrid-current-update: Fired when the selected annotation object has changed, passing the Key of the currently selected TIER and the selected annotation object.</li>
      </ul>
      `,
      help: `
      First, select same audio file.
      </br>
      A sample audio file is located at /src/assets/media/demo.wav.
      </br>
      Alternatively you can use any wav or mp3 file.
      </br>
      </br>
      When your audio file is successfully read, the audio waveform and the annotation management component are displayed.
      </br>
      </br>
      Click the plus button on the annotation management component to display the new TIER creation dialog.
      </br>
      After filling in the information according to the form, press the SAVE button.
      </br>
      If the TIER is created successfully, the annotation component will be displayed below the audio waveform.
      </br>
      The added TIER is displayed as a table in the annotation management component.
      </br>
      </br>
      You can annotate by double-clicking anywhere on the annotation component.
      </br>
      You can also record characters by entering characters in the text input field above the annotation component and pressing ENTER.
      </br>
      </br>
      These operations can also be executed from the table displayed in the annotation management component.
      </br>
      </br>
      You can also load a TextGrid file by clicking on the existing input form labeled textgrid.
      </br>
      </br>
      Finally, click the button labeled DOWNLOAD TEXTGRID to download the annotation results in TextGrid format.
      `
    },
    recording: {
      desc: `
      Enable the <code>rec</code> property to enable voice recording via the browser.
      The recorded sound waveform is reflected on the voice waveform in real time,
      The recorded sound is output after recording is stopped.
      </br></br>
      Please note that this feature is currently experimental.
      </br></br>
      Coordination with other functions (e.g. spectrogram display) is not considered at all.
      </br>
      Also, the output audio file is ".wav", but it is not in wav format.
      </br>
      I will make various adjustments depending on my margin and timing when I am interested.
      `
    }
  }
};
