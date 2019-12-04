import { Subject } from 'rxjs';

import { Form } from './forms/form';
import { AttrType } from './forms/help';
import { DropdownConfig, HandlerType, Priority } from '../help';
import { sourceHook } from '../hooks/source-hook';
import { AttrCommander } from '../../commands/attr-commander';

const commander = new AttrCommander('audio');

const form = new Form([{
  type: AttrType.TextField,
  label: '音频链接地址',
  name: 'src',
  required: true,
  placeholder: '请输入链接地址',
  canUpload: true,
  uploadType: 'audio',
  uploadBtnText: '上传新音频'
}, {
  type: AttrType.Switch,
  label: '自动播放',
  required: true,
  checked: false,
  name: 'autoplay'
}, {
  type: AttrType.Hidden,
  name: 'controls',
  value: 'controls'
}]);
const hideEvent = new Subject<void>();

form.onSubmit = function (attrs) {
  commander.updateValue(attrs);
  hideEvent.next();
};

export const musicHandler: DropdownConfig = {
  type: HandlerType.Dropdown,
  classes: ['tanbo-editor-icon-music'],
  priority: Priority.Inline,
  tooltip: '音频',
  onHide: hideEvent.asObservable(),
  viewer: form,
  hooks: sourceHook,
  editable: {
    attrs: ['src', 'autoplay', 'controls']
  },
  match: {
    tags: ['audio']
  },
  execCommand: commander
};