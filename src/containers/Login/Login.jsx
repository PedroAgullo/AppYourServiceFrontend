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
    },[credentials]);

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
        
        let body = {
            email : credentials.email,
            password : credentials.password
        }
        
        //Axios      
            try {
                var res = await axios.post('https://elseptimoartebackend.herokuapp.com/login', body);

                let data = {
                    token : res.data.token,
                    user : (res.data.customer),
                    idUser: res.data.customer.id,
                }

                let description = ("Bienvenido " + res.data.customer.name + " " + res.data.customer.lastName1 + ".");
                notification.success({message:'Login correcto.',description: description});

                //Guardo en RDX
                props.dispatch({type:LOGIN,payload:data});
                if (res.data.customer.admin){
                    history.push("/profile");
                }else if(res.data.customer.premium === true) {
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
                    <div class="form">
                        <input type="text" id="email" class="form__input" name="email" autocomplete="off" placeholder=" "  onChange={updateCredentials}></input>
                        <label for="email" class="form__label">Email</label>
                    </div>
                    <div class="form">
                        <input type="password" id="password" class="form__input" name="password" autocomplete="off" placeholder=" "  onChange={updateCredentials}></input>
                        <label for="email" class="form__label">Password</label>
                    </div>                    
                    <div className = "sendButton" onClick={()=>logeame()}>Acción!</div>
                    <div>{msgError}</div>
                </div>        
            </div>   
        </div>
    )
}

export default connect()(Login);