import {render} from '@testing-library/react-native';
import React from 'react';
import ContextWrapper from '../../../utils/ContextWrapper';
import MovieWebsiteWebView from '../../../../src/movie_library/presentation/components/MovieWebsiteWebView';

describe('MovieWebsiteWebView Tests', () => {
  it('should render and match snapshot', () => {
    const {toJSON} = render(
      <ContextWrapper>
        <MovieWebsiteWebView source={{uri: 'www.mock.co.uk'}} />
      </ContextWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
