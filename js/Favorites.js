export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
      .then(data => data.json())
      .then(({ login, name, public_repos, followers }) => ({
        login,
        name,
        public_repos,
        followers
      }))
  }
}

//classe que vai conter a logica dos dados
//como os dados serão estruturados

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()

    GithubUser.search('DaviF91').then(user => console.log(user))
  }

  load() {
    //pegar um item .getItem
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  async add(username){
    const user = await GithubUser.search(username) 
  }

  delete(user) {
    //Higher-order funcitions (map, filter, find, reduce)
    const filteredEntries = this.entries.filter(
      entry => entry.login !== user.login
    )
    this.entries = filteredEntries
    this.update()
  }
}

//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onAdd()
  }

  onAdd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const {value} = this.root.querySelector('.search input')
      
      this.add(value)
    }
  }

  update() {
    this.removeAlltr()

    this.entries.forEach(user => {
      const row = this.createRow()
      row.querySelector(
        '.user img'
      ).src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name} `
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')
    tr.innerHTML = `
    
      <td class="user">
        <img
          src="https://github.com/DaviF91.png"
          alt="Foto de Davi Ferreira"
        />
        <a href="https://github.com/DaviF91" target="_blank">
          <p>Davi Ferreira</p>
          <span>DaviF91</span>
        </a>
      </td>
      <td class="repositories">76</td>
      <td class="followers">9589</td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `
    return tr
  }

  removeAlltr() {
    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }
}
