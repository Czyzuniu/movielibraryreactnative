import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import ContextWrapper from '../../../utils/ContextWrapper';
import PopularMovies from '../../../../src/movie_library/presentation/screens/PopularMovies';
import {mockNavigation} from '../../../utils/mockNavigation';
import GetPopularMoviesUseCase from '../../../../src/movie_library/domain/usecase/GetPopularMoviesUseCase';
import {mockDeep} from 'jest-mock-extended';
import {when} from 'jest-when';
import {myContainer} from '../../../../src/ioc/container';
import {InjectableTypes} from '../../../../src/ioc/types';
import TestObjects from '../../../utils/TestObjects';
import {Alert} from 'react-native';
import {act} from 'react-test-renderer';

describe('PopularMovies Screen Tests', () => {
  let popularMoviesUseCaseMock: GetPopularMoviesUseCase;

  beforeEach(() => {
    popularMoviesUseCaseMock = mockDeep<GetPopularMoviesUseCase>();
    jest.spyOn(myContainer, 'get').mockImplementation(() => jest.fn());
    when(myContainer.get)
      .calledWith(InjectableTypes.GetPopularMoviesUseCase)
      .mockReturnValue(popularMoviesUseCaseMock);
  });

  it('should render and match snapshot', () => {
    const {toJSON} = render(
      <ContextWrapper>
        <PopularMovies {...mockNavigation()} />
      </ContextWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should fetch call the usecase to fetch the popular movies', async () => {
    const movies = [
      TestObjects.SimplisticMovie(),
      TestObjects.SimplisticMovie(),
    ];

    when(popularMoviesUseCaseMock.execute).mockResolvedValue(movies);

    const {getByTestId} = render(
      <ContextWrapper>
        <PopularMovies {...mockNavigation()} />
      </ContextWrapper>,
    );

    await waitFor(() =>
      expect(getByTestId('POPULAR_MOVIES_FLAT_LIST').props.data).toStrictEqual(
        movies,
      ),
    );
  });

  it('should navigate to ViewMovie if a movie card is tapped', async () => {
    const movie = TestObjects.SimplisticMovie();
    const movies = [movie];
    const navigation = mockNavigation();
    when(popularMoviesUseCaseMock.execute).mockResolvedValue(movies);

    const {getByTestId} = render(
      <ContextWrapper>
        <PopularMovies {...navigation} />
      </ContextWrapper>,
    );

    await waitFor(() =>
      expect(getByTestId('POPULAR_MOVIES_FLAT_LIST').props.data).toStrictEqual(
        movies,
      ),
    );

    fireEvent.press(getByTestId('MOVIE_CARD_' + movie.id));

    expect(navigation.navigation.navigate).toBeCalledWith('ViewMovie', {
      movieId: movie.id,
      title: movie.title,
    });
  });

  it('should display alert if fails to fetch movies', async () => {
    jest.spyOn(Alert, 'alert');

    const exception = new Error('error');
    const navigation = mockNavigation();
    when(popularMoviesUseCaseMock.execute).mockRejectedValue(exception);

    render(
      <ContextWrapper>
        <PopularMovies {...navigation} />
      </ContextWrapper>,
    );

    await waitFor(() => expect(Alert.alert).toBeCalledWith(exception.message));
  });

  it('should refetch when reached the end', async () => {
    const movie = TestObjects.SimplisticMovie();
    const movies = [movie];
    const navigation = mockNavigation();
    when(popularMoviesUseCaseMock.execute).mockResolvedValue(movies);

    const {getByTestId} = render(
      <ContextWrapper>
        <PopularMovies {...navigation} />
      </ContextWrapper>,
    );

    const flatlist = getByTestId('POPULAR_MOVIES_FLAT_LIST');

    await waitFor(() => expect(flatlist.props.data).toStrictEqual(movies));

    await act(async () => {
      flatlist.props.onEndReached();
    });

    await waitFor(() =>
      expect(popularMoviesUseCaseMock.execute).toBeCalledWith(2, ''),
    );
  });
});
