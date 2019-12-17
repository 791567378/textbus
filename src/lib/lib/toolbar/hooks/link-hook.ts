import { EditContext, Hook } from '../help';

export class LinkHook implements Hook {
  setup(frameContainer: HTMLElement, context: EditContext): void {
    context.document.addEventListener('click', ev => {
      if ((ev.target as HTMLElement).tagName.toLowerCase() === 'a') {
        ev.preventDefault();
      }
    });
  }
}
