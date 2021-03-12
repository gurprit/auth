import firebase from '../firebase';
import {useState} from 'react';
import {useRouter} from 'next/router';
import LoginRegisterForm from '../components/LoginRegisterForm';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { GoogleOutlined, FacebookOutlined, SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';



const Login = () =>  {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');
    
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPass, setRegisterPass] = useState('');
    
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();
    
    const register = async () => {
        //console.log(registerEmail, registerPass);
        setLoading(true);
        await firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPass)
        .then((user) => {
            console.log("REGISTER", user);
            router.push('/');
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
        })
    };
    
    const login = async () => {
        //console.log(loginEmail, loginPass);
        setLoading(true);
        await firebase.auth().signInWithEmailAndPassword(loginEmail, loginPass)
        .then((user) => {
            console.log('LOGIN', user);
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
        })
    };
    
    const googleLogin = async () => {
        setLoading(true);
        await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((user) => {
            console.log('LOGIN', user);
            router.push('/');
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
        })
    };
    

    const facebookLogin = async () => {
        setLoading(true);
        await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((user) => {
            console.log('LOGIN', user);
            router.push('/');
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
        })
    };    
    
    
    return (
        <div className="container">
            <h2 className="text-center pt-4 display-4">
                {loading ? <SyncOutlined spin /> : "Login"}
            </h2>
        
            <Button 
                onClick={googleLogin} 
                className="mb-3 col-md-6 offset-md-3" 
                color="primary"
                shape="round" 
                icon={<GoogleOutlined />} 
                block="true"
                >
                Login with Google
            </Button>
        
        
            <Button 
                onClick={facebookLogin} 
                className="mb-3 col-md-6 offset-md-3" 
                color="primary"
                shape="round" 
                icon={<FacebookOutlined />} 
                block="true"
                >
                Login with Facebook
            </Button>
        
            <div className="row col-md-12 offset-md-3">
                <LoginRegisterForm 
                    email={loginEmail} 
                    setEmail={setLoginEmail}
                    pass={loginPass}
                    setPass={setLoginPass}
                    handleSubmit={login}
                    buttonName="Login" 
                />
            </div>
        
            <h2 className="text-center pt-4 display-4">Register</h2>        
            <div className="row col-md-12 offset-md-3">
                <LoginRegisterForm 
                    email={registerEmail} 
                    setEmail={setRegisterEmail} 
                    pass={registerPass}
                    setPass={setRegisterPass}
                    handleSubmit={register}
                    buttonName="Register" 
                />
            </div>
        
            <div className="d-flex justify-content-center">
                <Link href="/reset-password">
                    <a className="btn btn-outline-danger btn-sm mt-5">Reset Password</a>
                </Link>
            </div>
        </div>
    );
};

export default Login