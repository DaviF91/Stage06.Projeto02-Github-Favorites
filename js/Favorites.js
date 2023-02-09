//classe que vai conter a logica dos dados
//como os dados serão estruturados

export class Favorites {
  constructor(root){
    this.root = document.querySelector(root)

  } 
}

//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites{
  constructor(root){
    super(root)

    this.update()
  }

  
  update(){
    this.removeAlltr()
  }
  removeAlltr(){
    const tbody = this.root.querySelector('table tbody')
    tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    });

  }
}
