import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { ProductContext } from "../../Context";
import CartItems from "./CartItems";
import xMark from "../../imgs/x-sm.png";
import { sumProductCart, totalProductCart } from "../../Utils";

function OnCart({ shoppingProducts }) {
  const {
    setItemNumber,
    itemNumber,
    setinfoProductOpen,
    setShoppingProducts,
    setisOpenShoppingCart,
    isOpenShoppingCart,
    setMyOrders,
    setPreviousOrder,
    myOrdersId,
    setMyOrdersId,
    setCurrentUser,
    currentUser,
    users,
    setUsers,
    isUserSingIn,
  } = React.useContext(ProductContext);

  // Add To MyOrders : Add Product To The MyOrders Array
  const addToMyOrders = () => {
    if (shoppingProducts <= 0) {
      return;
    }

    if (isUserSingIn == "false") {
      return;
    }

    setItemNumber(itemNumber - itemNumber);
    const cartProducts = shoppingProducts;

    // Get Date
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    // Make an unique ID for products
    setMyOrdersId(myOrdersId + 1);

    const MyOrder = {
      id: myOrdersId,
      date: `${day}/${month}/${year}`,
      products: cartProducts,
      price: sumProductCart(cartProducts),
      totalproducts: cartProducts.length,
    };

    let newCurrentUser;
    const temporalUsersList = users;
    let listOrdersUser;
    for (let index = 0; index < temporalUsersList.length; index++) {
      if (temporalUsersList[index].id === currentUser.id) {
        listOrdersUser = temporalUsersList[index].orders;
        listOrdersUser.push(MyOrder);
        temporalUsersList[index].orders = listOrdersUser;
        temporalUsersList[index].onCart = [];
        newCurrentUser = temporalUsersList[index];
      }
    }
    setUsers(temporalUsersList);
    setCurrentUser(newCurrentUser);
    setMyOrders(listOrdersUser);
    setShoppingProducts([]);
    setisOpenShoppingCart(false);
    setPreviousOrder(cartProducts);
  };

  return (
    <>
      <aside
        className={`${isOpenShoppingCart ? "aside-cart fixed border-black bg-gray-100" : "hidden"}`}
      >
        <div className="flex justify-end">
          <img
            src={xMark}
            alt=""
            className="xmark-icon cursor-pointer"
            onClick={() => setisOpenShoppingCart(false)}
          />
        </div>

        <div className="flex flex-col items-center justify-between">
          <p className="title-my-cart underlined underline-clip font-semibold">
            My Cart
          </p>
        </div>
        <div className="products-container flex flex-col overflow-y-auto overflow-x-hidden">
          {shoppingProducts?.map((shoppingProducts) => (
            <CartItems
              key={shoppingProducts.id}
              data={shoppingProducts}
              setinfoProductOpen={setinfoProductOpen}
              itemNumber={itemNumber}
              setItemNumber={setItemNumber}
            />
          ))}
        </div>

        <div className="info-div-cart">
          <div className="info-cart-container">
            <div className="flex justify-between">
              <p className="ml-4 mt-2 p-1 font-semibold underline">{`Products: ${totalProductCart(shoppingProducts)}`}</p>
              <p className="mr-6 mt-2 rounded-lg bg-green-500 p-1 font-semibold text-white">{`Total Price: $${sumProductCart(shoppingProducts)}`}</p>
            </div>

            <div className="flex justify-center">
              <Link to={"/based-online-product-store/my-order/last"}>
                <button
                  className="mt-5 rounded-lg bg-green-500 font-semibold text-white"
                  onClick={addToMyOrders}
                >
                  CheckOut
                </button>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default OnCart;
