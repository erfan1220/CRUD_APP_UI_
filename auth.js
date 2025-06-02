const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});






const user_number = document.querySelector("#phone_number");
const user_password = document.querySelector("#user_password");

async function login_user() {
    const num = user_number.value;
    const pass = user_password.value;

    const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        body: JSON.stringify({
            user_number: num,
            user_password: pass
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const result = await response.json();
    if (result.success) {
        console.log('OK!');
    } else {
        console.log('failed!!');
    }
}