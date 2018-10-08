import React from 'react';
import 'spectre.css/dist/spectre.css';
import 'spectre.css/dist/spectre-icons.css';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Autocomplete from '../components/Autocomplete';
import withDocsForm from './utils/withDocsForm';
import AutocompleteReadme from '../docs/Autocomplete.md';

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

storiesOf('Autocomplete', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocsForm(AutocompleteReadme))
  .add('default', () => (
    <Autocomplete
      list={list}
      onSelected={e => console.log(e)}
      placeholder="Type name of the user"
      name="users"
    />
  ));

