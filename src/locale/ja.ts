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
        waveColor: "カーソルの後の波形の塗りつぶし色.",
        xhr:
          "XHR オプション. 例えば以下のような値になります: `{ cache: 'default', mode: 'cors', method: 'GET', credentials: 'same-origin', redirect: 'follow', referrer: 'client', headers: [ { key: 'Authorization', value: 'my-token' } ]}`"
      }
    }
  }
};
