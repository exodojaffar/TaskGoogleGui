let taskname = document.getElementsByClassName('taskname');

for (var tag of taskname) {
	tag.addEventListener('click', 
	function(evento){
		var display = evento.target.parentElement.parentElement.getElementsByTagName('p')[0].hidden;

		if (!display) {
			display = true;

		}else{
			display = false
		}
		evento.target.parentElement.parentElement.getElementsByTagName('p')[0].hidden = display;
	}
	, false)

}


function Espanda(button) {
	// body...
	button.parentElement.children[1].style = 'display: none;'
	console.log(button.parentElement.children[1]);
}