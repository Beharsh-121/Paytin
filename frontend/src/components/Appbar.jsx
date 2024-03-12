
export const Appbar = () => {
  return (
    <div className="h-14 flex justify-between bg-blue-800 shadow-xl">
      <div className="flex flex-col justify-center h-full ml-4">
        <span className="font-extrabold text-3xl text-white  rounded-lg px-6 py-3 shadow-inherit">
          PayTin
        </span>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          <span className="font-medium text-slate-50 italic">Hello </span>
        </div>
        <div className="rounded-full h-12 w-12 bg-blue-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {localStorage.getItem("username")[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
