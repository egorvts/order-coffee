const beverageForm = document.querySelector(".beverage");

const addButton = document.querySelector(".add-button");

const forms = [ { beverageForm, number: 1 }];

addButton.addEventListener("click", function () {
    const newBeverageForm = beverageForm.cloneNode(true);
    forms.append( {newBeverageForm, number: forms.length + 1});
    newBeverageForm.querySelector(".beverage-count").textContent =
        `Напиток №${forms.length + 1}`;
    beverageForm.parentNode.appendChild(newBeverageForm);
});

const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function () {
    if (forms.length > 1) {
        const lastForm = forms.pop();
        lastForm.beverageForm.remove();
    }
})