import {formatCurrency} from '../../scripts/Utils/money.js';

describe('Test Suite: Format Currency', ()=>{

  it('Converts Cents in to Dollars',()=>{

    expect(formatCurrency(2095)).toEqual('20.95');

  });

  it('Works with 0', ()=>{

    expect(formatCurrency(0)).toEqual('0.00');



  });

  it('rounds up to the nerest cent',()=>{

    expect(formatCurrency(2000.5)).toEqual('20.01');

  });


});