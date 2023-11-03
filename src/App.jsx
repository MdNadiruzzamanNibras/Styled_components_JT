import { useEffect, useState } from "react";
import { GridContainer } from "./Styled/GridContainer";
import { DivGrid } from "./Styled/DivGrid";
import { Title } from "./Styled/Title";
import { Image } from "./Styled/Image";
import  watch from "./assets/Images/watch.jpg"
import { Catagory } from "./Styled/Catagory";
import { Select } from "./Styled/Setect";

const App = () => {
  const [datas, setDatas] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedprice, setSelectedPrice] = useState("");
  
  useEffect(() => {
    fetch('Product.json')
      .then(res => res.json())
    .then(data=> setDatas(data))
  }, [])
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); 
   
  };
  const handlepriceChange = (e) => {
    
    setSelectedPrice(e.target.value)
  };

  const filteredData = datas
  .filter((data) => {
    if (selectedCategory === "") {
      return true; 
    } else {
      return data.category === selectedCategory;
    }
  })
    
   const sortdata =filteredData.sort((a, b) => {
    if (selectedprice === "lowprice") {
      return a.price - b.price;
    } else if (selectedprice === "highprice") {
      return b.price - a.price;
    } else {
      return 0; 
    }
  });
 
  
  console.log(filteredData, "filterdata");
  return (
    <div>

      <div>
       <div>
       
         <Select name='catagory'  onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Men's Watches">Men's Watches</option>
            <option value="Women's Watches">Women's Watches</option>
            <option value="All Gender Watches">All Gender Watches</option>
           
          </Select>
        
      </div>
       <div>
        
         <Select name='price'  onChange={handlepriceChange}>
            <option value="">None</option>
            <option value="lowprice">Low to price</option>
            <option value="highprice">High to price</option>
            
           
          </Select>
        
      </div>
        <div>

        </div>
      </div>
      <GridContainer>
        {
          sortdata.map(data =>
            <DivGrid key={data.id}>
              <div >
                <Image src={watch} alt="watch" />
                <Title> {data.title}</Title>
                <Catagory>{data.category}</Catagory>
                <p>{ data.price}</p>
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