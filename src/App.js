import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-actions";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";

let intial = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.isShow);
  console.log(showCart);
  const notification = useSelector((state) => state.UI.notification);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  
  useEffect(() => {
    if (intial) {
      intial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
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
