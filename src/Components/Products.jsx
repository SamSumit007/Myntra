import { Container, PaginationItem } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularProgress from "@mui/material/CircularProgress";

import { db } from "../firebase";

import "../App.css";
import { ShoppingBag } from "@mui/icons-material";

import Pagination from "@mui/material/Pagination";
import { Cartcontext } from "./CartComponents/contexts/cartcontext";

const Products = ({ data }) => {
   const [info, setInfo] = useState([]);
   const [loading, setLoading] = useState(true);
   const [brands, setBrands] = useState(new Set());
   const { updatecart } = useContext(Cartcontext);
   //   console.log(cart);

   useEffect(() => {
      Fetchdata();
   }, [data]);

   const Fetchdata = async () => {
      setInfo([]);
      setLoading(false);
      db.collection(data)
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((element) => {
               let data = element.data();
               setInfo((arr) => [...arr, data]);
               setLoading(false);
            });
         });
   };

   const handleSort = () => {
      const by = document.querySelector(".sortBy").value;
      if (by === "Price: Low To High") {
         const sorted = [...info].sort((a, b) => a.price - b.price);
         setInfo(sorted);
      } else if (by === "Price: High To Low") {
         const sorted = [...info].sort((a, b) => b.price - a.price);
         setInfo(sorted);
      } else if (by === "Rating: High To Low") {
         const sorted = [...info].sort(
            (a, b) => b.rating.length - a.rating.length
         );
         setInfo(sorted);
      } else if (by === "Rating: Low To High") {
         const sorted = [...info].sort(
            (a, b) => a.rating.length - b.rating.length
         );
         setInfo(sorted);
      }
   };

   return (
      <>
         <div
            style={{
               marginLeft: "78.5%",
               marginBottom: "1%",
               fontSize: "16px",
            }}
         >
            <label style={{ marginRight: "4px",background:"rgb(244,28,178)",padding:"1%",borderRadius:"5%",color:"white",fontWeight:"600" }}>Sort by:</label>
            <select onChange={handleSort} className="sortBy"  style={{ marginRight: "4px",background:"rgb(238,236,234)",padding:"1%",borderRadius:"5%",color:"grey",fontWeight:"600" }}>
               <option name="">Price</option>
               <option name="high2low">Price: High To Low</option>
               <option name="low2high">Price: Low To High</option>
               <option>Rating: High To Low</option>
               <option>Rating: Low To High</option>
            </select>
         </div>

         <Container style={{ display: "flex" }}>

            {loading ? (
               <CircularProgress
                  sx={{
                     textAlign: "center",
                     width: "400px",
                     fontSize: "15rem",
                  }}
               />
            ) : (
               <>

                 

                  <div className="productContainer">
                     {info.map((e) => {
                        return (
                           <Card sx={{ maxWidth: 275 }}>
                              <CardMedia
                                 component="img"
                                 image={e.link}
                                 alt={e.title}
                                 loading="lazy"
                              />
                              <CardContent
                                 sx={{
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    marginTop: "4px",
                                 }}
                              >
                                 <Typography
                                    gutterBottom
                                    component="div"
                                    sx={{
                                       marginBottom: 0,
                                       fontWeight: "bold",
                                       fontSize: "14px",
                                       textTransform: "uppercase",
                                    }}
                                 >
                                    {e.brand}
                                 </Typography>
                                 <div style={{ height: "4.5rem" }}>
                                    <Typography
                                       variant="body2"
                                       color="text.secondary"
                                       size="small"
                                    >
                                       {e.title}
                                    </Typography>
                                 </div>
                                 <div>
                                    <Typography
                                       variant="body2"
                                       color="text.secondary"
                                       size="medium"
                                    >
                                       Rating: {e.rating}
                                    </Typography>
                                 </div>
                                 <div style={{ display: "flex" }}>
                                    <Typography
                                       sx={{ fontSize: 14, fontWeight: "bold" }}
                                       color="text.primary"
                                       gutterBottom
                                    >
                                       Rs. {e.price}
                                    </Typography>
                                    <Typography
                                       sx={{
                                          fontSize: 14,
                                          textDecoration: "line-through",
                                          marginLeft: 2,
                                       }}
                                       color="text.secondary"
                                       gutterBottom
                                    >
                                       {e.strikedOff}
                                    </Typography>
                                    <Typography
                                       sx={{
                                          fontSize: 12,
                                          fontWeight: "light",
                                          marginLeft: 2,
                                          color: "orange",
                                       }}
                                       color="text.secondary"
                                       gutterBottom
                                    >
                                       ({e.discount}% OFF)
                                    </Typography>
                                 </div>
                              </CardContent>
                              <CardActions
                                 sx={{
                                    justifyContent: "space-around",
                                 }}
                              >
                                 <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                       backgroundColor: "#ff3e6b",
                                       color: "white",
                                       borderColor: "#ff3e6b",
                                       textTransform: "capitalize",
                                       ":hover": {
                                          color: "black",
                                       },
                                    }}
                                    onClick={() => {
                                       updatecart(e);
                                    }}
                                 >
                                    <ShoppingBag
                                       sx={{
                                          fontSize: 15,
                                          margin: 0,
                                          marginRight: "4px",
                                       }}
                                    ></ShoppingBag>
                                    Add to cart
                                 </Button>
                                 <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                       textTransform: "capitalize",
                                       color: "black",
                                       borderColor: "#ff3e6b",
                                    }}
                                 >
                                    <FavoriteIcon
                                       sx={{
                                          marginRight: "4px",
                                          fontSize: 15,
                                          textTransform: "capitalize",
                                       }}
                                    />
                                    Wishlist
                                 </Button>
                              </CardActions>
                           </Card>
                        );
                     })}
                     <Pagination
                        count={(info.length / 10).toFixed(0)}
                        
                        style={{
                           padding: 20,
                           width: "100%",
                           display: "flex",
                           justifyContent: "center",
                        }}
                     />
                  </div>
               </>
            )}

          
         </Container>
      </>
   );
};

export default Products;
