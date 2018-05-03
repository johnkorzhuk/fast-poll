import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Heading1 as BaseHeading1,
  primaryBold,
  primarySemiBold,
} from '../common/styled/typography';
import { Selection as BaseSelection } from '../common/styled/theme';
import { IconContainer as BaseIconContainer } from '../common/styled/layout';
import Button from '../common/Button/index';
import Icon from '../common/icons/index';

const CONTAINER_PADDING = 50;

const Container = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
`;

const OptionsContainer = styled.div`
  width: 100%;
  padding: 0 ${CONTAINER_PADDING}px;
`;

const Heading1 = BaseHeading1.extend`
  width: 100%;
  padding: 30px ${CONTAINER_PADDING}px 20px;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: ${CONTAINER_PADDING}px;
`;

const SelectionButton = BaseSelection.extend`
  cursor: pointer;
  text-align: left;
  border-color: ${({ active, theme }) =>
    active ? theme.colors.darkGray : 'transparent'};
  transition: border-color 200ms linear;
`.withComponent('button');

const OptionResult = styled.div`
  ${primaryBold()};
  position: absolute;
  right: ${({ selected }) => (selected ? '34px' : '10px')};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: ${({ showResults }) =>
    showResults ? 'center' : 'flex-end'};
  width: 100%;
  min-height: 36px;
  padding: 0 ${CONTAINER_PADDING}px 30px;

  > button {
    &:last-child {
      margin-left: 20px;
    }
  }
`;

const IconContainer = BaseIconContainer.extend`
  right: 10px;
`;

const TotalVotesContainer = styled.div`
  ${primaryBold('1.8rem')};
  padding: 0 ${CONTAINER_PADDING}px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const TotalVotes = styled.span`
  ${primarySemiBold('1.8rem')};
  margin-left: 20px;
`;

const Selection = ({ showResults, ...props }) => {
  if (showResults) {
    return <BaseSelection {...props} result={showResults} />;
  }

  return <SelectionButton {...props} result={showResults} />;
};

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
  theme,
}) => {
  const renderOptions = created || (!loading && options.length > 0);
  const renderVoteButton = renderOptions && !showResults;
  const renderShowResultsButton = renderVoteButton && !showResults && isOwner;
  const voteIsDisabled = loading || !selection;

  return (
    <Container>
      <Heading1>{title || 'loading...'}</Heading1>
      <OptionsContainer>
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
              <Selection
                created
                key={id}
                active={selected}
                showResults={showResults}
                onClick={() => !showResults && onSelectOption(id)}>
                {option.text}
                {showResults &&
                  !Number.isNaN(perc) && (
                    <OptionResult selected={selected}>{perc}%</OptionResult>
                  )}
                {selected && (
                  <IconContainer size={16}>
                    <Icon
                      icon="check-circle"
                      size={16}
                      gradient={[theme.colors.blue, theme.colors.green]}
                    />
                  </IconContainer>
                )}
              </Selection>
            );
          })}
      </OptionsContainer>
      {showResults && (
        <TotalVotesContainer>
          Total votes <TotalVotes>{totalVotes}</TotalVotes>
        </TotalVotesContainer>
      )}
      <ButtonContainer showResults={showResults}>
        {renderShowResultsButton && (
          <Button
            onClick={onShowResults}
            type="secondary"
            icon="eye-circle"
            iconSize={18}>
            See Results
          </Button>
        )}
        {renderVoteButton && (
          <Button
            icon="check-circle"
            iconSize={18}
            disabled={voteIsDisabled}
            onClick={!voteIsDisabled && onVote}
            type="positive">
            Vote
          </Button>
        )}
        {showResults && (
          <Button to="/new" type="positive">
            New Poll
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

Selection.propTypes = {
  showResults: PropTypes.bool,
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
  theme: PropTypes.object.isRequired,
};

export default Poll;
