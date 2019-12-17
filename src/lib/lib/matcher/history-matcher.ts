import { CommonMatchDelta, Matcher, MatchState } from './matcher';
import { TBSelection } from '../viewer/selection';
import { Handler } from '../toolbar/handlers/help';
import { Fragment } from '../parser/fragment';
import { RootFragment } from '../parser/root-fragment';

export class HistoryMatcher extends Matcher {
  constructor(private type: 'forward' | 'back') {
    super();
  }

  queryState(selection: TBSelection, handler: Handler): CommonMatchDelta {
    if (!selection.rangeCount) {
      return {
        srcStates: [],
        state: MatchState.Normal,
        cacheData: null
      };
    }
    const root = HistoryMatcher.getRootFragment(selection.commonAncestorFragment) as RootFragment;
    switch (this.type) {
      case 'back':
        return {
          state: root.editor.canBack ? MatchState.Normal : MatchState.Disabled,
          srcStates: [],
          cacheData: null
        };
      case 'forward':
        return {
          state: root.editor.canForward ? MatchState.Normal : MatchState.Disabled,
          srcStates: [],
          cacheData: null
        };
    }
  }

  private static getRootFragment(fragment: Fragment) {
    while (fragment.parent) {
      fragment = fragment.parent;
    }
    return fragment;
  }
}
