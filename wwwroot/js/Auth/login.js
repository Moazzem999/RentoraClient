/* ==========================================================================
   Rentora Client - Auth Login Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe')?.checked ?? false;

        const errorAlert = document.getElementById('login-error-alert');
        const successAlert = document.getElementById('login-success-alert');
        const btnText = document.getElementById('btn-login-text');
        const btnSpinner = document.getElementById('login-spinner');
        const btnSubmit = document.getElementById('btn-login');

        errorAlert.classList.add('d-none');
        successAlert.classList.add('d-none');
        btnText.innerText = 'Signing In...';
        btnSpinner.classList.remove('d-none');
        btnSubmit.disabled = true;

        const baseUrl = typeof RentoraApp !== 'undefined' ? RentoraApp.getApiBaseUrl() : (typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : 'https://localhost:7148/api');
        const loginEndpoint = `${baseUrl.replace(/\/+$/, '')}/Auth/Login`;

        const requestPayload = {
            userName: usernameInput,
            password: passwordInput,
            rememberMe: rememberMe
        };

        try {
            console.log('Sending login request to:', loginEndpoint);
            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestPayload)
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token || data.accessToken || data.jwt || 'demo_token';
                const user = data.user || { userName: usernameInput, name: data.name || usernameInput };

                RentoraApp.setSession(token, user);
                successAlert.innerText = 'Login successful! Redirecting...';
                successAlert.classList.remove('d-none');

                setTimeout(() => {
                    const urlParams = new URLSearchParams(window.location.search);
                    const returnUrl = urlParams.get('ReturnUrl') || '/';
                    window.location.href = returnUrl;
                }, 1000);
            } else {
                let errText = 'Invalid credentials. Please verify your username and password.';
                try {
                    const errData = await response.json();
                    if (errData && (errData.message || errData.title)) {
                        errText = errData.message || errData.title;
                    }
                } catch { }
                errorAlert.innerText = errText;
                errorAlert.classList.remove('d-none');
                btnText.innerText = 'Sign In';
                btnSpinner.classList.add('d-none');
                btnSubmit.disabled = false;
            }
        } catch (networkError) {
            console.warn('Backend API connection note:', networkError);
            // If backend is not running yet during development, display informative alert
            errorAlert.innerText = `Unable to reach backend API at ${baseUrl}. Please ensure RentoraAPI is running.`;
            errorAlert.classList.remove('d-none');
            btnText.innerText = 'Sign In';
            btnSpinner.classList.add('d-none');
            btnSubmit.disabled = false;
        }
    });
});
