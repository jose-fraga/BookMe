import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import SimpleTabs from "./SimpleTabs";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({ name: "" });
  const classes = useStyles();

  useEffect(() => {
    (async function Request() {
      const res = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=javascript"
      );
      setBooks(res.data.items);
    })
    ();
  }, []);

  function handleChange(event) {
    setSearch({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  useEffect(() => {
    (async function Request() {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search.name}`
      );
      setBooks(res.data.items);
    })
    ();
  }, [search.name]);


  return (
    <div className="home-books">
      <SimpleTabs
        onChange={handleChange}
        type="text"
        name="name"
        value={search.name}
      />
      {/*<form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" onChange={ handleChange } label="Search" variant="outlined" />
  </form>*/}
      <ul className="home-book-card">
        {books?.map((book, i) => {
          return (
            <li key={i}>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to={`/${book.volumeInfo.title}`}
              >
                <Card id="CardHome" className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={
                        book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.smallThumbnail
                          : null
                      }
                      title="Contemplative Reptile"
                      style={{
                        height: "30vh",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {book?.volumeInfo
                          ? book?.volumeInfo?.title.slice(0, 26) + "..."
                          : "..."}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{
                          maxLength: "100",
                        }}
                      >
                        {book.volumeInfo.description
                          ? book.volumeInfo.description.slice(0, 155)
                          : null}
                        ...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* <h5>{book.volumeInfo.title}</h5> */}
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
