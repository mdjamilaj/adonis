'use strict'

class Register {
  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:5',
      contact: 'required|min:6',
    }
  }

  get messages () {
    return {
      'username.required': 'The Username field is required',
      'username.username': 'Enter a valid Username Name',
      'username.unique': 'Username already exists',
      'email.required': 'The email field is required',
      'email.email': 'Enter a valid email address',
      'email.unique': 'Email already exists',
      'password.required': 'The password field is required',
      'password.min': 'The password field must be at least 5 characters',
      'password.confirmed': 'The password fields do not match',
      'contact.required': 'The contact field is required',
      'contact.min': 'The contact field must be at least 5 characters',
    }
  }
}

module.exports = Register
