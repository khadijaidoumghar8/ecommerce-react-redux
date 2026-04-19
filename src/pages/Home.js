import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiStar, FiTruck, FiShield } from 'react-icons/fi';
import { BsLightningChargeFill } from 'react-icons/bs';

const Home = () => {
  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        {/* Cercles décoratifs en arrière-plan */}
        <div style={styles.blob1} />
        <div style={styles.blob2} />

        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <BsLightningChargeFill style={{ color: '#ffd700' }} />
            <span>Nouveautés 2025</span>
          </div>

          <h1 style={styles.heroTitle}>
            Découvrez les
            <br />
            <span style={styles.gradient}>Meilleures Offres</span>
            <br />
            du Marché
          </h1>

          <p style={styles.heroSubtitle}>
            Des milliers de produits premium à portée de clic.
            Livraison rapide, retours gratuits.
          </p>

          <div style={styles.heroBtns}>
            <Link to="/products" style={styles.btnPrimary}>
              Explorer les produits
              <FiArrowRight size={18} />
            </Link>
            <Link to="/products" style={styles.btnSecondary}>
              Voir les offres
            </Link>
          </div>

          {/* Stats */}
          <div style={styles.stats}>
            {[
              { value: '10K+', label: 'Produits' },
              { value: '50K+', label: 'Clients' },
              { value: '4.9★', label: 'Note moyenne' },
            ].map((stat) => (
              <div key={stat.label} style={styles.statItem}>
                <span style={styles.statValue}>{stat.value}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image hero */}
        <div style={styles.heroImage}>
          <div style={styles.heroImageInner}>
            <div style={styles.floatingCard1}>
              <FiShoppingBag size={20} color="#6c63ff" />
              <div>
                <p style={{ fontSize: '12px', fontWeight: '700', color: 'white' }}>Commande livrée</p>
                <p style={{ fontSize: '11px', color: '#a0a0b0' }}>il y a 2 minutes</p>
              </div>
            </div>
            <div style={styles.heroCircle}>
              <span style={{ fontSize: '80px' }}>🛍️</span>
            </div>
            <div style={styles.floatingCard2}>
              <FiStar size={16} color="#ffd700" />
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>4.9/5</span>
              <span style={{ fontSize: '11px', color: '#a0a0b0' }}>50K avis</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section style={styles.section}>
        <div className="container">
          <h2 className="section-title">
            Nos <span>Catégories</span>
          </h2>
          <p className="section-subtitle">Trouvez exactement ce que vous cherchez</p>

          <div style={styles.categoriesGrid}>
            {categories.map((cat) => (
              <Link to="/products" key={cat.name} style={styles.categoryCard}>
                <span style={styles.categoryIcon}>{cat.icon}</span>
                <span style={styles.categoryName}>{cat.name}</span>
                <span style={styles.categoryCount}>{cat.count} articles</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUITS VEDETTES ===== */}
      <section style={{ ...styles.section, backgroundColor: '#0a0a15' }}>
        <div className="container">
          <h2 className="section-title">
            Produits <span>Vedettes</span>
          </h2>
          <p className="section-subtitle">Les plus populaires du moment</p>

          <div className="grid-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card" style={styles.productCard}>
                <div style={styles.productImageBox}>
                  <span style={{ fontSize: '60px' }}>{product.emoji}</span>
                  {product.badge && (
                    <span style={styles.productBadge}>{product.badge}</span>
                  )}
                </div>
                <div style={styles.productInfo}>
                  <p style={styles.productCategory}>{product.category}</p>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <div style={styles.productStars}>
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={13}
                        fill={i < product.rating ? '#ffd700' : 'none'}
                        color={i < product.rating ? '#ffd700' : '#444'}
                      />
                    ))}
                    <span style={styles.productRatingText}>({product.reviews})</span>
                  </div>
                  <div style={styles.productFooter}>
                    <span style={styles.productPrice}>{product.price} MAD</span>
                    <Link to="/products" style={styles.productBtn}>
                      <FiShoppingBag size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AVANTAGES ===== */}
      <section style={styles.section}>
        <div className="container">
          <div style={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.title} style={styles.featureCard}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BANNER CTA ===== */}
      <section style={styles.ctaBanner}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
            Prêt à commencer ?
          </h2>
          <p style={{ color: '#a0a0b0', marginBottom: '32px', fontSize: '16px' }}>
            Rejoignez 50 000+ clients satisfaits
          </p>
          <Link to="/products" style={styles.btnPrimary}>
            Commencer mes achats <FiArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

// ===== DATA =====
const categories = [
  { name: 'Électronique', icon: '📱', count: 234 },
  { name: 'Mode', icon: '👗', count: 189 },
  { name: 'Maison', icon: '🏠', count: 156 },
  { name: 'Sport', icon: '⚽', count: 98 },
  { name: 'Beauté', icon: '💄', count: 145 },
  { name: 'Livres', icon: '📚', count: 320 },
];

