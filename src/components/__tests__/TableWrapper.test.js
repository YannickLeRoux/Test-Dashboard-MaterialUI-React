import React from 'react';
import { shallow, mount } from 'enzyme';

import TableWrapper from '../TableWrapper';

const dataSet1 = {
  events: [
    {
      timestamp: 1,
      peak_p_max_kw: 387.9
    },
    {
      timestamp: 2,
      peak_p_max_kw: 287.9
    },
    {
      timestamp: 3,
      peak_p_max_kw: 347.9
    },
    {
      timestamp: 4,
      peak_p_max_kw: 487.9
    },
    {
      timestamp: 5,
      peak_p_max_kw: 187.9
    },
    {
      timestamp: 6,
      peak_p_max_kw: 587.9
    }
  ]
};

const dataSet2 = {
  events: [
    {
      timestamp: 7,
      peak_p_max_kw: 199.9
    },
    {
      timestamp: 8,
      peak_p_max_kw: 234.9
    },
    {
      timestamp: 9,
      peak_p_max_kw: 456.9
    },
    {
      timestamp: 10,
      peak_p_max_kw: 457.9
    },
    {
      timestamp: 11,
      peak_p_max_kw: 122.2
    },
    {
      timestamp: 12,
      peak_p_max_kw: 757.9
    }
  ]
};

let wrapper;

beforeEach(() => {
  wrapper = mount(<TableWrapper data={dataSet1} />);
});

afterEach(() => {
  wrapper.unmount();
});

it('should render a table, header, body', () => {
  expect(wrapper.find('table').length).toEqual(1);
  expect(wrapper.find('thead').length).toEqual(1);
  expect(wrapper.find('tbody').length).toEqual(1);
});

it('should render the correct # of rows', () => {
  expect(wrapper.find('tbody').find('tr').length).toEqual(6);
});

it('should rerender when props update', () => {
  // check the table first render correctly the dataSet1
  expect(
    wrapper
      .find('tbody')
      .find('tr')
      .find('td')
      .at(1)
      .text()
  ).toEqual('1000');

  expect(
    wrapper
      .find('tbody')
      .find('tr')
      .find('td')
      .at(2)
      .text()
  ).toEqual('387.9');
  // pass dataSet2 as a new props to the component
  wrapper.setProps({ data: dataSet2 });
  // check the table now renders new data set

  expect(
    wrapper
      .find('tbody')
      .find('tr')
      .find('td')
      .at(1)
      .text()
  ).toEqual('7000');
  expect(
    wrapper
      .find('tbody')
      .find('tr')
      .find('td')
      .at(2)
      .text()
  ).toEqual('199.9');
});
