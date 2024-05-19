import { useDispatch,useSelector} from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../../store/cart';
const CartButton = (props) => {

  const quantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const cartToggleHandler =()=>{
    dispatch(cartActions.setShow())
    console.log(cartActions);
  }
  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
