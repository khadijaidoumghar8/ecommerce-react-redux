import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(state => state.cart);

  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={{ fontSize: '80px' }}>🛒</span>
        <h2 style={styles.emptyTitle}>Votre panier est vide</h2>
        <p style={styles.emptySubtitle}>Ajoutez des produits pour commencer vos achats</p>
        <Link to="/products" style={styles.btnPrimary}>
          <FiShoppingBag size={18} />
          Explorer les produits
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <Link to="/products" style={styles.backBtn}>
          <FiArrowLeft size={18} />
          Continuer mes achats
        </Link>
        <h1 style={styles.title}>
          Mon <span style={styles.gradient}>Panier</span>
        </h1>
        <p style={styles.subtitle}>{totalQuantity} article(s)</p>
      </div>

      <div style={styles.layout}>
        {/* Liste des produits */}
        <div style={styles.itemsList}>
          {items.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <div style={styles.itemImage}>
                <span style={{ fontSize: '48px' }}>{item.emoji}</span>
              </div>

              <div style={styles.itemInfo}>
                <p style={styles.itemCategory}>{item.category}</p>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>{item.price} MAD / unité</p>
              </div>

              <div style={styles.itemRight}>
                <div style={styles.quantityBox}>
                  <span style={styles.quantityLabel}>Qté</span>
                  <span style={styles.quantityValue}>{item.quantity}</span>
                </div>
                <p style={styles.itemTotal}>
                  {item.price * item.quantity} MAD
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  style={styles.deleteBtn}
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Bouton vider panier */}
          <button
            onClick={() => dispatch(clearCart())}
            style={styles.clearBtn}
          >
            <FiTrash2 size={15} />
            Vider le panier
          </button>
        </div>

        {/* Résumé commande */}
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Résumé</h2>

          <div style={styles.summaryRows}>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Sous-total</span>
              <span style={styles.summaryValue}>{totalPrice} MAD</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Livraison</span>
              <span style={{ color: '#00d4aa', fontWeight: '600' }}>Gratuite</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Taxes (20%)</span>
              <span style={styles.summaryValue}>
                {Math.round(totalPrice * 0.2)} MAD
              </span>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.summaryTotal}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalValue}>
              {Math.round(totalPrice * 1.2)} MAD
            </span>
          </div>

          <Link to="/login" style={styles.checkoutBtn}>
            Passer la commande
          </Link>

          {/* Badges sécurité */}
          <div style={styles.securityBadges}>
            <span style={styles.secBadge}>🔒 Paiement sécurisé</span>
            <span style={styles.secBadge}>🚚 Livraison gratuite</span>
            <span style={styles.secBadge}>↩️ Retour 30 jours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: '100%',
    padding: '40px 80px',
    minHeight: '80vh',
  },
  header: {
    marginBottom: '40px',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: '#a0a0b0',
    fontSize: '15px',
    textDecoration: 'none',
    marginBottom: '20px',
    transition: 'color 0.3s',
  },
  title: {
    fontSize: '42px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '8px',
  },
  gradient: {
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    color: '#a0a0b0',
    fontSize: '16px',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '32px',
    alignItems: 'start',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cartItem: {
    background: '#1a1a2e',
    border: '1px solid #2a2a45',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    transition: 'border-color 0.3s',
  },
  itemImage: {
    width: '90px',
    height: '90px',
    background: 'linear-gradient(135deg, #16213e, #0f0f1a)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
  },
  itemCategory: {
    color: '#6c63ff',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '6px',
  },
  itemName: {
    color: 'white',
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '6px',
  },
  itemPrice: {
    color: '#a0a0b0',
    fontSize: '14px',
  },
  itemRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexShrink: 0,
  },
  quantityBox: {
    background: '#16213e',
    border: '1px solid #2a2a45',
    borderRadius: '10px',
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  quantityLabel: {
    color: '#a0a0b0',
    fontSize: '11px',
    fontWeight: '600',
  },
  quantityValue: {
    color: 'white',
    fontSize: '18px',
    fontWeight: '800',
  },
  itemTotal: {
    color: 'white',
    fontSize: '20px',
    fontWeight: '800',
    minWidth: '120px',
    textAlign: 'right',
  },
  deleteBtn: {
    background: 'rgba(233,69,96,0.1)',
    border: '1px solid rgba(233,69,96,0.3)',
    color: '#e94560',
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  clearBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: '1px solid #2a2a45',
    color: '#a0a0b0',
    padding: '10px 20px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    marginTop: '8px',
  },
  summary: {
    background: '#1a1a2e',
    border: '1px solid #2a2a45',
    borderRadius: '20px',
    padding: '32px',
    position: 'sticky',
    top: '100px',
  },
  summaryTitle: {
    color: 'white',
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '24px',
  },
  summaryRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#a0a0b0',
    fontSize: '15px',
  },
  summaryValue: {
    color: 'white',
    fontSize: '15px',
    fontWeight: '600',
  },
  divider: {
    height: '1px',
    background: '#2a2a45',
    margin: '20px 0',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  totalLabel: {
    color: 'white',
    fontSize: '20px',
    fontWeight: '700',
  },
  totalValue: {
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '28px',
    fontWeight: '800',
  },
  checkoutBtn: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    color: 'white',
    padding: '16px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '700',
    textDecoration: 'none',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(108,99,255,0.35)',
  },
  securityBadges: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  secBadge: {
    color: '#a0a0b0',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    gap: '16px',
    textAlign: 'center',
  },
  emptyTitle: {
    color: 'white',
    fontSize: '32px',
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#a0a0b0',
    fontSize: '16px',
    marginBottom: '16px',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    color: 'white',
    padding: '14px 32px',
    borderRadius: '50px',
    fontWeight: '700',
    fontSize: '16px',
    textDecoration: 'none',
    boxShadow: '0 8px 32px rgba(108,99,255,0.35)',
  },
};

export default Cart;