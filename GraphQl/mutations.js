import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from "graphql";
import {
  CourseType,
  StudioSessionType,
  subcoursesContentType,
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

//All mutations on courses
//Creating a course

export const createCourse = {
  name: "Coursecreation",
  description: "Creating a course",
  type: CourseType,
  args: {
    coursename: { type: GraphQLString },
    courseprice: { type: GraphQLInt },
    courseimage: { type: GraphQLString },
  },
  async resolve(parents, args, { res }) {
    try {
      const course = new Course({
        coursename: args.coursename,
        courseprice: args.courseprice,
        courseimage: args.courseimage,
      });

      const result = await course.save();
      return result;
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },
};
//mutation for deleting a course
export const deleteCourse = {
  name: "Course Deletion",
  description: "Deletes a course",
  type: CourseType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parents, args, { res }) {
    try {
      await Course.findByIdAndDelete(args.id);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
// creating a subcourse
export const createSubCourse = {
  name: "SubCoursecreation",
  description: "Creating a sub course",
  type: subCoursesType,
  args: {
    subcoursenumber: { type: GraphQLString },
    subcoursetitle: { type: GraphQLString },
    subcoursedescription: { type: GraphQLString },
    maincourseID: { type: GraphQLID },
  },
  async resolve(parents, args, context) {
    try {
      const Subcourse = new SubCourse({
        subcoursetitle: args.subcoursetitle,
        subcoursenumber: args.subcoursenumber,
        maincourseID: args.maincourseID,
      });

      const result = await Subcourse.save();
      return result;
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },
};
//creating subCourse content
export const createSubCourseContent = {
  name: "SubCourse content creation",
  description: "Creating a sub course content",
  type: subcoursesContentType,
  args: {
    contenttitle: { type: GraphQLString },
    videourl: { type: GraphQLString },
    videocaptions: { type: GraphQLString },
    subcourseID: { type: GraphQLID },
  },
  async resolve(parents, args, context) {
    try {
      const newSubcourseContent = new SubCoursecontent({
        contenttitle: args.contenttitle,
        videourl: args.videourl,
        videocaptions: args.videocaptions,
        subcourseID: args.subcourseID,
      });

      const result = await newSubcourseContent.save();
      return result;
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  },
};
