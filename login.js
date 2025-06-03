const user_email = document.querySelector("#email");
const input = document.querySelector('input');
const input_span = document.querySelector('.input-span');

input.addEventListener('focus', () => {
    input_span.classList.add('active');
});

input.addEventListener('blur', () => {
    if (input.value === '') {
        input_span.classList.remove('active');
    }
});
if (input.value !== '') {
    input_span.classList.add('active');
}


async function login_user() {
    const email = user_email.value;

    const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        body: JSON.stringify({
            user_email: email,
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