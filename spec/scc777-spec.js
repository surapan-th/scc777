'use babel';

import Scc777 from '../lib/scc777';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Scc777', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('scc777');
  });

  describe('when the scc777:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.scc777')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'scc777:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.scc777')).toExist();

        let scc777Element = workspaceElement.querySelector('.scc777');
        expect(scc777Element).toExist();

        let scc777Panel = atom.workspace.panelForItem(scc777Element);
        expect(scc777Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'scc777:toggle');
        expect(scc777Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.scc777')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'scc777:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let scc777Element = workspaceElement.querySelector('.scc777');
        expect(scc777Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'scc777:toggle');
        expect(scc777Element).not.toBeVisible();
      });
    });
  });
});
