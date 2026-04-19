import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { BsLightningChargeFill } from 'react-icons/bs';

const Navbar = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(15, 15, 26, 0.97)' : 'rgba(15,15,26,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #2a2a45',
      boxSizing: 'border-box',
    }}>
      {/* Inner — pleine largeur avec padding latéral */}
      <div style={{
        width: '100%',
        padding: '0 80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}>

        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '24px',
          fontWeight: '800',
          letterSpacing: '1px',
          color: 'white',
          textDecoration: 'none',
        }}>
          <BsLightningChargeFill style={{ color: '#6c63ff', fontSize: '26px' }} />
          <span>NEXUS<span style={{
            background: 'linear-gradient(135deg, #6c63ff, #e94560)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>SHOP</span></span>
        </Link>

        {/* Links desktop */}
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
        }}>
          {[
            { to: '/', label: 'Accueil' },
            { to: '/products', label: 'Produits' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontSize: '17px',
              fontWeight: '600',
              paddingBottom: '4px',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              color: location.pathname === to ? '#6c63ff' : '#a0a0b0',
              borderBottom: location.pathname === to
                ? '2px solid #6c63ff'
                : '2px solid transparent',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <button style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid #2a2a45',
            color: '#a0a0b0',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <FiSearch size={20} />
          </button>

          <Link to="/cart" style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #6c63ff, #e94560)',
            border: 'none',
            color: 'white',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
          }}>
            <FiShoppingCart size={20} />
            {totalQuantity > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#ffd700',
                color: '#0f0f1a',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '11px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>{totalQuantity}</span>
            )}
          </Link>

          <Link to={isAuthenticated ? '/profile' : '/login'} style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid #2a2a45',
            color: '#a0a0b0',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
          }}>
            <FiUser size={20} />
          </Link>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 80px',
          background: 'rgba(15, 15, 26, 0.98)',
          borderTop: '1px solid #2a2a45',
        }}>
          {[
            { to: '/', label: 'Accueil' },
            { to: '/products', label: 'Produits' },
            { to: '/cart', label: `Panier (${totalQuantity})` },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              padding: '14px 0',
              borderBottom: '1px solid #2a2a45',
              color: '#a0a0b0',
              fontSize: '16px',
              fontWeight: '500',
              textDecoration: 'none',
            }}>{label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;