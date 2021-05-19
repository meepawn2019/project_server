const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLType,
} = require("graphql");

const { GraphQLDate } = require("graphql-iso-date");

const AdminType = new GraphQLObjectType({
  name: "Admin",
  fields: {
    id: { type: GraphQLID },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    createAt: { type: GraphQLDate },
    updateAt: { type: GraphQLDate },
  },
});

module.exports = AdminType;
