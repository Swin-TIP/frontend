import { reactive } from 'vue'

export const User = reactive({
    create(role, token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("approved", true);
    },
    getApprovedStatus() {
        return localStorage.getItem("approved");
    },
    setApproved() {
        localStorage.setItem("approved", true);
    },
    getRole() {
        return localStorage.getItem("role");
    },
    setRole(role) {
        localStorage.setItem("role", role);
    },
    isAuthenticated() {
        return !!localStorage.getItem("token");
    },
    login(role, token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
    },
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("approved");
        localStorage.removeItem("registeredSessions");
        if (localStorage.getItem("selectedSession")) localStorage.removeItem("selectedSession");
    },
    getToken() {
        return localStorage.getItem("token");
    },
    getRegisteredSessions() {
        return JSON.parse(localStorage.registeredSessions);
    },
    setRegisteredSessions(registeredSessions) {
        localStorage.setItem("registeredSessions", JSON.stringify(registeredSessions));
    },
    addRegisteredSession(sessionId) {
        let registeredSessions = JSON.parse(localStorage.getItem("registeredSessions"));
        registeredSessions = [...registeredSessions, sessionId];
        localStorage.setItem("registeredSessions", JSON.stringify(registeredSessions));
    },
    removeRegisteredSession(sessionId) {
        let registeredSessions = JSON.parse(localStorage.getItem("registeredSessions"));
        registeredSessions = registeredSessions.filter(id => id !== sessionId);
        localStorage.setItem("registeredSessions", JSON.stringify(registeredSessions));
    }
});