const featuredProducts = [
  { id: 1, name: 'AirPods Pro Max', category: 'Électronique', price: 2499, rating: 5, reviews: 128, emoji: '🎧', badge: 'Nouveau' },
  { id: 2, name: 'Sneakers Ultra', category: 'Mode', price: 899, rating: 4, reviews: 89, emoji: '👟', badge: 'Promo' },
  { id: 3, name: 'Smart Watch X', category: 'Électronique', price: 1599, rating: 5, reviews: 204, emoji: '⌚', badge: null },
  { id: 4, name: 'Sac Premium', category: 'Mode', price: 750, rating: 4, reviews: 67, emoji: '👜', badge: 'Top vente' },
];

const features = [
  { icon: <FiTruck size={28} color="#6c63ff" />, title: 'Livraison rapide', desc: 'Recevez vos commandes en 24-48h partout au Maroc' },
  { icon: <FiShield size={28} color="#00d4aa" />, title: 'Paiement sécurisé', desc: 'Vos transactions sont protégées et cryptées' },
  { icon: <FiStar size={28} color="#ffd700" />, title: 'Qualité garantie', desc: 'Tous nos produits sont vérifiés et certifiés' },
  { icon: <FiShoppingBag size={28} color="#e94560" />, title: 'Retours gratuits', desc: 'Retournez vos articles sous 30 jours sans frais' },
];

// ===== STYLES =====
const styles = {
   hero: {
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '60px 80px',
    position: 'relative',
    overflow: 'hidden',
    gap: '40px',
  },
  blob1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
    top: '-100px',
    left: '-100px',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(233,69,96,0.12) 0%, transparent 70%)',
    bottom: '-50px',
    right: '200px',
    pointerEvents: 'none',
  },
  heroContent: {
    flex: 1,
    zIndex: 1,
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(108,99,255,0.15)',
    border: '1px solid rgba(108,99,255,0.3)',
    borderRadius: '50px',
    padding: '8px 18px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#a090ff',
    marginBottom: '28px',
  },
  heroTitle: {
    fontSize: '80px',
    fontWeight: '800',
    lineHeight: '1.1',
    marginBottom: '28px',
    color: 'white',
  },
  gradient: {
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '17px',
    color: '#a0a0b0',
    lineHeight: '1.7',
    marginBottom: '36px',
    maxWidth: '480px',
  },
  heroBtns: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '48px',
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
    fontSize: '15px',
    boxShadow: '0 8px 32px rgba(108,99,255,0.35)',
    transition: 'all 0.3s ease',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    color: '#a0a0b0',
    padding: '14px 32px',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '15px',
    border: '1px solid #2a2a45',
  },
  stats: {
    display: 'flex',
    gap: '40px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statValue: {
    fontSize: '26px',
    fontWeight: '800',
    color: 'white',
  },
  statLabel: {
    fontSize: '13px',
    color: '#a0a0b0',
  },
  heroImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  heroImageInner: {
    position: 'relative',
    width: '340px',
    height: '340px',
  },
  heroCircle: {
    width: '280px',
    height: '280px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(233,69,96,0.2))',
    border: '2px solid rgba(108,99,255,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px auto',
  },
  floatingCard1: {
    position: 'absolute',
    top: '0',
    left: '-20px',
    background: 'rgba(26,26,46,0.95)',
    border: '1px solid #2a2a45',
    borderRadius: '12px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  },
  floatingCard2: {
    position: 'absolute',
    bottom: '10px',
    right: '-10px',
    background: 'rgba(26,26,46,0.95)',
    border: '1px solid #2a2a45',
    borderRadius: '12px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  },
  section: {
    padding: '80px 0',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px',
  },
  categoryCard: {
    background: '#1a1a2e',
    border: '1px solid #2a2a45',
    borderRadius: '16px',
    padding: '28px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  categoryIcon: {
    fontSize: '36px',
  },
  categoryName: {
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
  },
  categoryCount: {
    color: '#a0a0b0',
    fontSize: '12px',
  },
  productCard: {
    cursor: 'pointer',
  },
  productImageBox: {
    height: '180px',
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  productBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    color: 'white',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '50px',
  },
  productInfo: {
    padding: '16px',
  },
  productCategory: {
    color: '#6c63ff',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '6px',
  },
  productName: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  productStars: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    marginBottom: '12px',
  },
  productRatingText: {
    color: '#a0a0b0',
    fontSize: '11px',
    marginLeft: '4px',
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    color: 'white',
    fontSize: '20px',
    fontWeight: '800',
  },
  productBtn: {
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    color: 'white',
    border: 'none',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '24px',
  },
  featureCard: {
    background: '#1a1a2e',
    border: '1px solid #2a2a45',
    borderRadius: '16px',
    padding: '32px 24px',
    textAlign: 'center',
  },
  featureIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'rgba(108,99,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  featureTitle: {
    color: 'white',
    fontSize: '17px',
    fontWeight: '700',
    marginBottom: '10px',
  },
  featureDesc: {
    color: '#a0a0b0',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  ctaBanner: {
    background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(233,69,96,0.15))',
    border: '1px solid rgba(108,99,255,0.2)',
    margin: '0 24px 80px',
    borderRadius: '24px',
    padding: '80px 24px',
    position: 'relative',
    overflow: 'hidden',
  },
};

export default Home;