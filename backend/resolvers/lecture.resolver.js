import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js";

const lectureResolver = {
  Query: {
    lectures: async (_, __, context) => {
      try {
        const userId = await context.getUser();
        const role = userId.role;

        if (role === "admin") {
          const lectures = await Lecture.find();
          return lectures;
        } else if (role === "student") {
          // const lectures = await Lecture.find();
          // return lectures;c
          const userCourses = await User.findById(userId._id).populate(
            "courses"
          );
          // Array to hold all lectures
          let lectures = [];

          // Iterate over each course of the student
          for (const course of userCourses.courses) {
            // Find lectures associated with the current course code
            const courseLectures = await Lecture.find({
              course_code: course._id,
            });

            // Add lectures of the current course to the lectures array
            lectures = lectures.concat(courseLectures);
          }

          return lectures;
        }
      } catch (error) {
        throw new Error("Failed to fetch lectures");
      }
    },
  },
  Mutation: {
    createLecture: async (_, { input }, context) => {
      try {
        // Create a new lecture using the input data
        const newLecture = await Lecture.create(input);
        return newLecture;
      } catch (error) {
        // Handle any errors
        throw new Error("Failed to create lecture");
      }
    },
  },
};

export default lectureResolver;
