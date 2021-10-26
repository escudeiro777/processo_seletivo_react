import './App.css';
import { Component } from "react";

class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaRepositorios: [],
      nomeRepositorio: ''
    }
  }
  buscarRepositorios = (elemento) => {
    elemento.preventDefault();
    console.log("Estamos procurando!")
    fetch(`https://api.github.com/users/${this.state.nomeRepositorio}/repos?per_page=10&sort=author-date-desc`)

      .then(resposta => resposta.json())

      .then(lista => this.setState({ listaRepositorios: lista }))

      .catch(erro => console.log(erro))
  }

  atualizaNome = async (nome) => {
    await this.setState({ nomeRepositorio: nome.target.value })
    console.log(this.state.nomeRepositorio)
  }

  render() {
    return (
      <div className="App">
        <main>
          <section>
            <h2> Procure os usuários do Github </h2>
            <form onSubmit={this.buscarRepositorios}>
              <div>
                <input
                  type="text"
                  value={this.state.nomeRepositorio}
                  onChange={this.atualizaNome}
                  placeholder="Insira o nome do usuário"
                />
                <button type="submit" onClick={this.buscarRepositorios}> Buscar </button>
              </div>
            </form>
          </section>
          <table>
            <thead>
              <th> ID </th>
              <th> NOME </th>
              <th> DESCRIÇÃO </th>
              <th> DATA DE CRIAÇÃO </th>
              <th> TAMANHO </th>
            </thead>

            <tbody>
              {this.state.listaRepositorios.map((repositorio) => {
                return (
                  <tr key={repositorio.id}>
                    <td>{repositorio.id}</td>
                    <td>{repositorio.name}</td>
                    <td>{repositorio.description}</td>
                    <td>{repositorio.created_at}</td>
                    <td>{repositorio.size}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>
      </div>
    )
  }
}

export default Usuarios;
