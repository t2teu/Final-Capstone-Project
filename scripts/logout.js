"use stirct";

    function logout() {
        // Here we're just clearing the session and redirecting to login page.
        sessionStorage.removeItem('user');
        window.location.href = "/html/login.html";
    }