const taskbarEl = document.querySelector(".taskbar");
const startMenuEl = document.querySelector(".start-menu");

taskbarEl.addEventListener("click", function () {
	startMenuEl.classList.toggle("show");
});
