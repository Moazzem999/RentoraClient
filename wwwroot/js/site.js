/* ==========================================================================
   Rentora Client - Global App Helpers & Storage Namespace
   ========================================================================== */

window.RentoraApp = window.RentoraApp || {
    getApiBaseUrl: function () {
        if (typeof API_BASE_URL !== 'undefined' && API_BASE_URL) {
            return API_BASE_URL.replace(/\/+$/, '');
        }
        return 'https://localhost:7148/api';
    },

    getStoredUser: function () {
        const storedUser = localStorage.getItem('rentora_user');
        if (!storedUser) return null;
        try {
            return JSON.parse(storedUser);
        } catch (e) {
            return null;
        }
    },

    getStoredToken: function () {
        return localStorage.getItem('rentora_token') || '';
    },

    setSession: function (token, user) {
        if (token) {
            localStorage.setItem('rentora_token', token);
            // Save token cookie accessible across same domain
            document.cookie = `rentora_auth_token=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Lax`;
        }
        if (user) {
            localStorage.setItem('rentora_user', JSON.stringify(user));
        }
    },

    clearSession: function () {
        localStorage.removeItem('rentora_user');
        localStorage.removeItem('rentora_token');
        document.cookie = 'rentora_auth_token=; path=/; max-age=0; SameSite=Lax';
    }
};
