import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  justify-content: center;
  margin: 25px 0;
  font-family: Arial, Helvetica, sans-serif;
  color: #4f646f;
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
  color: #4f646f;
  background-color: #f0f0f0;
`;

export const Buttons = styled.div`
  display: flex;
  width: 100%;
`;

export const Button = styled.button`
  flex: 1;
  height: 50px;
  border-radius: 5px;
  font-size: 1.1rem;
  font-family: monospace;
  font-weight: bold;
  color: #4f646f;
  text-align: center;
  background-color: #f0f0f0;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
