import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { cartActions } from './store/cart';
function App() {

  const showCart = useSelector(state => state.cart.isShow);
  console.log(showCart);

  return (
    <Layout>
     {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
