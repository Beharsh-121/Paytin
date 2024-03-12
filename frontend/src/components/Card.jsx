import React from "react";

const formatDateTime = (createdAt) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  };
  return new Date(createdAt).toLocaleString(undefined, options);
};

const Card = ({ array, toggle }) => {
  return (
    <div className="card bg-slate-200  text-blue-800 rounded-xl m-3 overflow-x-hidden">
      {array &&
        array.map((ar, idx) => (
          <div className="rounded shadow-lg px-4  py-2" key={idx}>
            <div className="flex justify-center">
              <div className="font-bold text-xl mr-2">Payment</div>
              <span className=" bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2">
                #{idx + 1}
              </span>
            </div>

            <p className="text-white-700 text-base">
              Transaction of amount {ar.amount} on Date and Time{" "}
              {formatDateTime(ar.createdAt)} to {ar.to}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Card;
