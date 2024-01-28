import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
// import { find } from 'styled-components/test-utils'

import MapGridRoom from './';

describe('<MapGridRoom />', () => {
  test('MapGridRoom mounts properly', () => {
    const wrapper = render(<MapGridRoom />);
    expect(wrapper).toBeTruthy();
  });

  test('MapGridRoom displays room symbol', () => {

    // No Symbol and No Exits
    let wrapper = render(<MapGridRoom />);
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.container.children[0].children.length).toBe(0);

    // Symbol and No Exits
    wrapper = render(<MapGridRoom room={{ enabled: true }} />);
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.container.children[0].children.length).toBe(1);

    // No Symbol and Exits
    wrapper = render(<MapGridRoom room={{
      enabled: false,
      northEnabled: true,
      northeastEnabled: true,
      eastEnabled: true,
      southeastEnabled: true,
      southEnabled: true,
      southwestEnabled: true,
      westEnabled: true,
      northwestEnabled: true,
    }} />);
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.container.children[0].children.length).toBe(8);

    // Symbol and Exits
    wrapper = render(<MapGridRoom room={{
      enabled: true,
      northEnabled: true,
      northeastEnabled: true,
      eastEnabled: true,
      southeastEnabled: true,
      southEnabled: true,
      southwestEnabled: true,
      westEnabled: true,
      northwestEnabled: true,
    }} />);
    expect(wrapper.container).toMatchSnapshot();
    expect(wrapper.container.children[0].children.length).toBe(9);
  });
});