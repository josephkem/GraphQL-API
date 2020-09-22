const { skip } = require("graphql-resolvers");
const Task = require('../../database/models/tasks')

module.exports.isAuthenticated = (_, __, { email }) => {
  if (!email) {
    throw new Error("Access Denied, Please login to continue");
  }

  return skip;
};

module.exports.isTaskOwner = (_, {id }, { loggedInUserID}) => {
  const task = await Task.findById(id)
  if(!task) {
    throw new Error('Task not found')
  } else if (task.user !== loggedInUserID) {
    throw new Error('Not authorized as task owner')
  }
  return skip

}