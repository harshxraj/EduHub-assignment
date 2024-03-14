import React from "react";

const CourseCard = ({ name, description, category }) => {
  return (
    <div className="border p-2 rounded-md bg-gray-100">
      <h1 className="text-2xl font-semibold text-sky-600">{name}</h1>
      <p className="font-bold line-clamp-3">{description}</p>
      <p>{category}</p>
    </div>
  );
};

export default CourseCard;
