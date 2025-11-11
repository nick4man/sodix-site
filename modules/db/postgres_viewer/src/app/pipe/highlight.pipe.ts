import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  pure: false,
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, terms: string[]): string {
    if (!value || !terms || terms.length === 0) {
      return value;
    }
    // экранируем термины для RegExp
    const escaped = terms.map((t) => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const pattern = `(${escaped.join('|')})`;
    const regex = new RegExp(pattern, 'gi');
    return value.replace(regex, `<mark>$1</mark>`);
  }
}
