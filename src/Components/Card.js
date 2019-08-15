import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.li`
  border: 1px solid black;
  background-color: lightblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const LocalizedName = styled.p`
  color: black;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const OriginalName = styled.p`
  color: grey;
`;

const Rating = styled.span`
  color: green;
`;

export default class Card extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  render() {
    const film = this.props.data;

    return (
      <Item>
        <div>
          <LocalizedName onClick={() => this.props.handleClick(film)}>{film.localized_name}</LocalizedName>
          <OriginalName>{film.name}</OriginalName>
        </div>
        <div>
          <Rating>{film.rating}</Rating>
        </div>
      </Item>
    );
  }
}