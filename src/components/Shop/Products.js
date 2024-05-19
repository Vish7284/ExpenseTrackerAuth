import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_DATA = [
  {
    id: "p1",
    price: 250,
    title: "Whey Protien Isolate",
    description: "A Product which comes on your trust of purity",
  },
  {
    id: "p2",
    price: 200,
    title: "Whey Protien concentrate",
    description: "A Product which comes on your trust of purity",
  },
  {
    id: "p3",
    price: 100,
    title: "Creatine Monohyderate",
    description: "A Product which comes on your trust of purity",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
