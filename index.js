const beverageForm = document.querySelector(".beverage");
const addButton = document.querySelector(".add-button");
const orderForm = document.querySelector("form");

const forms = [beverageForm];
let beverageNumber = 1;

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
