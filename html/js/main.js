var taskname = document.getElementsByClassName('taskname');

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
	var span = newElement('span','taskname icon-minus','')
	var p = newElement('p','', 'descricao')

	task.draggable = true;
	span.addEventListener('click', altHidden, false)
	span.innerText = info.name;
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

