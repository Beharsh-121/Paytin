


export function LogoutButton({children, onClick}) {

  return <button onClick={onClick} type="button" className=" text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 my-2 mx-9 mt-3.5">{children}</button>
}