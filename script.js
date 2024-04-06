import { countryList } from "./codes.js";
let selects = document.querySelectorAll(".drop-down");
let api = "https://api.frankfurter.app/latest?amount=10&from=USD&to=INR";

selects.forEach((sel) => {

    // inserting all the country codes in the dropdown
    for(let code in countryList) {
        let option = document.createElement("option");
        option.value = code;
        option.innerText = code;
       sel.appendChild(option);

       if(code === "USD" && sel.name === "From") {
        option.selected = "selected";
       } else if(code === "INR" && sel.name === "To") {
        option.selected = "selected";
       }
    }

    // event listener if the state of select is changed
    sel.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

    // for updating flag if the state is changed
    const updateFlag = (element) => {
        let img = element.parentElement.querySelector("img");
        img.src = 'https://flagsapi.com/' + countryList[element.value] + '/flat/64.png';
    }
});

document.querySelector(".convert").addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".input").value;
    let url = "https://api.frankfurter.app/latest?amount=" + amount + "&from=" + selects[0].value + "&to=" + selects[1].value;
    let response = await (await fetch(url)).json();
    document.querySelector(".answer").innerText = response.rates[selects[1].value];
});
