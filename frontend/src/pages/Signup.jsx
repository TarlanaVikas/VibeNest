import VibeNestCard from '../components/VibeNestCard';
import SignupForm from '../components/SignupForm';
import '../styles/login.css';

export default function Signup() {
  return (
    <div className="login-page">
      <div className="login-left">
        <VibeNestCard />
      </div>
      <div className="login-right">
        <SignupForm />
      </div>
    </div>
  );
}
