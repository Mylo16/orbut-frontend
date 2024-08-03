import { useEffect, useState } from "react";
import images from "../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from '../../redux/userSlice'
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "../loadingBar";

export default function SignupPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({email: '', password: '', name: '', msisdn: ''});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { loading, userCreated, error } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fieldsFilled = Object.values(userData).every(value => value.trim() !== '');
    setSubmitDisabled(!fieldsFilled);
  }, [userData]);

  useEffect(() => {
    if(userCreated) {
      navigate('/');
    }
  }, [userCreated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting user data:', userData);
    dispatch(userSignup(userData));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
      <main className="main">
      <div className="desktop-banner-container">
        <img className="banner" src={images.banner1} alt="banner"/>
      </div>
      <div className="form-container">
      <div className={loading ? 'loading' : 'no-loading'}><LoadingBar /></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="header">
          <div className="signup-container">
            <p>Already have an account?</p>
            <a href='http://localhost:3000/' className="signup-btn">Login</a>
          </div>
          <h1 className="logo">Orbút</h1>
        </div>
        <p className="welcome-txt">Welcome Back</p>
        <p className="signin-txt">Sign up to create your Campaigns</p>
        <div className="input-container">
          <input placeholder="Email address" value={userData.email} onChange={handleOnChange} name="email" id="email" required className="input-field" />
          <label htmlFor="email" className="input-label">Email address</label>
          { error === true && <p className="invalid-signup">Username already exist ❗❗</p>}
        </div>
        <div className="input-container">
          <input placeholder="password" value={userData.password} onChange={handleOnChange} required name="password" type={showPassword ? "text" : "password"} id="password" className="input-field"/>
          <label htmlFor="password" className="input-label">Password</label>
          <img className="show-password" src={ showPassword ? images.view : images.noView } alt='show-password' onClick={togglePasswordVisibility}/>
        </div>
        <div className="input-container">
          <input placeholder="phone number" value={userData.msisdn} onChange={handleOnChange} required type="number" name="msisdn" id="msisdn" className="input-field"/>
          <label htmlFor="phone number" className="input-label">Phone number</label>
        </div>
        <div className="input-container">
          <input placeholder="name" value={userData.name} onChange={handleOnChange} required name="name" id="name" className="input-field"/>
          <label htmlFor="name" className="input-label">Name</label>
        </div>
        <input type="submit" disabled={submitDisabled} className="submit" value="Sign Up" />
      </form>
      </div>
      </main>
    </>
  );
}
