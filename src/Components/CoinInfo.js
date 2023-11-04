import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config.js/api';
import { ThemeProvider, createTheme ,makeStyles,CircularProgress } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import SelectButton from './SelectButton';
import { chartDays } from '../config.js/data';

const CoinInfo = ({coin}) => {
 
  const [historicalData,setHistoricalData] = useState();
  const [days , setDays] = useState(1) ;
  const [flag,setflag] = useState(false) ;

  const {Currency} = CryptoState() ; 

  const fetchHistoricdata = async () => { 
    const {data} = await axios.get(HistoricalChart(coin.id,days,Currency)) ; 
    setflag(true) ;
    setHistoricalData(data.prices) ; 
  }

  useEffect(() =>{
    fetchHistoricdata() ;
  },[Currency,days]) ;
  
  const useStyles = makeStyles((theme) => ({
    container: {
      
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles() ; 
  const darkTheme = createTheme({
    palette:{
      main: "#fff",
    },
    type: "dark" , 
  }); 

  return (
    
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
            
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${Currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
    
  )
}

export default CoinInfo
