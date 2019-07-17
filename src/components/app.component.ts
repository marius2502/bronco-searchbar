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

  /**
   *
   * Defines the shown elements due to input
   * @type {string[]}
   * @memberof BroncoSearchbar
   */
  @property()
  filteredArray!: string[] | undefined;

  /**
   * Commit an array with strings to be searched for
   * @type {string[]}
   * @memberof BroncoSearchbar
   */
  @property()
  searchArray: string[] = [];

  @query('#input')
  inputElement!: HTMLInputElement;

  firstUpdated() {
    console.log(this.searchArray);
    this.inputElement.addEventListener('keyup', () => {
      if (this.inputElement.value.length > 2) {
        this.filteredArray = this.searchArray.filter(word => word.includes(this.inputElement.value));
      }
      else {
        this.filteredArray = undefined;
      }
    });
  }

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

        <!-- Search preview -->
        ${this.filteredArray ? html`
        <ul>
          ${this.filteredArray.map(word => html`<li>${word}</li>`)}
        </ul>
        ` : ''}

      </div>
    </div>
`;
  }
}