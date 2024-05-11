import { NavLink } from "react-router-dom/cjs/react-router-dom";

const HomePage = () => {
   return (
     <div className="bg-orange-200 flex justify-between items-center px-4 py-2">
       <header className="flex justify-between w-full">
         <span>Welcome to the Home page</span>
         <span >
           <NavLink to="/userdetail" className="font-bold">Complete User Details</NavLink>
         </span>
       </header>
     </div>
   );
};

export default HomePage;
