import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import SmallWrapper from 'components/SmallWrapper';
import Button from 'components/Button';
import Checkbox from 'components/Input';

// Global Selectors
import {
  makeSelectUser,
  makeSelectOnboardingValidation,
} from 'containers/App/selectors';

// Global Helpers
import {
  dispatchChangeUserInterests,
} from 'containers/App/dispatches';

// Selectors
import {
  makeSelectOnboardingStage,
} from './selectors';

// Local Dispatch Methods
import {
  dispatchGoToPreviousStage,
  dispatchGoToNextStage,
} from './dispatches';

// Messages
import messages from './messages';

// Local Styles
import {
  Header,
  Body,
  OptionList,
  OptionItem,
  ButtonRow,
  ButtonItem,
} from './styles';

export class InterestSelection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderInterestList = this.renderInterestList.bind(this);
    this.verifyInterests = this.verifyInterests.bind(this);
  }

  verifyInterests() {
    const allInterests = document.getElementsByName('interests');
    const { stage, onNextStage } = this.props;
    const interests = [];
    let interestString = '';

    const allInterestsLength = allInterests.length;
    // Loop through elements
    for (let i = 0; i < allInterestsLength; i += 1) {
      const interest = allInterests[i];

      if (interest.checked) {
        interestString += `${interest.value}-`;
        interests.push(interest.value);
      }
    }

    // If we have interests then finish onboarding
    if (interests.length > 0) {
      // Remove the last dash from the string
      interestString = interestString.slice(0, -1);
      localStorage.setItem('venuUserInterests', interestString);
      onNextStage(stage, interests);
    }
  }

  renderInterestList() {
    const { interests } = messages.interestSelection;

    return interests.map((interest) => { // eslint-disable-line
      return (
        <OptionItem key={interest.name}>
          <Checkbox
            id={interest.name}
            name={'interests'}
            value={interest.defaultMessage}
            text={interest.defaultMessage}
            type={'checkbox'}
          />
        </OptionItem>
      );
    });
  }

  render() {
    const { stage, onPrevStage } = this.props;

    return (
      <SmallWrapper>
        <Header>
          <h1>
            { messages.interestSelection.title.defaultMessage }
          </h1>
          <p>
            { messages.interestSelection.intro.defaultMessage }
          </p>
        </Header>
        <Body>
          <h4>
            { messages.interestSelection.subtitle.defaultMessage }
          </h4>
          <OptionList>
            { this.renderInterestList() }
          </OptionList>
          <ButtonRow>
            <ButtonItem>
              <Button
                btnClasses={'reversed bordered full'}
                name={messages.buttons.back.defaultMessage}
                onClickEvent={() => { onPrevStage(stage); }}
              />
            </ButtonItem>
            <ButtonItem>
              <Button
                btnClasses={'reversed bordered full'}
                name={messages.buttons.finish.defaultMessage}
                onClickEvent={() => { this.verifyInterests(stage); }}
              />
            </ButtonItem>
          </ButtonRow>
        </Body>
      </SmallWrapper>
    );
  }
}

InterestSelection.propTypes = {
  stage: T.any.isRequired,
  onPrevStage: T.func,
  onNextStage: T.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onPrevStage: (stage) => dispatchGoToPreviousStage(dispatch, stage),
    onNextStage: (stage, interests) => {
      dispatchChangeUserInterests(dispatch, interests);
      dispatchGoToNextStage(dispatch, stage);
    },
  };
}

// Map state to props
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  stage: makeSelectOnboardingStage(),
  validation: makeSelectOnboardingValidation(),
});

// Connect our AccountCreation
export default connect(mapStateToProps, mapDispatchToProps)(InterestSelection);