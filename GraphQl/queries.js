import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import _ from "lodash";
import Course from "../Models/Course.js";
import SubCourse from "../Models/SubCourse.js";
import SubCoursecontent from "../Models/SubCoursecontent.js";
import User from "../Models/User.js";
import { verifyToken, verifyUser } from "../Utilities/verification.js";

import {
  CourseType,
  StudioSessionType,
  UserType,
  subcoursesContentType,
  subCoursesType,
} from "./types.js";

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
// get all courses
export const getAllCourses = {
  type: new GraphQLList(CourseType),
  description: " get all courses",
  async resolve() {
    const courses = await Course.find();
    return courses;
  },
};
//get a single course
export const getAsingleCourse = {
  type: CourseType,
  description: " get all a single course",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parents, args) {
    const singlecourse = await Course.findById(args.id);
    return singlecourse;
  },
};
// get all SUBCOURSES
export const getAllSubCourses = {
  type: new GraphQLList(subCoursesType),
  description: " get all subcourses",
  async resolve() {
    const subcourses = await SubCourse.find();
    return subcourses;
  },
};
//get a single subcourse
export const getAsingleSubCourse = {
  type: subCoursesType,
  description: " get all a single sub course",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parents, args) {
    const singlesubcourse = await SubCourse.findById(args.id);
    return singlesubcourse;
  },
};

// get all SUBCOURSESContent
export const getAllSubCoursesContent = {
  type: new GraphQLList(subcoursesContentType),
  description: " get all subcourses content",
  async resolve() {
    const subcoursescontent = await SubCoursecontent.find();
    return subcoursescontent;
  },
};
//get a single subcourse
export const getAsingleSubCourseContent = {
  type: subcoursesContentType,
  description: " get all a single sub course content",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parents, args) {
    const singlesubcoursecontent = await SubCoursecontent.findById(args.id);
    return singlesubcoursecontent;
  },
};
