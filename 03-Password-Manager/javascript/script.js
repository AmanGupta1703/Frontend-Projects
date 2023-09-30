const formEl = document.querySelector(".form");
const passwordContainerEl = document.querySelector(".password-container");
const passwordListEl = document.querySelector(".password-list");
const tableEl = document.querySelector(".table");

function maskPassword(pass) {
	let str = "";
	for (let index = 0; index < pass.length; index++) {
		str += "*";
	}
	return str;
}

function deletePassword(id) {
	let data = JSON.parse(localStorage.getItem("passwords"));
	data = data.filter((item) => item.id !== id);
	localStorage.setItem("passwords", JSON.stringify(data));
}

function copyText(txt) {
	navigator.clipboard.writeText(txt).then(
		function () {
			document.querySelector(".alert").classList.add("show");
			const id = setTimeout(function () {
				document.querySelector(".alert").classList.remove("show");
			}, 3000);
			return function () {
				clearTimeout(id);
			};
		},
		function () {
			alert("Clipboard copying failed");
		}
	);
}

function updatePasswords() {
	console.log("HERE I'M");
	const data = JSON.parse(localStorage.getItem("passwords"));

	if (!data || !data.length) {
		passwordContainerEl.innerHTML = "";
		tableEl.style.display = "none";
		passwordContainerEl.insertAdjacentHTML(
			"afterbegin",
			`<p>No data to show.</p>`
		);
	} else {
		passwordListEl.innerHTML = "";
		tableEl.style.display = "block";
		let str = "";
		data.map((element) => {
			const { website, username, password, id } = element;
			str += `
                <tr class="password-item" id=item-${id}>
                    <td>
                        <span>${website}</span>
                        <img class="copy-btn" src="../images/copy.svg" alt="Copy Button" />
                    </td>
                    <td>
                        <span>${username}</span> 
                        <img class="copy-btn" src="../images/copy.svg" alt="Copy Button" />
                    </td>
                    <td>
                        <span>${maskPassword(password)}</span> 
                        <img class="copy-btn" src="../images/copy.svg" alt="Copy Button" />
                    </td>
                    <td>
                        <button class="btn-delete" id="${id}">
                            <img src="../images/bin.svg" alt="bin" />
                        </button>
                    </td>
                </tr>
        `;
			return str;
		});

		passwordListEl.insertAdjacentHTML("afterbegin", str);
	}
}

formEl.addEventListener("submit", function (e) {
	e.preventDefault();

	if (!formEl.username.value || !formEl.password.value) return;

	const website = formEl.website.value;
	const username = formEl.username.value;
	const password = formEl.password.value;

	const passwordsFromLocalStorage = localStorage.getItem("passwords");

	if (!passwordsFromLocalStorage) {
		const json = [];
		const newPassword = {
			username,
			password,
			website,
			id: crypto.randomUUID(),
		};
		json.push(newPassword);
		localStorage.setItem("passwords", JSON.stringify(json));
	} else {
		const json = JSON.parse(localStorage.getItem("passwords"));
		const newPassword = {
			username,
			password,
			website,
			id: crypto.randomUUID(),
		};
		json.push(newPassword);
		localStorage.setItem("passwords", JSON.stringify(json));
	}
	updatePasswords();
	formEl.reset();
});

passwordListEl.addEventListener("click", function (e) {
	if (e.target.closest(".btn-delete")) {
		deletePassword(e.target.closest(".btn-delete").id);
		updatePasswords();
	}
});

passwordContainerEl.addEventListener("click", function (e) {
	if (e.target.classList.contains("copy-btn")) {
		copyText(e.target.closest("td").firstElementChild.innerText);
	}
});

updatePasswords();
