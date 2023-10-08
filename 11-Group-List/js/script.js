import { items } from "./data.js";

const overlayEl = document.querySelector(".overlay");
const popupEl = document.querySelector(".popup");
const groupListEl = document.querySelector(".group-list");
const formEl = document.querySelector(".form");

// FUNCTIONS
function showPopup() {
	overlayEl.classList.add("overlay--show");
	popupEl.classList.add("popup--show");
}

function hidePopup() {
	overlayEl.classList.remove("overlay--show");
	popupEl.classList.remove("popup--show");
}

function generateGroupItemHTML() {
	const itemsList = JSON.parse(localStorage.getItem("items")) || items;
	groupListEl.innerHTML = "";

	const createNewGroupHTML = `
        <div class="group-item create-new-group">
            <div class="create-new-group__circle add-group">
                <img src="./images/add-icon.svg" alt="" />
            </div>
            <h2 class="create-new-group__heading">
                Create Group
            </h2>
        </div>
    `;

	const groupItemsHTML = itemsList
		.map(function (item) {
			return `
                <div class="group-item bs-primary" id="group-${item.id}">
                    <div class="circle">
                        <img
                            src="${item.imageURL}"
                            alt="account-1"
                            class="group__item-img-1"
                            height="72"
                            width="72" />
                    </div>
                    <h1 class="group-item__heading">${item.groupName}</h1>
                    <p class="group__item-total-member">${item.totalMember} members</p>
                    <div class="group__item-online-status"></div>
                </div>
        `;
		})
		.join("");

	return createNewGroupHTML + groupItemsHTML;
}

function render() {
	const groupItemHTML = generateGroupItemHTML();
	groupListEl.insertAdjacentHTML("beforeend", groupItemHTML);
}

render();

function handleFormSubmit(e) {
	e.preventDefault();
	if (!formEl.avatar.value || !formEl.name.value) return;

	const newGroup = {
		id: crypto.randomUUID(),
		imageURL: formEl.avatar.value,
		groupName: formEl.name.value,
		totalMember: 0,
	};

	items.push(newGroup);

	localStorage.setItem("items", JSON.stringify(items));

	generateGroupItemHTML();
	render();

	formEl.avatar.value = "";
	formEl.name.value = "";

	hidePopup();
}

// EVENT LISTENERS
window.addEventListener("click", function (e) {
	e.target.closest(".add-group") && showPopup();
	e.target.closest(".btn--close") && hidePopup();
});

formEl.addEventListener("submit", handleFormSubmit);
