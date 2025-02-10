import { addToCart,cart,loadFromStorage, removeFromCart, updatedeliveryOptionId} from '../../data/cart.js';

import {validdeliveryOptions} from '../../data/deliveryoptions.js';

describe('test suite: add to cart',()=>{

  beforeEach(()=>{
    spyOn(localStorage,'setItem');

    
  });
  it('adds an esisting product to the cart',()=>{
    
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([
        {productId:"msd77-ind-csk-legend-goat",
          quantity:1,
          deliveryOptionId:"1"
      }
      ]); 
    });
    
    loadFromStorage();
    addToCart('msd77-ind-csk-legend-goat');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(cart[0].productId).toEqual('msd77-ind-csk-legend-goat');
    console.log(cart);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{productId:"msd77-ind-csk-legend-goat",
      quantity:1,
      deliveryOptionId:"1"}]));


  });

  it('adds a new product to the cart',()=>{
     
   
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]); 
    });
    
    loadFromStorage();
    addToCart('msd77-ind-csk-legend-goat');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([]));
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([{"productId":"msd77-ind-csk-legend-goat","quantity":1,"deliveryOptionId":"1"}]));
    expect(cart[0].productId).toEqual('msd77-ind-csk-legend-goat');
    expect(cart[0].quantity).toEqual(1);
     

  });
});

describe('test suite : remove from cart',()=>{

  beforeEach(()=>{
    spyOn(localStorage,'setItem');
  });

  it('removes a product from cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:"msd77-ind-csk-legend-goat",
        quantity:1,
        deliveryOptionId:"1"
      }]);
    });
    loadFromStorage();
    removeFromCart('msd77-ind-csk-legend-goat');
    expect(cart.length).toEqual(0);

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));
  });

  it('remove a product not in the cart', ()=>{

    spyOn(localStorage,'getItem').and.callFake(()=>{

      return JSON.stringify([{
        productId:"msd77-ind-csk-legend-goat",
        quantity:1,
        deliveryOptionId:"1"

      }]) ;

    });

    loadFromStorage();
    removeFromCart("noexistence");

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:"msd77-ind-csk-legend-goat",
      quantity:1,
      deliveryOptionId:"1"
  }]));

 

  });

});

describe(' test suite: update delivery option',()=>{

  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    
    spyOn(localStorage,'getItem').and.callFake(()=>{

    return JSON.stringify([{productId:"msd77-ind-csk-legend-goat",
      quantity:1,
      deliveryOptionId:"1"}]); 
  });
  loadFromStorage();
  });

  it('Update Cart deliveryOption',()=>{

    updatedeliveryOptionId("msd77-ind-csk-legend-goat",'1');
    expect(cart[0].productId).toEqual("msd77-ind-csk-legend-goat");
    expect(cart[0].deliveryOptionId).toEqual('1');
  
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  
    });
  
    it('function does nothing', ()=>{
      updatedeliveryOptionId("msd77-ind-csk-legend-goat",'8');
  
      expect(cart[0].productId).toEqual("msd77-ind-csk-legend-goat");
    expect(cart[0].deliveryOptionId).toEqual('1');
  
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  
  
    });
  

});
