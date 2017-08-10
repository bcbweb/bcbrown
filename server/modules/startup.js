import Modules from './_modules';

const _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

const _setBrowserPolicies = () => {};

const _generateAccounts = () => Modules.server.generateAccounts();

const startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
};

Modules.server.startup = startup;
