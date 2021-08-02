import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
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

function Home(props) {
  const [books, setBooks] = useState([]);

const [search, setSearch] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    (async function Request() {
      const res = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=javascript"
      );
      setBooks(res.data.items);
    })();
  }, []);

function handleChange(event) {

    (async function Request() {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${event.target.value}`
        );
        setBooks(res.data.items);
      })();

}


  console.log(books);

  return (
    <div className="home-books">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" onChange={ handleChange } label="Search" variant="outlined" />
      </form>
      <ul className="home-book-card">
        {books?.map((book) => {
          return (
            <li>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to={`/${book.volumeInfo.title}`}
              >
                <Card
                  className={classes.root}
                  style={{
                    backgroundColor: "lightblue",
                    minWidth: "400px",
                    minHeight: "450px",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : null}
                      title="Contemplative Reptile"
                      style={{
                        height: "30vh",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {book?.volumeInfo
                          ? book?.volumeInfo?.title.slice(0, 25)
                          : null}
                        ...
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
                          ? book.volumeInfo.description.slice(0, 100)
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
