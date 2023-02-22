class Poll{
  constructor(root, title){
    this.root = root;
    this.selected = sessionStorage.getItem('poll-selected');
    this.endpoint = 'http://localhost:3000/poll'

    this.root.insertAdjacentHTML('afterbegin',`
    <div class="poll__title">${title}</div>
    `)

    this._refresh();
  }

  async _refresh(){
    const response = await fetch(this.endpoint);
    const data = await response.json();
  }
}

const p = new Poll(
  document.querySelector('.poll'),
  "Which do you prefer?"
);

console.log(p)