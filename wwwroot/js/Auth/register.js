/* ==========================================================================
   Rentora Client - Auth Register Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const buildingCount = document.getElementById('buildingCount')?.value ?? "1";

        const errorAlert = document.getElementById('register-error-alert');
        const successAlert = document.getElementById('register-success-alert');
        const btnText = document.getElementById('btn-register-text');
        const btnSpinner = document.getElementById('register-spinner');
        const btnSubmit = document.getElementById('btn-register');

        errorAlert.classList.add('d-none');
        successAlert.classList.add('d-none');

        if (password !== confirmPassword) {
            errorAlert.innerText = 'Passwords do not match.';
            errorAlert.classList.remove('d-none');
            return;
        }

        btnText.innerText = 'Creating Account...';
        btnSpinner.classList.remove('d-none');
        btnSubmit.disabled = true;

        const baseUrl = typeof RentoraApp !== 'undefined' ? RentoraApp.getApiBaseUrl() : (typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : 'https://localhost:7148/api');
        const registerEndpoint = `${baseUrl.replace(/\/+$/, '')}/Auth/Register`;

        const requestPayload = {
            fullName: fullName,
            email: email,
            phone: phone,
            password: password,
            buildingCount: parseInt(buildingCount) || 1
        };

        try {
            console.log('Sending registration request to:', registerEndpoint);
            const response = await fetch(registerEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestPayload)
            });

            if (response.ok) {
                successAlert.innerText = 'Account created successfully! Redirecting to login...';
                successAlert.classList.remove('d-none');

                setTimeout(() => {
                    window.location.href = '/Account/Login';
                }, 1500);
            } else {
                let errText = 'Registration failed. Please check your information and try again.';
                try {
                    const errData = await response.json();
                    if (errData && (errData.message || errData.title)) {
                        errText = errData.message || errData.title;
                    }
                } catch { }
                errorAlert.innerText = errText;
                errorAlert.classList.remove('d-none');
                btnText.innerText = 'Start Free Trial';
                btnSpinner.classList.add('d-none');
                btnSubmit.disabled = false;
            }
        } catch (networkError) {
            console.warn('Backend API connection note:', networkError);
            errorAlert.innerText = `Unable to reach backend API at ${baseUrl}. Please ensure RentoraAPI is running.`;
            errorAlert.classList.remove('d-none');
            btnText.innerText = 'Start Free Trial';
            btnSpinner.classList.add('d-none');
            btnSubmit.disabled = false;
        }
    });
});
