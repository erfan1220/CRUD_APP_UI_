const verification_text = document.querySelector("#verification-text");
const userstate = localStorage.getItem("userState");
const user_email = localStorage.getItem("userEmail");
console.log(userstate);
console.log(user_email);
// localStorage.removeItem("userEmail");
// localStorage.removeItem("userState");

if (userstate == "1") {
  verification_text.innerHTML = `Enter the verification code sent to email ${user_email}`;
} else {
  verification_text.innerHTML = `No account exists with email ${user_email}. To create an account, please enter the verification code.`;
}
