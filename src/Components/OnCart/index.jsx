import React from 'react';
import { Link } from 'react-router-dom';
import CartItems from './CartItems';
import { sumProductCart, totalProductCart } from '../../Utils';
import './style.css'

function OnCart({
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
  myOrdersId,
  setMyOrdersId,
} 
) {

    // Add To cart : Add Product To The Shopping Cart Array 
    const addToCart = (data) => {
        setItemNumber(itemNumber + 1);
        const cartProducts = shoppingProducts;
        cartProducts.push(data);    
        setShoppingProducts(cartProducts);
    }

    // Add To MyOrders : Add Product To The MyOrders Array 
    const addToMyOrders = () => {
      setItemNumber(itemNumber-itemNumber);
      const cartProducts = shoppingProducts;
      // Get Date
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth()+1;
      const year = today.getFullYear();
      console.log(month);
      // Make an unique ID for products
      setMyOrdersId(myOrdersId + 1);

      const MyOrder = {
        id: myOrdersId,
        date: `${day}/${month}/${year}`,
        products: cartProducts,
        totalprice: sumProductCart(cartProducts),
        totalproducts: cartProducts.length,
      }
      const listMyOrders = myOrders;
      listMyOrders.push(MyOrder);    
      setShoppingProducts([]);
      setMyOrders(listMyOrders);
      setisOpenShoppingCart(false)
      setPreviousOrder(cartProducts);
      
  }

    return (
      <>
       <aside className={`${isOpenShoppingCart ? 'card-box fixed bg-gray-100 border-black right-4' : 'hidden'}`}>
            <div className='flex justify-between items-center'>
                <p className='text-center font-semibold mt-6 w-full font text-lg underline'>My Cart</p>
                <img src="src/imgs/x-sm.png" alt="" className='absolute cursor-pointer w-5 right-2 '
                onClick={() => setisOpenShoppingCart(false)}/>
            </div>
            <div className='products-container flex flex-col overflow-auto'>
            {
            shoppingProducts?.map(shoppingProducts => (
            <CartItems 
            key={shoppingProducts.id} data={shoppingProducts} setinfoProductOpen={setinfoProductOpen} 
            itemNumber={itemNumber} setItemNumber={setItemNumber}
            />))}
            </div>
            <div className='info-cart-container'>
              <div className='flex justify-between'>
                <p className='font-semibold p-1 ml-4 mt-2 underline'>{`Products: ${totalProductCart(shoppingProducts)}`}</p>
                <p className='bg-green-500 text-white font-semibold rounded-lg p-1 mr-6 mt-2'>{`Total Price: $${sumProductCart(shoppingProducts)}`}</p>
              </div>
              <div className='flex justify-center'>
                <Link to={'/based-online-product-store/my-order/last'}>
                <button className='w-64 h-12 mt-5 bg-green-500 rounded-lg font-semibold text-white' onClick={addToMyOrders} 
                >CheckOut</button>
                </Link>
              </div>
            </div>
       </aside>
      </>
    )
}
  
export default OnCart