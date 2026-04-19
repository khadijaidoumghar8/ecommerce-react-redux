import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { BsLightningChargeFill } from 'react-icons/bs';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      dispatch(login({
        email: formData.email,
        name: formData.name,
      }));
      navigate('/');
    }, 1500);
  };

  return (
    <div style={styles.page}>
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

        <h1 style={styles.title}>Créer un compte 🚀</h1>
        <p style={styles.subtitle}>Rejoignez 50 000+ clients satisfaits</p>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Nom complet */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Nom complet</label>
            <div style={styles.inputBox}>
              <FiUser size={18} color="#a0a0b0" />
              <input
                type="text"
                name="name"
                placeholder="Khadija Idoumghar"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

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
            <label style={styles.label}>Mot de passe</label>
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

          {/* Confirmer mot de passe */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Confirmer le mot de passe</label>
            <div style={styles.inputBox}>
              <FiLock size={18} color="#a0a0b0" />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={styles.eyeBtn}
              >
                {showConfirm
                  ? <FiEyeOff size={18} color="#a0a0b0" />
                  : <FiEye size={18} color="#a0a0b0" />
                }
              </button>
            </div>
          </div>

          {/* Indicateur force mot de passe */}
          {formData.password && (
            <div style={styles.strengthBox}>
              <div style={styles.strengthBars}>
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    style={{
                      ...styles.strengthBar,
                      background: i <= getStrength(formData.password)
                        ? getStrengthColor(formData.password)
                        : '#2a2a45',
                    }}
                  />
                ))}
              </div>
              <span style={{
                fontSize: '12px',
                color: getStrengthColor(formData.password),
                fontWeight: '600',
              }}>
                {getStrengthLabel(formData.password)}
              </span>
            </div>
          )}

          {/* Erreur */}
          {error && (
            <div style={styles.errorBox}>⚠️ {error}</div>
          )}

          {/* CGU */}
          <p style={styles.cguText}>
            En créant un compte, vous acceptez nos{' '}
            <Link to="/terms" style={styles.cguLink}>Conditions d'utilisation</Link>
            {' '}et notre{' '}
            <Link to="/privacy" style={styles.cguLink}>Politique de confidentialité</Link>
          </p>

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
            {loading ? '⏳ Création en cours...' : 'Créer mon compte'}
          </button>
        </form>

        {/* Login link */}
        <p style={styles.loginText}>
          Déjà un compte ?{' '}
          <Link to="/login" style={styles.loginLink}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

// Helpers force mot de passe
const getStrength = (password) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9!@#$%^&*]/.test(password)) score++;
  return score;
};

const getStrengthColor = (password) => {
  const s = getStrength(password);
  if (s <= 1) return '#e94560';
  if (s === 2) return '#ffd700';
  if (s === 3) return '#00d4aa';
  return '#6c63ff';
};

const getStrengthLabel = (password) => {
  const s = getStrength(password);
  if (s <= 1) return 'Faible';
  if (s === 2) return 'Moyen';
  if (s === 3) return 'Fort';
  return 'Très fort';
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
  logoText: { color: 'white' },
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
    gap: '18px',
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
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#16213e',
    border: '1px solid #2a2a45',
    borderRadius: '12px',
    padding: '14px 18px',
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
  strengthBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  strengthBars: {
    display: 'flex',
    gap: '6px',
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    transition: 'background 0.3s',
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
  cguText: {
    color: '#a0a0b0',
    fontSize: '13px',
    lineHeight: '1.6',
    textAlign: 'center',
  },
  cguLink: {
    color: '#6c63ff',
    fontWeight: '600',
    textDecoration: 'none',
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
    transition: 'all 0.3s',
  },
  loginText: {
    textAlign: 'center',
    color: '#a0a0b0',
    fontSize: '14px',
    marginTop: '24px',
  },
  loginLink: {
    color: '#6c63ff',
    fontWeight: '700',
    textDecoration: 'none',
  },
};

export default Register;