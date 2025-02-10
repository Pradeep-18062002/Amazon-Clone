import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id:'1',
  deliveryDays: 7,
  priceCents: 0

},{
  id:'2',
  deliveryDays:3,
  priceCents:499
},{
  id: '3',
  deliveryDays:1,
  priceCents:999
}];

console.log(deliveryOptions);

  export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  
  deliveryOptions.forEach((option)=>{
   
    
    
    if(deliveryOptionId===option.id){
      deliveryOption = option;
    }


  });

  return deliveryOption || deliveryOptions[0];

}


/*export function calculateDeliveryDate(deliveryOption){

   const today=dayjs();
   const deliveryDate= today.add(deliveryOption.deliveryDays, 'days');
   const formattedDate= deliveryDate.format('dddd, MMMM D');

   return formattedDate;
}
*/
function isWeekend(date){
  const dayOfWeek= date.format('dddd');
  return dayOfWeek==='Saturday' || dayOfWeek==='Sunday';

}



export function calculateDeliveryDate(deliveryOption){


let remainingdays= deliveryOption.deliveryDays;
//console.log(remainingdays);
let deliveryDate=dayjs();
//console.log(deliveryDate);

while(remainingdays>0){
  deliveryDate=deliveryDate.add(1,'day');
  if(!isWeekend(deliveryDate)){

    
    remainingdays--;
  } 
 
}

const formattedDate=deliveryDate.format('dddd, MMMM D');

return formattedDate;
}


export function validdeliveryOptions(deliveryOptionId){

  let found=false;
  deliveryOptions.forEach((options)=>{
    if(options.id===deliveryOptionId){

      found=true;
    }
  });

  return found;
}
