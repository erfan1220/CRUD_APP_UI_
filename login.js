const user_email = document.querySelector("#email");
const input = document.querySelector("input");
const input_span = document.querySelector(".input-span");
const error_text = document.querySelector("#error");
let touched = false;


input.addEventListener("blur", () => {
  touched = true;
  validateInput();
});

function validateInput() {
  if (touched & (input.value.trim() === "")) {
    error_text.style.display = "inline";
    return false;
  } else {
    error_text.style.display = "none";
    return true;
  }
}

input.addEventListener("focus", () => {
  input_span.classList.add("active");
});

input.addEventListener("blur", () => {
  if (input.value === "") {
    input_span.classList.remove("active");
  }
});
if (input.value !== "") {
  input_span.classList.add("active");
}

async function login_user() {
  const valid = validateInput();
  if (!valid) {
    error_text.style.display = "inline";
    user_email.focus();
    return;
  }
  const email = user_email.value;

  const response = await fetch("http://localhost:5000/user/login", {
    method: "POST",
    body: JSON.stringify({
      user_email: email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  console.log(result);
  if (result.status == 200) {
    localStorage.setItem("userEmail", email);
    if (result.message == "-1") {
      localStorage.setItem("userState", "-1");
    } else {
      localStorage.setItem("userState", "1");
    }
    window.location.href = "verify.html";
  } else {
    console.log("failed!!");
  }
}
