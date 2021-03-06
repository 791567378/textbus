import { Toolkit } from '../toolkit/toolkit';
import { linkFormatter } from '../../formatter/link.formatter';
import { PreComponent } from '../../components/pre.component';
import { UnlinkCommander } from '../commands/unlink.commander';
import { UnlinkMatcher } from '../matcher/unlink.matcher';

export const unlinkToolConfig = {
  tooltip: '取消链接',
  iconClasses: ['textbus-icon-unlink'],
  matcher: new UnlinkMatcher(linkFormatter, [PreComponent]),
  commanderFactory() {
    return new UnlinkCommander();
  }
};
export const unlinkTool = Toolkit.makeButtonTool(unlinkToolConfig);
