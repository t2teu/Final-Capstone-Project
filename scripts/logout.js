function logout() {
        sessionStorage.removeItem('user');
        window.location.href = "/html/login.html";
    }