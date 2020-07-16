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
  home: {
    desc:
      "wavesurfer.vue is a vue.js wrapper for wavesurfer.js. It provides a customizable audio waveform visualization built on top of the Web Audio API and HTML5 Canvas."
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
        waveColor: "The fill color of the waveform after the cursor.",
        xhr:
          "XHR options. For example: let xhr = { cache: 'default', mode: 'cors', method: 'GET', credentials: 'same-origin', redirect: 'follow', referrer: 'client', headers: [ { key: 'Authorization', value: 'my-token' } ]};"
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
  }
};
