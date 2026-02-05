window.addEventListener('error', function (err) {
	console.error(error);

	const errorLog = document.getElementById('error-log');
	if (errorLog) {
		const p = document.createElement('p');
		p.textContent = `Error: ${err.message || err.error}`;
		errorLog.appendChild(p);
	}
});

window.addEventListener('unhandledrejection', function (event) {
	console.error(event);
	
	const errorLog = document.getElementById('error-log');
	if (errorLog) {
		const p = document.createElement('p');
		p.textContent = `Unhandled Rejection: ${event.reason}`;
		errorLog.appendChild(p);
	}
});
