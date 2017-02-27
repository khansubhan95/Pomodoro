function correctTime(c) {
	c = c+'';
	if (c.length===1)
		return '0'+c;
	return c;
}

$(document).ready(function() {
	var session = 25;
	var interval = 5;
	var presentVal;
	var newVal;
	var sessionTime = session*60;
	var set = false;
	$("#session-plus").click(function() {
		var presentVal = parseInt($("#session-time").html());
		newVal = presentVal+1;
		session  = newVal;
		$("#session-time").html(session+'');
		$("#clock-time").html(session+'');
	});
	$("#session-minus").click(function() {
		var presentVal = parseInt($("#session-time").html());
		if (presentVal>=2) {
			newVal = presentVal-1;
			session  = newVal;
			$("#session-time").html(session+'');
			$("#clock-time").html(session+'');
		}
	});

	$("#break-plus").click(function() {
		var presentVal = parseInt($("#break-time").html());
		newVal = presentVal+1;
		interval  = newVal;
		$("#break-time").html(interval+'');
	});
	$("#break-minus").click(function() {
		var presentVal = parseInt($("#break-time").html());
		if (presentVal>=2) {
		newVal = presentVal-1;
		interval  = newVal;
		$("#break-time").html(interval+'');
	}
	});

	$("#play").click(function() {
		if (!set) {
			sessionTime = session*60-1;
			breakTime = interval*60-1;
			console.log(breakTime);
			set = true;
		}
		timerID = setInterval(function(){
			if (sessionTime>=0) {
				var mins = parseInt(sessionTime/60);
				var seconds = parseInt(sessionTime%60);
				mins = correctTime(mins);
				seconds = correctTime(seconds);
				$("#clock-time").html(mins+':'+seconds);
				sessionTime = sessionTime - 1;
				// if (sessionTime === 0)
				// 	$("#time-type").html('Break!');
			}
			else if (breakTime>=0) {
				$("#time-type").html('Break!');
				console.log('reached here');
				var mins = parseInt(breakTime/60);
				var seconds = parseInt(breakTime%60);
				mins = correctTime(mins);
				seconds = correctTime(seconds);
				$("#clock-time").html(mins+':'+seconds);
				breakTime = breakTime - 1;
			}
			else {
				set = false;
				$("#time-type").html('Session');
				clearInterval(timerID);
				$("#clock-time").html(session+'');
			}
		},1000);
	});

	$("#pause").click(function() {
		clearInterval(timerID);
	});

	$("#stop").click(function(){
		set = false;
		$("#time-type").html('Session');
		clearInterval(timerID);
		$("#clock-time").html(session+'');
	});

});