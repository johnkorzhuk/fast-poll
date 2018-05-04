import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SortableHandle } from 'react-sortable-hoc';

import { Selection } from '../common/styled/theme';
import { IconContainer as BaseIconContainer } from '../common/styled/layout';
import Icon from '../common/icons/index';
import Button from '../common/Button/index';

const OptionInputItem = styled.input`
  border: none;
  width: 100%;
  outline: none;
  padding: 0;
`;

const IconContainer = BaseIconContainer.extend`
  right: 10px;
  cursor: pointer;
`;

const ActionButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Handle = styled.div`
  cursor: move;
  padding: 10px 4px;
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: cemter;
`;

const CloseCircle = styled(({ color, size, ...props }) => (
  <Icon icon="add-circle" size={size} color={color} {...props} />
))`
  transform: rotate(45deg);
`;

const DragHandle = SortableHandle(props => <Handle {...props} />);

const Option = ({
  text,
  id,
  onToggleEdit,
  onKeyDown,
  onTextChange,
  onDelete,
  onAdd,
  editing,
  theme,
  focusInput,
  newest,
  getNewOptionInput,
  ...props
}) => {
  return (
    <Selection
      key={id}
      active={editing}
      newest={newest}
      onDoubleClick={() => !editing && onToggleEdit(id)}
      onBlur={() => !newest && onToggleEdit(id)}
      {...props}>
      {!newest && (
        <DragHandle>
          <Icon icon="drag" size={14} color={theme.colors.black} />
        </DragHandle>
      )}

      {editing || newest
        ? [
            <OptionInputItem
              key="input"
              innerRef={newest ? getNewOptionInput : focusInput}
              value={text}
              onChange={e => onTextChange(e, id, newest)}
              onKeyDown={e => onKeyDown(e, id, newest)}
            />,
            <ActionButton
              key="button"
              icon="add-circle"
              iconSize={18}
              disabled={!text}
              onClick={newest ? onAdd : () => onToggleEdit(id)}
              type="secondary">
              {newest ? 'Add' : 'Update'}
            </ActionButton>,
          ]
        : [
            <span key="test">{text}</span>,
            <IconContainer
              key="delete"
              size={18}
              onClick={() => onDelete(id)}
              title="Delete">
              <CloseCircle color={theme.colors.darkGray} size={18} />
            </IconContainer>,
          ]}
    </Selection>
  );
};

Option.defaultProps = {
  newest: false,
};

Option.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  onToggleEdit: PropTypes.func,
  onKeyDown: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  editing: PropTypes.bool.isRequired,
  theme: PropTypes.object,
  focusInput: PropTypes.func,
  getNewOptionInput: PropTypes.func,
  newest: PropTypes.bool,
};

export default Option;
