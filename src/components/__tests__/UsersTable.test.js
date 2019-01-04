import React from 'react';
import moxios from 'moxios';
import { mount, ReactWrapper } from 'enzyme';

import UsersTable from '../UsersTable';

let component;

const fetchedData = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618'
      }
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains'
    }
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
      geo: {
        lat: '-68.6102',
        lng: '-47.0653'
      }
    },
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: {
      name: 'Romaguera-Jacobson',
      catchPhrase: 'Face to face bifurcated interface',
      bs: 'e-enable strategic applications'
    }
  },
  {
    id: 4,
    name: 'Yannick Le Roux',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
      geo: {
        lat: '-68.6102',
        lng: '-47.0653'
      }
    },
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: {
      name: 'Romaguera-Jacobson',
      catchPhrase: 'Face to face bifurcated interface',
      bs: 'e-enable strategic applications'
    }
  },
  {
    id: 5,
    name: 'Raquel Yocom',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4157',
      geo: {
        lat: '-68.6102',
        lng: '-47.0653'
      }
    },
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: {
      name: 'Romaguera-Jacobson',
      catchPhrase: 'Face to face bifurcated interface',
      bs: 'e-enable strategic applications'
    }
  }
];

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('https://jsonplaceholder.typicode.com/users', {
    status: 200,
    response: fetchedData
  });
  component = mount(<UsersTable />);
});

afterEach(() => {
  moxios.uninstall();
  component.unmount();
});

it('has a table header, body and footer', (done) => {
  moxios.wait(() => {
    component.update();

    // expect(component).toMatchSnapshot();

    expect(component.find('table').length).toEqual(1);
    expect(component.find('thead').length).toEqual(1);
    expect(component.find('tbody').length).toEqual(1);
    expect(component.find('tfoot').length).toEqual(1);
    done();
  });
});

it('makes sure the number of rows matches the pagination displayed by default', (done) => {
  moxios.wait(() => {
    component.update();

    const defaultPagin = component
      .find('td.pagination')
      .find('input')
      .first()
      .props().value;

    expect(component.find('tbody').find('tr').length).toEqual(defaultPagin);
    done();
  });
});

it.skip('can display the 2 rows when switched to pagination 2', (done) => {
  moxios.wait(() => {
    component.update();

    console.log(
      'test click',
      component
        .find('td.pagination')
        .find('svg')
        .at(2)
        .debug()
    );

    component
      .find('td.pagination')
      .find('svg')
      .first()
      .simulate('click')
      .tap(() => console.log('clicked !'));

    // component.update();

    const portalWrapper = new ReactWrapper(component.getDOMNode());

    console.log(portalWrapper.debug());

    // expect(component.find('tbody').find('tr').length).toEqual(2);

    done();
  });
});

it('displays only one row when search for Leanne with correct data', (done) => {
  moxios.wait(() => {
    component.update();
    component.find('input#search-field-input').simulate('change', { target: { value: 'Leanne' } });

    expect(component.find('tbody').find('tr').length).toEqual(1);

    expect(
      component
        .find('tbody')
        .find('tr')
        .find('td')
        .first()
        .text()
    ).toEqual('Leanne Graham');

    done();
  });
});

it('displays no row when search for unknown value', (done) => {
  moxios.wait(() => {
    component.update();
    component
      .find('input#search-field-input')
      .simulate('change', { target: { value: 'sdfsfssgfdg' } });

    expect(component.find('tbody').find('tr').length).toEqual(0);

    done();
  });
});
