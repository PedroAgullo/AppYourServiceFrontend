
import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from "react-router";
import moment from 'moment';
import {connect} from 'react-redux';
import {notification} from 'antd';


const Register = () => {
    let history = useHistory();

    //Hooks
    const [datosUser, setDatosUser] = useState(
        {
            name : '',
            lastName1: '',
            lastName2: '',
            email: '',
            password: '',
            birthday: '',
            address: '',
            country: '',
            city: '',
            postalCode: '',
            dni: '',
            phone: '',
            subscription: ''            
    });

    const [errors, setErrors] = useState({
        eName : '',
        eLastName1: '',
        eLastName2: '',
        eEmail: '',
        ePassword: '',
        eBirthday: '',
        eAddress: '',
        eCountry: '',
        eCity: '',
        eDni: '',
        ePhone: '',
        ePostalCode: ''        
    });

    const [newMessage, setNewMessage] = useState([]);

    //Handlers (manejadores)

    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value});
    }

    const checkError = (arg) => {
        switch (arg){
            case 'name':                
                if(datosUser.name.length < 1){
                    setErrors({...errors, eName: 'El campo nombre no puede estar vacío.'});
                }else if(datosUser.name.length < 2){
                    setErrors({...errors, eName: 'El nombre debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z AZ ñÑ,.'-]+$/i.test(datosUser.name) ) {
                    setErrors({...errors, eName: 'Introduce el formato de nombre valido'}); 
                }else{
                    setErrors({...errors, eName: ''});
                }
            break; 

            case 'lastName1':
                if(datosUser.lastName1.length < 1){
                    setErrors({...errors, eLastName1: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName1.length < 2){
                    setErrors({...errors, eLastName1: 'El apellido debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ´ ,.'-]+$/i.test(datosUser.lastName1) ) {
                    setErrors({...errors, eLastName1: 'Introduce el formato de apellido valido'});     
                }else{
                    setErrors({...errors, eLastName1: ''});
                }                
            break;

            case 'lastName2':
                if(datosUser.lastName2.length < 1){
                    setErrors({...errors, eLastName2: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName2.length < 4){
                    setErrors({...errors, eLastName2: 'El campo Apellido debe de tener 4 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.lastName2) ) {
                    setErrors({...errors, eLastName2: 'Introduce el formato de apellido valido'}); 
                }else{
                    setErrors({...errors, eLastName2: ''});
                }                
            break;

            case 'email':
                if(datosUser.email.length < 1){
                    setErrors({...errors, eEmail: 'El campo email no puede estar vacío.'});
                }else if (datosUser.email.length < 4){
                    setErrors({...errors, eEmail: 'El email debe de tener 4 caracteres'});
                }else if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(datosUser.email) ) {
                    setErrors({...errors, eEmail: 'Introduce el formato de email valido ejemplo@ejemplo.com'});                    
                }else{
                    setErrors({...errors, eEmail: ''});
                }                
            break;

            case 'password':
                if(datosUser.password.length < 1){
                    setErrors({...errors, ePassword: 'El campo password no puede estar vacío.'});
                }else if (datosUser.password.length < 6){
                    setErrors({...errors, ePassword: 'El password debe de tener al menos 6 caracteres'});
                }else if (!/^\+?[0-9]{6}/.test(datosUser.password) ) {
                    setErrors({...errors, ePassword: 'Introduce el password valido'}); 
                }else{
                    setErrors({...errors, ePassword: ''});
                }                
            break;  

            case 'birthday':
                
                let years = moment().diff(moment(datosUser.birthday).format('MM/DD/YYYY'), 'years');
                
                if (years < 12 || years > 100){
                    setErrors({...errors, eBirthday: 'Debes tener al menos 12 años para registrarte.'});
                }else {
                    setErrors({...errors, eBirthday: ''});
                }         
            break;
            default:
                break;
        }
    }

    const ejecutaRegistro = async () => {      

        let  user = {
            name : datosUser.name,
            lastName1: datosUser.lastName1,
            lastName2: datosUser.lastName2,
            email: datosUser.email,
            password: datosUser.password,
            birthday: datosUser.birthday,
            address: datosUser.address,
            country: datosUser.country,
            city: datosUser.city,
            postalCode: datosUser.postalCode,
            dni: datosUser.dni,
            phone: datosUser.phone,
            subscription: datosUser.subscription,
            lastSearch: 300,
            lastPlay:90
        }


       try{
            await axios.post(("https://elseptimoartebackend.herokuapp.com/customer"), user);  
        
            notification.success({message:'Usuario registrado.',description: "Te hemos enviado un email para activar la cuenta." });        
            history.push('/login');
        
        }catch(err){
             var errorText = err.response.data.mensaje;
            if (errorText?.includes("email")){
                notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});          

                setNewMessage(JSON.stringify("El email ya existe en la base de datos."));

            }else{
                notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});          

                setNewMessage(JSON.stringify(err.response.data.message));            
            }            
        };      
   
    }    

    return (
        <div className= "boxForm">
            <div className= "tituloFormRegistro"> FORMULARIO DE REGISTRO </div>
            <div className="formulario">
                 <div class="form">
                    <input type="text" id="name" class="form__input" name="name" autocomplete="off" placeholder=" " onBlur={()=>checkError("name")}  onChange={updateFormulario}></input>
                    <label for="name" class="form__label">Nombre</label>
                </div>
                <div>{errors.eName}</div>
                <div class="form">
                    <input type="text" id="lastName1" class="form__input" name="lastName1" autocomplete="off" placeholder=" " onBlur={()=>checkError("lastName1")}  onChange={updateFormulario}></input>
                    <label for="lastName1" class="form__label">Primer apellido</label>
                </div>
                <div>{errors.eLastName1}</div>
                <div class="form">
                    <input type="text" id="lastName2" class="form__input" name="lastName2" autocomplete="off" placeholder=" " onBlur={()=>checkError("lastName2")}  onChange={updateFormulario}></input>
                    <label for="lastName2" class="form__label">Segundo apellido</label>
                </div>
                <div>{errors.eLastName2}</div>
                <div class="form">
                        <input type="text" id="email" class="form__input" name="email" autocomplete="off" placeholder=" " onBlur={()=>checkError("email")}  onChange={updateFormulario}></input>
                        <label for="email" class="form__label">Email</label>
                    </div>
                <div>{errors.eEmail}</div>                
                    <div class="form">
                        <input type="password" id="password" class="form__input" name="password" autocomplete="off" placeholder=" " onBlur={()=>checkError("password")} onChange={updateFormulario}></input>
                        <label for="password" class="form__label">Password</label>
                    </div>
                <div>{errors.ePassword}</div>
                <div class="form">
                        <input type="date" id="birthday" class="form__input" name="birthday" autocomplete="off" placeholder=" " onBlur={()=>checkError("birthday")} onChange={updateFormulario}></input>
                        <label for="birthday" class="form__label">Fecha de nacimiento</label>
                    </div>
                <div>{errors.eBirthday}</div>
                                                 
                <div id = "newText"></div>    
                <div id = "Botom"className="newUserBoton" onClick={()=>ejecutaRegistro()}>Enviar</div>    

                <div className="flashcard">
                    <div className="demo">{newMessage} </div>
   	            </div>
            </div>
        </div>
    )
}

export default connect()(Register);