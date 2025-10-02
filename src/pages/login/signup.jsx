import SignUpForm from '../../components/sign-up'; 
import GoogleSignInButton from '../../components/googlesignin';

const AuthPage = () => {
  return (
    <div>
      <h2>Create an Account or Sign In</h2>
 
      <SignUpForm />

      <p style={{ textAlign: 'center', margin: '20px 0' }}>OR</p>
      
   
      <GoogleSignInButton />
    </div>
  );
};

export default AuthPage;