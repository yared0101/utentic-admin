import { fetchUtils } from "react-admin";
import { apiUrl } from "../constants";
const authProvider = {
    // called when the user attempts to log in
    login: async ({ username, password }) => {
        try {
            const res = await fetch(`${apiUrl}/users/login`, {
                method: "POST",
                body: JSON.stringify({
                    password: password,
                    phoneNumber: username,
                }),
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const data = await res.json();
            console.log({ data: data.user });
            if (!data.user.isAdmin) {
                return Promise.reject("you aren't an admin, know your place");
            }
            localStorage.setItem("accesstoken", data.accessToken);
            return "success";
        } catch (e) {
            console.log(e);
            throw e.error.message;
        }
        return Promise.reject("something went wrong");
        // accept all username/password combinations
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("accesstoken");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("accesstoken");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("accesstoken")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
