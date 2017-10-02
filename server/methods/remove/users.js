Meteor.methods({
  removeUser (user) {
    check(user, Object)

    const userId = user._id
    delete user._id

    Meteor.users.remove(userId)
  }
})
