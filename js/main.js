function create(){
	var tasklist = document.getElementsByTagName('section')
	var task = document.createElement("div")
	task.class = 'task';
	task.appendChild(document.createElement('span'))
	"<div class='task'><span class='taskname'>Nome Tarefa</span><p>Decrição</p></div>"
	tasklist.appendChild(task)
}

function EnterMouse(button){
	button.style = 'color: blue;'
}

function LeaveMouse(button) {
	button.style = 'color : black;'
}

function Espanda(button) {
	// body...
	button.parentElement.children[1].style = 'display: none;'
	console.log(button.parentElement.children[1]);
}