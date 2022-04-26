import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import ContextWrapper from '../../../utils/ContextWrapper';
import TestObjects from '../../../utils/TestObjects';
import MovieCard from '../../../../src/movie_library/presentation/components/MovieCard';

describe('MovieCard Tests', () => {
  it('should render and match snapshot', () => {
    const {toJSON} = render(
      <ContextWrapper>
        <MovieCard movie={TestObjects.SimplisticMovie()} onPress={jest.fn} />
      </ContextWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call on press prop when tapped', () => {
    const onPress = jest.fn();
    const movie = TestObjects.SimplisticMovie();
    const {getByTestId} = render(
      <ContextWrapper>
        <MovieCard movie={movie} onPress={onPress} />
      </ContextWrapper>,
    );

    fireEvent.press(getByTestId('MOVIE_CARD_' + movie.id));

    expect(onPress).toBeCalled();
  });
});
