export default function ({ $axios, app }) {
    // Request interceptor
    $axios.onRequest(config => {
        const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage


        //const token = app.$auth.getToken(); // Assuming you are using some sort of authentication library like 'auth'
        if (token) {
            config.headers.common['Authorization'] = `${token}`;
        }
        return config;
    });
}