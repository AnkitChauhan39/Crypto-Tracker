import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import './App.css';
import { makeStyles } from '@material-ui/core';

function App() {
  const useStyles = makeStyles( () => ({
    App:{
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh", 

    },
  }));

  const classes = useStyles() ; 
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Routes>
          <Route path='/' Component={Homepage} />
          <Route path='/coins/:id' Component={Coinpage} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
