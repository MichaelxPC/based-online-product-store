import React from "react";
import { ProductContext } from "../../Context";
import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SignIn from "../SignIn";
import OnCart from "../../Components/OnCart";
import SingUp from "../SingUp";
import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "based-online-product-store/", element: <SignIn /> },
    { path: "based-online-product-store/home", element: <Home /> },
    {
      path: "based-online-product-store/home/mens-clothing",
      element: <Home />,
    },
    {
      path: "based-online-product-store/home/womens-clothing",
      element: <Home />,
    },
    { path: "based-online-product-store/home/jewelery", element: <Home /> },
    { path: "based-online-product-store/home/electronics", element: <Home /> },
    { path: "based-online-product-store/my-account", element: <MyAccount /> },
    { path: "based-online-product-store/my-order", element: <MyOrder /> },
    { path: "based-online-product-store/my-order/last", element: <MyOrder /> },
    { path: "based-online-product-store/my-orders", element: <MyOrders /> },
    { path: "based-online-product-store/my-order/:id", element: <MyOrder /> },
    { path: "based-online-product-store/sing-in", element: <SignIn /> },
    { path: "based-online-product-store/sing-up", element: <SingUp /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
};

function AppUI() {
  const {
    setItemNumber,
    itemNumber,
    setinfoProductOpen,
    setShoppingProducts,
    shoppingProducts,
    setisOpenShoppingCart,
    isOpenShoppingCart,
    myOrders,
    setMyOrders,
    setPreviousOrder,
    setMyOrdersId,
    myOrdersId,
  } = React.useContext(ProductContext);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        <OnCart
          setItemNumber={setItemNumber}
          itemNumber={itemNumber}
          setinfoProductOpen={setinfoProductOpen}
          setShoppingProducts={setShoppingProducts}
          shoppingProducts={shoppingProducts}
          setisOpenShoppingCart={setisOpenShoppingCart}
          isOpenShoppingCart={isOpenShoppingCart}
          myOrders={myOrders}
          setMyOrders={setMyOrders}
          setPreviousOrder={setPreviousOrder}
          setMyOrdersId={setMyOrdersId}
          myOrdersId={myOrdersId}
        />
      </BrowserRouter>
    </>
  );
}

export default AppUI;
