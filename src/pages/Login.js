import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { BsLightningChargeFill } from 'react-icons/bs';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulation connexion
    setTimeout(() => {
      if (formData.email && formData.password.length >= 6) {
        dispatch(login({
          email: formData.email,
          name: formData.email.split('@')[0],
        }));
        navigate('/');
      } else {
        setError('Email invalide ou mot de passe trop court (6 caractères min)');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div style={styles.page}>
      {/* Blobs décoratifs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoBox}>
          <BsLightningChargeFill style={{ color: '#6c63ff', fontSize: '28px' }} />
          <span style={styles.logoText}>
            NEXUS<span style={styles.logoAccent}>SHOP</span>
          </span>
        </div>

        <h1 style={styles.title}>Bon retour ! 👋</h1>
        <p style={styles.subtitle}>Connectez-vous à votre compte</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Adresse email</label>
            <div style={styles.inputBox}>
              <FiMail size={18} color="#a0a0b0" />
              <input
                type="email"
                name="email"
                placeholder="exemple@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div style={styles.fieldGroup}>
            <div style={styles.labelRow}>
              <label style={styles.label}>Mot de passe</label>
              <Link to="/forgot" style={styles.forgotLink}>
                Mot de passe oublié ?
              </Link>
            </div>
            <div style={styles.inputBox}>
              <FiLock size={18} color="#a0a0b0" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword
                  ? <FiEyeOff size={18} color="#a0a0b0" />
                  : <FiEye size={18} color="#a0a0b0" />
                }
              </button>
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <div style={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.8 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <span style={styles.loadingSpinner}>⏳ Connexion en cours...</span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>ou</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Social buttons */}
        <div style={styles.socialBtns}>
          <button style={styles.socialBtn}>
            <span style={{ fontSize: '20px' }}>🌐</span>
            Google
          </button>
          <button style={styles.socialBtn}>
            <span style={{ fontSize: '20px' }}>📘</span>
            Facebook
          </button>
        </div>

        {/* Register link */}
        <p style={styles.registerText}>
          Pas encore de compte ?{' '}
          <Link to="/register" style={styles.registerLink}>
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'fixed',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)',
    top: '-100px',
    left: '-100px',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'fixed',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(233,69,96,0.1) 0%, transparent 70%)',
    bottom: '-100px',
    right: '-100px',
    pointerEvents: 'none',
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    background: '#1a1a2e',
    border: '1px solid #2a2a45',
    borderRadius: '24px',
    padding: '48px 40px',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '22px',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '32px',
  },
  logoText: {
    color: 'white',
  },
  logoAccent: {
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  title: {
    color: 'white',
    fontSize: '28px',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#a0a0b0',
    fontSize: '15px',
    textAlign: 'center',
    marginBottom: '36px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#a0a0b0',
    fontSize: '14px',
    fontWeight: '600',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotLink: {
    color: '#6c63ff',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#16213e',
    border: '1px solid #2a2a45',
    borderRadius: '12px',
    padding: '14px 18px',
    transition: 'border-color 0.3s',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'white',
    fontSize: '15px',
    fontFamily: 'Poppins, sans-serif',
  },
  eyeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  },
  errorBox: {
    background: 'rgba(233,69,96,0.1)',
    border: '1px solid rgba(233,69,96,0.3)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#e94560',
    fontSize: '13px',
    fontWeight: '500',
  },
  submitBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    color: 'white',
    border: 'none',
    padding: '16px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    boxShadow: '0 8px 32px rgba(108,99,255,0.35)',
    marginTop: '8px',
    transition: 'all 0.3s',
  },
  loadingSpinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    margin: '28px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#2a2a45',
  },
  dividerText: {
    color: '#a0a0b0',
    fontSize: '13px',
    fontWeight: '500',
  },
  socialBtns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '28px',
  },
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: '#16213e',
    border: '1px solid #2a2a45',
    borderRadius: '12px',
    padding: '12px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    transition: 'all 0.3s',
  },
  registerText: {
    textAlign: 'center',
    color: '#a0a0b0',
    fontSize: '14px',
  },
  registerLink: {
    color: '#6c63ff',
    fontWeight: '700',
    textDecoration: 'none',
  },
};

export default Login;