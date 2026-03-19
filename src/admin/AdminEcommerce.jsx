import React, { useState } from 'react';
import { useContent } from './AdminContext';

export default function AdminEcommerce() {
  const { state, dispatch } = useContent();
  const [activeTab, setActiveTab] = useState('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: 'Hardware', image: '' });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = { ...newProduct, id: Date.now(), price: Number(newProduct.price), stock: Number(newProduct.stock) };
    dispatch({ type: 'SET_PRODUCTS', payload: [...state.products, product] });
    setShowAddForm(false);
    setNewProduct({ name: '', price: '', stock: '', category: 'Hardware', image: '' });
  };

  const deleteProduct = (id) => {
    dispatch({ type: 'SET_PRODUCTS', payload: state.products.filter(p => p.id !== id) });
  };

  return (
    <div className="admin-page">
      <div className="admin-tabs" style={{ marginBottom: 24, display: 'flex', gap: 12 }}>
        <button className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>Products</button>
        <button className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
        <button className={`admin-tab ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>Inventory</button>
      </div>

      {activeTab === 'products' && (
        <div className="admin-card">
          <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="admin-card__title">Product Catalog</span>
            <button className="admin-btn admin-btn--primary" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancel' : '+ Add Product'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddProduct} className="admin-form" style={{ background: '#f8f9fa', padding: '24px', borderRadius: 16, marginBottom: 24, border: '1px solid #eee' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32 }}>
                <div className="product-image-upload">
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.75rem', fontWeight: 600, color: '#666' }}>Product Image</label>
                  <div 
                    style={{ 
                      width: 120, height: 120, background: '#fff', borderRadius: 12, border: '2px dashed #ddd',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('prod-img').click()}
                  >
                    {newProduct.image ? (
                      <img src={newProduct.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '2rem', color: '#ccc' }}>+</span>
                    )}
                    <input id="prod-img" type="file" hidden accept="image/*" onChange={handleImageChange} />
                  </div>
                </div>

                <div className="admin-grid-2" style={{ flex: 1 }}>
                  <div className="admin-form-group">
                    <label>Product Name</label>
                    <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. AI Dome Camera" />
                  </div>
                  <div className="admin-form-group">
                    <label>Category</label>
                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                      <option>Hardware</option>
                      <option>Sensors</option>
                      <option>Computing</option>
                      <option>Software</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Price (₹)</label>
                    <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="0.00" />
                  </div>
                  <div className="admin-form-group">
                    <label>Initial Stock</label>
                    <input type="number" required value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} placeholder="0" />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                <button type="submit" className="admin-btn admin-btn--primary">Save Product</button>
              </div>
            </form>
          )}

          <div className="admin-table-wrap" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f4f5f7', fontSize: '0.75rem', textTransform: 'uppercase', color: '#888' }}>
                  <th style={{ padding: '12px 16px' }}>Product</th>
                  <th style={{ padding: '12px 16px' }}>Category</th>
                  <th style={{ padding: '12px 16px' }}>Price</th>
                  <th style={{ padding: '12px 16px' }}>Stock</th>
                  <th style={{ padding: '12px 16px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 40, height: 40, background: '#f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
                          <img src={p.image || 'https://via.placeholder.com/40'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontWeight: 600 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}><span className="admin-sidebar__badge">{p.category}</span></td>
                    <td style={{ padding: '16px', fontWeight: 700 }}>₹{p.price.toLocaleString()}</td>
                    <td style={{ padding: '16px' }}>{p.stock} units</td>
                    <td style={{ padding: '16px' }}>
                      <button onClick={() => deleteProduct(p.id)} style={{ color: 'var(--a-red)', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <span className="admin-card__title">Customer Orders</span>
          </div>
          <div className="admin-table-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f4f5f7', fontSize: '0.75rem', textTransform: 'uppercase', color: '#888' }}>
                  <th style={{ padding: '12px 16px' }}>Order ID</th>
                  <th style={{ padding: '12px 16px' }}>Customer</th>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {state.orders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '16px', fontWeight: 600 }}>{o.id}</td>
                    <td style={{ padding: '16px' }}>{o.customer}</td>
                    <td style={{ padding: '16px' }}>{o.date}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: 2, background: o.status === 'Shipped' ? '#d1fae5' : '#fef3c7', color: o.status === 'Shipped' ? '#065f46' : '#92400e', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontWeight: 700 }}>₹{o.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="admin-card">
          <div className="admin-card__header">
            <span className="admin-card__title">Inventory Insights</span>
          </div>
          <div className="admin-grid-3">
            <div style={{ padding: 24, background: '#f8f9fa', borderRadius: 16, border: '1px solid #eee' }}>
              <h4 style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Products</h4>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{state.products.length}</div>
            </div>
            <div style={{ padding: 24, background: '#f8f9fa', borderRadius: 16, border: '1px solid #eee' }}>
              <h4 style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stock Value</h4>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>₹{state.products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}</div>
            </div>
            <div style={{ padding: 24, background: '#f8f9fa', borderRadius: 16, border: '1px solid #eee' }}>
              <h4 style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Low Stock</h4>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--a-red)' }}>{state.products.filter(p => p.stock < 15).length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
