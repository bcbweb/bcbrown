import Modules from './modules/_modules'

import { Meteor } from 'meteor/meteor'

Meteor.startup(() => Modules.server.startup())
