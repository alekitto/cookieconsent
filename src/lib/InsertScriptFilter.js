import Filter from './Filter';

export default class InsertScriptFilter extends Filter {

  init() {
    this.overrideAppendChild();
    this.overrideInsertBefore();
  }

  overrideAppendChild() {

    Element.prototype.appendChild = function(elem) {
      if(arguments[0].tagName === 'SCRIPT') {
        //console.log('Appending:', arguments);
        const config = window.CookieConsent.config;
        for (let key in config.services) {
          // Did user opt-in?
          if(config.services[key].type === 'dynamic-script') {
            if(arguments[0].outerHTML.indexOf(config.services[key].search) >= 0) {
              if(config.categories[config.services[key].category].wanted === false) {
                window.CookieConsent.buffer.appendChild.push({'this': this, 'category': config.services[key].category, arguments: arguments});
                return undefined;
              }
            }
          }
        }
      }

      return Node.prototype.appendChild.apply(this, arguments);
    }

  }

  overrideInsertBefore() {

    Element.prototype.insertBefore = function(elem) {

      if(arguments[0].tagName === 'SCRIPT') {
        //console.log('Inserting:', arguments);
        const config = window.CookieConsent.config;
        for (let key in config.services) {
          // Did user opt-in?
          if(config.services[key].type === 'dynamic-script') {
            if(arguments[0].outerHTML.indexOf(config.services[key].search) >= 0) {
              if(config.categories[config.services[key].category].wanted === false) {
                window.CookieConsent.buffer.insertBefore.push({'this': this, 'category': config.services[key].category, arguments: arguments});
                return undefined;
              }
            }
          }
        }
      }

      return Node.prototype.insertBefore.apply(this, arguments);
    }
  }

}
