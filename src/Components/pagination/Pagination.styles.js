import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  align-items: center;
  gap: 1rem;

  h3 {
    color: black;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
export const PreviousPage = styled.button`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  width: 10rem;
`;
export const NextPage = styled.button`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  width: 10rem;
`;
