'use strict';
const socket = io();

function loginUser() {
    let userInput = document.getElementById('userInput');
    let userLogin = document.getElementById('userLogin');
    let errorMsgNode = document.getElementById('userError');

    socket.emit('getUserCodes');
    socket.on('returnUserCodes', function(userCodes) {
	for (let code of userCodes) {
	    if (userInput.value == code) {
          localStorage.setItem("code", userInput.value);
		window.location.href = "http://localhost:3000/user/profile";
		return;
	    }
	}
	printErrorMsg(errorMsgNode,"Ogitltig kod!");
	userInput.value = "";
    });
}

function showAdminLogin() {
    let popup = document.getElementById('adminLoginPopup');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    popup.style.display = "block";
    document.getElementById("adminUsername").focus();
}

function closeAdminLogin() {
    let popup = document.getElementById('adminLoginPopup');
    let errorMsg = document.getElementById('adminError');
    popup.style.display = "none";
    if (errorMsg.childNodes[0]) {
	errorMsg.removeChild(errorMsg.childNodes[0]);
    }
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'none';
}


document.onkeydown = function(){
    if(document.getElementById('adminLoginPopup').style.display == 'block') {
	
	if(window.event.keyCode == '13') {
	    loginAdmin();
	}
    }
}


function loginAdmin() {
    let adminUsername = document.getElementById('adminUsername');
    let adminPassword = document.getElementById('adminPassword');
    let errorMsgNode = document.getElementById('adminError');

    socket.emit('checkLogin', adminUsername.value, adminPassword.value);

    socket.on('adminLoginRes', function(loginOk) {
	let login = loginOk;

	if (login) {
	    window.location.href = "http://localhost:3000/admin/start" + '#' + adminUsername.value;

	} else {
	    printErrorMsg(errorMsgNode, "Felaktigt lösenord");
	    adminUsername.value = "";
	    adminPassword.value = "";
	}
    });

}
