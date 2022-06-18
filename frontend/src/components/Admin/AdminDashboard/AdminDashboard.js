// import React, { useEffect, useState } from 'react';
import Navbar from "../AdminNavbar/AdminNavbar";
// import { DataGrid } from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { useHistory } from "react-router-dom";

const AdminDashboard = () => {
  const history = useHistory();

  return (
    <>
      <Navbar />
      <Grid
        container
        style={{
          padding: "30px",
          width: "100%",
          marginBottom: "none",
          backgroundColor: "#7900FF",
        }}
      >
        <h2>Admin Dashboard</h2>
      </Grid>

      <Grid
        container
        justify="space-between"
        spacing={3}
        style={{
          padding: "30px",
          width: "100p%",
          marginBottom: "none",
          backgroundColor: "#7900FF",
        }}
      >
        <Grid item xs={12} md={3}>
          <Card style={{ backgroundColor: "#757ce8" }}>
            <CardActionArea
              onClick={() => {
                history.push("/admin/users");
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  List of all users
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{ backgroundColor: "#757ce8" }}>
            <CardActionArea
              onClick={() => {
                history.push("/admin/cars");
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Cars
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  List of all cars
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{ backgroundColor: "#757ce8" }}>
            <CardActionArea
              onClick={() => {
                history.push("/admin/carreports");
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Car Reports
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  List of all Car Reports
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{ backgroundColor: "#757ce8" }}>
            <CardActionArea
              onClick={() => {
                history.push("/admin/payment");
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Payment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  List of all Payment details
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;
