import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'

import {useNavigate } from 'react-router-dom' 
import { CryptoState} from '../CryptoContext' 


const Header = () => {

    const {Currency ,setCurrency} = CryptoState(); 
    console.log(Currency);
    
    const useStyles = makeStyles( () => ({
        title:{
            flex: 1 ,
            color: "gold",
            fontFamily: "Montserrat" ,
            fontWeight: "bold" ,
            cursor: "pointer" , 
        }
    }) )

    const navigate = useNavigate() ;
    const classes = useStyles() ; 

    const darktheme = createTheme({
        palette :{
            primary:{
                main:"#fff" ,
            },
            type: "dark",
        }
    } ) ;

    return (
        <ThemeProvider theme={darktheme}>
        <div>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography variant='h6' onClick={() => navigate("/")} className={classes.title} >Crypto Hunter</Typography>
                        <Select  variant='outlined'
                        
                        value={Currency} 
                        onChange={(e) => setCurrency(e.target.value)} 
                        style={{
                            width:100 ,
                            height: 40 ,
                            marginRight: 15 ,
                        }}
                        >
                            <MenuItem value={"USD"} >USD</MenuItem>
                            <MenuItem value={"INR"} >INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
        </ThemeProvider>
    )
}

export default Header
