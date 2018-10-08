import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Autocomplete as ReAutocomplete,
  AutocompleteInput,
} from 'respectre/experimentals';

import {
  Avatar,
  Menu,
  MenuItem,
  Tile,
  TileIcon,
  TileContent,
  Chip,
} from 'respectre/components';

import {
  Button,
  Input,
  FormIcon,
} from 'respectre/elements';

import 'spectre.css/dist/spectre-exp.css';
import 'spectre.css/dist/spectre-icons.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      list: [],
      updatedList: [],
      isFocused: false,
      isMouseEntered: false,
    };
    this.handleRemoveSelected = this.handleRemoveSelected.bind(this);
    this.handleAddToSelected = this.handleAddToSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  componentWillMount() {
    const { list } = this.props;
    this.setState({ list, [this.props.name]: '' });
  }
  handleAddToSelected(e, item) {
    const { selected } = this.state;
    const { name, onSelected } = this.props;
    e.preventDefault();
    this.setState({ selected: [...selected, item], updatedList: [], [name]: '' });
    onSelected([...selected, item]);
  }
  handleRemoveSelected(index) {
    const { selected } = this.state;
    const { onSelected } = this.props;
    selected.splice(index, 1);
    this.setState({ selected });
    onSelected(selected);
  }
  handleChange(e) {
    const { onChange, list  } = this.props;
    const { selected } = this.state;
    const updatedList = list.filter(item => item.label.toLowerCase().search(e.target.value.toLowerCase()) !== -1);
    const newUpdatedList = updatedList.filter(item => !selected.includes(item));
    this.setState({ updatedList: newUpdatedList, [e.target.name]: e.target.value });
    onChange(e);
  }
  handleBlur() {
    this.setState({ isFocused: false });
  }
  handleFocus() {
    this.setState({ isFocused: true });
  }
  handleMouseEnter() {
    this.setState({ isMouseEntered: true });
  }
  handleMouseLeave() {
    this.setState({ isMouseEntered: false });
  }
  render() {
    const { placeholder, loading, name } = this.props;
    const {
      updatedList, selected, isFocused,
      isMouseEntered,
    } = this.state;
    return (
      <ReAutocomplete>
        <AutocompleteInput className="is-focused">
          {selected.map((item, i) => (
            <Chip key={i}>
              {item.src &&
              <Avatar size="sm">
                <img src={item.src} alt={item.label} />
              </Avatar>
              }
              {item.label}
              <Button color="clear" aria-label="Close" role="button" onClick={() => this.handleRemoveSelected(i)} />
            </Chip>
          ))}
          <div className={classNames({ 'has-icon-left': loading })}>
            <Input
              name={name}
              placeholder={placeholder}
              onChange={this.handleChange}
              onBlur={!isMouseEntered ? this.handleBlur : undefined}
              onFocus={this.handleFocus}
              value={this.state[name]}
            />
            {loading && <FormIcon className="loading" />}
          </div>
        </AutocompleteInput>
        {updatedList.length > 0 && isFocused  &&
          <Menu onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
            {updatedList.map((item, i) => (
              <MenuItem key={i}>
                <a href="/" onClick={e => this.handleAddToSelected(e, item)}>
                  <Tile centered>
                    {item.src &&
                      <TileIcon>
                        <Avatar size="sm">
                          <img src={item.src} alt={item.label} />
                        </Avatar>
                      </TileIcon>
                    }
                    <TileContent>
                      {item.label}
                    </TileContent>
                  </Tile>
                </a>
              </MenuItem>
            ))}
          </Menu>
        }
      </ReAutocomplete>
    );
  }
}

Autocomplete.propTypes = {
  placeholder: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onSelected: PropTypes.func,
  name: PropTypes.string.isRequired,
};

Autocomplete.defaultProps = {
  placeholder: '',
  list: [],
  loading: false,
  onChange: e => e,
  onSelected: e => e,
};

export default Autocomplete;
