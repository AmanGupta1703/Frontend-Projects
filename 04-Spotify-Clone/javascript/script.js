import { songs } from "./data.js";

const masterPlayEl = document.querySelector("#master-play");
const myProgressBarEl = document.querySelector("#my-progress-bar");
const playingIconGifEl = document.querySelector("#playing-icon-gif");
const songItemContainerEl = document.querySelector(".song-item-container");
const previousBtnEl = document.querySelector("#previous");
const nextBtnEl = document.querySelector("#next");
const masterSongNameEl = document.querySelector("#master-song-name");

let songIndex = 1;
let audioElement = new Audio(`../songs/${songIndex + 1}.mp3`);

const renderSongs = songs
	.map((song, index) => {
		const { songName, _, coverPath, duration } = song;
		return `
            <div class="song-item">
                <img src="${coverPath}" alt="${songName}" />
                <span class="song-name">${songName}</span>
                <span class="song-list-play"
                    ><span class="time-stamp"
                        >${duration}
                        <i id=${
							index + 1
						} class="song-item-play far fa-play-circle"></i></span
                ></span>
            </div>
    `;
	})
	.join("");
songItemContainerEl.insertAdjacentHTML("afterbegin", renderSongs);

const playButtonEls = document.querySelectorAll(".song-item-play");

function makeAllPlays() {
	playButtonEls.forEach((playBtn) => {
		playBtn.classList.remove("fa-pause-circle");
		playBtn.classList.add("fa-play-circle");
	});
}

function updateAudioElement(songIndex) {
	audioElement.src = `../songs/${songIndex}.mp3`;
	audioElement.currentTime = 0;
	audioElement.play();
	masterPlayEl.classList.remove("fa-play-circle");
	masterPlayEl.classList.add("fa-pause-circle");
}

function masterPlaySong(songName) {
	masterSongNameEl.textContent = songName;
}

function updateMasterPlaySong(songIndex = 1) {
	const songName = songs.find((_, index) => index + 1 === songIndex).songName;
	masterPlaySong(songName);
}

function showPlayingGifIcon() {
	playingIconGifEl.classList.add("show");
}

// EVENT LISTENERS
playButtonEls.forEach(function (playButtonEl) {
	playButtonEl.addEventListener("click", function (e) {
		const target = e.target;
		const songName = e.target
			.closest(".song-item")
			.querySelector(".song-name").textContent;
		masterPlaySong(songName);
		songIndex = e.target.id;
		showPlayingGifIcon();
		makeAllPlays();
		target.classList.remove("fa-play-circle");
		target.classList.add("fa-pause-circle");
		updateAudioElement(songIndex);
	});
});

masterPlayEl.addEventListener("click", function () {
	if (audioElement.paused || audioElement.currentTime === 0) {
		const songName = songs.find(
			(_, index) => index + 1 === songIndex
		).songName;
		masterPlaySong(songName);
		audioElement.play();
		masterPlayEl.classList.remove("fa-play-circle");
		masterPlayEl.classList.add("fa-pause-circle");
		showPlayingGifIcon();
	} else {
		audioElement.pause();
		masterPlayEl.classList.add("fa-play-circle");
		masterPlayEl.classList.remove("fa-pause-circle");
		playingIconGifEl.classList.remove("show");
	}
});

audioElement.addEventListener("timeupdate", function () {
	const progress = parseInt(
		(audioElement.currentTime / audioElement.duration) * 100
	);
	myProgressBarEl.value = progress;
});

myProgressBarEl.addEventListener("change", function () {
	audioElement.currentTime =
		(myProgressBarEl.value * audioElement.duration) / 100;
});

previousBtnEl.addEventListener("click", function () {
	if (songIndex <= 1) songIndex = songs.length;
	else songIndex -= 1;
	updateMasterPlaySong(songIndex);
	updateAudioElement(songIndex);
	showPlayingGifIcon();
});

nextBtnEl.addEventListener("click", function () {
	if (songIndex > songs.length - 1) songIndex = 1;
	else songIndex += 1;
	updateMasterPlaySong(songIndex);
	updateAudioElement(songIndex);
	showPlayingGifIcon();
});
