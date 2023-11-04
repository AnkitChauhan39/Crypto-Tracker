import React, { useEffect, useState } from 'react'
import { CoinList } from '../config.js/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Container, TableContainer, makeStyles, TextField, ThemeProvider, Typography, createTheme, LinearProgress, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';

const CoinsTable = () => {

  const { Currency ,Symbol } = CryptoState();
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  const [page,setpage] = useState(1); 

  const fectchCoins = async () => {

    setloading(true);
    const { data } = await axios.get(CoinList(Currency));
    setcoins(data);
    setloading(false);
  }

  console.log(coins);
  useEffect(() => {
    fectchCoins();
  }, [Currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    }
  });

  function handlesearch() {
    return (
      coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      )
    );
  }

  const navigate = useNavigate()
  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  const classes = useStyles();
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container style={{
          textAlign: "center",
        }}>

          <Typography
            variant='h4'
            style={{ margin: 18, fontFamily: "Montserrat" }}
          > Crypto Currency Prices By Market Cap</Typography>
          <TextField label="Search For a Crypto Currency.." variant='outlined'
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setsearch(e.target.value)}
          ></TextField>

          <TableContainer>
            {
              loading ? (<LinearProgress style={{ backgroundColor: "gold" }} />
              ) : (
                <Table>
                  <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                    <TableRow>
                      {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {handlesearch().slice((page-1)*10,(page-1)*10 +10)
                      .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 , width: "20%"}}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {Symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {Symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
                </Table>
              )
            }


          </TableContainer>

          <Pagination 
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={ (handlesearch()?.length /10).toFixed()}
          onChange={(_, value) => {
            setpage(value);
            window.scroll(0, 450);
          }}
          />
          

        </Container>
      </ThemeProvider>
    </div>
  )
}

export default CoinsTable
