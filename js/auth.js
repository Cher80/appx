function getSessionId() {
	return $.pgwCookie({ name: 'myNewsSessionId' });
}

function getSessionKey() {
	return $.pgwCookie({ name: 'myNewsSessionKey' });
}

function getClientId() {
	return $.pgwCookie({ name: 'clientId' });
}

function getClientName() {
	return $.pgwCookie({ name: 'clientName' });
}

function hasClient() {
	return (getClientId() != undefined);
}

function saveClient(client) {
    /*alert('id: ' + client.id);
	alert('name: ' + client.name);
	alert('status: ' + client.status);
	alert('created: ' + client.created);*/
	$.pgwCookie({ name: 'clientId', value: client.id });
	$.pgwCookie({ name: 'clientName', value: client.name });
}

function saveSession(session) {
	$.pgwCookie({ name: 'myNewsSessionId', value: session.id });
	$.pgwCookie({ name: 'myNewsSessionKey', value: session.key });
}

function login(clientId) {
	$.ajax({
		  type: 'POST',
		  url: '../api/1_0/clients/' + clientId + '/login',
		  data: '',
		  dataType: 'json',
		  timeout: 300,
		  context: $('body'),
		  success: function(data) {
			  var session = data.session;
			  var clients = data.clients;
			  if (clients.length > 0 && session != undefined) {
				  saveClient(clients[0]);
				  saveSession(session);
				  onAuthenticated();
			  } else {
				  onAuthenticationError();
			  }
		  },
		  error: function(xhr, type){
			  onAuthenticationError();
		  }
	});
}

function register(name) {
	$.ajax({
		  type: 'POST',
		  url: 'http://127.0.0.1/api/1_0/clients/register',
		  data: '{ name: "' + name + '" }',
		  dataType: 'json',
		  timeout: 300,
		  context: $('body'),
		  success: function(data) {
			  var session = data.session;
			  var clients = data.clients;
			  if (clients.length > 0 && session != undefined) {
				  saveClient(clients[0]);
				  saveSession(session);
				  onAuthenticated();
			  } else {
				  onAuthenticationError();
			  }
		  },
		  error: function(xhr, type){
			  onAuthenticationError();
		  }
	});	
}