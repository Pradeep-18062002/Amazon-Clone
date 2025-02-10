import { validdeliveryOptions } from "./deliveryoptions.js";

class Cart{
  cartItems;

  #localStorageKey;

  constructor(localStorageKey){
    
this.#localStorageKey=localStorageKey;

this.#loadFromStorage();
  }


  #loadFromStorage(){
    this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));

     if(!this.cartItems){
     this.cartItems=[{
       productId:"msd77-ind-csk-legend-goat",
       quantity:2,
       deliveryOptionId:'2'
     }, {productId: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
       quantity:1,
       deliveryOptionId:'1'
     }];
     }
   this.saveToStorage();
     } 



     saveToStorage(){
      localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
        }



        addToCart(productId, cartupdatenumber){
          let matchingItem;
          this.cartItems.forEach((cartItem)=>{
        
            if(productId===cartItem.productId){
              matchingItem=cartItem;
            }
        
          });
        
          if(matchingItem){
            matchingItem.quantity+=Number(cartupdatenumber) || 1}
        
          else{
            this.cartItems.push({
              productId,
              quantity:Number(cartupdatenumber) || 1,
              deliveryOptionId: '1'
            });
          }
         this.saveToStorage();
        
        }

        removeFromCart(productId){
  
          const newCart=[];
          this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId!=productId){
              newCart.push(cartItem);
        
            }
        
          })
        
          this.cartItems=newCart;
        
         this.saveToStorage();
        
        }


        updateQuantity(productId, newQuantity){
          this.cartItems.forEach((cartItemz)=>{
              if(cartItemz.productId===productId){
                cartItemz.quantity=newQuantity;

                

                document.querySelector('.js-updater').innerHTML=displayCartValue();

                this.saveToStorage();
              }

          })
        }


        
  updatedeliveryOptionId(productId, deliveryOptionId){
    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
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
    this.saveToStorage();  
  }

}

const cart= new Cart('cart-oop'); 
const businessCart= new Cart('cart-business');



console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);


