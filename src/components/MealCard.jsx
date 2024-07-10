import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'


function MealCard({recipe}) {
  return (
    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {recipe.strMeal}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {recipe.description}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  )
}

export default MealCard