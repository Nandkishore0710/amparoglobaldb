import React, { useState } from 'react';
import { useContent } from './AdminContext';

export default function AdminHeader() {
  const { state, dispatch } = useContent();
  const [data, setData] = useState(state.headerSettings);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_HEADER', payload: data });
    alert('Header settings saved!');
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <form onSubmit={handleSave}>
          <div className="admin-form-group">
            <label>CTA Button Label</label>
            <input 
              type="text" 
              value={data.ctaLabel} 
              onChange={e => setData({...data, ctaLabel: e.target.value})} 
            />
          </div>
          <div className="admin-form-group">
            <label>CTA Button Link</label>
            <input 
              type="text" 
              value={data.ctaLink} 
              onChange={e => setData({...data, ctaLink: e.target.value})} 
            />
          </div>
          <div className="admin-form-group">
            <label>
              <input 
                type="checkbox" 
                checked={data.showMegaMenu} 
                onChange={e => setData({...data, showMegaMenu: e.target.checked})} 
                style={{ width: 'auto', marginRight: 10 }}
              />
              Show Services Mega Menu
            </label>
          </div>
          <button type="submit" className="admin-btn admin-btn--primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
