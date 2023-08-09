import styled from "styled-components"



export const StyledInput = styled.div`
  width: 350px;
`
export  const StyledForm = styled.form`
  max-width: 100%;
  min-width: 600px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3rem;
  background: #f1f1f1;
  h2 {
    margin-bottom: 1rem;
  }
;

  input {
    width: 100%;
    height: 35px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
    margin-bottom: 1rem;
    &:focus {
      border: 1px solid rgb(0, 208, 255);
    }
  }

  button {
    width: 350px;
    height: 35px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(255, 253, 253);
    margin-bottom: 1rem;
    background: #4b70e2;
    color: white;
    cursor: pointer;
    &:focus {
      border: 1px solid rgb(0, 208, 255);
    }
    &:focus {
      border: none;
    }
  }
  p {
    font-size: 15px;
    color: red;
  }
`;