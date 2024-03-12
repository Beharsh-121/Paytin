import Card from "./Card";

export default function Sidebar({ array, collapsed, handleToggle }) {
  const collapsedClassses = `w-22 overflow-x-hidden bg-blue-900 text-stone-50 transition-all duration-500 h-screen`;
  const openClasses = `w-1/5 overflow-x-hidden px-8 py-16 bg-blue-900 text-stone-50 md:w-72 rounded-r-xl transition-all duration-500 h-auto `;

  return (
    <div className={collapsed ? collapsedClassses : openClasses}>
      <button
        className="bg-black rounded-lg px-2 py-0.5 "
        onClick={handleToggle}
      >
        {collapsed ? "Show" : "Hide"}
      </button>
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
      {collapsed ? "SIDEBAR" : "Transactions"}
      </h2>
      {!collapsed && <Card array={array} />}
    </div>
  );
}
