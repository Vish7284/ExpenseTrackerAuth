import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../../store/cart';
const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartToggleHandler =()=>{
    dispatch(cartActions.setShow())
    console.log(cartActions,"KYU NHI HO RHA HAI");
  }
  return (
    <button className={classes.button}>
      <span onClick={cartToggleHandler}>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
