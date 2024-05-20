import { cartActions } from "./cart";
import { UIActions } from "./uiSlice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const getttingData = async () => {
      const response = await fetch(
        "https://reduxcart-a19fd-default-rtdb.firebaseio.com/cartItems.json"
      );
      if (!response.ok) {
        throw new Error("nhi hua fetch data check karo kya problem hai");
      }
      const data = await response.json();
      return data;
    };
    try {
       const cartData = await getttingData();
       dispatch(cartActions.replaceCart(cartData))
        
    } catch (error) {
        dispatch(
          UIActions.showNotification({
            status: "error",
            title: "Failed to fetch ...",
            message: "Dekho kya gadbad hai...",
          })
        );
    }
  };
};
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      UIActions.showNotification({
        status: "pending",
        title: "Sending Data to Firebase...",
        message: "Sending cart data .....",
      })
    );
    const sendingRequest = async () => {
      const response = await fetch(
        "https://reduxcart-a19fd-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items:cart.items,
            totalQuantity: cart.totalQuantity
          }),
        }
      );
      if (!response.ok) {
        const errr = await response.json();
        throw new Error("ku6 send nhi ho rha hai ", errr);
      }
    };
    try {
      await sendingRequest();
      dispatch(
        UIActions.showNotification({
          status: "success",
          title: "Success  to send ...",
          message: "Maje karo...",
        })
      );
    } catch (error) {
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Failed to send ...",
          message: "Dekho kya gadbad hai...",
        })
      );
    }

    //
  };
};
