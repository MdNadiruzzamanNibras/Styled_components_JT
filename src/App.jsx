import { useEffect, useState } from "react";
import { GridContainer } from "./Styled/GridContainer";
import { DivGrid } from "./Styled/DivGrid";
import { Title } from "./Styled/Title";


const App = () => {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    fetch('Product.json')
      .then(res => res.json())
    .then(data=> setDatas(data))
  }, [])
  console.log(datas);
  return (
    <div>
      <GridContainer>
        {
          datas.map(data =>
            <DivGrid key={data.id}>
              <Title>{ data.title}</Title>
            </DivGrid>
            )
        }
      </GridContainer>
    </div>
  );
};

export default App;