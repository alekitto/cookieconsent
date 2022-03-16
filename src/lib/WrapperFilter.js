import Filter from './Filter';

export default class WrapperFilter extends Filter {

  init() {
    this.filterWrappers();
  }

  filterWrappers() {
    const blacklist = super.createBlacklist('wrapped');

    function wrapper(name= '', callback) {
      if (blacklist.indexOf(name) < 0) {
        callback();
      }
    }

    window.CookieConsent.wrapper = wrapper;
  }
}
