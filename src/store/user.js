import { reactive } from "vue";

export const User = reactive({
    create(role, token) {
        this.approved = false;
        this.role = role;
        this.token = token;
        this.registeredClasses = [];
    },
    getApprovedStaus() {
        return this.approved;
    },
    setApproved() {
        this.approved = true;
    },
    getRole() {
        return this.role;
    },
    setRole(role) {
        this.role = role;
    },
    isAuthenticated() {
        return !!this.token;
    },
    login(role, token) {
        this.role = role;
        this.token = token;
    },
    logout() {
        this.token = null;
    },
    getToken() {
        return this.token;
    },
    getRegisteredClasses() {
        return this.registeredClasses;
    },
    addRegisteredClass(classToRegister) {
        this.registeredClasses.push(classToRegister);
        return this.registeredClasses;
    }
});