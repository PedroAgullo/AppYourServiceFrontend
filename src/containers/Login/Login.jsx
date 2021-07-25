import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {notification} from 'antd';
import {connect} from 'react-redux';
import {LOGIN} from '../../redux/types'
import React, { useEffect, useState } from "react";


const Login = (props) => {

    let history = useHistory();

    //Hooks
    const [credentials, setCredentials] = useState({email:'', password:''});
    const [msgError, setMensajeError] = useState('');
   
    useEffect(()=>{
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                logeame();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });

    //Handle
    const updateCredentials = (e) => {
        setCredentials ({...credentials, [e.target.name]: e.target.value});
    }

    const logeame = async () => {

        //Primero, testeamos los datos
            
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email) ) {
             setMensajeError('Introduce el formato de email valido ejemplo@ejemplo.com');
             return;
        }
        //Creamos una variable con formato JSON con los datos del usuario para la petición al backend a través de axios.
        let body = {
            email : credentials.email,
            password : credentials.password
        }
        
            try {
                let res = await axios.post('http://localhost:3005/login', body);         //Llamada al backend para realizar el login. Se recoge el resultado en la variable res.      

                //Se genera un JSON con las credenciales del usuario para guardarlos en Redux
                let data = {
                    token : res.data.token,
                    user : (res.data.user),
                    idUser: res.data.user.id,
                }

                let description = ("Bienvenido " + res.data.user.name + " " + res.data.user.lastName1 + "."); 
                notification.success({message:'Login correcto.',description: description});

                props.dispatch({type:LOGIN,payload:data});                  //Guardo en RDX las credenciales del usuario
                if (res.data.user.admin){
                    history.push("/profile");
                }else if(res.data.user.premium === true) {
                    history.push("/select");
                }else {
                    history.push("/");
                }                               

            } catch (err) {      
                    notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});          
            }
    }

    return (

        <div>
            <div className = "vistaLogin">        
                <div className = "loginCard"> 
                    <div className="espacioBlanco"></div>
                    <div className="form">
                        <input type="text" id="email" className="form__input" name="email" autoComplete="off" placeholder=" "  onChange={updateCredentials}></input>
                        <label className="form__label">Email</label>
                    </div>
                    <div className="form">
                        <input type="password" id="password" className="form__input" name="password" autoComplete="off" placeholder=" "  onChange={updateCredentials}></input>
                        <label className="form__label">Password</label>
                    </div>                    
                    <div className = "sendButton" onClick={()=>logeame()}>Login!!</div>
                    <div>{msgError}</div>
                </div>        
            </div>   
        </div>
    )
}

export default connect()(Login);