import{cart, removeFromCart, displayCartValue, updateQuantity,updatedeliveryOptionId} from '../../data/cart.js';
import{products, getProduct } from '../../data/products.js';
import formatCurrency from '../Utils/money.js';

import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import {deliveryOptions,getDeliveryOption,calculateDeliveryDate} from '../../data/deliveryoptions.js';


import { renderPaymentSummary } from './PaymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';






export function renderOrderSummary(){

//console.log(products);

let cartSummaryHTML=''

cart.forEach((cartItem)=>{ 

  const productId=cartItem.productId;

  let matchingProduct= getProduct(productId) ;
  //console.log(matchingProduct);

  let deliveryOptionId= cartItem.deliveryOptionId;
  const deliveryOption= getDeliveryOption(deliveryOptionId);
  
  let formattedDate= calculateDeliveryDate(deliveryOption);

 /* const today=dayjs();
    
    
   const deliveryDate= today.add(deliveryOption.deliveryDays, 'days');
   const formattedDate= deliveryDate.format('dddd, MMMM D');*/
  

cartSummaryHTML+=

`
              
              <div class="cart-item-container js-cart-item-container js-item-${matchingProduct.id}">
                          <div class="delivery-date">
                            Delivery date:  ${formattedDate}
                          </div>

                          <div class="cart-item-details-grid">
                            <img class="product-image"
                              src="${matchingProduct.image}">

                            <div class="cart-item-details">
                              <div class="product-name test-product-name-${matchingProduct.id}">
                                ${matchingProduct.name}
                              </div>
                              <div class="product-price test-price-${matchingProduct.id}">
                                ${matchingProduct.getPrice()}
                              </div>
                              <div class="product-quantity quantity-test${matchingProduct.id}">
                                <span>
                                  Quantity: <span class="quantity-label quantity-edited-${matchingProduct.id}">${cartItem.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary js-update-link js-save-button js-update-${matchingProduct.id} removeupdate" data-product-id='${matchingProduct.id}'>
                                  Update 
                                </span>
                                <input class="quantity-input quantity-reader quantity-${matchingProduct.id} input-on-enter input-product-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                                <span class="save-quantity-link link-primary js-save-data js-product-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Save</span> 
                                <span class="delete-quantity-link link-primary js-delete-onclick  js-test-${matchingProduct.id}" data-product-id='${matchingProduct.id}'>
                                  Delete
                                </span>
                              </div>
                            </div>
                            <div class="delivery-options">
                              <div class="delivery-options-title">
                                Choose a delivery option:
                              </div>
                               ${deliveryOptionsHTML(matchingProduct, cartItem)}
                            </div>
                          </div>
                        </div>



`;



});

//console.log(cartSummaryHTML);
function deliveryOptionsHTML(matchingProduct, cartItem){
  let deliveryHTML='';
  let isChecked;
  deliveryOptions.forEach((deliveryOption)=>{

    
    //const today=dayjs();
    //const deliveryDate= today.add(deliveryOption.deliveryDays, 'days');
    //const formattedDate= deliveryDate.format('dddd, MMMM D');

    const formattedDate=calculateDeliveryDate(deliveryOption);

    const additionalCharges=  deliveryOption.id==='1' ? 'FREE':`$${formatCurrency(deliveryOption.priceCents)} -`;

   isChecked= deliveryOption.id === cartItem.deliveryOptionId ;
  

  
deliveryHTML+=
  `
          <div class="delivery-option js-delivery-option   js-test-${matchingProduct.id}-${deliveryOption.id} " data-product-id='${matchingProduct.id}' data-delivery-option-id='${deliveryOption.id}' >
              <input type="radio" ${isChecked ? 'checked' : ''}
              class="delivery-option-input js-test-radio-${matchingProduct.id}-${deliveryOption.id}"
              name="${matchingProduct.id}"> 
              <div>
                <div class="delivery-option-date">
                  ${formattedDate}
                </div>
                <div class="delivery-option-price">
                    ${additionalCharges} Shipping
                </div>
              </div>
            </div>

  
  `


  });

  return deliveryHTML;

}




document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

//my Code

document.querySelectorAll('.js-delete-onclick').forEach((link)=>{

  link.addEventListener('click',()=>{

    const productId=link.dataset.productId;
    removeFromCart(productId);

    //const container= document.querySelector(`.js-item-${productId}`);
    renderCheckoutHeader();
     //container.remove();
   
    //document.querySelector('.js-update-checkout').innerHTML=displayCartValue();
    renderOrderSummary();
    renderPaymentSummary();
    

    
  });



});

//document.querySelector('.js-update-checkout').innerHTML=displayCartValue();

document.querySelectorAll('.js-update-link').forEach((link)=>{

   link.addEventListener('click',()=>{

    const productId=link.dataset.productId;

  

    let container=document.querySelector(`.js-item-${productId}`);

    

   container.classList.add('is-editing-quantity');

  


  });



});

document.querySelectorAll('.js-save-data').forEach((savelink)=>{


  savelink.addEventListener('click', ()=>{

    const productId= savelink.dataset.productId;

    const container= document.querySelector(`.js-item-${productId}`);

    

    let newQuantity=Number(document.querySelector(`.quantity-${productId}`).value);

    document.querySelector(`.quantity-edited-${productId}`).innerHTML= newQuantity;

    if(newQuantity<0 || newQuantity>1000){

      alert(`Enter a Value greater than 0 or less than 1000`)
    }
   

    else if(newQuantity===0){
      removeFromCart(productId);
      
    const container= document.querySelector(`.js-item-${productId}`);

    container.remove();
    document.querySelector('.js-update-checkout').innerHTML=displayCartValue();
    }

    else{

    updateQuantity(productId, newQuantity);


    
    container.classList.remove('is-editing-quantity');}
    renderPaymentSummary();
    
    



  });

});

    


document.querySelectorAll('.input-on-enter').forEach((enterlink)=>{

  enterlink.addEventListener('keydown',(event)=>{

    if(event.key==='Enter'){


      const productId= enterlink.dataset.productId;
      

      const container= document.querySelector(`.js-item-${productId}`);

     
   
    let newQuantity=Number(document.querySelector(`.input-product-${productId}`).value);

    

    document.querySelector(`.quantity-edited-${productId}`).innerHTML= newQuantity;

    if(newQuantity<0 || newQuantity>1000){

      alert(`Enter a Value greater than 0 or less than 1000`)
    }
   

    else if(newQuantity===0){
      removeFromCart(productId);
      
    const container= document.querySelector(`.js-item-${productId}`);

    container.remove();
    document.querySelector('.js-update-checkout').innerHTML=displayCartValue();
    }

    else{

    updateQuantity(productId, newQuantity);
    
    container.classList.remove('is-editing-quantity');}
    renderPaymentSummary();

    }
  

  });

});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{

  element.addEventListener('click',()=>{
    const productId= element.dataset.productId;
    const deliveryOptionId=element.dataset.deliveryOptionId;

    updatedeliveryOptionId(productId, deliveryOptionId );
    renderOrderSummary();
    renderPaymentSummary();


  });

});


}






