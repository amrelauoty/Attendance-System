export class User {
  #firstName;
  #lastName;
  #address;
  #email;
  #dob;
  #role;
  #username;
  #password;
  #verified;
  constructor(
    firstName,
    lastName,
    address,
    email,
    dob,
    verified,
    username,
    password,
    role
  ) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#address = address;
    this.#email = email;
    this.#dob = dob;
    this.#verified = verified;
    this.#username = username;
    this.#password = password;
    this.#role = role;
  }
  save() {
    //Getting data from local storage
    let users = localStorage.getItem("users");
    if (users != null) {
      let user = JSON.parse(users);
      user.push({
        firstname: this.#firstName,
        lastname: this.#lastName,
        address: this.#address,
        email: this.#email,
        dob: this.#dob,
        verified: this.#verified,
        username: this.#username,
        password: this.#password,
        role: this.#role
      });
      localStorage.setItem("users", JSON.stringify(user));
    }
    else 
    {
      let users = [{
        firstname: this.#firstName,
        lastname: this.#lastName,
        address: this.#address,
        email: this.#email,
        dob: this.#dob,
        verified: this.#verified,
        username: this.#username,
        password: this.#password,
        role: this.#role
      }]
      localStorage.setItem('users',JSON.stringify(users));
    }
  }
}
