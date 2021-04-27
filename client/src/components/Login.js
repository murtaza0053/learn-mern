import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const loginUser = async (e) => {
        e.preventDefault();
        
        const res = await fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = res.json();

        if (res.status === 400 || !data ) {
            window.alert('Invalid Credentials')
        } else {
            window.alert('Login Successfull');
            history.push('/');
        }
    }

    return (
        <>
        <div className="login">
            <h1>Login</h1>
            <form method="post">
                <input type="email" name="email" placeholder="Your email" required="required" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <input type="password" name="password" placeholder="Password" required="required" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <button type="submit" className="btn btn-primary btn-block btn-large"
                onClick={loginUser}
                >Let me in.</button>
            </form>
        </div>
        </>
    )
}

export default Login