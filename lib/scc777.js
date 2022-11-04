'use babel';

import Scc777View from './scc777-view';
import { CompositeDisposable } from 'atom';

export default {

  scc777View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.scc777View = new Scc777View(state.scc777ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.scc777View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'scc777:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.scc777View.destroy();
  },

  serialize() {
    return {
      scc777ViewState: this.scc777View.serialize()
    };
  },

  toggle() {
    console.log('Scc777 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
