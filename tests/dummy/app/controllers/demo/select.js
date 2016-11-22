import Ember from 'ember';

const { Controller, computed, RSVP, A, run } = Ember;

export default Controller.extend({
  states: computed(function() {
    return A('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'
            .split(' ').map((state) => ({ abbrev: state })));
  }),

  items: Ember.A([
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' }
  ]),
  actions: {
    updateFilter(str) {
      this.set('searchText', str);
    },
    addCountry(name) {
      this.get('items').addObject({ name, code: '' });
    },

    searchCountries(term) {
      let XHR_TIMEOUT = Math.floor(Math.random() * 1000) + 100;

      return new RSVP.Promise((resolve) => {
        run.cancel(this.searchTimer);

        this.searchTimer = run.later(this, () => {
          let nameRegExp = new RegExp(escapeRegExp(`${term}`),'i', 'g');
          let countries = this.get('items');
          let results = countries.filter((c) => nameRegExp.exec(c.name)) || [];
          resolve(results);
        }, XHR_TIMEOUT);
      });
    }
  }
});
