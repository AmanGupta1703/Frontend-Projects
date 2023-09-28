const currentYear = document.querySelector(".current-year");
const formEl = document.querySelector("form");
const currencyListEl = document.querySelector("#currency-list");
const outputContainerEl = document.querySelector("#output-container");

// Gettting the current year
const year = new Date().getFullYear();
currentYear.textContent = year;

// API
const BASE_URL = "https://api.currencyapi.com/v3";
const API_KEY = "cur_live_4VGbxM4TTApV9GbrS9s7Knw66JVxE1MyJucm1YMx";
const BASE_CURRENCY_URL = `${BASE_URL}/latest?apikey=${API_KEY}`;
const currencyListURL = `${BASE_URL}/currencies?apikey=cur_live_4VGbxM4TTApV9GbrS9s7Knw66JVxE1MyJucm1YMx`;

function populate(baseValue, currency) {
	const baseURL = `${BASE_CURRENCY_URL}&base_currency=${currency}`;
	fetch(baseURL)
		.then((response) => response.json())
		.then((responseData) => {
			for (const key of Object.keys(responseData.data)) {
				const { code, value } = responseData.data[key];
				outputContainerEl.insertAdjacentHTML(
					"afterbegin",
					`<tr>
                        <td>${key}</td>
                        <td>${code}</td>
                        <td>${Math.round(value * baseValue)}</td>
                    </tr>`
				);
			}
		});
}

async function fetchAllCurrencies(url) {
	const response = await fetch(url);
	const currenciesList = await response.json();
	return currenciesList;
}

async function renderCurrencyList() {
	const currencyList = await fetchAllCurrencies(currencyListURL);
	return currencyList.data;
}

(async function () {
	const currencyList = await renderCurrencyList();

	for (const key of Object.keys(currencyList)) {
		const { code, name } = currencyList[key];
		currencyListEl.insertAdjacentHTML(
			"beforeend",
			`<option value="${code}">${name}</option>\n`
		);
	}
})();

// EVENT LSITENERS
formEl.addEventListener("submit", function (e) {
	e.preventDefault();

	if (!formEl.quantity.value || !formEl.currency.value) return;

	const value = parseInt(formEl.quantity.value);
	const currency = formEl.currency.value;

	console.log(value, currency);

	populate(value, currency);
});

window.addEventListener("DOMContentLoaded", function (e) {
	formEl.quantity.value = "";
	formEl.currency.value = "";
});
