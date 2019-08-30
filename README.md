https://bills-appworks.github.io/BABYLON-F/
---
* [Japanese-日本語](#Japanese-日本語)
* [English-英語](#English-英語)
---
#### Japanese-日本語
## バビロン “F” ジェネレータ
### 概要
「バビロン」作中に登場するアイテムのひとつを生成するアプリケーションです。

紙を模した領域に大量の文字「F」と「しみ」が出力されます。
紙、文字、しみの出力内容を調整することができます。

出力結果の画像をダウンロードすることができます。

調整した結果は「再現URL」欄に表示され、そのURLを指定することでいつでも出力結果の再現が可能です。
### 調整機能（パラメータ）
* 文字
   表記
    * 初期状態では「F」となっている出力文字を指定します。
    * URLパラメタ: cn=\<表記文字> (1～10文字)
  * フォント
    * 文字のフォントを選択します。
    * URLパラメタ: cf=\<アプリ内定義フォント番号> (0～5)
  * 数
    * 文字の出力数を指定します。
    * URLパラメタ: cc=\<出力数> (0～50,000)
  * サイズ
    * 文字の大きさを指定します。
    * URLパラメタ: cs=\<アプリ内定義サイズ値> (1～100)
  * 色
    * 文字の色を指定します。
    * URLパラメタ: ccl=\<R>,\<G>,\<B> (RGB各0～255)
* しみ
  * 数
    * 「しみ」の出力数を指定します。
    * URLパラメタ: sc=\<出力数> (0～50,000)
  * サイズ
    * しみの**最大の**大きさを指定します。出力時は指定値を最大とするランダムとなり、ひとつずつの大きさは異なります。
    * URLパラメタ: ss=\<アプリ内定義サイズ値> (1～100)
  * 色
    * 「しみ」の色を指定します。出力時は「しみ」の周囲に装飾が行われるため、単色ではありません。
    * URLパラメタ: scl=\<R>,\<G>,\<B> (RGB各0～255)
  * 透明度
    * 「しみ」の透過度合いを指定します。
    * URLパラメタ: scl=\<R>,\<G>,\<B>,\<透過率> (0～100) ※色パラメタと共用
* 紙
  * 縦
    * 文字や「しみ」の出力先領域の**垂直**方向の大きさを指定します。
    * URLパラメタ: ph=\<ピクセル数> (100～10,000)
  * 横
    * 文字や「しみ」の出力先領域の**水平**方向の大きさを指定します。
    * URLパラメタ: pw=\<ピクセル数> (100～10,000)
  * 色
    * 紙の色を指定します。
    * URLパラメタ: pcl=\<R>,\<G>,\<B> (RGB各0～255)

以下は補足機能です。「乱数源」と「バージョン」については、URLパラメタに「verbose=1」と指定すると画面上にも設定項目が表示されます。
* 乱数源
  * 疑似乱数アルゴリズムxorsfhit32に指定する初期値（ランダムシード）を指定します。
  * URLパラメタ: r=\<ランダムシード値> (1～2,147,483,647)
* バージョン
  * アプリケーションの出力アルゴリズムバージョンを指定します。将来において同じパラメタでも出力結果が異なるようなアルゴリズム変更が発生した場合にも、同じバージョンパラメタを指定することにより出力結果の互換性を維持する予定です。
  * URLパラメタ: v=\<バージョン指定文字列> (現バージョンは「1.0.0」)
* 「しみ」形状
  * アプリケーション内で初期値が定義されている「しみ」の形状を指定します。出力においては3パターンの形状を繰り返しています。
  * URLパラメタ: \<形状パラメタ1>,\<形状パラメタ２>,\<形状パラメタ3>
    * 形状パラメタ: \<1>,\<2>,\<3>,\<4>,\<5>,\<6>,\<7>,\<8>
    * CSS border-radiusプロパティの値（border-radius: \<1>% \<2>% \<3>% \<4>% / \<5>% \<6>% \<7>% \<8>%）に展開されます。
    * border-radius仕様: https://developer.mozilla.org/ja/docs/Web/CSS/border-radius
    * Border-radius generator: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Background_and_Borders/Border-radius_generator
* 冗長モード
  * 指定すると「乱数減」「バージョン」設定項目が画面に表示されます。また「再現URL」に「しみ」形状パラメタも出力されます。
  * URLパラメタ: verbose=\<モード> (0:通常モード / 1:冗長モード)
* 言語
  * 画面に表示される説明文等の言語を指定します。指定しない場合はWebブラウザの言語設定に従います。
  * URLパラメタ: lang=\<言語識別子> (ja:日本語 en:英語)
### ライセンス
このソフトウェアはMITライセンスによってリリースしています。[LICENSE](./LICENSE)を参照ください。

---
#### English-英語
## BABYLON "F" generator
### Overview
This application is generate item in "BABYLON".

Output massively charactor “F” and stain on paper resembling area.
You can adjustment to output contents: paper, charactor, and stain.

And then you can download image file of output result.

These adjustment parameters display in “Replay URL”.
This URL can replay to output result anytime.
### Adjustment function (parameter)
* Charactor
  * Letter
    * Input charactor notation setting that “F” specified in initial state.
    * URL parameter: cn=\<letter(s)> (1-10 letter(s))
  * Font
    * Select font name of output charactor.
    * URL parameter: cf=\<Font number of app internal definition> (0-5)
  * Count
    * Input number of output charactor.
    * URL parameter: cc=\<number> (0-50,000)
  * Size
    * Input size of output charactor.
    * URL parameter: cs=\<size numeric of app internal definition> (1-100)
  * Color
    * Choose color of output charactor.
    * URL parameter: ccl=\<R>,\<G>,\<B> (each RGB value:0-255)
* Stain
  * Count
    * Input number of output stain.
    * URL parameter: sc=\<number> (0-50,000)
  * Size
    * Input **maximum** size of output stain. In output procedure, random size limited by this value and each output size are various.
    * URL parameter: ss=\<size numeric of app internal definition> (1-100)
  * Color
    * Choose color of output stain. In output procedure, it that not monochrome because decorate to stain periphery. 
    * URL parameter: scl=\<R>,\<G>,\<B> (each RGB value:0-255)
  * Clarity
    * Input transparency of output stain.
    * URL parameter: scl=\<R>,\<G>,\<B>,\<transparency numeric> (0-100) *Shared with color parameter
* Paper
  * Hight
    * **Vertical** direction size of output area for charactor and stain.
    * URL parameter: ph=\<pixel numeric> (100-10,000)
  * Width
    * **Horizontal** direction size of output area for charactor and stain.
    * URL parameter: pw=\<pixel numeric> (100-10,000)
  * Color
    * Choose color of output area. 
    * URL parameter: scl=\<R>,\<G>,\<B> (each RGB value:0-255)

Following are supplemental function. "Random" and "Version" are input interface display when specified "verbose=1" at URL parameter.
* Random
  * Input initial number (random seed) for pseudo random number algorythm "xorshift32".
  * URL parameter: r=\<random seed> (1-2,147,483,647)
* Version
  * Specify version of application output algorythm. In the future, even if the same parameter has an algorithm change that results in different output results, the compatibility of the output results will be maintained by specifying the same version parameter.
  * URL parameter: v=\<version string> (current version is "1.0.0")
* Stain shape
  * Specify stain shape change for application internal definition initial value. In output procedure, repeat 3 pattern shapes.
  * URL parameter: \<shape parameter 1>,\<shape parameter 2>,\<shape parameter 3>
    * shape parameter: <1>,<2>,<3>,<4>,<5>,<6>,<7>,<8>
    * Expand to CSS border-radius property value (border-radius: <1>% <2>% <3>% <4>% / <5>% <6>% <7>% <8>%).
    * border-radius specification: https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
    * Border-radius generator: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Background_and_Borders/Border-radius_generator
* Verbose mode
  * In specify, display "Random" "Version" input item to screen, and output stain shape parameter to "Replay URL".
  * URL parameter: verbose=\<mode> (0:normal mode / 1:verbose mode)
* Language
  * Specify language for desciption in screen display, etc. In not specified, due to web browser language setting.
  * URL parameter: lang=\<language identifier> (ja:Japanese en:English)  
### License
This software is released under the MIT License, see [LICENSE](./LICENSE).
