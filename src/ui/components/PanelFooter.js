import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  children: null,
  className: '',
};

const PanelFooter = (props) => {
  const {
    className,
    children,
    ...attributes
  } = props;

  const classes = classNames(
    className,
    'panel-footer',
  );

  return (
    <div {...attributes} className={classes}>
      {children}
    </div>
  );
};

PanelFooter.propTypes = propTypes;
PanelFooter.defaultProps = defaultProps;

export default PanelFooter;
