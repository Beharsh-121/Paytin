import RupeeIcon from "../icons/RupeeIcon"


export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-bold text-lg">
            Current Balance  -
        </div>
        <div className="font-semibold ml-2 text-lg">
            <RupeeIcon />
        </div>
        <div className="ml-2 font-bold">
            {parseInt(value).toFixed(2)}
        </div>
    </div>
}