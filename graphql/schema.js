const mongoose = require("mongoose");

const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
} = require("graphql");

// const PersonType = require("./PersonType");
// const PersonModel = require("./PersonModel");
const UserModel = require("../models/user");
const UserType = require("./type/UserType");
const AdminModel = require("../models/admin");
const AdminType = require("./type/AdminType");
const QuestionType = require("./type/QuestionType");
const QuestionModel = require("../models/question");
const ReportType = require("./type/ReportType");
const ReportModel = require("../models/report");
const CommentModel = require("../models/comment");
const CommentType = require("./type/CommentType");
const AuthPayloadType = require("./type/AuthPayload");
const { GraphQLDate } = require("graphql-iso-date");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const APP_SECRET = "Graphql_Hoova";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      // Query 1

      // name of the query, people
      user: {
        // the type of response this query will return, here PersonType
        type: GraphQLList(UserType),
        // resolver is required
        resolve: (root, args, context, info) => {
          // we are returning all persons available in the table in mongodb
          if (!context.user) {
            throw new Error("You are not authenticated!");
          }
          return UserModel.find().exec();
        },
      },
      // Query 2
      // get user by id
      userByID: {
        // name of the query is people by id
        type: UserType,
        args: {
          // strong validation for graphqlid, which is mendatory for running this query
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args, context, info) => {
          return UserModel.findById(args.id).exec();
        },
      },
      // Query 3
      // get user by user name
      userByUserName: {
        type: GraphQLList(UserType),
        args: {
          userName: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return UserModel.find({ userName: args.userName }).exec();
        },
      },
      userByTime: {
        type: GraphQLList(UserType),
        args: {
          time: { type: GraphQLString },
        },
        resolve: async (root, args, context, info) => {
          return await UserModel.find({ createAt: { $lte: args.time } }).sort({
            createAt: 1,
          });
        },
      },
      // Query 4
      // get admin by usernames
      adminByUserName: {
        type: GraphQLList(AdminType),
        args: {
          userName: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return AdminModel.find({ userName: args.userName }).exec();
        },
      },
      question: {
        type: GraphQLList(QuestionType),
        resolve: async (root, args, context, info) => {
          const result = await QuestionModel.find().populate("owner").exec();
          console.log(result);
          return result;
        },
      },
      questionById: {
        type: QuestionType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args, context, info) => {
          return QuestionModel.findById(args.id).exec();
        },
      },
      commentsByQuestion: {
        type: GraphQLList(CommentType),
        args: {
          questionId: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: async (root, args, context, info) => {
          return await CommentModel.find({ question: args.questionId }).exec();
        },
      },
      reportUser: {
        type: GraphQLList(ReportType),
        resolve: async (root, args, context, info) => {
          if (!context.user) {
            throw new Error("You are not authenticated!");
          }
          // if (context.user.role !== "Admin") {
          //   throw new Error("You do not have permission");
          // }
          console.log(await ReportModel.find().exec());
          return await ReportModel.find()
            .populate("sender")
            .populate("reportUser")
            .exec();
        },
      },
      reportUserByStatus: {
        type: GraphQLList(ReportType),
        args: {
          status: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          if (!context.user) {
            throw new Error("You are not authenticated!");
          }
          if (context.user.role !== "Admin") {
            _;
            throw new Error("You do not have permission");
          }
          return ReportModel.find({ status: args.status }).exec();
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      registerAdmin: {
        type: UserType,
        args: {
          userName: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
          role: { type: GraphQLString },
        },
        resolve: async (root, args, context, info) => {
          const user = await UserModel.findOne({ email: args.email }).exec();
          if (user) {
            throw new Error("User Exist!");
          }
          args.password = await bcrypt.hash(args.password, 10);
          var newUser = new UserModel(args);
          return newUser.save();
        },
      },
      register: {
        type: UserType,
        args: {
          userName: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
        },
        resolve: async (root, args, context, info) => {
          const user = await UserModel.findOne({ email: args.email }).exec();
          if (user) {
            throw new Error("User Exist!");
          }
          args.password = await bcrypt.hash(args.password, 10);
          var newUser = new UserModel(args);
          return newUser.save();
        },
      },
      // Login Mutation
      login: {
        type: AuthPayloadType,
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString },
        },
        resolve: async (root, args, context, info) => {
          const user = await UserModel.findOne({ email: args.email }).exec();
          if (!user) {
            throw new Error("No such user found");
          }
          const valid = await bcrypt.compare(args.password, user.password);
          if (!valid) {
            throw new Error("Invalid password");
          }
          const token = jwt.sign(
            { userId: user.id, role: user.role },
            APP_SECRET
          );
          return { user, token };
        },
      },
      banUser: {
        type: UserType,
        args: { email: { type: GraphQLString } },
        resolve: async (root, args, context, info) => {
          if (!context.user) {
            throw new Error("You are not authenticated!");
          }
          const user = await UserModel.findOne({ email: args.email }).exec();
          user.banStatus = !user.banStatus;
          return user.save();
        },
      },
      reportUserMutation: {
        type: ReportType,
        args: {
          sender: { type: GraphQLNonNull(GraphQLID) },
          reportUser: { type: GraphQLNonNull(GraphQLID) },
          content: { type: GraphQLString },
        },
        resolve: async (root, args, context, info) => {
          var newReport = new ReportModel(args);
          const result = await newReport.save();
          const sender = await result.populate("sender").execPopulate();
          const reportUser = await result.populate("reportUser").execPopulate();
          console.log(result);
          return result;
        },
      },
      updateReportUserMutation: {
        type: ReportType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
          status: { type: GraphQLString },
        },
        resolve: async (root, args, context, info) => {
          const report = await ReportModel.findById(args.id).exec();
          console.log(report);
          report.status = args.status;
          return await report.save();
        },
      },
      postQuestion: {
        type: QuestionType,
        args: {
          question: { type: GraphQLString },
          owner: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: async (root, args, context, info) => {
          const newQuestion = new QuestionModel(args);
          const owner = await newQuestion.populate("owner").execPopulate();
          return await newQuestion.save().populate("owner");
        },
      },
    },
  }),
});

module.exports = schema;
