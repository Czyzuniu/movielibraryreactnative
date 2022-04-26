import {render} from '@testing-library/react-native';
import React from 'react';
import ContextWrapper from '../../../utils/ContextWrapper';
import TestObjects from '../../../utils/TestObjects';
import MovieDetailsHeader from '../../../../src/movie_library/presentation/components/MovieDetailsHeader';

describe('MovieDetailsHeader Tests', () => {
  it('should render and match snapshot', () => {
    const {toJSON} = render(
      <ContextWrapper>
        <MovieDetailsHeader movie={TestObjects.DescriptiveMovie()} />
      </ContextWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
