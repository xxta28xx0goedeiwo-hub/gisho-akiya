# 施工実績ページ（/works/ 配下）の増やし方

1案件＝1HTMLファイルで、地域名＋工種でGoogle検索に引っかかるようにするための仕組みです。
（例: 「岩国市◯◯町 木造2階建て解体工事」のようにtitle/h1が組み立たるようにする）

## 新しい案件ページを追加する手順

1. `works/template.html` をコピーし、`works/<案件slug>.html` として保存する
   - slug例: `iwakuni-heiwa-akiya`（地域名ローマ字＋工種略で分かりやすく）
2. コピーしたファイル内の `{{ }}` で囲まれた箇所をすべて実データに置き換える
   - 必要な情報: 施工場所（市町名まで。番地・施主名など個人情報は書かない）／工種／建物種別・規模／工期／担当者コメント
   - 上記メモと写真（施工前・施工後）を渡してもらえれば、このテンプレートに沿ってページを生成できる
3. 写真を `images/works/<案件slug>/` に配置する
   - 命名: 施工前 `before-01.jpg`, `before-02.jpg`... ／施工後 `after-01.jpg`, `after-02.jpg`...
   - 個人情報（施主名・番地の入った看板・伝票等）が写り込んでいないか必ず確認してから使用する
4. `../works.html` の一覧（`works-grid-full` 内）にカードを1枚追加し、新しいページへリンクする
   ```html
   <div class="work-card" data-category="空き家解体">
     <div class="work-img">
       <img src="images/works/<slug>/after-01.jpg" alt="..." loading="lazy">
     </div>
     <div class="work-body">
       <span class="work-tag">空き家解体</span>
       <h3><a href="works/<slug>.html">◯◯市 木造2階建て解体工事</a></h3>
       <p>山口県◯◯市</p>
     </div>
   </div>
   ```
5. `../sitemap.xml` に新URL（`https://gishou-kougyou.com/works/<slug>.html`）を追加する
6. ローカルで表示確認してから commit・push（デプロイは人間の承認後）

## 注意
- 施主名・番地など個人情報は一切記載しない（市区町村名までに留める）
- 費用金額など未確認の情報は書かない、または「要確認」と明記する
- JSON-LD（LocalBusinessのNAP情報）はテンプレートに含まれているため書き換え不要（telephone/address等は他ページと共通で固定値）
