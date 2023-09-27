const resultContainer = document.getElementById("result-container");
const inputEl = document.querySelector('[type="email"]');
const submitBtn = document.querySelector("#submit-btn");

async function fetchData(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

function clearResultContainer() {
	resultContainer.innerHTML = "";
}

const API_KEY = "ema_live_0kO2xiPr7iG4jsABa6NweExTb8mBfMl1DiNOLUfv";

window.addEventListener("DOMContentLoaded", function () {
	inputEl.focus();
});

submitBtn.addEventListener("click", async function (e) {
	e.preventDefault();
	clearResultContainer();

	if (!inputEl.value) return;

	resultContainer.insertAdjacentHTML(
		"afterbegin",
		'<img src="./images/loading.svg" alt="loading" width="50px" />'
	);

	const email = inputEl.value;
	const url = `https://api.emailvalidation.io/v1/info?apikey=${API_KEY}&email=${email}`;
	const result = await fetchData(url);

	clearResultContainer();
	let str = "<h2>Your Results</h2>";

	for (key of Object.keys(result)) {
		if (result[key] !== "" && result[key] !== " ") {
			str += `<p><strong>${key}</strong>: ${result[key]}</p>\n`;
		}
	}

	resultContainer.insertAdjacentHTML("afterbegin", str);
	inputEl.value = "";
});
