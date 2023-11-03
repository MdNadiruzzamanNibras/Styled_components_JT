import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  margin:0 300px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    margin:0;
  }
  

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    margin:0;
  }
`;
