import { observable, computed } from 'mobx';

export default class Currency {
  @observable connectedStatus = false;
  @observable updateCurrency = false;
  @observable currenct = {
    type: 'BTC',
    value: 1
  };
}
