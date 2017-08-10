import Pages from '../../../collections/pages';

Meteor.methods({
  savePage(page) {
    check(page, Object);

    const pageId = page._id;
    delete page._id;

    Pages.upsert(pageId, { $set: page });
  }
});
