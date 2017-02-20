import { observable, computed } from 'mobx';

export default class Currency {
  @observable connectedStatus = false;
  @observable updateCurrency = false;
}
