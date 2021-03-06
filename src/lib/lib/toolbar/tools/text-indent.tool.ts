import { FormatMatcher } from '../matcher/format.matcher';
import { textIndentFormatter } from '../../formatter/block-style.formatter';
import { BlockStyleCommander } from '../commands/block-style.commander';
import { FormatAbstractData } from '../../core/format-abstract-data';
import { Toolkit } from '../toolkit/toolkit';
import { PreComponent } from '../../components/pre.component';
import { SelectConfig } from '../toolkit/select.handler';

export const textIndentToolConfig: SelectConfig = {
  tooltip: '首行缩进',
  iconClasses: ['textbus-icon-text-indent'],
  mini: true,
  options: [{
    label: '0x',
    value: '0',
    classes: ['textbus-text-indent-0'],
    default: true
  }, {
    label: '1x',
    value: '1em',
    classes: ['textbus-text-indent-1'],
    default: true
  }, {
    label: '2x',
    classes: ['textbus-text-indent-2'],
    value: '2em',
  }, {
    label: '4x',
    classes: ['textbus-text-indent-4'],
    value: '4em'
  }],
  matcher: new FormatMatcher(textIndentFormatter, [PreComponent]),
  highlight(options, data) {
    if (data instanceof FormatAbstractData) {
      for (const option of options) {
        if (option.value === data.styles.get('textIndent')) {
          return option;
        }
      }
    }
  },
  commanderFactory() {
    return new BlockStyleCommander('textIndent', textIndentFormatter);
  }
};
export const textIndentTool = Toolkit.makeSelectTool(textIndentToolConfig);
