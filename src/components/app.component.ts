import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';

const componentCSS = require('./app.component.scss');

/**
 * Searchbar with suggestions
 * @event selected - Dispatches a CustomEvent when nav item is selected. Selected item is stored in detail of Custom event
 * @cssprop --box-width - Set to less than 100% to have an animation on focus
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
      if (this.inputElement.value.length > 0) {
        this.filteredArray = this.searchArray.filter(word => word.includes(this.inputElement.value.toLowerCase()));
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
          ${this.inputElement && this.inputElement.value ? html` <i @click=${()=> {
            this.inputElement.value = '';
            this.filteredArray = undefined;
            // TODO: Remove focus from input
            // TODO: Clear filtered array on outside click
          }
          } class="material-icons">
            delete_forever
          </i>` : ''}

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