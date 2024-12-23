import { useSelector } from "react-redux";

function Customer() {
  // getting the name of the customer from the store
  const name = useSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome, {name}</h2>;
}

export default Customer;
