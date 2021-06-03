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
const CommentType = require("./CommentType");
const QuestionType = require("./QuestionType");
var ReportEnumType = new GraphQLEnumType({
  name: "reportEnumType",
  values: {
    Comment: { value: CommentType },
    User: { value: UserType },
    Question: { value: QuestionType },
  },
});

const ReportType = new GraphQLObjectType({
  name: "Report",
  fields: {
    _id: { type: GraphQLString },
    reporter: { type: UserType },
    reported: { type: CommentType },
    reportDetail: { type: GraphQLList(GraphQLString) },
    status: { type: GraphQLString },
    createAt: { type: GraphQLDate },
    reportType: { type: GraphQLString },
  },
});

module.exports = ReportType;
