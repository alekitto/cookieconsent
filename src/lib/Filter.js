import Utilities from "./Utilities";

export default class Filter  {

  createBlacklist(type) {
    const config = window.CookieConsent.config;
    const services = {};

    for(const service in config.services) {
      if (
          config.services[service].type !== type ||
          config.categories[config.services[service].category].needed !== false ||
          config.categories[config.services[service].category].wanted !== false
      ) {
        continue;
      }

      services[service] = config.services[service];
    }

    const blacklist = [];

    for(const service in services) {
      const type = Utilities.objectType(services[service].search);
      if (type === 'String') {
        blacklist.push(services[service].search);
      } else if (type === 'Array') {
        for (let i = 0; i < services[service].search.length; i++) {
          blacklist.push(services[service].search[i]);
        }
      }
    }

    return blacklist;
  }

}
