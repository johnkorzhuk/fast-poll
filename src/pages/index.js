import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { arrayMove } from 'react-sortable-hoc';
import shortId from 'short-id';

import { updateTitle, createPoll, resetPoll } from '../store/poll/actions';
import {
  addOption,
  removeOption,
  updateOption,
  updateOptionOrder,
  resetOptions,
  updateNewest,
} from '../store/poll/options/actions';
import { selectOrderedOptions } from '../store/poll/options/selectors';

import withAuth from '../containers/withAuth';
import {
  Heading1,
  primarySemiBold,
} from '../components/common/styled/typography';
import { Input, Label } from '../components/common/styled/theme';
import NewPoll from '../components/Poll/New';
import Option from '../components/Poll/Option';
import Button from '../components/common/Button/index';

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TitleContainer = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;

  @media (min-width: 600px) {
    width: 450px;
  }
`;

const TitleInput = Input.extend`
  ${primarySemiBold('1.8rem')};
  line-height: 1.6rem;
`;

const NewOption = styled(Option)`
  margin-bottom: 20px;
`;

class NewPollPage extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        editing: PropTypes.bool.isRequired,
        votes: PropTypes.number.isRequired,
      }),
    ),
    newest: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }),
    order: PropTypes.arrayOf(PropTypes.string).isRequired,
    uid: PropTypes.string,
    title: PropTypes.string,
    signIn: PropTypes.func.isRequired,
    updateNewest: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    createPoll: PropTypes.func.isRequired,
    addOption: PropTypes.func.isRequired,
    resetOptions: PropTypes.func.isRequired,
    resetPoll: PropTypes.func.isRequired,
    removeOption: PropTypes.func.isRequired,
    updateOption: PropTypes.func.isRequired,
    updateOptionOrder: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const { resetPoll, resetOptions, updateNewest } = this.props;
    const id = shortId.generate();

    resetPoll();
    resetOptions();
    updateNewest({
      id,
    });
  }

  getNewOptionInput = node => {
    this.newOptionInput = node;
  };

  handleFocusInput = node => {
    const { options } = this.props;

    if (node && node.value && options.length > 0) {
      const { value } = node;
      // focus the end of the text
      node.focus();
      node.setSelectionRange(value.length, value.length);
      node.scrollLeft = node.scrollWidth; // eslint-disable-line no-param-reassign
    }
  };

  handleKeydown = (e, id, newest) => {
    if (e.which === 27 && !newest && id) this.handleToggleEdit(id);

    if (e.which === 13) {
      if (newest) {
        this.handleAddItem();
      } else if (id) {
        this.handleToggleEdit(id);
      } else {
        this.newOptionInput.focus();
      }
    }
  };

  handleToggleEdit = id => {
    const { updateOption, options } = this.props;
    const option = options.find(opt => opt.id === id);

    updateOption(id, { editing: !option.editing }).then(() => {
      if (option.editing) {
        this.newOptionInput.focus();
      }
    });
  };

  handleTitleChange = e => {
    const { updateTitle } = this.props;
    const { value } = e.target;

    updateTitle(value);
  };

  handleTextChange = (e, id, newest) => {
    const { updateOption, updateNewest } = this.props;
    const { value } = e.target;

    if (newest) {
      updateNewest({ text: value });
    } else {
      updateOption(id, { text: value });
    }
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    const { updateOptionOrder, order } = this.props;

    updateOptionOrder(
      arrayMove(order, oldIndex, newIndex).filter(Boolean),
    ).then(() => {
      this.newOptionInput.focus();
    });
  };

  handleAddItem = () => {
    const { addOption, newest } = this.props;

    if (newest.text) {
      addOption(shortId.generate(), newest).then(() => {
        this.newOptionInput.focus();
      });
    }
  };

  handleDelete = id => {
    const { removeOption } = this.props;

    removeOption(id).then(() => {
      this.newOptionInput.focus();
    });
  };

  handleCreate = () => {
    const { signIn, uid } = this.props;
    const pollId = shortId.generate();

    if (!uid) {
      // due to our database rules, we can't write unless a uid exists
      signIn('anonymous').then(() => {
        this.createPoll(pollId);
      });
    } else {
      this.createPoll(pollId);
    }
  };

  createPoll(pollId) {
    const { firebase } = this.context;
    const { history, title, options, createPoll, isAuthed, uid } = this.props;

    createPoll(firebase, history, { title, options, pollId, isAuthed, uid });
  }

  render() {
    const { title, options, theme, newest } = this.props;
    const disableCreate = !title || options.length < 2;

    return (
      <div>
        <Heading1>Create a new Poll</Heading1>
        <TitleContainer>
          <Label htmlFor="newPollTitle">Title</Label>
          <TitleInput
            autoFocus
            id="newPollTitle"
            value={title}
            onChange={this.handleTitleChange}
            onKeyDown={this.handleKeydown}
          />
        </TitleContainer>
        <NewPoll
          options={options}
          onToggleEdit={this.handleToggleEdit}
          onTextChange={this.handleTextChange}
          onKeyDown={this.handleKeydown}
          onSortEnd={this.handleSortEnd}
          onDelete={this.handleDelete}
          focusInput={this.handleFocusInput}
          theme={theme}
        />
        <NewOption
          {...newest}
          newest
          editing
          tabIndex={0}
          theme={theme}
          getNewOptionInput={this.getNewOptionInput}
          onTextChange={this.handleTextChange}
          onKeyDown={this.handleKeydown}
          onAdd={this.handleAddItem}
        />
        <ActionContainer>
          <Button
            type="positive"
            icon="check-circle"
            iconSize={18}
            disabled={disableCreate}
            onClick={!disableCreate && this.handleCreate}>
            Create
          </Button>
        </ActionContainer>
      </div>
    );
  }
}

const enhance = compose(
  withAuth(),
  withTheme,
  connect(
    state => {
      return {
        title: state.poll.data.title,
        order: state.poll.options.order,
        options: selectOrderedOptions(state),
        loading: state.poll.data.loading,
        newest: state.poll.options.newest,
      };
    },
    {
      updateTitle,
      addOption,
      createPoll,
      removeOption,
      updateOption,
      updateOptionOrder,
      resetOptions,
      resetPoll,
      updateNewest,
    },
  ),
);

export default enhance(NewPollPage);
