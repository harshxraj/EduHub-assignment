import Course from "../models/course.model.js";
import User from "../models/user.model.js";

const courseResolver = {
  Query: {
    courses: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const user = await context.getUser();
        const role = user.role;
        console.log(role);

        if (role === "admin") {
          const courses = await Course.find({});
          return courses;
        } else {
          const currentUser = await User.findById(user._id).populate("courses");
          console.log(currentUser.courses);
          const courses = await Course.find({});
          return currentUser.courses;
        }
      } catch (err) {
        console.error("Error getting courses:", err);
        throw new Error("Error getting courses");
      }
    },
    allCourses: async (_, __, context) => {
      try {
        const courses = await Course.find({});
        return courses;
      } catch (err) {
        console.error("Error getting all courses names:", err);
        throw new Error("Error getting all courses names");
      }
    },
  },
  Mutation: {
    createCourse: async (_, { input }, context) => {
      try {
        const newCourse = new Course({
          ...input,
          userId: context.getUser()._id,
        });
        await newCourse.save();
        return newCourse;
      } catch (err) {
        console.error("Error creating Course", err);
        throw new Error("Error creating Course");
      }
    },
  },
};

export default courseResolver;
