import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { NavLink } from 'react-router-dom';
import { CardActionArea } from '@material-ui/core';
import { useHistory } from 'react-router-dom';




// import { makeStyles } from '@material-ui/core';

// const useStyle =  makeStyles({
//     container:{
//         // display: 'flex',
//         // padding: '50px',
//     },
//     card: {
//         // maxWidth: 345,
//         color: 'red',
//         backgroundColor:'#f1f1f1',
//     },
//     media: {
//         height: 0,
//         paddingTop: '56.25%', // 16:9
//     },
//     actions: {
//         display: 'flex',
//         justifyContent: 'space-between',
//     },
//     expand: {
//         transform: 'rotate(0deg)',
//         transition: 'transform .3s ease-in-out',
//         marginLeft: 'auto',
//     },
//     expandOpen: {
//         transform: 'rotate(180deg)',
//     },
//     avatar: {
//         backgroundColor: 'red',
//     },
// });

export default function CarList({ car }) {

  // const classes = useStyle();



  // console.log('cardetail page');
  // console.log(car);
  const history = useHistory();

  const handleClick = async() =>{
    console.log("handle click " + car._id);
    // history.push("/cardetails/"+car._id);

    history.push({pathname: "/cardetails", state: {car: car}});
  
  }

  return (
    <Card container style={{  backgroundColor: '#f1f1f1' }} car={car}>
      <CardActionArea  onClick={() => { handleClick(car);}} >
        <CardMedia
          component="img"
          height="240"
          image={car.carImages}
          alt="Car img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {car.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b> Brand Name :</b> {car.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b> Model Name :</b> {car.model}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
