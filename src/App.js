import React from 'react';
import styled from 'styled-components'; 
import axios from 'axios';
import Card from './Components/Card';
import Spinner from './Components/Spinner';

const H1 = styled.h1`
  text-align: center;
  margin: 0;
`;

const Root = styled.div`
  max-width: 1024px;
  margin: 0 auto 60px;
  position: relative;
`;

const Toogle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Footer = styled.footer`
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 1px solid grey;
`;

const Category = styled.div`
`;

const CategoryYear = styled.h2`
  border: 1px solid black;
  text-align: center;
  background-color: lightgrey;
  margin: 10px 0;
`;

const CategoryFilms = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
`;

const Modal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 4;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    background-color: white;
    padding: 10px;
    max-width: 620px;
    border-radius: 10px;

    &__header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid grey;
      margin-bottom: 10px;

      &--title {
        margin: 0 0 0 10px;
      }
    }

    &__button {
      cursor: pointer;
    }

    &__info {
      display: flex;
      justify-content: space-around;
      align-items: center;

      &--image {
        width: 200px;

        img {
          width: 200px;
        }
      }

      &--details {
        p:first-child {
          color: grey;
        }

        p:last-child span {
          color: green;
        }
      }
    }
  }
`;

export default class App extends React.Component {  
  constructor() {
    super();

    this.state = {
      data: null,
      sortYear: 'asc',
      sortRating: 'desc',
      currentFilm: null
    }
  }

  componentDidMount() {
    axios.get("https://s3-eu-west-1.amazonaws.com/sequeniatesttask/films.json").then(response => {
      const result = {};

      response.data.films.forEach((item) => {
        if (typeof result[item.year] === 'undefined') {
          result[item.year] = [];
        }

        result[item.year].push(item);
      });
    
      this.setState({
        data: result
      });
    });
  }

  handleOptionChange = (event) => {
    if (event.target.name === 'rate') {
      this.setState({
        sortRating: event.target.value
      });
    } 

    if (event.target.name === 'year') {
      this.setState({
        sortYear: event.target.value
      });
    } 
  }

  handleClick = (film) => {
    this.setState({
      currentFilm: film
    });
  }

  closeModal = () => {
    this.setState({
      currentFilm: null
    });
  }

  render() {
    const films = this.state.data;

    return (
      <Root>
        <header>
          <H1>Фильмы</H1>
        </header>
        <main>
          <Toogle>
            <div>
              <p>Сортировка по году</p>
              <div>
                <input 
                  type="radio"
                  checked={this.state.sortYear === 'asc'} 
                  name="year" 
                  id="yearasc" 
                  value="asc"
                  onChange={this.handleOptionChange}
                />
                <label htmlFor="yearasc">По возрастанию</label>

                <input 
                  type="radio" 
                  name="year" 
                  id="yeardesc" 
                  value="desc"
                  checked={this.state.sortYear === 'desc'} 
                  onChange={this.handleOptionChange}
                />
                <label htmlFor="yeardesc">По убыванию</label>
              </div>
            </div>
            <div>
              <p>Сортировка по рейтингу</p>
              <div>
                <input 
                  type="radio" 
                  name="rate" 
                  id="rateasc" 
                  value="asc"
                  checked={this.state.sortRating === 'asc'} 
                  onChange={this.handleOptionChange}
                />
                <label htmlFor="rateasc">По возрастанию</label>

                <input 
                  type="radio" 
                  checked={this.state.sortRating === 'desc'}  
                  name="rate" 
                  id="ratedesc" 
                  value="desc"
                  onChange={this.handleOptionChange}
                />
                <label htmlFor="ratedesc">По убыванию</label>
              </div>
            </div>
          </Toogle>

          {films && this.state.sortYear === 'asc' && Object.keys(films).map((film, index) => {
            return (
              <Category key={index}>
                <CategoryYear>
                  {film}
                </CategoryYear>
                <CategoryFilms>
                  {this.state.sortRating === 'desc' && films[film].map((item) => {
                    return <Card handleClick={this.handleClick} data={item} key={item.id}/>;
                  })}
                  {this.state.sortRating === 'asc' && films[film].reverse().map((item) => {
                    return <Card handleClick={this.handleClick} data={item} key={item.id}/>;
                  })}
                </CategoryFilms>
              </Category>
            );
          })}

          {films && this.state.sortYear === 'desc' && Object.keys(films).reverse().map((film, index) => {
            return (
              <Category key={index}>
                <CategoryYear>
                  {film}
                </CategoryYear>
                <CategoryFilms>
                  {this.state.sortRating === 'desc' && films[film].map((item) => {
                    return <Card data={item} key={item.id}/>;
                  })}
                  {this.state.sortRating === 'asc' && films[film].reverse().map((item) => {
                    return <Card data={item} key={item.id}/>;
                  })}
                </CategoryFilms>
              </Category>
            );
          })}

          {!films && <Spinner />}
        </main>

        {this.state.currentFilm && 
          <Modal>
            <article className="modal">
              <header className="modal__header">
                <span
                  className="modal__button modal__button--close"
                  onClick={this.closeModal}
                >
                  X
                </span>
                <h3 className="modal__header--title">{this.state.currentFilm.localized_name}</h3>
              </header>
              <section className="modal__content">
                <div className="modal__info">
                  <div className="modal__info--image">
                    <img src={this.state.currentFilm.image_url} alt="Постер" />
                  </div>
                  <div className="modal__info--details">
                    <p>{this.state.currentFilm.name}</p>
                    <p>Год: {this.state.currentFilm.year}</p>
                    <p>Рейтинг: <span>{this.state.currentFilm.rating ? this.state.currentFilm.rating : 'Нет'}</span></p>
                  </div>
                </div>
                <p className="modal__description">
                  {this.state.currentFilm.description}
                </p>
              </section>
            </article>
          </Modal>
        }
        
        <Footer>
          <p>(с) Алексей Рахманов. Выполнено на React</p>
        </Footer>
      </Root>
    );
  }
}
