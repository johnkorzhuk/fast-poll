import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Heading2 } from '../styled/typography';
import { Button } from '../styled/theme';

const Container = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OptionText = styled.span`
  flex: 10;
`;

const OptionResult = styled.div`
  padding-left: 10px;
  margin-left: 10px;
  flex: 1;
  font-weight: bold;
  height: 100%;
  text-align: center;
`;

// We could have split this component into two: OptionButton for when the user
// has yet to vote and OptionSelection for when the user has voted to clean
// up this component. I did it this way to show the versatility of styled-
// components.
const Option = styled(
  ({
    showResults,
    // destructure these next two props so that react
    // doesn't complain about unsupported html tag attributes
    // https://reactjs.org/warnings/unknown-prop.html
    selected,
    optionIsSelected,
    ...props
  }) => (showResults ? <div {...props} /> : <button {...props} />),
)`
  display: flex;
  align-items: center;
  font-family: Roboto, sans-serif;
  margin: 20px 0;
  background-color: white;
  border: none;
  padding: 10px 20px;
  box-shadow: 0 10px 20px
    ${({ selected }) =>
      selected ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'};
  transition: transform 150ms linear, box-shadow 150ms linear,
    color 150ms linear;
  cursor: ${({ showResults }) => (showResults ? 'default' : 'pointer')};
  color: ${({ selected, optionIsSelected }) =>
    selected
      ? 'rgba(0, 0, 0, 0.8)'
      : optionIsSelected ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.6)'};

  ${({ showResults }) =>
    showResults
      ? css`
          &:hover,
          &:focus {
            color: rgba(0, 0, 0, 0.8);
          }
        `
      : css`
          &:hover,
          &:focus {
            transform: ${({ selected }) =>
              selected ? 'translateY(0)' : 'translateY(-3px)'};
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            color: rgba(0, 0, 0, 0.8);
          }
        `};
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  min-height: 36px;

  > button {
    &:first-child {
      margin-right: 20px;
    }
  }
`;

const Poll = ({
  loading,
  options,
  title,
  selection,
  showResults,
  onSelectOption,
  onVote,
  onShowResults,
  created,
  isOwner,
  totalVotes,
}) => {
  const renderOptions = created || (!loading && options.length > 0);
  const renderVoteButton = renderOptions && !showResults;
  const renderShowResultsButton = renderVoteButton && !showResults && isOwner;
  const voteIsDisabled = loading || !selection;

  return (
    <Container>
      <Heading2>{title || 'loading...'}</Heading2>
      <div>
        {renderOptions &&
          options.map(option => {
            const { id } = option;
            const selected = id === selection;
            let perc = totalVotes
              ? (option.votes / totalVotes * 100).toFixed(2)
              : 0;

            if (perc.toString().split('.')[1] === '00') {
              perc = Number.parseInt(perc, 10);
            }

            return (
              <Option
                key={id}
                selected={selected}
                showResults={showResults}
                optionIsSelected={!!selection}
                onClick={() => !showResults && onSelectOption(id)}>
                <OptionText>{option.text}</OptionText>
                {showResults &&
                  !Number.isNaN(perc) && <OptionResult>{perc}%</OptionResult>}
              </Option>
            );
          })}
      </div>
      <ButtonContainer>
        {renderShowResultsButton && (
          <Button onClick={onShowResults}>See Results</Button>
        )}
        {renderVoteButton && (
          <Button disabled={voteIsDisabled} onClick={!voteIsDisabled && onVote}>
            Vote
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

Poll.propTypes = {
  loading: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      editing: PropTypes.bool.isRequired,
      votes: PropTypes.number.isRequired,
    }),
  ),
  title: PropTypes.string.isRequired,
  totalVotes: PropTypes.number,
  selection: PropTypes.string.isRequired,
  showResults: PropTypes.bool.isRequired,
  created: PropTypes.bool.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  onShowResults: PropTypes.func.isRequired,
};

export default Poll;
