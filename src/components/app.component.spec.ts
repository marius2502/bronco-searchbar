import { LitElement } from 'lit-element';
import { BroncoSearchbar } from './app.component';
import './app.component';
import { emit } from 'cluster';

describe('bronco-searchbar', () => {
  let element: BroncoSearchbar;

  beforeEach(async () => {
    element = document.createElement('bronco-left-navbar') as BroncoSearchbar;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => { element.remove(); });

  it('should render bronco-left-navbar', async () => {
    document.body.appendChild(element);
    await element.updateComplete;
    expect(element.textContent).toBe('');
  });

});
