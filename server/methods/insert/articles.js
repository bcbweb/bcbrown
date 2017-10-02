Meteor.methods({
  newPost () {
    return Articles.insert({})
  }
})
