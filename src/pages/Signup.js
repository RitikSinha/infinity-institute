import React, { useState} from 'react'
import firebase from '../config';
import {useHistory} from 'react-router-dom';





const Signup = () => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
   
    

    
    const history = useHistory();
    const  writeUserData=(uuid, name, phone) =>{
        firebase.database().ref('users/' + uuid).set({
          name: name,
          phone: phone,
        }).then(()=>history.replace('/registration')).catch(()=>history.replace('/'))
      }
    const setupRecapcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptch-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        });
    }
    const userExist = ()=>{
        let checker = null;
        let ref = firebase.database().ref("users");
        ref.orderByChild("phone").equalTo(phone).on("child_added",(snapshot)=> { 
        if(snapshot.key){
            alert("user already exists");
            history.replace('/signin')
            return checker = false;
        } 
        });
        if (checker != null){
            return checker;
        }
        
    }
    const onSignInSubmit = (event) => {
        event.preventDefault();
        setupRecapcha();
   
        if(userExist()!= false){

        
        const phoneNumber = "+91"+phone;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // ...
            const code = window.prompt("enter verification code")
            confirmationResult.confirm(code).then((result) => {
                // User signed in successfully.
                const user = result.user;
                writeUserData(user.uid,name,phone);
                console.log(user)
                
                
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                window.alert("OTP not matched!")
                console.log(error);
                setName('');
                setPhone('');
                setupRecapcha();
                // ...
            });
        }).catch((error) => {
            
                setName('');
                setPhone('');
        });
        }
    
    }
   

    return (
        <div id="div-form">
            <form onSubmit={(e)=>onSignInSubmit(e)} className="login-form" action="javascript:void(0);">
                <div id="recaptch-container"></div>
                <h1 id="signup">Signup</h1>
                <div className="form-input-material">
                    <label className="label">Username</label>
                    <input type="text" value={name} name="username" onChange={(e) => setName(e.target.value)} id="username" placeholder=" " autocomplete="off" className="form-control-material" required />

                </div>
                <div className="form-input-material">
                    <label className="label" >Phone No.</label>
                    <input type="number" value={phone} name="username" onChange={(e) => setPhone(e.target.value)} id="username" placeholder=" " autocomplete="off" className="form-control-material" required />

                </div>
              
                <button type="submit"  className="btn btn-primary btn-ghost">Signup</button>
                <div id="RecaptchaVerifier"></div>
            </form>
        </div>
    );
}

export default Signup;