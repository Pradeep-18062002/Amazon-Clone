import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderPaymentSummary } from './checkout/PaymentSummary.js';
import '../data/car.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
/*
async function loadPage(){
  

  await loadProductsFetch();

 await new Promise((resolve)=>{
    loadCart(()=>{
    resolve();
  });
});

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();

 
}
  


loadPage();



*/




/*new Promise((resolve)=>{
  loadProducts(()=>{


    resolve();
  })
}).then(()=>{

console.log('string next');

})*/

//import '../data/cart-oop.js';
//import '../data/cart-class.js';

//import '../data/backend-practice.js';

/*loadProducts(()=>{
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

});

*/
/*
Promise.all([
  loadProductsFetch(), new Promise((resolve)=>{
        loadCart(()=>{
        resolve('value1');
      });
    })

    

]).then((value)=>{
  console.log(value);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/
async function loadPage(){
  try{
//throw error1;
await Promise.all([
 loadProductsFetch(),  new Promise((resolve,reject)=>{
  //throw 'error2';
  loadCart(()=>{
 // reject('error3');
  resolve();
});
})])
} catch(error){
  console.log('Unexpeted error');
}

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();

}

loadPage();
/*
new Promise((resolve)=>{

loadProducts(()=>{
  resolve('value1');
});
}).then((value)=>{
  console.log(value);
return new Promise((resolve)=>{

  
  loadCart(()=>{
    resolve();
  });
});


}).then(()=>{
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

});
*/
/*
loadProducts(()=>{

  loadCart(()=>{

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

  });

});
*/







