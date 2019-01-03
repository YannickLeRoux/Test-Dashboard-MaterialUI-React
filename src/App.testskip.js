import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import App from './App';

jest.unmock('plotly.js');
it('renders without crashing', () => {
  const wrapper = mount(<App />);
});
