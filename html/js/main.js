var taskname = document.getElementsByClassName('taskname');

var altHidden = (evento) => {
		var display = evento.target.parentElement.parentElement.getElementsByTagName('p')[0].hidden;

		if (!display) {
			display = true;

		}else{
			display = false
		}
		evento.target.parentElement.parentElement.getElementsByTagName('p')[0].hidden = display;
	}

function newElement(element, className, id) {
	var div = document.createElement(element);
	div.className = className
	div.id = id

	return div
}

function addTask(info) {
	var tasklist = document.getElementById(info.id);
	var task  = newElement('div','task', '');
	var taskname = newElement('div','', 'taskname')
	var span = newElement('span','taskname','')
	var p = newElement('p','', 'descricao')

	task.draggable = true;
	span.addEventListener('click', altHidden, false)
	span.innerText = '+ ' + info.name;
	p.innerText = info.des;

	taskname.appendChild(span)
	task.appendChild(taskname)
	task.appendChild(p)
	console.log(info['this'].nextSibling)
	tasklist.insertBefore(task, info['this'].nextSibling)
}

for (var tag of taskname) {
	tag.addEventListener('click', 
	altHidden
	, false)

}

