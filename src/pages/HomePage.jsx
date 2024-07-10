import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  styled,
  Button,
  Box
} from '@mui/material';
import Layout from '../components/Layout';
import MealCard from '../components/MealCard';




const recipes = [
  { id: 1, title: 'Pasta Carbonara', description: 'Creamy Italian pasta dish.' },
  { id: 2, title: 'Chicken Stir Fry', description: 'Asian-inspired stir-fried chicken and vegetables.' },
  { id: 3, title: 'Chocolate Cake', description: 'Decadent dessert made with rich chocolate.' },
  // Add more recipe objects as needed
];

const HomePage = () => {
  
  const StyledContainer = styled(Container)({
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'white', // Set background color to white
    padding: '20px', // Add padding for content spacing
    borderRadius: '8px', // Add border radius for rounded corners
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
  });

  const StyledTextField = styled(TextField)({
    flex: 1, // Allow TextField to grow with flexbox
    marginRight: '10px', // Add space between TextField and Button
  });

  const StyledButton = styled(Button)({
    height: '100%', // Match height with TextField
    minWidth: '80px', // Set a minimum width for the button
  });

  const [searchInput, setSearchInput] = useState("")
  const [data, setData] = useState([])

const handleInput = (event) =>{
  setSearchInput(event.target.value)
}


const searchRecipes = async ()=>{
  const mealdbAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
  const dataObj = await mealdbAPI.json()
  console.log(dataObj)
  setData(dataObj.meals)
}

  return (
    <Layout>
      <StyledContainer>
        <Box sx={{ display: "flex", alignItems: 'flex-end', marginBottom: 10 }}>
          <StyledTextField
            key={"meal"}
            label="Search Recipes"
            variant="outlined"
            fullWidth
            value={searchInput}
            onChange={handleInput}
          />
          <StyledButton variant="contained" onClick={searchRecipes}>
            Search
          </StyledButton>
        </Box>
        <Grid container spacing={3}>
          {data.map(recipe => (
           <MealCard
            recipe={recipe} key={recipe.id}/>
          ))}
        </Grid>
      </StyledContainer>
    </Layout>
  );
};

export default HomePage;



