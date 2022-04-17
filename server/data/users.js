import bcrypt from 'bcryptjs/dist/bcrypt.js'

const users = [
  {
    forename: 'User',
    surname: 'Example 1',
    email: 'user1@example.com',
    password: bcrypt.hashSync('password', 10),
    isManager: false,
  },
  {
    forename: 'User',
    surname: 'Example 2',
    email: 'user2@example.com ',
    password: bcrypt.hashSync('password', 10),
    isManager: false,
  },
  {
    forename: 'Manager',
    surname: 'Example 1',
    email: 'manager1@example.com',
    password: bcrypt.hashSync('password', 10),
    isManager: true,
  },
]

export default users
