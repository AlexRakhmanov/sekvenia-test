import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
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

export default class Modal extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired
  }

  render() {
    const film = this.props.data;

    return (
      <Wrapper>
        <article className="modal">
          <header className="modal__header">
            <span
              className="modal__button modal__button--close"
              onClick={this.props.closeModal}
            >
              X
            </span>
            <h3 className="modal__header--title">{film.localized_name}</h3>
          </header>
          <section className="modal__content">
            <div className="modal__info">
              <div className="modal__info--image">
                <img src={film.image_url} alt="Постер" />
              </div>
              <div className="modal__info--details">
                <p>{film.name}</p>
                <p>Год: {film.year}</p>
                <p>Рейтинг: <span>{film.rating ? film.rating : 'Нет'}</span></p>
              </div>
            </div>
            <p className="modal__description">
              {film.description}
            </p>
          </section>
        </article>
      </Wrapper>
    ) 
    
  }
}