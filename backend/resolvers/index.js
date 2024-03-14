import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";
import courseResolver from "./course.resolver.js";
import lectureResolver from "./lecture.resolver.js";

const mergedResolvers = mergeResolvers([
  userResolver,
  courseResolver,
  lectureResolver,
]);

export default mergedResolvers;
