import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { FiShoppingCart, FiStar, FiSearch, FiFilter } from 'react-icons/fi';

const allProducts = [
  { id: 1, name: 'AirPods Pro Max', category: 'Électronique', price: 2499, rating: 5, reviews: 128, emoji: '🎧', badge: 'Nouveau' },
  { id: 2, name: 'Sneakers Ultra', category: 'Mode', price: 899, rating: 4, reviews: 89, emoji: '👟', badge: 'Promo' },
  { id: 3, name: 'Smart Watch X', category: 'Électronique', price: 1599, rating: 5, reviews: 204, emoji: '⌚', badge: null },
  { id: 4, name: 'Sac Premium', category: 'Mode', price: 750, rating: 4, reviews: 67, emoji: '👜', badge: 'Top vente' },
  { id: 5, name: 'iPhone 15 Pro', category: 'Électronique', price: 12999, rating: 5, reviews: 342, emoji: '📱', badge: 'Nouveau' },
  { id: 6, name: 'Nike Air Max', category: 'Sport', price: 1200, rating: 4, reviews: 156, emoji: '👟', badge: null },
  { id: 7, name: 'Parfum Élite', category: 'Beauté', price: 450, rating: 5, reviews: 89, emoji: '🌸', badge: 'Promo' },
  { id: 8, name: 'Roman Bestseller', category: 'Livres', price: 120, rating: 4, reviews: 230, emoji: '📚', badge: null },
  { id: 9, name: 'Laptop Pro 16"', category: 'Électronique', price: 18999, rating: 5, reviews: 95, emoji: '💻', badge: 'Nouveau' },
  { id: 10, name: 'Robe Élégante', category: 'Mode', price: 680, rating: 4, reviews: 74, emoji: '👗', badge: null },
  { id: 11, name: 'Vélo de sport', category: 'Sport', price: 3200, rating: 5, reviews: 41, emoji: '🚴', badge: null },
  { id: 12, name: 'Crème Visage', category: 'Beauté', price: 280, rating: 4, reviews: 188, emoji: '💄', badge: 'Top vente' },
];

const categories = ['Tous', 'Électronique', 'Mode', 'Sport', 'Beauté', 'Livres'];

const Products = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filtered = allProducts
    .filter(p => selectedCategory === 'Tous' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div style={{ width: '100%', padding: '40px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={styles.pageTitle}>
          Tous les <span style={styles.gradient}>Produits</span>
        </h1>
        <p style={styles.pageSubtitle}>{filtered.length} produits disponibles</p>
      </div>

      {/* Barre recherche + tri */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <FiSearch size={18} color="#a0a0b0" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.sortBox}>
          <FiFilter size={16} color="#a0a0b0" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="default">Trier par</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Mieux notés</option>
          </select>
        </div>
      </div>

      {/* Filtres catégories */}
      <div style={styles.filters}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              ...styles.filterBtn,
              background: selectedCategory === cat
                ? 'linear-gradient(135deg, #6c63ff, #e94560)'
                : 'rgba(255,255,255,0.04)',
              color: selectedCategory === cat ? 'white' : '#a0a0b0',
              border: selectedCategory === cat
                ? 'none'
                : '1px solid #2a2a45',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille produits */}
      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <span style={{ fontSize: '48px' }}>🔍</span>
          <p style={{ color: '#a0a0b0', marginTop: '16px' }}>Aucun produit trouvé</p>
        </div>
      ) : (
        <div className="grid-4">
          {filtered.map(product => (
            <div key={product.id} className="card" style={styles.card}>
              <div style={styles.imageBox}>
                <span style={{ fontSize: '64px' }}>{product.emoji}</span>
                {product.badge && (
                  <span style={styles.badge}>{product.badge}</span>
                )}
              </div>

              <div style={styles.info}>
                <p style={styles.category}>{product.category}</p>
                <h3 style={styles.name}>{product.name}</h3>

                <div style={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={13}
                      fill={i < product.rating ? '#ffd700' : 'none'}
                      color={i < product.rating ? '#ffd700' : '#444'}
                    />
                  ))}
                  <span style={styles.reviewCount}>({product.reviews})</span>
                </div>

                <div style={styles.footer}>
                  <span style={styles.price}>{product.price} MAD</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      ...styles.addBtn,
                      background: addedId === product.id
                        ? 'linear-gradient(135deg, #00d4aa, #00a884)'
                        : 'linear-gradient(135deg, #6c63ff, #e94560)',
                    }}
                  >
                    {addedId === product.id ? '✓' : <FiShoppingCart size={15} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  pageTitle: { fontSize: '36px', fontWeight: '800', marginBottom: '8px', color: 'white' },
  gradient: {
    background: 'linear-gradient(135deg, #6c63ff, #e94560)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  pageSubtitle: { color: '#a0a0b0', fontSize: '15px' },
  toolbar: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  searchBox: {
    flex: 1,
    minWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#1a1a2e',
    border: '1px solid #2a2a45',
    borderRadius: '12px',
    padding: '12px 18px',
  },
  searchInput: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'white',
    fontSize: '15px',
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
  },
  sortBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#1a1a2e',
    border: '1px solid #2a2a45',
    borderRadius: '12px',
    padding: '12px 18px',
  },
  select: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#a0a0b0',
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    cursor: 'pointer',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '32px',
  },
  filterBtn: {
    padding: '8px 20px',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Poppins, sans-serif',
  },
  card: { cursor: 'pointer' },
  imageBox: {
    height: '180px',
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
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
  info: { padding: '16px' },
  category: {
    color: '#6c63ff',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '6px',
  },
  name: { color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '8px' },
  stars: { display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '12px' },
  reviewCount: { color: '#a0a0b0', fontSize: '11px', marginLeft: '4px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: 'white', fontSize: '20px', fontWeight: '800' },
  addBtn: {
    color: 'white',
    border: 'none',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px',
  },
  empty: {
    textAlign: 'center',
    padding: '80px',
  },
};

export default Products;