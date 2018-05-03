import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Option from './Option';

const OptionsContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const SortableItem = SortableElement(Option);

const SortableList = SortableContainer(({ options, ...props }) => {
  return (
    <OptionsContainer>
      {options.map((option, index) => {
        return (
          <SortableItem {...option} {...props} index={index} key={option.id} />
        );
      })}
    </OptionsContainer>
  );
});

const NewPoll = props => (
  <SortableList {...props} lockAxis="y" useDragHandle lockToContainerEdges />
);

NewPoll.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NewPoll;
