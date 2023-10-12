import { reactive } from "vue";

export class User {
  constructor(role, token) {
    this.role = role;
    this.token = token;
    this.registeredClasses = [];
  }
  getRole() {
    return this.role;
  }
  setRole(role) {
    this.role = role;
  }
  isAuthenticated() {
    return !!this.token;
  }
  login(role, token) {
    this.role = role;
    this.token = token;
  }
  logout() {
    this.token = null;
  }
  getRegisteredClasses() {
    return this.registeredClasses;
  }
  addRegisteredClass(classToRegister) {
    this.registeredClasses.push(classToRegister);
    return this.registeredClasses;
  }
}
export const user = reactive({
  user: null
});