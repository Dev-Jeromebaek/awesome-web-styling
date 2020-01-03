const subscribe = document.querySelector(".js-subscribe"),
  subscribeForm = subscribe.querySelector("form"),
  formInput = subscribeForm.querySelector("input"),
  formBtn = subscribeForm.querySelector("button"),
  formError = subscribe.querySelector(".error"),
  subscribeIntro = subscribe.querySelector(".subscribe__intro"),
  subscribeSuccess = subscribe.querySelector(".subscribe__success");

const ACTIVE = "active";
const DISABLED = "disabled";
const GREETHING = "greething";
const REG_EMAIL = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const FAILED = "failed";
const SHOW = "show";

function showInit() {
  subscribeIntro.classList.remove(GREETHING);
  subscribeSuccess.classList.add(GREETHING);
  formInput.value = "";
  formBtn.classList.add(DISABLED);
}

function showForm() {
  subscribe.classList.add(ACTIVE);
  subscribeIntro.classList.add(GREETHING);
  subscribeForm.classList.remove(GREETHING);
  formInput.focus();
}

function showSuccess() {
  subscribeForm.classList.add(GREETHING);
  subscribeSuccess.classList.remove(GREETHING);
  subscribe.classList.remove(ACTIVE);
}

function handleSuccess() {
  showSuccess();
  setTimeout(showInit, 2000);
}

function handleSubmit(e) {
  e.preventDefault();
  if (!formBtn.classList.contains(DISABLED) && formInput.value.length !== 0) {
    handleSuccess();
  } else {
    formError.classList.add(SHOW);
    // SAHKE
    subscribeForm.classList.add(FAILED);
    subscribe.classList.add(FAILED);
    console.log(formError);
    setTimeout(function() {
      subscribeForm.classList.remove(FAILED);
      subscribe.classList.remove(FAILED);
    }, 1000);
  }
}

function checkEmail(e) {
  formError.classList.remove(SHOW);
  if (REG_EMAIL.test(e.target.value)) {
    formBtn.classList.remove(DISABLED);
  } else {
    formBtn.classList.add(DISABLED);
  }
}

function init() {
  subscribe.addEventListener("click", showForm);
  formInput.addEventListener("keyup", checkEmail);
  subscribeForm.addEventListener("submit", handleSubmit);
}

init();
