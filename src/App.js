import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { UIActions } from "./store/uiSlice";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";

let intial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.isShow);
  console.log(showCart);
  const notification = useSelector((state) => state.UI.notification);

  const cart = useSelector((state) => state.cart.items);
  useEffect(() => {
    const sendingDataToBackend = async () => {
      dispatch(
        UIActions.showNotification({
          status: "pending",
          title: "Sending Data to Firebase...",
          message: "Sending cart data .....",
        })
      );
      const response = await fetch(
        "https://reduxcart-a19fd-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        const errr = await response.json();
        throw new Error("ku6 send nhi ho rha hai ", errr);
      }
      const data = await response.json();
      dispatch(
        UIActions.showNotification({
          status: "success",
          title: "Success  to send ...",
          message: "Maje karo...",
        })
      );
    };

    if(intial){
      intial = false
      return;
    }

    sendingDataToBackend().catch((err) => {
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Failed to send ...",
          message: "Dekho kya gadbad hai...",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
