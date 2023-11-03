import { useEffect, useState } from "react";
import { GridContainer } from "./Styled/GridContainer";
import { DivGrid } from "./Styled/DivGrid";
import { Title } from "./Styled/Title";
import { Image } from "./Styled/Image";
import  watch from "./assets/Images/watch.jpg"
import { Catagory } from "./Styled/Catagory";
import { Select } from "./Styled/Setect";
import { MainDiv } from "./Styled/MainDiv";

const App = () => {
  const [datas, setDatas] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedprice, setSelectedPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch('Product.json')
      .then(res => res.json())
    .then(data=> setDatas(data))
  }, [])
  let itemsPerPage = 6;
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
 const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const watchDisplay = sortdata.slice(startIndex, endIndex);
const nextPage = () => {
  if (currentPage < Math.ceil(sortdata.length / itemsPerPage)) {
    setCurrentPage(currentPage + 1);
  } else if (sortdata.length < itemsPerPage) {
    
    return setCurrentPage(1);
  }
  else if (sortdata.length < 12) {
   return setCurrentPage(1);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};
  
  console.log(currentPage, "currenpage");
  return (
    <MainDiv>

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
          watchDisplay.map(data =>
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
      <div >
  <button onClick={prevPage} disabled={currentPage === 1}>
    Previous
  </button>
  <span>Page {currentPage}</span>
  <button
    onClick={nextPage}
    disabled={currentPage === Math.ceil( sortdata.length / itemsPerPage)}
  >
    Next
  </button>
</div>

    </MainDiv>
  );
};

export default App;