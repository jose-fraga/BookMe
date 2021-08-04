import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import SimpleTabs from "./SimpleTabs";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import "../App.css";
import BookCard from "./BookCard";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function BooksList(props) {

    // console.log("From BooksList", typeof props.addImgUrl, )

    const classes = useStyles();

    // console.log("Din lista numar carti:",props.books.length);

    return (
        <div className="home-books">
            <h1>MyList</h1>


                {props.books?.map((book, i) => {
                    props.addImgUrl(book.volumeInfo.imageLinks?.smallThumbnail )
                    return (

                        //CONDITION FOR book.volumeInfo GOES HERE


                        <li key={i}>
                        <Link
                          style={{
                            textDecoration: "none",
                          }}
                          to={`/${book.id}`}
                        >

                        <BookCard bookInfo={book.volumeInfo} addImgUrl={props.addImgUrl}/>



                        </Link>
                      </li>


                    )
                }
                )}


        </div>
    );
}

export default BooksList;