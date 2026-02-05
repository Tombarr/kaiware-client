import { Kaiware } from '@nothing-special/kaiware-lib/lib';

function getQueryParam(name: string, defaultValue: string): string {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name) || defaultValue;
}

let kaiware: Kaiware | null = null;

async function start() {
	kaiware = new Kaiware({
		deviceId: getQueryParam('deviceName', 'My Device').toLowerCase().replace(/ /g, '-'),
		deviceName: getQueryParam('deviceName', 'My Device'),
		address: getQueryParam('address', '192.168.0.1'),
		port: parseInt(getQueryParam('port', '3000')),
		sourceId: 'my-app',
		enableConsoleLogHook: true,
		enableConsoleWarnHook: true,
		enableConsoleErrorHook: true,
		enableGlobalErrorListener: false,
		enableNetworkRequestHook: true
	});
	kaiware.connect();
}

start();

document.addEventListener('DOMContentLoaded', () => {
	const address = getQueryParam('address', '192.168.0.1');
	const port = getQueryParam('port', '3000');
	const connectionInfo = document.createElement('p');
	connectionInfo.textContent = `Connecting to: ${address}:${port}`;
	document.body.prepend(connectionInfo);
});

document.querySelector('#send-log-info')?.addEventListener('click', function () {
	kaiware?.log.info('This is an info message');
});
document.querySelector('#send-log-warn')?.addEventListener('click', function () {
	kaiware?.log.warn('This is a warning message');
});
document.querySelector('#send-log-error')?.addEventListener('click', function () {
	kaiware?.log.error(new Error('This is an error message'));
});
document.querySelector('#add-element')?.addEventListener('click', function () {
	addElement();
});

const buttons = Array.from(document.querySelectorAll('button'));

document.addEventListener('keydown', function (event) {
	if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

	const currentIndex = buttons.findIndex((button) => button === document.activeElement);
	let nextIndex = currentIndex;

	if (event.key === 'ArrowUp') {
		nextIndex--;
	} else if (event.key === 'ArrowDown') {
		nextIndex++;
	}

	if (!buttons[nextIndex]) return;
	buttons[nextIndex].focus();
});

function addElement() {
	const element = document.createElement('div');
	element.textContent = 'New element';
	document.body.appendChild(element);
}
