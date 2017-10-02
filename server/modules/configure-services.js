import Modules from './_modules'

const services = Meteor.settings.private.oAuth

const configure = () => {
  if (services) {
    Object.keys(services).forEach((service) => {
      ServiceConfiguration.configurations.upsert({ service }, {
        $set: services[service]
      })
    })
  }
}

Modules.server.configureServices = configure
