import Modules from './_modules';

const setEnvironmentVariables = () => {
  if (Meteor.settings.private) {
    process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
  }
};

Modules.server.setEnvironmentVariables = setEnvironmentVariables;
