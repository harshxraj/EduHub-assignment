import React from "react";
import { getDateFromObjectId } from "../../utils/getDate";
import moment from "moment";

const LecturesCard = ({
  name,
  description,
  course_name,
  date,
  start_time,
  end_time,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className="border-1 bg-gray-100 rounded-md p-4 flex justify-between items-start">
      <div>
        <h1 className="text-2xl text-sky-600">{name}</h1>
        <p className="text-base">{description}</p>
        <p>{createdAt}</p>
        <p>{updatedAt}</p>
        {/* <p>{getDateFromObjectId(createdAt)}</p> */}
        <p></p>
      </div>
      <div className="ml-auto flex flex-col items-end">
        <div className="border bg-sky-600 text-white p-2 rounded-md mb-2">
          <p className="">{course_name}</p>
        </div>
        <div className="flex flex-col items-end">
          <p>Date - {date}</p>
          <div className="flex justify-end">
            <p className="mr-2 text-base">{start_time}</p>
            <p className="text-base">- {end_time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturesCard;
