class UserViewModel {
  constructor(user) {
    this.id = user._id;
    this.username = user.username;
    this.phone = user.phone;
    this.email = user.email;
    this.password = user.password;
  }
}

module.exports = { UserViewModel };
