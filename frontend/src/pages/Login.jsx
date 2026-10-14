import VibeNestCard from '../components/VibeNestCard';
import LoginForm from '../components/LoginForm';
import '../styles/login.css';

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-left">
        <VibeNestCard />
      </div>
      <div className="login-right">
        <LoginForm />
      </div>
    </div>
  );
}
