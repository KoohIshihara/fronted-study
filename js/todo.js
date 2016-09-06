
$(function() {

	

});


function addTodo() {
	
	var text = document.getElementById("newTodoText").value;
	
	if(text.length == 0){

		alert("todoが入力されてないよ！");
		return;

	}

	var insert = "<li><input type='checkbox'>"+text+"</li>";

	$("ls").append(insert);

}
