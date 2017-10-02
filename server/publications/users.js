Meteor.publish('userData', () => {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { other: 1, things: 1 }
    })
  }

  this.ready()
  return true
})

Meteor.publish('allUsers', () => Meteor.users.find())
