import styled from 'styled-components';


export const Select = styled.select`
width: 250px;
font-size: 1.5em;
@media (max-width: 768px) {
    
    width: 200px;
font-size: 1em;
  }
  

  @media (max-width: 640px) {
    display: block;
    width: 100px;
    margin: 10px 0;
font-size: .5em;
  }
`