let database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    role: "admin",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    role: "user",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    role: "user",
    password: "jonathan123!",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    return user;
  },
  findByName: (name) => {
    const user = database.find((user) => user.name === name);
    return user;
  },

  createOne: (name, email = '', password = '') => {
    let id = database[database.length - 1]['id'] + 1;
    let user = {
      id: id,
      name: name,
      email: email,
      role: "user",
      password: password,
    };
    database.push(user);
    return user;
  }
};

module.exports = { database, userModel };
