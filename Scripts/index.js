const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginToggle = document.getElementById('login-page');
const signupToggle = document.getElementById('signup-page');

loginToggle.addEventListener('click', toggleForm);
signupToggle.addEventListener('click', toggleForm);

function toggleForm(event) {
    event.preventDefault();

    loginToggle.classList.toggle('active');
    signupToggle.classList.toggle('active');

    loginForm.style.display = loginToggle.classList.contains('active') ? 'block' : 'none';
    signupForm.style.display = signupToggle.classList.contains('active') ? 'block' : 'none';
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('l-email').value;
    const password = document.getElementById('l-password').value;
    const lData = { email, password };
    login(lData);
});

function login(lData) {
    fetch(`https://employee-management-rn.onrender.com/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lData),
      
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem('token', data.token);
                alert(data.message);
                window.location.href = "dashboard.html"
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to login');
        });
}




signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = {
        email: document.getElementById('s-email').value,
        password: document.getElementById('s-password').value,
        password: document.getElementById('s-confirm-password').value
    }
    signup(data);
});


function signup(sData) {
    fetch(`https://employee-management-rn.onrender.com/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to signup');
        });
}