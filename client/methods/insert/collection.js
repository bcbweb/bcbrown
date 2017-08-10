Meteor.methods({
  insertMethod(argument) {
    check(argument, Object);

    try {
      const documentId = Collection.insert(argument);
      return documentId;
    } catch (exception) {
      return exception;
    }
  }
});
