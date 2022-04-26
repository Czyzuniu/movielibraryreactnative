export function mockNavigation(params: any = {}) {
  return {
    navigation: testNavigation(),
    route: {
      params,
      key: 'Screen',
      name: 'Screen',
    },
  } as {
    navigation: any;
    route: any;
  };
}

const testNavigation = () => {
  return {
    addListener: (eventName: string, f: any) => {
      f();
      return jest.fn();
    },
    navigate: jest.fn(),
    popToTop: jest.fn(),
    setOptions: jest.fn(),
    canGoBack: jest.fn(),
    dispatch: jest.fn(),
    reset: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    getParent: jest.fn(),
    getId: jest.fn(),
    getState: jest.fn(),
    pop: jest.fn(),
    push: jest.fn(),
    removeListener: jest.fn(),
    replace: jest.fn(),
    setParams: jest.fn(),
  };
};
