import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


const UserProfileForm = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  let userExpnses = useSelector((state) => state.expenses.expenses);
  // console.log(userExpnses,"userExpense from the userProfile");
    useEffect(() => {
      if (userExpnses) {
        setName(userExpnses.displayName || "");
        setImageUrl(userExpnses.photoUrl || "");
      }
    }, [userExpnses]);


  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const imageUrlChangeHandler = (e) => {
    setImageUrl(e.target.value);
  };

  const updateFormSubmitHandler = async (e) => {
    e.preventDefault();
    const userUpdate = {
      name: name,
      imageUrl: imageUrl,
    };
   ;
    let idToken = JSON.parse(localStorage.getItem("token"));
 console.log(userUpdate ,"idTOKEN" ,idToken);
   try {
    if(idToken){
const response = await fetch(
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAseaLTI7oj3WmCgxCwIrKgPDEvdsxxE8s",
  {
    method: "POST",
    body: JSON.stringify({
      idToken: idToken,
      displayName: name,
      photoUrl: imageUrl,
      deleteAttribute: null,
      returnSecureToken: true,
    }),
  }
);
if (!response.ok) {
  const err = await response.json();
  throw new Error("update nhi hua hai ", err.error.message);
}
const data = await response.json();
console.log(data.email, data.displayName);
    }
     
   } catch (error) {
    console.log(error);
   }
    setName("");
    setImageUrl("");
    
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="bg-orange-300 rounded-md p-5">
        <h1 className="font-bold">Contact Details</h1>
        <form
          className="flex justify-right items-center"
          onSubmit={updateFormSubmitHandler}
        >
          <div className="p-5">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="rounded-lg ml-4"
              value={name}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="p-5">
            <label htmlFor="image"> Profile Photo </label>
            <input
              id="image"
              type="text"
              className="rounded-lg ml-2"
              value={imageUrl}
              onChange={imageUrlChangeHandler}
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Update
          </button>
        </form>
        <button className="bg-purple-400 p-4 rounded-lg">
          <NavLink to="/Home">Cancel</NavLink>
        </button>
      </div>
    </div>
  );
};
export default UserProfileForm;
