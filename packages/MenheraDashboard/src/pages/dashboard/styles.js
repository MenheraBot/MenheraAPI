import styled from 'styled-components';
import Button from '../../components/Button';

export const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: 25px 0;
  @media (max-width: 800px) {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`;
export const Manager = styled.div`
  display: block;
`;

export const Input = styled.input`
  font-size: 30px;
  background-color: #f0f0f0;
`;

export const Buttons = styled.div`
  display: flex;
  width: 100%;
`;

export const Select = styled.select`
  background-color: #f0f0f0;
  transition: 1s;
`;
export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    'add-input add-input add-select'
    'add-button add-button add-button';

  ${Input} {
    grid-area: add-input;
  }
  ${Select} {
    grid-area: add-select;
  }
  ${Button} {
    grid-area: add-button;
  }
`;

export const Option = styled.div``;
