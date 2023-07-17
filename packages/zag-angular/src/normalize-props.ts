import { type PropTypes, createNormalizer } from '@zag-js/types';

import { type Dict, type SplitArgs } from './types';

const propMap: Dict<string> = {
  onDoubleClick: 'onDblClick',
  onChange: 'onInput',
  defaultChecked: 'checked',
  defaultValue: 'value',
};

function toAngularProp(prop: string) {
  return prop in propMap ? propMap[prop] : prop;
}

const attrs = new Set(['role', 'form']);

function isAngularAttr(prop: string) {
  return /^((data|aria)-.*)$/.test(prop) || attrs.has(prop);
}

export const normalizeProps = createNormalizer<PropTypes<SplitArgs>>((props: Dict) => {
  const normalized: SplitArgs = { attrs: {}, props: {} };

  for (const key in props) {
    const value = props[key];

    if (isAngularAttr(key)) {
      normalized.attrs[key] = value;
    } else if (key === 'children') {
      if (typeof value === 'string') {
        normalized.props['innerHTML'] = value;
      }
    } else {
      normalized.props[toAngularProp(key)] = props[key];
    }
  }

  return normalized;
});
