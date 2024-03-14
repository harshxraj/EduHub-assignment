import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";

const userResolver = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser: ", err);
        throw new Error("Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error in user query:", err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { name, email, password, courses } = input;
        console.log("input", input);

        if (!name || !email || !password) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          email,
          name,
          password: hashedPassword,
          courses,
        });

        await newUser.save();
        await context.login(newUser);

        if (courses && courses.length > 0) {
          for (const courseId of courses) {
            // Finding the course by its ObjectId
            const course = await Course.findById(courseId);
            if (!course) {
              console.error("Course not found:", courseId);
              continue;
            }
            course.total_students += 1;
            course.students.push(newUser._id);
            await course.save();
          }
        }

        return newUser;
      } catch (err) {
        console.error("Error in signUp: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { email, password } = input;
        if (!email || !password) throw new Error("All fields are required");
        const { user } = await context.authenticate("graphql-local", {
          email,
          password,
        });

        await context.login(user);
        return user;
      } catch (err) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (err) {
        console.error("Error in logout:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default userResolver;
