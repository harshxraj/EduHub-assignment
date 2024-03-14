import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    course_code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    zoom_link: {
      type: String,
      required: true,
    },
    comments: [
      {
        student_code: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    total_views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;
