import React from 'react';

import { connect } from 'react-redux';


const Home = (props) => {


    if (props.credentials?.token !== '') {
        return (
//RETURN PERSONALIZADO CON RECOMENDACIONES POR ULTIMA PELICULA VISTA Y BUSCADA

            <div className="HomeDiv">
            ESTOY EN HOME CON TOKEN
         </div>
        
        );
    }else if (props.credentials?.token === ''){
        return(

            <div className="HomeDiv">
                ESTOY EN HOME SIN TOKEN
            </div>
        )
    }
}
export default connect((state) => ({
    credentials:state.credentials, 
    }))(Home);
  