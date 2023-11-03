import { useEffect, useState } from "react";
import { GridContainer } from "./Styled/GridContainer";
import { DivGrid } from "./Styled/DivGrid";
import { Title } from "./Styled/Title";
import { Image } from "./Styled/Image";
import  watch from "./assets/Images/watch.jpg"
import { Catagory } from "./Styled/Catagory";

const App = () => {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    fetch('Product.json')
      .then(res => res.json())
    .then(data=> setDatas(data))
  }, [])
  console.log(datas);
 const handleCategoryChange = (e) => {
    console.log(e.target.value); 
  };
  return (
    <div>

      <div>
       <div>
        <label>Select an option:</label>
         <select name='catagory'  onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Men's Watches">Men's Watches</option>
            <option value="Women's Watches">Women's Watches</option>
            <option value="All Gender Watches">All Gender Watches</option>
            <option value="Vintage Watches">Vintage Watches</option>
          </select>
        
      </div>
        <div>

        </div>
      </div>
      <GridContainer>
        {
          datas.map(data =>
            <DivGrid key={data.id}>
              <div >
                <Image src={watch} alt="watch" />
                <Title> {data.title}</Title>
                <Catagory>{data.category}</Catagory>
                <p style={{width:'300px'}}>{ data.description}</p>
              </div>
              
            </DivGrid>
            )
        }
      </GridContainer>
    </div>
  );
};

export default App;