import { useEffect, useState } from "react";
import { GridContainer } from "./Styled/GridContainer";
import { DivGrid } from "./Styled/DivGrid";
import { Title } from "./Styled/Title";
import { Image } from "./Styled/Image";
import  watch from "./assets/Images/watch.jpg"
import { Catagory } from "./Styled/Catagory";
import { Select } from "./Styled/Setect";
import { MainDiv } from "./Styled/MainDiv";
import { SelectDiv } from "./Styled/SelectDiv";
import { Para } from "./Styled/para";
import { CustomOption } from "./Styled/CustomOption";
import { Price } from "./Styled/Price";
import { ButtonDiv } from "./ButtonDiv";
import { Butoon } from "./Styled/Button";
import { Spanpage } from "./Styled/SpanPage";

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
      <SelectDiv>
        <Select name='catagory'  onChange={handleCategoryChange}>
            <CustomOption value="">All </CustomOption>
            <CustomOption value="Men's Watches">Men's Watches</CustomOption>
            <CustomOption value="Women's Watches">Women's Watches</CustomOption>
            <CustomOption value="All Gender Watches">Common Watches</CustomOption>
           
          </Select>
        <Select name='price'  onChange={handlepriceChange}>
            <CustomOption value="">None</CustomOption>
            <CustomOption value="lowprice">Low to High</CustomOption>
            <CustomOption value="highprice">High to Low</CustomOption>
            
           
          </Select>
    </SelectDiv>
      
      
       
      
      <GridContainer>
        {
          watchDisplay.map(data =>
            <DivGrid key={data.id}>
              <div >
                <Image src={watch} alt="watch" />
                <Title> {data.title}</Title>
                <Catagory>{data.category}</Catagory>
                <Price>$ { data.price}</Price>
                <Para >{ data.description}</Para>
              </div>
              
            </DivGrid>
            )
        }
      </GridContainer>
      <ButtonDiv >
  <Butoon onClick={prevPage} disabled={currentPage === 1}>
    Previous
  </Butoon>
  <Spanpage>Page {currentPage}</Spanpage>
  <Butoon
    onClick={nextPage}
    disabled={currentPage === Math.ceil( sortdata.length / itemsPerPage)}
  >
    Next
  </Butoon>
</ButtonDiv>

    </MainDiv>
  );
};

export default App;