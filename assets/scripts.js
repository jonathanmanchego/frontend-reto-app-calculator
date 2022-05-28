let valorTip = 0;
let valorBill = 0;
let numeroPersonas = 0;

const iniciarButtons = () => {
  const buttons = document.querySelectorAll(".button-tip");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log(event);
      const buttonClicked = event.target;
      const classes = Array.from(buttonClicked.classList);
      if (classes.find((item) => item === "active")) {
        buttonClicked.classList.remove("active");
        valorTip = 0;
      } else {
        buttons.forEach((btn) => btn.classList.remove("active"));
        buttonClicked.classList.add("active");
        const value = buttonClicked.value.split("%")[0];
        valorTip = Number(value);
        getValues();
      }
    });
  });
};
const iniciarApp = () => {
  iniciarButtons();
  iniciarInputs();
};

const iniciarInputs = () => {
  const inputBill = document.querySelector("#bill-amount");
  inputBill.addEventListener("keyup", (event) => getValues());
  const inputPersons = document.querySelector("#number-of-persons");
  inputPersons.addEventListener("keyup", (event) => getValues());
  const inputTipCustom = document.querySelector("#tip-custom");
  inputTipCustom.addEventListener("keyup", (event) => {
    const buttons = document.querySelectorAll(".button-tip");
    buttons.forEach((btn) => btn.classList.remove("active"));
    getValues(true);
  });
};
const getValues = (useTipCustom = false) => {
  const inputTipCustom = document.querySelector("#tip-custom");
  const inputBill = document.querySelector("#bill-amount");
  const inputPersons = document.querySelector("#number-of-persons");
  if (Number(inputBill.value) === 0) {
    inputBill.classList.add("invalid");
    valorBill = 0;
    document.querySelector("#tip-by-person").innerText = `$0.00`;
    document.querySelector("#total-by-person").innerText = `$0.00`;
  } else {
    inputBill.classList.remove("invalid");
    valorBill = Number(inputBill.value);
  }
  if (Number(inputPersons.value) === 0) {
    inputPersons.classList.add("invalid");
    numeroPersonas = 0;
    document.querySelector("#tip-by-person").innerText = `$0.00`;
    document.querySelector("#total-by-person").innerText = `$0.00`;
  } else {
    inputPersons.classList.remove("invalid");
    numeroPersonas = Number(inputPersons.value);
  }
  if (valorTip === 0) {
    inputTipCustom.classList.add("invalid");
    document.querySelector("#tip-by-person").innerText = `$0.00`;
    document.querySelector("#total-by-person").innerText = `$0.00`;
  } else {
    inputTipCustom.classList.remove("invalid");
  }
  if (useTipCustom) {
    if (Number(inputTipCustom.value) === 0) {
      inputTipCustom.classList.remove("invalid");
    }
    valorTip = Number(inputTipCustom.value);
  }
  startOperation();
};
const startOperation = () => {
  if (valorBill === 0 || valorTip === 0 || numeroPersonas === 0) {
    document.querySelector("#tip-by-person").innerText = `$0.00`;
    document.querySelector("#total-by-person").innerText = `$0.00`;
    return;
  }
  const tipAmountByPerson = ((valorBill / 100) * valorTip) / numeroPersonas;
  const totalByPerson =
    (valorBill + (valorBill / 100) * valorTip) / numeroPersonas;
  document.querySelector("#tip-by-person").innerText = `$${Number(
    tipAmountByPerson
  ).toFixed(2)}`;
  document.querySelector("#total-by-person").innerText = `$${Number(
    totalByPerson
  ).toFixed(2)}`;
};

const reset = () => {
  const inputTipCustom = document.querySelector("#tip-custom");
  const inputBill = document.querySelector("#bill-amount");
  const inputPersons = document.querySelector("#number-of-persons");
  inputBill.value = 0;
  inputPersons.value = 0;
  inputTipCustom.value = 0;
  const buttons = document.querySelectorAll(".button-tip");
  buttons.forEach((btn) => btn.classList.remove("active"));
  valorBill = 0;
  valorTip = 0;
  numeroPersonas = 0;
  document.querySelector("#tip-by-person").innerText = `$0.00`;
  document.querySelector("#total-by-person").innerText = `$0.00`;
};
