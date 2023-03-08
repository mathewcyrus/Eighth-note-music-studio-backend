import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import _ from "lodash";
import User from "../Models/User.js";
import { verifyToken, verifyUser } from "../Utilities/verification.js";

import {
  CourseType,
  StudioSessionType,
  UserType,
  subcoursesContentType,
  subCoursesType,
} from "./types.js";

export const allCourses = {
  type: new GraphQLList(CourseType),
  description: "shows a list of all courses",
  resolve: () => courses,
};
const sessions = [
  {
    id: 1,
    sessiontype: "audiosession",
    startTime: "2:03",
    endTime: "4:00",
    cost: 3000,
  },
  {
    id: 2,
    sessiontype: "videosession",
    startTime: "3:03",
    endTime: "5:00",
    cost: 1000,
  },
  {
    id: 3,
    sessiontype: "photoshoot",
    startTime: "3:03",
    endTime: "5:00",
    cost: 5000,
  },
  {
    id: 4,
    sessiontype: "audiosession",
    startTime: "5:03",
    endTime: "7:00",
    cost: 7000,
  },
  {
    id: 5,
    sessiontype: "audiosession",
    startTime: "6:03",
    endTime: "7:00",
    cost: 4000,
  },
];
const courses = [
  {
    courseID: 1,
    coursename: "Guitar Master class",
    courseprice: 10000,
    courseimage: "course image",
    enrolledStudents: 500,
  },
  {
    courseID: 2,
    coursename: "piano Master class",
    courseprice: 10000,
    courseimage: "course image",
    enrolledStudents: 500,
  },
];

export const singleSession = {
  type: StudioSessionType,
  description: "Gets a single session using its id",
  args: {
    id: { type: GraphQLInt },
  },
  resolve: (parent, args) => {
    return _.find(sessions, { id: args.id });
  },
};

export const allSessions = {
  type: new GraphQLList(StudioSessionType),
  description: "list of all sessions",
  resolve: () => sessions,
};

export const allUsers = {
  type: new GraphQLList(UserType),
  description: "list of all users",
  async resolve() {
    const users = await User.find();
    return users;
  },
};
export const getAUser = {
  type: UserType,
  description: "get a single users",
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    try {
      const { req, res } = context;
      const user = await User.findById(args.id);
      return user;
    } catch (error) {
      console.log(error);
    }
  },
};
