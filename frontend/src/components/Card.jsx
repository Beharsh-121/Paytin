import React from "react";



const Card = ({ index, amount, createdAt, to }) => {
  return (
    <div className="card bg-slate-200  text-blue-800 rounded-xl m-3 overflow-x-hidden">
          <div className="rounded shadow-lg px-4  py-2">
            <div className="flex justify-center">
              <div className="font-bold text-xl mr-2">Payment</div>
              <span className=" bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2">
                #{index + 1}
              </span>
            </div>

            <p className="text-white-700 text-base">
              Transaction of amount {amount} on Date and Time{" "}
              {createdAt} to {to}
            </p>
          </div>
    </div>
  );
};

export default Card;

