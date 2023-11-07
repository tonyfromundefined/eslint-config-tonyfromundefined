# 🪢 eslint-config-tonyfromundefined

Tony's ESLint Configuration, which considers import and property ordering important.

## How to use

```bash
$ yarn add eslint-config-tonyfromundefined
```

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  extends: ["tonyfromundefined"],
}
```


## Features

- TypeScript (`@typescript-eslint/*`)
- React App (`eslint-config-react-app`)
- [Prettier](https://github.com/prettier/eslint-plugin-prettier) (`eslint-*-prettier`)
- [Perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist) (`eslint-plugin-perfectionist`)
  - Sort Imports
  - Sort Object Keys
  - And more...
- [JSON Format](https://github.com/kuceb/eslint-plugin-json-format) (`eslint-plugin-json-format`)
  - Sort JSON
  - Sort `package.json`
- Vanilla Extract property ordering by [Recess](https://github.com/twitter-archive/recess/blob/29bccc870b7b4ccaa0a138e504caf608a6606b59/lib/lint/strict-property-order.js)
  - Using [`eslint-plugin-sort-keys-custom-order`](https://github.com/hugoattal/eslint-plugin-sort-keys-custom-order)
  - with [`stylelint-config-recess-order`](https://github.com/stormwarning/stylelint-config-recess-order)

## Examples

```typescript
// Error
const myObject = {
  b: 2,
  a: 1,
};

// OK
const myObject = {
  a: 1,
  b: 2,
};
```

```typescript
// Error
import MyComponent from "./MyComponent";
import { useEffect } from "react";

// OK
import { useEffect } from "react";

import MyComponent from "./MyComponent";
```

```typescript
/**
 * Only works in `*.css.js`, `*.css.ts`
 */
import { style } from "@vanilla-extract/css"

// Error
export const myClassName = style({
  alignItems: "center",
  bottom: "1rem",
  display: "flex",
  left: "1rem",
  top: "1rem",
});

// OK
export const myClassName = style({
  top: "1rem",
  bottom: "1rem",
  left: "1rem",
  display: "flex",
  alignItems: "center",
});
```
