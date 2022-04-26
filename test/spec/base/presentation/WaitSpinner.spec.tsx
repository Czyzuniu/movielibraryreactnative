import {render} from '@testing-library/react-native';
import React from 'react';
import ContextWrapper from '../../../utils/ContextWrapper';
import WaitSpinner from '../../../../src/base/presentation/components/WaitSpinner';

describe('WaitSpinner Tests', () => {
  it('should render the spinner if props is visible and match snapshot', () => {
    const {toJSON, getByTestId} = render(
      <ContextWrapper>
        <WaitSpinner isVisible={true} />
      </ContextWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId('WAIT_SPINNER')).toBeTruthy();
  });

  it('should not render the spinner if props is visible', () => {
    const {queryByTestId} = render(
      <ContextWrapper>
        <WaitSpinner isVisible={false} />
      </ContextWrapper>,
    );
    expect(queryByTestId('WAIT_SPINNER')).toBeFalsy();
  });

  it('should default the prop to not visible', () => {
    const {queryByTestId} = render(
      <ContextWrapper>
        <WaitSpinner />
      </ContextWrapper>,
    );
    expect(queryByTestId('WAIT_SPINNER')).toBeFalsy();
  });
});
