# Autocomplete

<!-- STORY -->

### Usage

```js
import Autocomplete from 'respectre-autocomplete';
```

### Select

| propName | propType | defaultValue | isRequired |
| -------- | -------- | ------------ | ---------- |
| list     | array    | []           | -          |
| onSelected | func   | -            | -          |
| onChange | func     | -            | -          |
| placeholder | string | -           | -          |
| name     | string   | -            | yes        |
| loading  | boolean  | false        | -          |

### Roadmap

#### Default

```js
import Autocomplete from 'respectre-autocomplete';

const list = [
  {
    id: 1,
    src: 'https://picturepan2.github.io/spectre/img/avatar-4.png',
    label: 'Steve Roger',
    value: 'test',
  },
  {
    id: 2,
    src: 'https://picturepan2.github.io/spectre/img/avatar-4.png',
    label: 'Captain America',
    value: 'test2',
  },
];

render() {
  return (
    <Autocomplete
      list={list}
      onSelected={e => console.log(e)}
      placeholder="Type name of the user"
      name="users"
    />
  );
}
```
