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
const UserType = require("./UserType");

const ReportType = new GraphQLObjectType({
  name: "Report",
  fields: {
    id: { type: GraphQLID },
    sender: { type: UserType },
    reportUser: { type: UserType },
    content: { type: GraphQLString },
    status: { type: GraphQLString },
    createAt: { type: GraphQLDate },
    updateAt: { type: GraphQLDate },
  },
});

module.exports = ReportType;
