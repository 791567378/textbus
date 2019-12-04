import { ChildSlotModel, Commander } from './commander';
import { FormatState } from '../matcher/matcher';
import { TBSelection } from '../selection/selection';
import { Handler } from '../toolbar/handlers/help';
import { FormatRange } from '../parser/format';
import { dtd } from '../dtd';
import { CacheData } from '../toolbar/utils/cache-data';

export class StyleCommander implements Commander<string | number> {
  recordHistory = true;
  private value: string | number;

  constructor(private name: string, private canApplyBlockElement = true) {
  }

  updateValue(value: string | number) {
    this.value = value;
  }

  command(selection: TBSelection, handler: Handler, overlap: boolean): void {
    selection.ranges.forEach(range => {
      range.getSelectedScope().forEach(item => {
        const r = new FormatRange({
          startIndex: item.startIndex,
          endIndex: item.endIndex,
          handler,
          context: item.context,
          state: FormatState.Valid,
          cacheData: {
            style: {name: this.name, value: this.value}
          }
        });
        item.context.apply(r, false);
      });
    });
  }

  render(state: FormatState, rawElement?: HTMLElement, cacheData?: CacheData): ChildSlotModel {
    if (cacheData && cacheData.style) {
      if (rawElement) {
        if (this.canApplyBlockElement) {
          rawElement.style[cacheData.style.name] = cacheData.style.value;
          return null;
        } else if (/inline/.test(dtd[rawElement.tagName.toLowerCase()].display)) {
          rawElement.style[cacheData.style.name] = cacheData.style.value;
          return null;
        }
      }
      const el = document.createElement('span');
      el.style[cacheData.style.name] = cacheData.style.value;
      return new ChildSlotModel(el);
    }
    return null;
  }
}