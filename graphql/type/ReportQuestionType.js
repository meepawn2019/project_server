const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLType,
  GraphQLEnumType,
} = require("graphql");

const { GraphQLDate } = require("graphql-iso-date");
const UserType = require("./UserType");

const QuestionType = require("./QuestionType");

const ReportType = new GraphQLObjectType({
  name: "ReportQuestion",
  fields: {
    _id: { type: GraphQLString },
    reporter: { type: UserType },
    reported: { type: QuestionType },
    reportDetail: { type: GraphQLList(GraphQLString) },
    status: { type: GraphQLString },
    createAt: { type: GraphQLDate },
    reportType: { type: GraphQLString },
  },
});

module.exports = ReportType;
