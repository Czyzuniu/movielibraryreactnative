import {render} from '@testing-library/react-native';
import React from 'react';
import ContextWrapper from '../../../utils/ContextWrapper';
import TestObjects from '../../../utils/TestObjects';
import MovieDetails from '../../../../src/movie_library/presentation/components/MovieDetails';

describe('MovieDetails Tests', () => {
  it('should render and match snapshot', () => {
    const {toJSON} = render(
      <ContextWrapper>
        <MovieDetails movie={TestObjects.DescriptiveMovie()} />
      </ContextWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
