import Cart from './cart';
const Checkout = () => {
  return (
    <div class="container text-center">
      <div class="row">
        <div class="col-4">
          <h1>Thank You</h1>
          <p>Here are your order details.</p>
        </div>
        <div class="col-8">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
