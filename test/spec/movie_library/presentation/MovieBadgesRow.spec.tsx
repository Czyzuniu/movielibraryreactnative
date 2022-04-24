import {render} from '@testing-library/react-native';
import React from 'react';
import ContextWrapper from '../../../utils/ContextWrapper';
import MovieBadgesRow from '../../../../src/movie_library/presentation/components/MovieBadgesRow';
import TestObjects from '../../../utils/TestObjects';

describe('MovieBadgesRow Tests', () => {
  it('should render and match snapshot', () => {
    const {toJSON} = render(
      <ContextWrapper>
        <MovieBadgesRow movie={TestObjects.DescriptiveMovie()} />
      </ContextWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
