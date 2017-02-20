import { observable, computed } from 'mobx';

class Currency {
  @observable connectedStatus = false;
  @observable updateCurrency = false;
  @observable current = {
    type: 'btc',
    value: 1
  };
}

export default new Currency();
