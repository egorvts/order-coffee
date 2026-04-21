const beverageForm = document.querySelector(".beverage");
const addButton = document.querySelector(".add-button");
const orderForm = document.querySelector("form");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const modalCloseButton = document.querySelector(".modal-close-button");
const modalText = document.querySelector(".modal-text");
const orderTableBody = document.querySelector(".order-table-body");

const forms = [beverageForm];
let beverageNumber = 1;

function getBeverageWord(number) {
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "напитков";
    }

    const lastDigit = number % 10;

    if (lastDigit === 1) {
        return "напиток";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return "напитка";
    }

    return "напитков";
}

function getSelectedText(select) {
    return select.options[select.selectedIndex]?.textContent.trim() || "";
}

function getMilkText(form) {
    const milk = form.querySelector('input[type="radio"]:checked');
    return (
        milk.closest("label")?.querySelector("span")?.textContent.trim() || ""
    );
}

function getOptionsText(form) {
    const options = Array.from(
        form.querySelectorAll('input[type="checkbox"]:checked'),
    );

    if (options.length === 0) {
        return "";
    }

    return options
        .map(
            (checkbox) =>
                checkbox
                    .closest("label")
                    ?.querySelector("span")
                    ?.textContent.trim() || "",
        )
        .join(", ");
}

function highlightWishes(text) {
    const words = [
        "срочно",
        "быстрее",
        "побыстрее",
        "скорее",
        "поскорее",
        "очень нужно",
    ];
    let result = text;

    words.forEach((word) => {
        const regex = new RegExp(`(${word})`, "gi");
        result = result.replace(regex, "<b>$1</b>");
    });

    return result;
}

function getWishesText(form) {
    const textarea = form.querySelector(".wishes-textarea");
    return textarea ? textarea.value : "";
}

function renderOrderTable() {
    while (orderTableBody.firstChild) {
        orderTableBody.removeChild(orderTableBody.firstChild);
    }

    forms.forEach((form) => {
        const row = document.createElement("tr");
        const beverageCell = document.createElement("td");
        const milkCell = document.createElement("td");
        const optionsCell = document.createElement("td");
        const wishesCell = document.createElement("td");

        beverageCell.textContent = getSelectedText(
            form.querySelector("select"),
        );
        milkCell.textContent = getMilkText(form) || "—";
        optionsCell.textContent = getOptionsText(form) || "—";
        wishesCell.innerHTML = highlightWishes(getWishesText(form)) || "—";

        row.append(beverageCell, milkCell, optionsCell, wishesCell);
        orderTableBody.appendChild(row);
    });
}

function prepareBeverageForm(form, number) {
    Array.from(form.classList).forEach((className) => {
        if (className.startsWith("number-")) {
            form.classList.remove(className);
        }
    });

    form.classList.add(`number-${number}`);
    form.querySelector(".beverage-count").textContent = `Напиток №${number}`;

    form.querySelectorAll("input").forEach((input) => {
        if (!input.dataset.baseName) {
            input.dataset.baseName = input.name;
        }

        input.name = `${input.dataset.baseName}-${number}`;
    });

    const textarea = form.querySelector(".wishes-textarea");
    const wishesOutput = form.querySelector(".wishes-output");

    if (textarea && wishesOutput) {
        textarea.addEventListener("input", function () {
            wishesOutput.innerHTML = highlightWishes(this.value) || "";
        });
    }
}

prepareBeverageForm(beverageForm, beverageNumber);

addButton.addEventListener("click", function () {
    beverageNumber += 1;

    const newBeverageForm = beverageForm.cloneNode(true);
    prepareBeverageForm(newBeverageForm, beverageNumber);

    forms.push(newBeverageForm);
    orderForm.appendChild(newBeverageForm);
});

orderForm.addEventListener("click", function (event) {
    const closeButton = event.target.closest(".close");

    if (!closeButton || forms.length === 1) {
        return;
    }

    const form = closeButton.closest(".beverage");
    const formIndex = forms.indexOf(form);

    if (formIndex !== -1) {
        forms.splice(formIndex, 1);
    }

    form.remove();
});

orderForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const beverageCount = forms.length;

    modalText.textContent = `Вы заказали ${beverageCount} ${getBeverageWord(beverageCount)}`;
    renderOrderTable();
    modal.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
});

modalCloseButton.addEventListener("click", function () {
    modal.classList.add("hidden");
    modalOverlay.classList.add("hidden");
});
