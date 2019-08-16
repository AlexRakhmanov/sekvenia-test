import React   from 'react';
import styled  from 'styled-components'; 
import axios   from 'axios';
import Card    from './Components/Card';
import Spinner from './Components/Spinner';
import Modal   from './Components/Modal';

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

  handleRatingChange = (event) => {
    this.setState({
      sortRating: event.target.value
    }); 
  }

  handleYearChange = (event) => {
    this.setState({
      sortYear: event.target.value
    });
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
                  id="yearasc" 
                  value="asc"
                  onChange={this.handleYearChange}
                />
                <label htmlFor="yearasc">По возрастанию</label>

                <input 
                  type="radio" 
                  id="yeardesc" 
                  value="desc"
                  checked={this.state.sortYear === 'desc'} 
                  onChange={this.handleYearChange}
                />
                <label htmlFor="yeardesc">По убыванию</label>
              </div>
            </div>
            <div>
              <p>Сортировка по рейтингу</p>
              <div>
                <input 
                  type="radio" 
                  id="rateasc" 
                  value="asc"
                  checked={this.state.sortRating === 'asc'} 
                  onChange={this.handleRatingChange}
                />
                <label htmlFor="rateasc">По возрастанию</label>

                <input 
                  type="radio" 
                  checked={this.state.sortRating === 'desc'}  
                  id="ratedesc" 
                  value="desc"
                  onChange={this.handleRatingChange}
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
                  {this.state.sortRating === 'desc' && films[film].reverse().map((item) => {
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
                  {this.state.sortRating === 'desc' && films[film].reverse().map((item) => {
                    return <Card handleClick={this.handleClick} data={item} key={item.id}/>;
                  })}
                  {this.state.sortRating === 'asc' && films[film].reverse().map((item) => {
                    return <Card handleClick={this.handleClick} data={item} key={item.id}/>;
                  })}
                </CategoryFilms>
              </Category>
            );
          })}

          {!films && <Spinner />}
        </main>

        {this.state.currentFilm && 
          <Modal 
            data={this.state.currentFilm}
            closeModal={this.closeModal}
          />
        }
        
        <Footer>
          <p>(с) Алексей Рахманов. Выполнено на React</p>
        </Footer>
      </Root>
    );
  }
}
