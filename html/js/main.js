var taskname = document.getElementsByClassName('taskname');
var numberIdTask = 01; // Id temporario, o id final sera o id da task do google
var numberIdList = 01;

var remove = (evento) => {
	evento.target.parentElement.remove();
}

var altHidden = (evento) => {

		var hidden = evento.target.parentElement.parentElement.getElementsByTagName('p')[0].hidden;

		if (hidden) {
			hidden = false;
			evento.target.classList.remove('icon-plus');
			evento.target.classList.add('icon-minus');
		}else{
			hidden = true
			evento.target.classList.remove('icon-minus');
			evento.target.classList.add('icon-plus');
		}
		evento.target.parentElement.parentElement.getElementsByTagName('p')[0].hidden = hidden;
	}

function addList(info){
	var target = document.getElementById('addList');
	var section = document.getElementById('section')

	var list = newElement('div', 'tasklist', info.id)
	var title = newElement('div', 'tasktitle')
	var button = newElement('button', 'add-button', '')
	
	button.onclick = function () {addTask({'this':this, 'id':this.parentElement.id,'name':'Teste 01', 'des':'Top top top'})}
	button.innerText = 'Add task'
	title.innerText = info.nameList
	title.appendChild(newElement('hr', '', 'hr'))
	list.appendChild(title)
	list.appendChild(button)

	section.insertBefore(list, target)

	numberIdList++;
}


function newElement(element, className, id) {
	var div = document.createElement(element);
	div.className = className
	div.id = id

	return div
}

function addTask(info) {
	var tasklist = document.getElementById(info.id);
	var task  = newElement('div','task', numberIdTask);
	var taskname = newElement('div','', 'taskname')
	var spanDelete =  newElement('span', 'icon-trash-can')
	var spanTaskname = newElement('span','taskname icon-plus','')
	var p = newElement('p','', 'descricao')

	task.draggable = true;
	spanDelete.addEventListener('click', remove, false)
	spanTaskname.addEventListener('click', altHidden, false)
	spanTaskname.innerText = info.name;
	p.innerText = info.des;
	p.hidden = true;

	taskname.appendChild(spanTaskname)
	task.appendChild(spanDelete)
	task.appendChild(taskname)
	task.appendChild(p)
	numberIdTask++;
	//console.log(info['this'].nextSibling)
	//tasklist.insertBefore(task, info['this'].nextSibling)
	tasklist.appendChild(task)
}

for (var tag of taskname) {
	tag.addEventListener('click', 
	altHidden
	, false)

}

