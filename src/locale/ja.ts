export default {
  badge: "バッジ",
  close: "閉じる",
  dataIterator: {
    noResultsText: "検索結果が見つかりません。",
    loadingText: "項目をロード中です..."
  },
  dataTable: {
    itemsPerPageText: "1ページあたりの行数：",
    ariaLabel: {
      sortDescending: "降順の並び替え。",
      sortAscending: "昇順の並び替え。",
      sortNone: "ソートされていません。",
      activateNone: "ソートを削除するには有効にしてください。",
      activateDescending: "降順の並び替えのためには有効にしてください。",
      activateAscending: "昇順のソートのためには有効にしてください。"
    },
    sortBy: "ソート方式"
  },
  dataFooter: {
    itemsPerPageText: "1ページあたりの件数：",
    itemsPerPageAll: "すべて",
    nextPage: "次のページ",
    prevPage: "前のページ",
    firstPage: "一ページ目",
    lastPage: "最後のページ",
    pageText: "{0}-{1} 件目 / {2}件"
  },
  datePicker: {
    itemsSelected: "{0}日付選択",
    nextMonthAriaLabel: "来月",
    nextYearAriaLabel: "来年",
    prevMonthAriaLabel: "前月",
    prevYearAriaLabel: "前年"
  },
  noDataText: "データはありません。",
  carousel: {
    prev: "前のビジュアル",
    next: "次のビジュアル",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "さらに{0}"
  },
  fileInput: {
    counter: "{0} ファイル",
    counterSize: "{0} ファイル (合計 {1})"
  },
  timePicker: {
    am: "AM",
    pm: "PM"
  },
  pagination: {
    ariaLabel: {
      wrapper: "ページネーションナビゲーション",
      next: "次のページ",
      previous: "前のページ",
      page: "ページに移動 {0}",
      currentPage: "現在のページ、ページ {0}"
    }
  },
  wExampleHelpDialog: {
    headline: "デモの操作方法"
  },
  home: {
    desc: `
      <b>wavesurfer.vue</b> は <b><a href="https://wavesurfer-js.org/">wavesurfer.js</a></b> を vue で使用するためのラッパーです.
      </br>
      <b>Web Audio API</b> および <b>HTML5 Canvas</b> の上に構築されたカスタマイズ可能な音声波形の視覚化を提供します.
    `,
    quickStart: {
      install:
        "本コンポーネントをインストールするには以下のコマンドを実行してください:",
      example: "&lt;wave-surfer&gt; コンポーネントは以下のように使用します:",
      result: "結果は以下のようになります:",
      next: `&lt;wave-surfer&gt; コンポーネントの詳細な使用方法については以下のドキュメントを参照してください.`,
      warning: `サンプルコード実施時には <code><a href="https://vuetifyjs.com/en/">vuetify</a></code> を導入する必要があることに注意してください.`
    }
  },
  document: {
    options: {
      desc:
        "以下に <wave-suefer /> コンポーネントが受け入れる props の一覧を示します.",
      headers: {
        option: "オプション",
        type: "型",
        default: "デフォルト",
        description: "説明"
      },
      options: {
        source: "音声波形に変換されるメディアソース.",
        showTextGrid: "転記記述層を表示するか否か.",
        showTimeLine: "タイムラインを表示するか否か.",
        showPointLine: "ポイントラインを表示するか否か.",
        showSpectrogram: "スペクトログラムの表示を行うか否か.",
        showFreqLabel: "スペクトログラム表示時に周波数ラベルを表示するか否か.",
        rec: "録音モードを実施するか否か.この機能は実験的です.",
        audioRate: "オーディオを再生する速度. 数値が小さいほど遅くなります.",
        audioContext:
          "初期化時に使用した独自の AudioContext または, null のままにします.",
        audioScriptProcessor:
          "初期化時に使用した ScriptProcessorNode または null を使用します.",
        autoCenter:
          "スクロールバーが表示されている場合, 波形を進行状況の中央に配置します.",
        backend:
          "`WebAudio`, `MediaElement` または `MediaElementWebAudio`. `MediaElement` は, サポートされていないブラウザーのフォールバックです.",
        backgroundColor: "波形コンテナの背景色を変更します.",
        barGap:
          "提供されない場合, 波形のバー間のオプションの間隔は, レガシー形式で計算されます",
        barHeight:
          "波形バーの高さ. 1 より大きい数は, 波形バーの高さを増やします.",
        barMinHeight:
          "波形バーを描画するための最小の高さ. デフォルトの動作では, ミュート時にはバーを描画しません.",
        barRadius: "バーを丸める半径.",
        barWidth:
          "指定すると, このように波形が描画されます: \u2581\u2009\u2582\u2009\u2587\u2009\u2583\u2009\u2585\u2009\u2582",
        closeAudioContext:
          "`destroy` メソッドが呼び出されたときに, すべてのオーディオコンテキストを無効にします.",
        cursorColor: "再生ヘッドの位置を示すカーソルの塗りつぶし色.",
        cursorWidth: "ピクセル単位で測定されます.",
        drawingContextAttributes:
          "キャンバスの 2D 描画コンテキスト属性を指定します.",
        fillParent:
          "コンテナ全体を満たすか, minPxPerSec に従ってのみ描画するか.",
        forceDecode:
          "ズーム時に Web オーディオを使用してオーディオを強制的にデコードし, より詳細な波形を取得します.",
        freqRate: `
            スペクトログラム表示比率.
            表示される帯域は "freqRate * 12 * チャンネル数" kHz  までになります.
            この値は, 0.25 から 1  まで 0.25 毎にしか機能しないことに注意してください.
        `,
        height: "波形の高さ. ピクセル単位で測定されます.",
        hideScrollbar:
          "通常は表示されるときに水平スクロールバーを非表示にするかどうか.",
        interact:
          "初期化時にマウス操作を有効にするかどうか. このパラメータは後でいつでも切り替えることができます.",
        loopSelection:
          "(regins plugin で使用) 選択したリージョンのループを有効にします.",
        maxCanvasWidth:
          "小さなオーバーラップを除いた, ピクセル単位の単一キャンバスの最大幅 (2 * pixelRatio、次の偶数の整数に切り上げ). 波形がこの値よりも長い場合, 追加のキャンバスを使用して波形をレンダリングします.これは, ブラウザが単一のキャンバスに描画するには広すぎる可能性がある非常に大きな波形に役立ちます.このパラメーターは, MultiCanvas レンダラーにのみ適用されます.",
        mediaControls:
          "(バックエンドMediaElementで使用) これにより, メディア要素のネイティブコントロールが有効になります.",
        mediaType:
          "'audio' または 'video'. バックエンドが `MediaElement` の場合のみ使用されます.",
        minPxPerSec: "オーディオの 1 秒あたりの最小ピクセル数.",
        normalize: "true の場合, 1.0ではなく最大ピークで正規化します.",
        partialRender:
          "PeakCache を使用して, 波形のレンダリング速度を向上させます.",
        pixelRatio: "より速くレンダリングするためには 1 に設定してください",
        progressColor:
          "カーソルの後ろの波形部分の塗りつぶし色. `progressColor` と `waveColor` が同じ場合, 進行波はレンダリングされません.",
        removeMediaElementOnDestroy:
          "プレーヤー破棄時にメディア要素を DOM に保持するには, false に設定します. これは, loadMediaElement メソッドを介して既存のメディア要素を再利用する場合に役立ちます.",
        responsive:
          "true に設定すると, ウィンドウのサイズが変更されたときに, 波形のサイズが変更されます. これは、デフォルトで 100ms のタイムアウトでデバウンスされます. このパラメーターが数値の場合, そのタイムアウトを表します.",
        scrollParent:
          "長い波形でコンテナをスクロールするかどうか. そうでない場合, 波形はコンテナの幅に縮小されます ( fillParent を参照).",
        skipLength:
          "`skipForward()` および skipBackward() メソッドでスキップする秒数.",
        splitChannels:
          "オーディオのチャンネルごとに別々の波形でレンダリングします.",
        targetChannel: "スペクトル表示チャンネル.",
        waveColor: "カーソルの後の波形の塗りつぶし色.",
        xhr:
          "XHR オプション. 例えば以下のような値になります: `{ cache: 'default', mode: 'cors', method: 'GET', credentials: 'same-origin', redirect: 'follow', referrer: 'client', headers: [ { key: 'Authorization', value: 'my-token' } ]}`",
        freqFontSize: "スペクトログラム表示時の周波数軸フォントサイズ.",
        unitFontSize: "スペクトログラム表示時の周波数軸単位フォントサイズ.",
        spectrogramHeight: "スペクトログラム表示時のキャンバスの高さ.",
        pointWidth: "ポイントライン表示時のポイント幅.",
        points: "ポイントライン表示時のポイントオブジェクトが格納されたアレイ.",
        playingOffset: "ポイント層再生時のオフセットタイム."
      }
    },
    events: {
      desc:
        "`<wave-surfer>` コンポーネントから様々なプレーヤーイベントを受け取ることができます. ",
      descs: {
        audioprocess: "オーディオの再生中, またはシーク時に継続的に発火します.",
        dblclick: "インスタンスがダブルクリックされた時に発火します.",
        destroy: "インスタンスが破棄された際に発火します.",
        error:
          "エラー発生時に発火します. コールバックは `error message` (string) を受け取ります.",
        finish: "音声再生が終了した場合に発火します.",
        interaction: "`waveform` とのインタラクションが存在する際に発火します.",
        loading:
          "フェッチまたはドラッグアンドドロップを使用してロードするときに継続的に発火します. コールバックはロードの進行状況をパーセント[0..100] (integer) で受け取ります.",
        mute:
          "ミュート変更時に発火します. コールバックは新しいミュート状態 (boolean) を受け取ります.",
        pause: "音声再生が停止した際に発火します.",
        play: "音声再生が開始した際に発火します.",
        ready:
          "オーディオが読み込まれ, デコードされて, 波形が描画されます. これは, MediaElement を使用しているときに波形が描画される前に発火します. waveform-ready を参照してください.",
        scroll:
          "スクロールバーが移動した際に発火します. コールバックは `ScrollEvent` オブジェクトを受け取ります.",
        seek:
          "シーク時に発火します. コールバックは 進行状況 [0..1] (float) を受け取ります.",
        volume:
          "ボリューム変更時に発火します. コールバックは新しいボリューム (integer) を受け取ります.",
        "waveform-ready":
          "`MediaElement` バックエンドを使用している場合, 波形が描画された後に発火します. `WebAudio` バックエンドを使用している場合には, `ready` を使用できます.",
        zoom:
          "ズーム時に発火します. コールバックは `minPxPerSec` (integer) を受け取ります."
      }
    }
  },
  example: {
    audioElement: {
      desc: `
      音声ファイルは Base64 形式に変換し <code>source</code> プロパティに渡してください.
      <br />
      <code>source</code> は Base64 形式の他に HTML Audio Element, HTML Video Element
      そして ファイルへの url をサポートします.
      <br />
      <br />
      例では <code>onFileChange</code> 関数内でユーザから渡された音声ファイルを
      base64 形式に変換し wave-surfer コンポーネントに渡しています
      `
    },
    videoElement: {
      desc: `
      動画ファイルの場合 wave-surfer コンポーネントが提供するコントロールと
      HTML Video Element が提供するコントロールを単一にする必要があります.
      <br />
      そのためには <code>source</code> プロパティには
      HTML Video Element を渡す必要があることに注意してください.
      <br />
      また <code>backend</code> プロパティを <code>"MediaElement"</code> に指定する必要があります.
      <br /><br />
      例では <code>onFileChange</code> 関数内でユーザから渡された動画ファイルを base64 化し
      HTML Video Element に渡しています.
      <br />
      また HTML Video Element では <code>loadeddata</code> イベントを監視し
      動画読み込みが終了したタイミングで
      wave-surfer コンポーネント の <code>source</code> を設定しています.
      <br /><br />
      <b>HTML Video Element の <code>src</code> を変更しても
      音声波形は再レンダされないことに注意してください.</b>
      <br />
      これは <code>source</code> に渡している対象が HTML Video Element であるためです.
      <br />
      例では video element に <code>v-if</code> を設定し <code>source</code> が変わるごとに
      HTML Video Element そのものを再記述させています.
      `
    },
    bars: {
      desc: `
      <code>wave-surfer</code> コンポーネントに渡す各種プロパティは動的に反映されます.
      </br>
      例では波形の棒およびカーソルの色や太さを変更しています.
      また波形表示領域の高さを変更できます.
      </br>
      </br>
      ただし完全な再描画が必要になる props があることに注意してください.
      </br>
      例えば <code>barWidth</code> は音声を再生しながらでも値の変更が可能ですが
      <code>barRadius</code> や <code>height</code> はそうではありません.
      `
    },
    splitChannels: {
      desc: `<code>splitChannels</code> プロパティを有効にするとステレオ音源を分割して表示します`
    },
    timeline: {
      desc: `<code>showTimeLine</code>  プロパティを設定すると音声波形に時刻情報が付与されます.`
    },
    pointline: {
      desc: `
      Point line プラグインはこのライブラリ独自の wavesurfer.js 用プラグインです.
      </br>
      このプラグインを有効にするには "showPointLine" プロパティを true にします.
      </br>
      "points" プロパティは "time" および "value" 属性を持つ単なる配列です.
      </br>
      "points" プロパティの意味は定義しません.
      例えば F0 や パワー あるいは何かのセンサーを値を waveform と共に表示をしたい際に利用できます.  `
    },
    textgrid: {
      headline: `
      TextGrid 形式は praat で使用されるアノテーションファイル形式です.
      </br>
      <code>wave-surfer</code>コンポーネントでは praat と同様に視覚的に
      多層化された転記機能を提供します.
      </br>
      また TextGrid 形式ファイルのインポートおよびエクスポートを支援します.
      `,
      help: `
      まずは音声ファイルを選択します.
      </br>
      サンプルの音声ファイルは /src/assets/media/demo.wav に置いてあります.
      あるいは任意の wav ファイルまたは mp3 ファイルを使用できます.
      </br></br>
      音声ファイルの読み込みに成功すると音声波形とアノテーション管理用コンポーネントが表示されます.
      </br></br>
      アノテーション管理用コンポーネントのプラスボタンを押すと新規 TIER 作成ダイアログが表示されます. フォームに従い情報を入力した後で SAVE ボタンを押してください.
      </br></br>
      TIER の作成に成功するとアノテーションコンポーネントが音声波形の下に表示されます.
      またアノテーション管理用コンポーネントには新規追加された TIER がテーブルとして表示されます.
      </br></br>
      アノテーションコンポーネントの任意の箇所をダブルクリックすることでアノテーションを行うことができます.
      またアノテーションコンポーネントの上にあるテキスト入力欄に文字を入力し ENTER を押すと文字情報を記録することができます.
      </br></br>
      これらの操作はアノテーション管理用コンポーネントに表示されたテーブルからでも実行可能です.
      </br></br>
      既存の textgrid と書かれたインプットフォームをクリックすることで TextGrid ファイルを読み込むことも可能です.
      </br></br>
      最後に DOWNLOAD TEXTGRID と書かれたボタンをクリックすることでアノテーション結果を TextGrid 形式でダウンロードすることが可能です.
      `,
      desc: `
      基本的にこのコンポーネントとのデータのやり取りはリアクティブではないことに注意してください.
      </br></br>
      アノテーション領域の変更はこのコンポーネントが提供するいくつかのメソッドを使用して行います.
      また, アノテーション領域のステータスはこのコンポーネントが発火させるイベントを通して
      取得します.
      </br></br>
      showTextGrid を使用時には以下のメソッドを使用可能です.
      <ul>
        <li>
        addTier(key, type): アノテーション領域に新規TIER を作成.
        </li>
        <li>
        deleteTier(key): 指定の TIER を削除
        </li>
        <li>
        addTierValue(key, obj): 指定 TIER にアノテーションオブジェクトを追加
        </li>
        <li>
        setTierValueText(key, index, obj): 指定 TIER のアノテーションオブジェクトを変更
        </li>
        <li>
        deleteTierValue(key, index): 指定 TIER のアノテーションオブジェクトを削除
        </li>
        <li>
        downloadTextGrid(filename): 現在のアノテーション結果を TextGrid ファイルとして保存
        </li>
        <li>
        loadTextGrid(file): TextGrid ファイルをアノテーション領域に表示
        </li>
      </ul>
      </br></br>
      showTextGrid を使用時には以下のイベントが発生します.
      <ul>
      <li>textgrid-dblclick: アノテーション領域がダブルクリックされた際に発火.発火時にはダブルクリックされた地点の時刻情報および空のテキスト情報が渡される.</li>
      <li>textgrid-click:アノテーション領域がクリックされた際に発火.発火時にはクリック地点に最も近いアノテーションオブジェクトが渡される</li>
      <li>textgrid-update: textgrid が変更された場合に発火.変更後の全ての textgrid 情
      報が渡される</li>
      <li>textgrid-current-update:
      選択されたアノテーションオブジェクトが変更された場合に発火.現在選択されている TIER の Key および選択されているアノテーションオブジェクトが渡される
      </li>
      </ul>
      `
    },
    recording: {
      desc: `
      <code>rec</code> プロパティを有効にすると ブラウザを経由しての音声録音が可能です.
      録音されている音声波形はリアルタイムに音声波形に反映をされ,
      収録停止後に録音された音声が出力されます.
      </br></br>
      この機能は現状実験的なものであることに注意をしてください.
      </br></br>
      他機能(例えばスペクトログラムの表示)との連携が一切考慮されていません.
      </br>
      また,出力される音声ファイルは ".wav" となっていますが wav 形式ではありません.
      </br>
      筆者の余裕と興味が出たタイミングで種々調整を行います.`
    },
    spectrogram: {
      desc: `
      <code>showSpectrogram</code> props を有効にすることで,
      音声スペクトログラムの表示が成されます.
      </br></br>
      この機能は本コンポーネントに最適化する形で改変されています.
      </br>
      オリジナルとは異なり FFT の処理の非同期化を行っており,
      <code>zoom</code> 時にはスペクトログラムの再レンダを行うようになっています.
      </br>
      </br>
      FFT の処理および, 結果の表示には多少の時間が掛かるため
      ステレオ音源の場合, 1 ch 分の表示しか行わないことに注意をしてください.
      </br>
      計算および表示を行うチャンネルの指定は <code>targetChannel</code> props から行います.
      </br>
      </br>
      <h3>EVENTS</h3>
      スペクトログラムの表示は音声波形の表示よりも時間がかかります.
      </br>
      スペクトログラムの表示状態を把握するために以下のイベントが設定されていることに注意してください:
      <ul>
      <li>spectrogram-render-start: スペクトログラムのレンダ開始時に発火</li>
      <li>spectrogram-render-end: スペクトログラムのレンが終了時に発火</li>
      </ul>
      </br>
      上記サンプルコードでは <code>spectrogram-render-end</code> を監視し
      スペクトログラムのレンダが終了した際にのみビデオを表示するようにしています.
      `
    }
  }
};
