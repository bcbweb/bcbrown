import faker from 'meteor/digilord:faker';
import Modules from './_modules';

const administrators = [
  {
    name: { first: 'Benjamin', last: 'Brown' },
    email: 'ben@bcbrown.com',
    password: 'password'
  }
];

const createUser = (user) => {
  Accounts.createUser({
    email: user.email,
    password: user.password,
    profile: {
      name: user.name
    }
  });
};

const checkIfAccountsExist = function checkIfAccountsExist() {
  return Meteor.users.find().count() > 0;
};

const checkIfUserExists = email => Meteor.users.findOne(
  { 'emails.address': email }
);

const createUsers = (users) => {
  for (let i = 0; i < users.length; i += 1) {
    const user       = users[i];
    const userExists = checkIfUserExists(user.email);

    if (! userExists) {
      createUser(user);
    }
  }
};

const generateFakeUsers = (count) => {
  const users = [];

  for (let i = 0; i < count; i += 1) {
    users.push({
      name: { first: faker.name.firstName(), last: faker.name.lastName() },
      email: faker.internet.email(),
      password: 'password'
    });
  }

  return users;
};

const generateAccounts = () => {
  const fakeUserCount = 5;
  const usersExist    = checkIfAccountsExist();

  if (! usersExist) {
    createUsers(administrators);
    createUsers(generateFakeUsers(fakeUserCount));
  }
};

Modules.server.generateAccounts = generateAccounts;
