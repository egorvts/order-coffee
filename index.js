const beverage_form = document.querySelector(".beverage");

const add_button = document.querySelector(".add-button");

let beverage_count = 1;

add_button.addEventListener("click", function () {
    const new_beverage_form = beverage_form.cloneNode(true);
    beverage_count++;
    new_beverage_form.querySelector(".beverage-count").textContent =
        `Напиток №${beverage_count}`;
    beverage_form.parentNode.appendChild(new_beverage_form);
});
