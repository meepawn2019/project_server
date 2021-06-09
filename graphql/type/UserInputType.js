const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require("graphql");

const { GraphQLDate } = require("graphql-iso-date");

const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    _id: { type: GraphQLString },
    userName: { type: GraphQLString },
    gender: { type: GraphQLString },
    email: { type: GraphQLString },
    banStatus: { type: GraphQLBoolean },
    birth: { type: GraphQLDate },
    role: { type: GraphQLString },
    createAt: { type: GraphQLDate },
    updateAt: { type: GraphQLDate },
  },
});

module.exports = UserInputType;
