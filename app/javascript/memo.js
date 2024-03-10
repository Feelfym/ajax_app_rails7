const buildHTML = (XHR) => {
  // レスポンスの中からpostの内容を抽出し、itemに格納
  const item = XHR.response.post;
  // 記述する内容を定義
  const html = `
    <div class = "post">
      <div class = "post-date">
        投稿日時:${item.created_at}
      </div>
      <div class = "post-content">
        ${item.content}
      </div>
    </div>`;
    // 記述される内容を戻り値として定義
  return html;
};


function post (){
  // id: "form" を持つHTML要素（フォーム）からハッシュを取得し、変数に格納する
  const form = document.getElementById("form");
  // SUBMITイベントが走ったとき、それを無効化し、後続の処理を行う
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // FormDataオブジェクトで、フォームに入力された要素を取得する。引数はさっき定義したform
    const formData = new FormData(form);
    // 非同期通信を行う
    // 非同期通信を行うためのXHRオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // XHRオブジェクトの中身を指定。HTTPメソッドはPOST、宛先パスは"/posts"、非同期通信はtrue
    XHR.open("POST", "/posts", true)
    // レスポンスタイプの指定。今からリクエストを投げるが、返事はjsonでくださいという指示
    XHR.responseType = "json";
    // フォームの内容をサーバに送信する（これにより、もとのSubmitを無効化してもリクエストは飛んでいく）
    XHR.send(formData)
    // もし送信に成功したら、{}内の処理を行う
    XHR.onload = () => {
      // HTTPステータスコードが200（正常）ではない場合、{}内の処理を実行
      if (XHR.status != 200) {
        // ステータスコードとステータスメッセージを表示するアラートを出す
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // JavaScriptの処理から抜け出す
        return null;
      }
      // ビューファイル内の”list”要素を取得し、listと定義
      const list = document.getElementById("list");
      // 入力フォームの情報を取得し、formTextと定義（フォームにid: "content" が付与されていることを確認する）
      const formText = document.getElementById("content");
      // list要素のあとに、buildHTML(XHR)を挿入
      list.insertAdjacentHTML("afterend", buildHTML(XHR))
      // 定義した入力フォームの値に、空白をセット
      formText.value = "";
    };
  });
};

window.addEventListener('turbo:load', post);