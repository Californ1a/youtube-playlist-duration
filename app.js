// Load the entire playlist by clicking the 'Load More' button repeatedly
let callback;

// Converting Seconds to HH MM SS
function secondsToHMS(d) {
	const a = Number(d);
	const h = Math.floor(a / 3600);
	const m = Math.floor((a % 3600) / 60);
	const s = Math.floor(a % 3600 % 60);
	// return ((h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s);
	return (`${(h > 0 ? `${h}:${m < 10 ? '0' : ''}` : '')}${m}:${s < 10 ? '0' : ''}${s}`);
}

function getDuration() {
	const timeStamp = document.querySelectorAll('.timestamp span');
	let totalDurationInSeconds = 0;
	let hours;
	let minutes;
	let seconds;
	// Runs the loop and fetches the total duration in seconds
	for (let i = 0; i < timeStamp.length; i++) {
		const timeString = timeStamp[i].innerHTML;
		const HMS = timeString.split(':');
		if (HMS.length === 3) {
			hours = parseInt(HMS[0], 10);
			minutes = parseInt(HMS[1], 10);
			seconds = parseInt(HMS[2], 10);
		} else {
			hours = 0;
			minutes = parseInt(HMS[0], 10);
			seconds = parseInt(HMS[1], 10);
		}
		totalDurationInSeconds += hours * 3600 + minutes * 60 + seconds;
	}

	return secondsToHMS(totalDurationInSeconds);
}

// Create div and style it
function finalDiv() {
	const header = document.querySelector('#masthead-appbar-container > div:nth-child(1) > p');
	const duration = document.querySelector('#masthead-appbar-container > div:nth-child(1) > span');
	header.textContent = 'Playlist Duration';
	duration.textContent = getDuration();
}

const totalVideos = document.querySelector('#pl-header > div.pl-header-content-container > div.pl-header-content-front > div.pl-header-content.privacy-icon-present.is-editable > ul > li:nth-child(2)').textContent.split(' ')[0];

// Create div and style it
function createDiv() {
	window.scrollTo(0, 0);
	const parentElement = document.getElementById('masthead-appbar-container');
	const firstChildElement = parentElement.firstChild;

	const timeStampDiv = document.createElement('div');
	// const HMSDuration = getDuration();
	const textNodeText = document.createTextNode(`0/${totalVideos}`);
	const headerPara = document.createElement('p');
	const headerText = document.createTextNode('Loading...');
	const durationSpan = document.createElement('span');
	timeStampDiv.style.cssText = 'right: 0px; height: 32px;color: #767676; position: fixed; float: right; display: inline-block; z-index: 1; padding: 3px; text-align: center; border-radius: 2px; border-style: dotted; background-color: rgba(255, 255, 255, 0.74902);';
	headerPara.appendChild(headerText);
	headerPara.style.cssText = 'font-weight: 500; color: #404040;';
	durationSpan.appendChild(textNodeText);
	timeStampDiv.appendChild(headerPara);
	timeStampDiv.appendChild(durationSpan);
	parentElement.insertBefore(timeStampDiv, firstChildElement);
}

// Clicks the 'Load More' button
function loadMore() {
	const duration = document.querySelector('#masthead-appbar-container > div:nth-child(1) > span');
	const loadedVideos = document.getElementById('pl-load-more-destination').children.length;
	duration.textContent = `${loadedVideos}/${totalVideos}`;

	const loadButton = document.querySelector('.load-more-button');
	if (loadButton !== null) {
		loadButton.click();
	} else {
		clearInterval(callback);
		finalDiv();
	}
}

createDiv();

callback = setInterval(loadMore, 250);
