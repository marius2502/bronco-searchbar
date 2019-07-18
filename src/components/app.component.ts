import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';

const componentCSS = require('./app.component.scss');

/**
 * Searchbar with suggestions
 * @event selected - Dispatches a CustomEvent when search item is selected. Selected item is stored in detail of Custom event
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

  @property()
  currentIndex: number = 0;

  /**
   * Commit an array with strings to be searched for
   * @type {string[]}
   * @memberof BroncoSearchbar
   */
  @property()
  searchArray: string[] = [];


  @query('#input')
  inputElement!: HTMLInputElement;

  emit(selectedItem: string) {
    this.clearInput();
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: selectedItem,
        bubbles: true
      })
    );
  }

  clearInput() {
    this.inputElement.value = '';
    this.filteredArray = undefined;
    this.currentIndex = 0;
  }

  handleKeydown(e: KeyboardEvent) {
    const key = e.key;
    if (key === 'Enter') this.emit(this.filteredArray![this.currentIndex]);
    if (key === 'ArrowDown') {
      e.preventDefault();
      this.currentIndex < this.filteredArray!.length - 1 ? this.currentIndex++ : '';
    }
    if (key === 'ArrowUp') {
      e.preventDefault();
      this.currentIndex > 0 ? this.currentIndex-- : '';
    }
  }


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

    // Clears input field, when clicked outside
    document.addEventListener('click', (e: Event) => {
      const clickoutside = !e.composedPath().includes(this);
      clickoutside ? this.clearInput() : '';
    });

    // Clears input field, when scrolled
    document.addEventListener('scroll', () => {
      this.clearInput();
    });
  }

  render() {
    return html`
    <div class="container" @keyup=${(e: KeyboardEvent)=> this.handleKeydown(e)}>
      <div class="searchBox">
        <input tabindex="0" autocomplete="off" id="input" class="searchInput" type="text" name="" placeholder="Search">
        <button class="clearBtn">
          ${this.inputElement && this.inputElement.value ? html` <i @click=${() => this.clearInput()}
            class="material-icons">
            delete_forever
          </i>` : ''}
        </button>

        <!-- Search preview -->
        ${this.filteredArray ? html`
        <ul>
          ${this.filteredArray.map(word => html`<li class="${this.filteredArray![this.currentIndex] === word ? 'focused' : ''}"
            @click=${()=> this.emit(word)}>${word}</li>`)}
        </ul>
        ` : ''}

      </div>
    </div>
`;
  }
}