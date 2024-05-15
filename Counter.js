import store from '../store';
import classes from './Counter.module.css';
import { useSelector ,useDispatch} from 'react-redux';

const Counter = () => {
  const Dispatch = useDispatch()
  const counter = useSelector((state)=> state.counter)
  const toggleCounterHandler = () => {};
  const incrementHandler=()=>{
    Dispatch({type :"increment"})
  }
  const decrementHandler = ()=>{
    Dispatch({type :"decrement"})
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>IncrementBY5</button>
        <button onClick={decrementHandler}>DecrementBY5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
