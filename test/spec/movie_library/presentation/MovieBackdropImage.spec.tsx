import MovieBackdropImage from '../../../../src/movie_library/presentation/components/MovieBackdropImage';
import {render} from '@testing-library/react-native';
import React from 'react';
import ContextWrapper from '../../../utils/ContextWrapper';

describe('MovieBackdropImage Tests', () => {
  it('should render and match snapshot', () => {
    const {toJSON} = render(
      <ContextWrapper>
        <MovieBackdropImage imagePath={'imagepath.jpg'} />
      </ContextWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should have the correct source uri', () => {
    const imagePath = 'imagepath.jpg';

    const {getByTestId} = render(
      <ContextWrapper>
        <MovieBackdropImage imagePath={imagePath} />
      </ContextWrapper>,
    );

    const image = getByTestId('TEST_IMAGE_' + imagePath);

    expect(image.props.source.uri).toBe(
      'https://mock-image-api.co.uk/w500/imagepath.jpg',
    );
  });
});
