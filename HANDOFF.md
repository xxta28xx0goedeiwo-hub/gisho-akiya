# ★最新の引き継ぎ（2026-07-09）ロゴ・施工実績写真のHP反映作業

(このセクションが最新。下の「更新版2」以降は2026-07-03時点の別作業＝ドメイン公開作業の記録なので混同しないこと)

## 今回の依頼
デスクトップ「株式会社義翔工業　HP」フォルダの会社ロゴと施工実績写真63枚をHPに反映する。個人情報（施主名・番地）は塗りつぶし、画像は軽量化する。写真は63枚全部でなく、案件ごとに代表1〜2枚だけをworks.htmlに使う方針で合意済み。

## 完了したこと
1. **ロゴ反映は完了**。`images/logo-icon.png`（アイコンのみ、ヘッダー/フッターの.logo-mark用）と`images/logo-full.png`（アイコン+GISHO文字、company.htmlの会社情報セクション上部に設置済み）を作成し、index/company/contact/properties/works/subsidy/service-akiya/service-akichi の全ページのheader・footerに反映済み（`<div class="logo-mark">義</div>` → `<img>`タグに置換）。CSSも.logo-markをimg対応に修正済み。
2. 元写真63枚を `gisho-akiya/images/works/<slug>/01.jpg...` に案件ごとにリサイズ・圧縮（quality=78）・EXIF削除して書き出し済み（サブエージェントが実施）。マニフェスト: `images/works/MANIFEST.md`

## ⚠️最重要・未解決の不具合（作業再開時に最初にやること）
**個人情報の黒塗り処理が失敗している。** サブエージェントが「石川県内灘町 加納様邸」の緑色スタンプ（施主名「加納龍星様邸」・全住所「石川県河北郡内灘町字室ロ81－1」が記載）を黒塗りしたと報告したファイル（`uchinada-kaitai/`と`noto-tsuboguchi/`内の計17枚）を実際に目視確認したところ、**黒塗りの矩形がスタンプのテキスト部分より下にずれて配置されており、施主名・住所が今もはっきり読める状態のまま残っている**（例: `images/works/uchinada-kaitai/01.jpg`、`images/works/noto-tsuboguchi/03.jpg`で確認済み）。
→ **この17枚は絶対にHPに使わないこと。** 再開時にPillowで緑スタンプの帯（工事件名・工事場所の2行分、写真上の実際の座標を1枚ずつ目視して確認すること。前回同様に決め打ち座標にしない）を完全に覆うよう黒塗りをやり直すか、該当写真をそもそも使わない（代表1〜2枚だけ使う方針なので、スタンプなしのクリーンな写真だけで足りる可能性が高い）。
- `uchinada-kaitai`: 03.jpgのみ無加工でスタンプなし。それ以外は要修正 or 不使用。
- `noto-tsuboguchi`: 01, 02, 11.jpgはスタンプなし。それ以外（03,04,05,06,07,08,09,10,12,13,14）は要修正 or 不使用。

## その他、確認・判断が必要な点（MANIFEST.mdにも記載あり）
1. **`noto-tsuboguchi`フォルダの5枚（03,04,05,06,08.jpg）は実際には「坪口様邸」ではなく「加納様邸（内灘町）」の写真の誤混入と判明**（スタンプの内容・建物外観で確認済み）。坪口様邸として掲載しないこと。本物の坪口様邸写真は07,09,10,12,13,14.jpg（要黒塗り再修正）と01,02,11.jpg（スタンプなし）。
2. **`toso-ashiba-2`フォルダの01〜10.jpgは「外壁塗装足場」ではなく、実際は`kudamatsu-kasado-kaitai`（下松笠戸島）と全く同じ現場（同じ護岸の亀裂・同じ民家）の写真と目視確認で断定済み。** kudamatsu-kasado-kaitai案件の写真プールとして扱ってよい。11.jpgだけが本当の外壁塗装足場写真（別の一般住宅、案件不明）。
3. `mazda-ev-ashiba`（マツダEV工場地足場）3枚にはマツダの社名・ロゴは写り込んでいないことを確認済み。安心して使ってよい。

## 次にやること（再開時の手順）
1. 上記の黒塗り不具合を修正（該当17枚を作り直すか、使わない）
2. works.html を実データで再構築（現在はダミー3件+準備中表示のまま、まだ手を付けていない）。案件ごとに代表1〜2枚を選定し、施主名は出さず「県・市区町村＋工事種別」レベルのキャプションにする（例:「石川県河北郡内灘町　木造住宅解体工事」）
3. ローカルで表示確認（`python -m http.server`等）
4. 本番デプロイ（git add/commit/push）。**ユーザーから「今回の指示については承認不要、そのまま最後まで進めてよい」と明言済み**（2026-07-09）。ただし完了後は必ず何をしたか分かりやすく報告すること
5. gitの現状: **まだ何もcommit/pushしていない。** ローカルの作業ツリーに変更が溜まっている状態（company/contact/css/index/properties/service-akichi/service-akiya/subsidy/works.htmlが変更済み、images/配下に新規ファイル多数）

---

