import { reactive } from "vue";

export const User = reactive({
  create() {
    localStorage.setItem("approved", false);
    localStorage.setItem("registeredClasses", JSON.stringify([]));
  },
  getApprovedStaus() {
    return localStorage.approved;
  },
  setApproved() {
    localStorage.approved = true;
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
    localStorage.removeItem("registeredClasses");
  },
  getToken() {
    return localStorage.token;
  },
  getRegisteredClasses() {
    return JSON.parse(localStorage.registeredClasses);
  },
  addRegisteredClass(classToRegister) {
    const registeredClasses = JSON.parse(localStorage.registeredClasses);
    registeredClasses = [...registeredClasses, classToRegister];
    localStorage.registeredClasses = JSON.stringify(registeredClasses);
  }
});