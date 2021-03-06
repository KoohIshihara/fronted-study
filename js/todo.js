
$(function() {

  
  if(('localStorage' in window) && (window.localStorage !== null)) {
    // ローカルストレージが使える

  } else {
    // ローカルストレージが使えない
      alert("ブラウザをアップデートしてー");
  }


});

// todoListを新規に追加する関数
function addTodo() {
  
  // テキストボックスの中身を取得
  var text = document.getElementById("newTodoText").value;
  
  // テキストの中身が未入力の場合
  if(text.length == 0){
    alert("todoが入力されてないよ！");
    return;
  }

  // ToDoのli要素を作成して追加
  var li = createTodoLi(text);
  $("#todoLs").append(li);

  // テキストボックスの中身を空にする。
  document.getElementById("newTodoText").value = "";

  // 今のtodoを保存
  saveTodo();

}


//こいつを作成する関数
//<li class='todo-li'><input type='checkbox' onchenge="saveTodo();"><span class='todo-text'>text</span><input type="button" value="change" onclick="changeTodo();"></li>
function createTodoLi( _text ){

  var li = $("<li></li>");
  li.addClass("todo-li");

  var input = $("<input>");
  input.attr('type', 'checkbox');
  input.change(saveTodo);
  li.append(input);

  var span = $("<span></span>");
  span.addClass("todo-text");
  span.append(_text);
  li.append(span);

  var input = $("<input>");
  input.attr('type', 'button');
  input.attr('value', 'change');
  input.on('click',changeTodo);
  li.append(input);

  return li;

}


// ローカルストレージにtodoを保存する関数
function saveTodo(){
  
  // 表示しているtodoのli数を取得
  var liCount = $(".todo-li").length;

  // オブジェクトのプロパティにデータを格納
  var liInfo = {};
  // li要素を全て取得
  var todoLies= $("#todoLs li");

  for(var i=0; i < liCount; i++){

    var li = $(todoLies[i]);
    var text = li.find(".todo-text").text();
    var check = li.find("input").prop('checked');
    // フォーマットは{text: str, checked: bool}
    liInfo[i] = {text: text, checked: check};

  }

  // JSONtoStr
  var liInfo_str = JSON.stringify(liInfo);

  // str化したデータを保存
  localStorage.setItem('liInfo_str', liInfo_str);

}

// ローカルストレージの読み込みと反映
function loadTodo(){

  // todoLsの中を空にする
  $("#todoLs").empty();

  // 読み込みと文字列toJSON
  var loadedLiInfo_str = localStorage.getItem('liInfo_str');
  var loadedLiInfo = JSON.parse(loadedLiInfo_str);

  // todoリストの数を取得
  var counter = 0;
  for (var j in loadedLiInfo) {
      counter++;
  }

  // todoリストを要素化して全て追加する
  for(var i=0; i<counter ;i++){

    var li = createTodoLi(loadedLiInfo[i].text);
    li.find("input").prop("checked", loadedLiInfo[i].checked);
    $("#todoLs").append(li);

  }

}

// チェックのついたtodoを削除する
function removeCheckedTodo(){

  // 表示しているtodoのli数を取得
  var liCount = $(".todo-li").length;

  // オブジェクトのプロパティにデータを格納
  var liInfo = {};
  var liInfoAddedCounter = 0;

  // li要素を全て取得
  var todoLies= $("#todoLs li");

  for(var i=0; i < liCount; i++){

    var li = $(todoLies[i]);
    var text = li.find(".todo-text").text();
    var check = li.find("input").prop('checked');
    // checkが付いていない時のみ追加
    if( check == false ){
      liInfo[ liInfoAddedCounter ] = {text: text, checked: check};
      liInfoAddedCounter++;
    }

  }

  // JSONtoStr
  var liInfo_str = JSON.stringify(liInfo);
  // str化したデータを保存
  localStorage.setItem('liInfo_str', liInfo_str);

  loadTodo();

}


// 選択したTodoの中身を変更する関数
function changeTodo(){

  // 変更したいliを取得
  var changeLi = $(this).parent();
  // 変更が何番目のデータか
  var index = $('.todo-li').index(changeLi);
  
  // 読み込みと文字列toJSON
  var loadedLiInfo_str = localStorage.getItem('liInfo_str');
  var loadedLiInfo = JSON.parse(loadedLiInfo_str);

  // 変更前のテキスト
  var beforeText = loadedLiInfo[ index ].text;

  // 変更するテキストを取得
  var afterText = prompt("変更内容を入力してー", beforeText);

  if(afterText.length == 0){
    alert("todoが入力されていません。");
    return;
  }

  // データの変更と保存
  loadedLiInfo[ index ].text = afterText;
  // JSONtoStr
  var liInfo_str = JSON.stringify( loadedLiInfo );
  // str化したデータを保存
  localStorage.setItem('liInfo_str', liInfo_str);
  // viewへの反映
  loadTodo();
    

}




