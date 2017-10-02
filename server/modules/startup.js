import Modules from './_modules'

const _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables()

const _setBrowserPolicies = () => {}

const _configureServices = () => Modules.server.configureServices()

const _setUserRoles = () => {
  // Roles.addUsersToRoles('xxxxxxxxxxxxxxxxx', 'admin');
}

const startup = () => {
  _setEnvironmentVariables()
  _setBrowserPolicies()
  _configureServices()
  _setUserRoles()
}

Modules.server.startup = startup
