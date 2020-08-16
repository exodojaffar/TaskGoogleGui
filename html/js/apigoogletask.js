// Client ID and API key from the Developer Console
var CLIENT_ID = '999946402838-24akarsvmok11b3ttrplp43ckl0ob6jp.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBn5RGcN8pbZsiI5vu02Eq7-xW2dhI8bJg';

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];
var SCOPES = "https://www.googleapis.com/auth/tasks";

var authorizeButtons = document.querySelectorAll('#item.login');
var signoutButton = document.querySelector("#item.logout")

let tasklists = [];

function insertTasklists(){
	tasklists.forEach((tasklist) => {
		if(tasklist.task.length >0 ){
			// console.log(tasklist.name + ":");
			// Add tasklist
			addList({nameList: tasklist.name, id:tasklist.id})
			tasklist.task.forEach((task) => {
				// console.log("\t" + task.name + "=>" + task.notes)
				// add taks for tasklist use id
				addTask({id:tasklist.id, name:task.name, des: task.notes, idTask: task.id})
			})
		}
	});
}

function getTasks(id_taskslist) {
	let tasks = []

	gapi.client.tasks.tasks.list(
		{
			'tasklist':id_taskslist
		}
	).then(
		function(argument) {
			var items = argument.result.items;
			if (items && items.length > 0) {
				
				for (var i = 0; i < items.length; i++) {
					tasks.push({'name': items[i].title, 'id':items[i].id, 'notes':items[i].notes})
				}
				
			}
		}
	);

	return tasks
}

function setExamplesHidden (mode) {
	document.querySelector('#tasklist1').style.display = mode
	document.querySelector('#tasklist2').style.display = mode
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
	gapi.client.init({
		apiKey: API_KEY,
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
		//,
		//ux_mode:'redirect' Precisa de mais configurações no OAuth do Google no site 'developer'
	}).then(
		function () {
			// Listen for sign-in state changes.
			gapi.auth2.getAuthInstance().isSignedIn.listen(updateLogin);

			// Handle the initial sign-in state.
			updateLogin(gapi.auth2.getAuthInstance().isSignedIn.get());
			authorizeButtons.forEach(button => {
				button.onclick = handleAuthClick;
			});
			signoutButton.onclick = handleSignoutClick;

			// Teste

		},
		function(error) {
			console.log(JSON.stringify(error, null, 2));
		}
	);
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateLogin(isSignedIn) {
	if (isSignedIn) {
		authorizeButtons.forEach(item => {  item.hidden = true;})
		
		signoutButton.hidden =false
		setExamplesHidden('none')
		getTaskLists()
		.then(insertTasklists)

	} else {
		tasklists = []
		authorizeButtons.forEach(item => {  item.hidden = false;})
		signoutButton.hidden =true
		setExamplesHidden('flex')
	}
}

//Get Tasklists and tasks 
async function getTaskLists() {
	await gapi.client.tasks.tasklists.list().then(
		function(response) {
			var taskLists = response.result.items;
			if (taskLists && taskLists.length > 0) {
				for (var i = 0; i < taskLists.length; i++) {
					var taskList = taskLists[i];

					var task = getTasks(taskList.id)
					tasklists.push({'name':taskList.title, 'id':taskList.id, 'task':task})
				}
			} 
		}
	);
}