/**
 * @module ember-paper
 */
import Ember from 'ember';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const { Component, computed } = Ember;

/**
 * @class PaperButton
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ColorMixin
 * @uses ProxiableMixin
 * @uses RippleMixin
 */
export default Component.extend(FocusableMixin, RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'button',
  classNames: ['paper-button', 'md-default-theme', 'md-button'],
  raised: false,
  iconButton: false,
  fab: computed.reads('mini'),  // circular button
  mini: false,
  type: 'button',
  href: null,
  target: null,
  attributeBindings: [
    'type',
    'href',
    'target',
    'title'
  ],
  classNameBindings: [
    'raised:md-raised',
    'iconButton:md-icon-button',
    'fab:md-fab',
    'mini:md-mini'
  ],

  // Ripple Overrides
  rippleContainerSelector: null,
  fitRipple: computed.readOnly('iconButton'),
  center: computed.readOnly('iconButton'),
  dimBackground: computed.not('iconButton'),

  init() {
    this._super(...arguments);
    if (this.get('href')) {
      this.setProperties({
        tagName: 'a',
        type: null
      });
    }
  },

  click(event) {
    this.sendAction('onClick', event);
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.get('bubbles');
  }
});
