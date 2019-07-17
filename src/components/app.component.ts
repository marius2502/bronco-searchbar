import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';

const componentCSS = require('./app.component.scss');

/**
 * Searchbar with suggestions
 * @event selected - Dispatches a CustomEvent when nav item is selected. Selected item is stored in detail of Custom event
 * @cssprop --bg-color - Background color of navitem
 */
@customElement('bronco-searchbar')
export class BroncoSearchbar extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  render() {
    return html`
    <div class="container">
      <div class="searchBox">
        <input id="input" class="searchInput" type="text" name="" placeholder="Search">
        <button class="searchButton">
          <i class="material-icons">
            search
          </i>
        </button>
      </div>
    </div>
`;
  }
}