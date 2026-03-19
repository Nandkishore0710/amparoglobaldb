import React, { useState } from 'react';
import { useContent } from './AdminContext';

export default function AdminFooter() {
  const { state, dispatch } = useContent();
  const [data, setData] = useState(state.footerSettings);

  const addLocation = () => setData({...data, locations: [...(data.locations || []), '']});
  const removeLocation = (index) => setData({...data, locations: data.locations.filter((_, i) => i !== index)});
  const updateLocation = (index, val) => setData({...data, locations: data.locations.map((l, i) => i === index ? val : l)});

  const handleSave = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_FOOTER', payload: data });
    alert('Footer settings saved!');
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <form onSubmit={handleSave}>
          <div className="admin-form-group">
            <label>Footer Tagline</label>
            <textarea 
              rows="3"
              className="admin-input"
              value={data.tagline} 
              onChange={e => setData({...data, tagline: e.target.value})} 
            />
          </div>
          <div className="admin-form-group">
            <label>Copyright Text</label>
            <input 
              type="text" 
              className="admin-input"
              value={data.copyright} 
              onChange={e => setData({...data, copyright: e.target.value})} 
            />
          </div>
          
          <h4 style={{ margin: '30px 0 15px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>Social Links & Icons</h4>
          <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {['linkedin', 'youtube', 'twitter', 'instagram'].map(platform => (
              <div key={platform} className="admin-card" style={{ padding: '15px', background: '#f9f9f9', border: '1px solid #eee' }}>
                <label style={{ textTransform: 'capitalize', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>{platform}</label>
                <div className="admin-form-group">
                  <label style={{ fontSize: '0.8rem' }}>Profile URL</label>
                  <input 
                    type="text" 
                    className="admin-input"
                    placeholder={`https://${platform}.com/...`}
                    value={data.socials?.[platform] || ''} 
                    onChange={e => setData({...data, socials: {...data.socials, [platform]: e.target.value}})} 
                  />
                </div>
                <div className="admin-form-group" style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '0.8rem' }}>Custom Icon Image</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        className="admin-input"
                        placeholder="Image URL or Base64"
                        value={data.socialIcons?.[platform] || ''} 
                        onChange={e => setData({...data, socialIcons: {...(data.socialIcons || {}), [platform]: e.target.value}})} 
                      />
                      <label className="admin-btn" style={{ fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap', background: '#f3f4f6' }}>
                        📁 Upload
                        <input 
                          type="file" 
                          hidden 
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setData({...data, socialIcons: {...(data.socialIcons || {}), [platform]: reader.result}});
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    {data.socialIcons?.[platform] && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={data.socialIcons[platform]} alt="Preview" style={{ height: '30px', width: '30px', objectFit: 'contain', border: '1px solid #ddd', padding: '2px', borderRadius: '4px' }} />
                        <button 
                          type="button" 
                          style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                          onClick={() => setData({...data, socialIcons: {...(data.socialIcons || {}), [platform]: ''}})}
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '4px' }}>Upload an image or paste a URL. Leave empty to use default icon.</p>
                </div>
              </div>
            ))}
          </div>

          <h4 style={{ margin: '30px 0 15px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>Office Locations</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {(data.locations || []).map((loc, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  className="admin-input"
                  placeholder="e.g. Mumbai, India"
                  value={loc} 
                  onChange={e => updateLocation(index, e.target.value)} 
                />
                <button 
                  type="button" 
                  onClick={() => removeLocation(index)}
                  style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '0 15px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addLocation}
              className="admin-btn"
              style={{ alignSelf: 'flex-start', background: '#f3f4f6', color: '#4b5563' }}
            >
              + Add Location
            </button>
          </div>

          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <button type="submit" className="admin-btn admin-btn--primary" style={{ width: '200px' }}>Save Footer Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
}
