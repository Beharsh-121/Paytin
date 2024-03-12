import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}){
  return <div className="py-2 text-sm flex justify-center">
        <div>
          {label}
        </div>
        <Link className="pointer pl-1 cursor-pointer font-bold" to={to}>
          {buttonText}
        </Link>
  </div>
}