# 義翔工業HP 公開作業 引き継ぎ資料（更新版2）
(最終更新: 2026-07-03　この内容をそのまま新しい会話に貼り付ければ作業を再開できます)
(注意: 前回のHANDOFF.mdが原因不明で消えていたため、念のためデスクトップ直下にも同内容を保存: C:\Users\User\Desktop\HANDOFF_gisho-akiya.md）

## 案件概要
- 株式会社義翔工業（山口県岩国市、空き家解体・空き地整備業）のHPを本番公開する
- サイト本体: C:\Users\User\Desktop\gisho-akiya（Gitリポジトリ、remote: https://github.com/xxta28xx0goedeiwo-hub/gisho-akiya.git）
- 公開中URL（GitHub Pages）: https://xxta28xx0goedeiwo-hub.github.io/gisho-akiya/
- 参考事例: K Hand WorksのHP C:\Users\User\Desktop\khandworks-hp。独自ドメイン k-handworks.com も既にCloudflareで取得済み
- 目的: 来月（2026年8月頃）義翔工業主催の花火大会に向けて、HPを一般公開・チラシにQRコードを掲載したい

## 確定事項
1. ドメイン候補: `gishou-kougyou.com`（Cloudflare Registrar、$10.46/年）。チラシに載せるためURLは変更したくない方針
2. お問い合わせ送信先メール: `gisyou.kougyou@grace.ocn.ne.jp`（ドットあり、確定）。まずは管理者Gmail `xxta28xx.0goede.iwo@gmail.com` への送信を優先実装済み。義翔工業のメールアドレスをFormspreeに追加するのはユーザー判断で後回し
3. works.html（施工実績、仮データ6件）は「ただいま準備中」表示に差し替え済み

## 完了した作業（すべて確認・動作テスト済み）
1. company.html / index.html のメールアドレス誤記修正（gisyoukougyou@ → gisyou.kougyou@）
2. works.html の仮データ6件を削除し「準備中」案内に差し替え
3. company.html にGoogleマップをiframeで埋め込み（APIキー不要の`output=embed`形式）
4. Formspreeアカウント作成・確認完了
   - ログイン: xxta28xx.0goede.iwo@gmail.com（パスワードはユーザー本人が把握）
   - フォームID: `xwvdapea`（エンドポイント: https://formspree.io/f/xwvdapea）
   - Email通知の送信先を xxta28xx.0goede.iwo@gmail.com に設定・保存済み
5. contact.html のフォームを実際に動作するよう書き換え済み（action=Formspreeエンドポイント、_subject隠しフィールド追加、デモ注記削除）
6. 実際に動作確認テスト完了：テスト送信→Gmailに着信確認済み（ユーザー本人確認済み、文字化けなし）
7. 上記すべての変更を commit & push 済み（コミット `64d4934`、GitHub Pagesに反映済みのはず）

## 現在の状況：ドメイン購入は客先確認待ちで一時停止中
- Cloudflareにログイン済み（アカウントID: `4b9f20c39f74731db13d8f2a990dfc2e`、ログインメール xxta28xx.0goede.iwo@gmail.com）
- `gishou-kougyou.com` を検索・カート追加し、チェックアウト画面（登録者情報入力）まで到達
- 登録者情報の「組織」欄は前回(K Hand Works)の初期値が残っていたため `Gishou Kougyou Co., Ltd.` に修正済み。名前(TATSUYA KAWADA)・電話・住所はK Hand Works登録時のデフォルトのまま
- **ユーザーの判断で、決済前に客先（義翔工業）へ以下2点の確認を取ることになり、購入を一時停止中**:
  1. ドメイン名「gishou-kougyou.com」でよいか
  2. 組織の英語表記「Gishou Kougyou」でよいか
  - Claudeが客先確認用メッセージ文面をこの会話内で作成済み（下書きはこのファイルには保存していないので、再度必要なら同じ趣旨で作成し直すこと。要点: URLは一度チラシに載せると変更が手間なので事前確認したい、という主旨）
- 客先の確認が取れ次第、Cloudflareのチェックアウト画面から再開する。決済（クレジットカード情報の入力）はユーザー本人が行う必要がある（Claudeは代行不可）
- 再開手順: Cloudflareダッシュボード（https://dash.cloudflare.com/4b9f20c39f74731db13d8f2a990dfc2e/home）→ 左メニューまたはRecentsから「ドメイン登録」→「ドメインを購入」→ `gishou-kougyou.com` を再検索して購入手続き
- （不具合メモ）ドメイン登録関連ページはURL直打ちだと読み込みが止まることがあった。ダッシュボードホームのUIリンク経由なら正常に開けた

## まだ完了していない作業
1. Cloudflareでドメイン購入完了（客先確認待ち、上記参照）
2. ドメイン購入後、DNSをGitHub Pagesに向ける
   - Aレコード: 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
   - gisho-akiyaリポジトリ直下にCNAMEファイル（中身1行: `gishou-kougyou.com`）を追加してpush
   - GitHubの Settings → Pages でカスタムドメイン設定 + Enforce HTTPS
3. Formspreeに `gisyou.kougyou@grace.ocn.ne.jp` を追加（ユーザーが後回しにした分。方法: https://formspree.io/account の「Linked Emails」→「+ Add Email」で追加、確認メールのリンククリックが必要）
4. QRコード作成（独自ドメインが実際に表示されることを確認してから、そのURLで作成する）

## 再開時の最初の一手
1. 客先（義翔工業）からドメイン名・組織表記の確認が取れたか確認する
2. OKなら、Cloudflareでドメイン購入を完了（決済はユーザー本人）
3. DNS設定（Aレコード）とCNAMEファイルの追加
4. GitHub PagesのカスタムドメインとHTTPS設定
5. Formspreeに義翔工業メールを追加（任意、後回し可）
6. 最後にQRコード作成
