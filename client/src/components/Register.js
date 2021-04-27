import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory;
    const [user, setUser] = useState({
        name: '',
        email:'',
        phone:'',
        work:'',
        password:'',
        cpassword:'',
    });
    
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const postData = async (e) => {
        e.preventDefault();
        const {name, email, phone, work, password, cpassword} = user;

       const res = await fetch('/register', {
           method: 'POST',
           headers: {
               'Content-Type' : 'application/json',
           },
           body: JSON.stringify({ name, email, phone, work, password, cpassword })
       });

       const data = await res.json();

       if(res.status === 422 || !data){
            window.alert('Registration Successfully');

            history.pushState('/login');
       }
    }

    return (
        <>
        <div className="login">
            <h1>Register User</h1>
            <form method="post">
                <input type="text" name="name" placeholder="Name" required="required" value={user.name} onChange={handleInputs} />
                <input type="email" name="email" placeholder="Email" required="required" value={user.email} onChange={handleInputs} />
                <input type="text" name="phone" placeholder="Phone" required="required" value={user.phone} onChange={handleInputs} />
                <input type="text" name="work" placeholder="Work" required="required" value={user.work} onChange={handleInputs} />
                <input type="text" name="password" placeholder="Password" required="required" value={user.password} onChange={handleInputs} />
                <input type="text" name="cpassword" placeholder="Confirm Password" required="required" value={user.cpassword} onChange={handleInputs} />

                <button type="submit" className="btn btn-primary btn-block btn-large" onClick={postData}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default Register