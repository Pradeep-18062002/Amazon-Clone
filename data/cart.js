import { validdeliveryOptions } from "./deliveryoptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
cart=[{
  productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2,
  //msd77-ind-csk-legend-goat 
  deliveryOptionId:'2'
}, {productId: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
  quantity:1,
  deliveryOptionId:'1'
}];
}
saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId, cartupdatenumber){
  let matchingItem;
  cart.forEach((cartItem)=>{

    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }

  });

  if(matchingItem){
    matchingItem.quantity+=Number(cartupdatenumber) || 1}

  else{
    cart.push({
      productId,
      quantity:Number(cartupdatenumber) || 1,
      deliveryOptionId: '1'
    });
  }
 saveToStorage();

}


export function removeFromCart(productId){

  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!=productId){
      newCart.push(cartItem);

    }

  })

  cart=newCart;

  saveToStorage();

}


export function displayCartValue(){
  let cartQuantity=0;
  cart.forEach((cartItem)=>{

    cartQuantity+=cartItem.quantity;
    
  });

  //document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;

  return cartQuantity;
}


export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItemz)=>{
      if(cartItemz.productId===productId){
        cartItemz.quantity=newQuantity;

        

        document.querySelector('.js-updater').innerHTML=displayCartValue();

        saveToStorage();
      }

  })
}


export function updatedeliveryOptionId(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      matchingItem=cartItem;
      
    }

  });

  if(!matchingItem){
    return;
  }

  if(!validdeliveryOptions(deliveryOptionId)){

    return;
  }

  matchingItem.deliveryOptionId=deliveryOptionId;
  saveToStorage();  
}


export function loadCart(fun){

  const xhr= new XMLHttpRequest();

  xhr.addEventListener('load',()=>{

    console.log(xhr.response);
    fun();

  });


xhr.open('GET','https://supersimplebackend.dev/cart');
xhr.send();

}

