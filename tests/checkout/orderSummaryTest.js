import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';
import { loadProducts,loadProductsFetch} from '../../data/products.js';

describe('test suite: renderOrderSummary',()=>{
  
  const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2="10ed8504-57db-433c-b0a3-fc71a35c88a1";

beforeAll((done)=>{

loadProductsFetch().then(()=>{

  done();
});

});

  beforeEach(()=>{
    document.querySelector('.js-order-summary-container').innerHTML=` <div class="js-order-summary"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>`;
    spyOn(localStorage,'setItem');
          spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
              productId: productId1,
              quantity:2,
              deliveryOptionId:'2'
            }, {productId: productId2,
              quantity:1,
              deliveryOptionId:'1'
            }]); 
          });
          
          loadFromStorage();
          renderOrderSummary();
          
  });

  afterEach(()=>{
    document.querySelector('.js-order-summary-container').innerHTML='';
  });



    it('displays the cart',()=>{

        

        expect(document.querySelector(`.quantity-test${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.quantity-test${productId2}`).innerText).toContain('Quantity: 1');
        expect( document.querySelectorAll(`.js-cart-item-container`).length).toEqual(2);
        expect(document.querySelector(`.test-product-name-${productId1}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(document.querySelector(`.test-product-name-${productId2}`).innerText).toContain('Waterproof Knit Athletic Sneakers - Pink');
        expect(document.querySelector(`.test-price-${productId1}`).innerText).toEqual('$10.90');
        expect(document.querySelector(`.test-price-${productId2}`).innerText).toEqual('$33.90');

     


       
        
       

  });




  it('removes a product', ()=>{
    

     
 
          document.querySelector(`.js-test-${productId1}`).click();

          expect( document.querySelectorAll(`.js-cart-item-container`).length).toEqual(1);
          expect(document.querySelector(`.js-item-${productId1}`)).toEqual(null);
          expect(document.querySelector(`.js-item-${productId2}`)).not.toEqual(null);
          expect(cart.length).toEqual(1);
          expect(cart[0].productId).toEqual(productId2);
          expect(document.querySelector(`.test-product-name-${productId2}`).innerText).toContain('Waterproof Knit Athletic Sneakers - Pink');
  

  });



  it('updates the delivery option',()=>{

   
      document.querySelector(`.js-test-${productId1}-${3}`).click();
      expect(document.querySelector(`.js-test-radio-${productId1}-${3}`).checked).toEqual(true);
      expect(cart.length).toEqual(2);
      expect(cart[0].productId).toEqual(productId1);
      expect(cart[0].deliveryOptionId).toEqual('3');
      expect(document.querySelector(`.payment-summary-shipping`).innerText).toEqual(`$9.99`);
      expect(document.querySelector(`.payment-summary-total`).innerText).toEqual(`$72.26`);


  })

});