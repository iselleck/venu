/*
 * Main
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Selectors
import {
  makeSelectUser,
  makeSelectVenuMap,
  makeSelectMapMode,
  makeSelectExhibits,
  makeSelectFacilities,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Containers
import Header from './Header';
// import PlacesPanel from 'containers/PlacesPanel'; // Change to be local
import VenuMap from './Map';
import Panel from './Panel';

// Local components
import {
  Wrapper,
  MapWrapper,
} from './styles';

// Helpers

export class Main extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <Wrapper>
        <Header />
        <MapWrapper>
          <VenuMap />
        </MapWrapper>
        <Panel />
      </Wrapper>
    );
  }
}

Main.propTypes = {
  user: T.object,
  mapMode: T.string,
  venuMap: T.object,
  exhibits: T.object,
  facilities: T.object,
  currentPlace: T.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  mapMode: makeSelectMapMode(),
  venuMap: makeSelectVenuMap(),
  exhibits: makeSelectExhibits(),
  facilities: makeSelectFacilities(),
  currentPlace: makeSelectCurrentPlace(),
});

// Connect our props to Main
export default connect(mapStateToProps)(Main);