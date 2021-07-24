import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/Logo.jpg';
import Avatar from '../../img/Logo.jpg';
import { connect } from 'react-redux';
import { LOGOUT} from '../../redux/types';
import { useHistory } from 'react-router-dom';
import {notification} from 'antd';
import { faSearch, faSignInAlt, faAddressCard, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Navbar = (props) => {

  let history = useHistory();

  const takeMe = (where) => {
    history.push(where);
  }

  const logOut = () => {

    let mensaje = "Hasta pronto " + props.credentials.user.name

    notification.success({message:'Logout correcto.',description: mensaje});

    props.dispatch({ type: LOGOUT });

    setTimeout(() => {
      history.push('/');
    }, 500)

  }

  const cambiaDatos = async (info) => {
    switch (info) {
      case "profile":
        // props.dispatch({ type: PROFILE, payload: info });

        break;

      default:

        break;
    }
  };

  if (props.credentials?.token === '') {
    return (
      <div className="nav">
        <div className="logo">
          <div>
            <NavLink to="/"><img className="img" src={Logo} alt="logo"/></NavLink>
          </div>
            <div className="searchBox">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/search"><FontAwesomeIcon  icon={faSearch}/>Buscador</NavLink>
            </div>
        </div>

        <div className="blank"></div>
        <div className="NavMenu" >
          <div className="NavLink">
            <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/register"><FontAwesomeIcon  icon={faAddressCard}/>Inscribirse</NavLink>
          </div>
          <div className="NavLink" activeClassName="selected">
          <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/login"><FontAwesomeIcon icon={faSignInAlt}/>Login</NavLink>
          </div>
        </div>
      </div>
    )

  } else {
    return (
      <div className="nav">
        <div className="logo">
          <div>
            <NavLink to="/"><img className="img" src={Logo} alt="logo"/></NavLink>
          </div>
            <div className="searchBox">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/search"><FontAwesomeIcon  icon={faSearch}/>Buscador</NavLink>
            </div>
        </div>
        <div className="blank"></div>
        <div className="NavMenu">
          <div className="NavLink">
            <div className="Logout">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} onClick={()=>logOut()} to="/"><FontAwesomeIcon icon={faSignOutAlt}/>Logout</NavLink>
            </div>
            <div className="NavLink" activeClassName="selected">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/profile" ><div className="fotoUser"><img id="fotoNavBar" src={Avatar} onClick={() => cambiaDatos("profile")} alt="Profile photo" /></div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
        )
}

};

export default connect((state)=>({
  credentials:state.credentials}))(Navbar);

