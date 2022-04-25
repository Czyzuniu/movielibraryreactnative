import {render, waitFor} from '@testing-library/react-native';
import React from 'react';
import ContextWrapper from '../../../utils/ContextWrapper';
import {mockNavigation} from '../../../utils/mockNavigation';
import {mockDeep} from 'jest-mock-extended';
import {when} from 'jest-when';
import {myContainer} from '../../../../src/ioc/container';
import {InjectableTypes} from '../../../../src/ioc/types';
import GetMovieByIdUseCase from '../../../../src/movie_library/domain/usecase/GetMovieByIdUseCase';
import ViewMovie from '../../../../src/movie_library/presentation/screens/ViewMovie';
import TestObjects from '../../../utils/TestObjects';
import {Alert} from 'react-native';
import {act} from 'react-test-renderer';

describe('View Movie Screen Tests', () => {
  let getMovieByIdUseCase: GetMovieByIdUseCase;

  beforeEach(() => {
    getMovieByIdUseCase = mockDeep<GetMovieByIdUseCase>();
    jest.spyOn(myContainer, 'get').mockImplementation(() => jest.fn());
    when(myContainer.get)
      .calledWith(InjectableTypes.GetMovieByIdUseCase)
      .mockReturnValue(getMovieByIdUseCase);
  });

  it('should render and match snapshot', () => {
    const {toJSON} = render(
      <ContextWrapper>
        <ViewMovie {...mockNavigation({movieId: '12345'})} />
      </ContextWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call the usecase to fetch the movie initially and render movie details', async () => {
    const movieId = '12345';
    when(getMovieByIdUseCase.execute).mockResolvedValue(
      TestObjects.DescriptiveMovie(),
    );

    const {getByTestId} = render(
      <ContextWrapper>
        <ViewMovie {...mockNavigation({movieId})} />
      </ContextWrapper>,
    );

    await waitFor(async () => {
      expect(getMovieByIdUseCase.execute).toBeCalledWith(movieId);
      expect(
        getByTestId(`MOVIE_DETAILS_${TestObjects.DescriptiveMovie().id}`),
      ).toBeTruthy();
    });
  });

  it('should refetch when pulled to refresh on main scrollview', async () => {
    const movieId = '12345';
    when(getMovieByIdUseCase.execute).mockResolvedValue(
      TestObjects.DescriptiveMovie(),
    );

    const {getByTestId} = render(
      <ContextWrapper>
        <ViewMovie {...mockNavigation({movieId})} />
      </ContextWrapper>,
    );

    const scrollView = getByTestId('VIEW_MOVIE_SCROLL');

    await act(async () => {
      scrollView.props.refreshControl.props.onRefresh();
    });

    expect(getMovieByIdUseCase.execute).toBeCalledWith(movieId);
  });

  it('should display an alert if fails to fetch the movie', async () => {
    jest.spyOn(Alert, 'alert');
    const movieId = '12345';
    const exception = new Error('error');
    const navigation = mockNavigation({movieId});
    when(getMovieByIdUseCase.execute).mockRejectedValue(exception);

    render(
      <ContextWrapper>
        <ViewMovie {...navigation} />
      </ContextWrapper>,
    );

    await waitFor(() => expect(Alert.alert).toBeCalledWith(exception.message));
  });
});
