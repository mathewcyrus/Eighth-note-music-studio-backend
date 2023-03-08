import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import {
  CourseType,
  StudioSessionType,
  subCoursesType,
  UserType,
} from "./types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Session from "../Models/Session.js";
import SubCourse from "../Models/SubCourse.js";
import SubCoursecontent from "../Models/SubCoursecontent.js";
import {
  verifyToken,
  verifyAdmin,
  verifyUser,
} from "../Utilities/verification.js";
import Course from "../Models/Course.js";
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

export const subscribeSession = {
  name: "mutation",
  description: "subscribing to a session",
  type: StudioSessionType,
  args: {
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    sessiontype: { type: GraphQLString },
    id: { type: GraphQLInt },
    cost: { type: GraphQLInt },
  },
  resolve: (parent, args) => {
    const session = {
      startTime: args.startTime,
      endTime: args.endTime,
      sessiontype: args.sessiontype,
      id: sessions.length + 1,
      cost: args.cost,
    };
    sessions.push(session);
    return session;
  },
};

export const registerUser = {
  name: "registartion",
  description: "Creating a new user",
  type: UserType,
  args: {
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(args.password, salt);
    const newUser = new User({
      username: args.username,
      email: args.email,
      password: hash,
    });
    await newUser.save();
    return newUser;
  },
};
export const loginUser = {
  type: UserType,
  description: "Logging in a user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args, { res }) {
    try {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error("user not found");
      }
      const correctPassword = await bcrypt.compare(
        args.password,
        user.password
      );
      if (!correctPassword) {
        throw new Error("wrong credentials");
      }
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JSON_TOKEN
      );
      res.cookie("access_token", token, { httpOnly: true });
      return user;
    } catch (error) {
      console.log(error);
    }
  },
};
export const deleteUser = {
  name: "deletion",
  description: "Deleting a user",
  type: UserType,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parents, args, context) {
    try {
      const { req, res, next } = context;
      req.params = args.id;
      verifyToken(req, res, next);
      verifyUser(req, res, next);
      const deletedUser = await User.findByIdAndDelete(args.id);
      // console.log(deletedUser);
      return deletedUser;
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },
};

//All muations on courses

export const createCourse = {
  name: "Coursecreation",
  description: "Creating a course",
  type: CourseType,
  args: {
    coursename: { type: GraphQLString },
    enrolledstudents: { type: GraphQLInt },
    courseprice: { type: GraphQLInt },
    courseimage: { type: GraphQLString },
    subcourse: { type: new GraphQLList(subCoursesType) },
  },
  async resolve(parents, args, context) {
    try {
      const course = new Course({
        courseName: args.courseName,
        enrolledstudents: args.enrolledstudents,
        courseprice: args.courseprice,
        courseimage: args.courseimage,
        subcourses: args.subcourse,
      });
      const subcourses = [];
      for (const subcourse of args.subcourse) {
        const newSubcourse = new SubCourse({
          subcoursetitle: subcourse.subcoursetitle,
          subcoursenumber: subcourse.subcoursenumber + 1,
        });
        const subcourseContents = [];
        for (const subcourseContent of subcourse.subcourseContents) {
          const newSubcourseContent = new SubCoursecontent({
            contenttitle: subcourseContent.contenttitle,
            videourl: subcourseContent.videourl,
            captions: subcourseContent.captions,
          });
          subcourseContents.push(newSubcourseContent);
        }
        newSubcourse.subcourseContents = subcourseContents;
        subcourses.push(newSubcourse);
      }
      course.subcourses = subcourses;
      const result = await course.save();
      return result;
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },
};
