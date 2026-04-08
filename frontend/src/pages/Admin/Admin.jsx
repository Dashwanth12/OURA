import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit3, Plus, X, UploadCloud, House, Star, } from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const [inventory, setInventory] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'Electronics',
        color: '',
        imageUrl: '',
        averageRating: 4.5,
        ratingsCount: 10,
        isFeatured: false, 
    });

    const navigate = useNavigate();

    const fetchInventory = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/all`);
        const data = await res.json();
        setInventory(data);
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    useEffect(() => {
        const checkAdminStatus = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session || session.user.email !== 'snarasimhawines@gmail.com') {
                console.log('Unauthorized access attempt. Redirecting to login.')
                navigate('/login');
            }
        };
        checkAdminStatus();
    }, [navigate]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from('product-images').upload(fileName, file);
        if (!error) {
            const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
            setProduct({ ...product, imageUrl: data.publicUrl });
        }
        setUploading(false);
    };

    const routeToHome = () => navigate('/home');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const url = editingId
            ? `${import.meta.env.VITE_API_BASE_URL}/api/products/update/${editingId}`
            : `${import.meta.env.VITE_API_BASE_URL}/api/products/add`;

        const cleanProduct = { ...product };
        delete cleanProduct._id;
        delete cleanProduct.__v;

        try {
            const response = await fetch(url, {
                method: editingId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanProduct)
            });

            if (response.ok) {
                alert(editingId ? "Product Updated!" : "Product Added!");
                resetForm();
                fetchInventory();
            }
        } catch (err) {
            console.error("Submit error:", err);
            alert("Server error. Check backend connection.");
        } finally {
            setUploading(false);
        }
    };


    const toggleFeatured = async (item) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/update/${item._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...item, isFeatured: !item.isFeatured })
            });
            if (response.ok) fetchInventory();
        } catch (err) {
            console.log('Failed to toggle featured Status', err);
        }
    };

    const resetForm = () => {
        setProduct({
            name: '',
            description: '',
            price: '',
            originalPrice: '',
            category: 'Electronics',
            color: '',
            imageUrl: '',
            averageRating: 4.5,
            ratingsCount: 10,
            isFeatured: false
        });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Remove this item permanently?")) {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/delete/${id}`, { method: 'DELETE' });
                if (res.ok) fetchInventory();
            } catch (err) {
                alert("Delete failed");
            }
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>{editingId ? "Edit Product" : "New Arrival"}</h2>
                    {editingId && <button onClick={resetForm} className="cancel-btn"><X size={18} /></button>}
                </div>

                <form className="clean-form" onSubmit={handleSubmit}>
                    <div className="image-preview-zone">
                        {product.imageUrl ? (
                            <div className="preview-container">
                                <img src={product.imageUrl} alt="preview" />
                                <label className="change-img-overlay">
                                    <UploadCloud size={20} />
                                    <input type="file" onChange={handleUpload} hidden />
                                </label>
                            </div>
                        ) : (
                            <label className="upload-placeholder">
                                <Plus size={30} />
                                <span>Upload Product Image</span>
                                <input type="file" onChange={handleUpload} hidden />
                            </label>
                        )}
                        {uploading && <div className="upload-loader">Uploading...</div>}
                    </div>

                    <input type="text" placeholder="Product Name" value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })} required />

                    <div className="form-row">
                        <div className="input-with-label">
                            <label>Sale Price (₹)</label>
                            <input type="number" placeholder="Price" value={product.price}
                                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} required />
                        </div>
                        <div className="input-with-label">
                            <label>Original Price (₹)</label>
                            <input type="number" placeholder="MRP" value={product.originalPrice}
                                onChange={(e) => setProduct({ ...product, originalPrice: Number(e.target.value) })} />
                        </div>
                    </div>

                    <div className="featured-toggle-row">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={product.isFeatured}
                                onChange={(e) => setProduct({ ...product, isFeatured: e.target.checked })}
                            />
                            <span className="checkmark"></span>
                            Show in Featured Collection
                        </label>
                    </div>

                    <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                        <option value="Electronics">Electronics</option>
                        <option value="shoes">Shoes</option>
                        <option value="furniture">Furniture</option>
                        <option value="books">Books</option>
                        <option value="decor">Decor</option>
                    </select>

                    <textarea
                        placeholder="Product Description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />

                    <div className="form-divider">Social Proof & Reviews</div>

                    <div className="form-row">
                        <div className="input-with-label">
                            <label>Initial Rating (0-5)</label>
                            <input type="number" step="0.1" max="5" min="0" value={product.averageRating}
                                onChange={(e) => setProduct({ ...product, averageRating: Number(e.target.value) })} />
                        </div>
                        <div className="input-with-label">
                            <label>Review Count</label>
                            <input type="number" value={product.ratingsCount}
                                onChange={(e) => setProduct({ ...product, ratingsCount: Number(e.target.value) })} />
                        </div>
                    </div>

                    <button type="submit" className="main-action-btn" disabled={uploading}>
                        {editingId ? "Update Inventory" : "Add to Store"}
                    </button>
                </form>
            </aside>

            <main className="admin-main">
                <button className='home-btn' onClick={routeToHome}>
                    <House size={30} color='#333a2f' />
                </button>
                <button className='remove-all-btn' onClick={async () => {
                    if (window.confirm('clear entie Inventory? This Cannot bu Undone!')) {
                        try{
                            await Promise.all(inventory.map(item => 
                                fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/delete/${item._id}`, {method: 'DELETE'})
                            ))
                            setInventory([])
                            alert('Cleared.')
                        }catch(err){
                            alert('Some Products could not be deleted.', err)
                        }
                    }
                }}>
                    <Trash2 size={20} /> 
                </button>

                <div className="inventory-header">
                    <h1 className='inventory-head'>Active Inventory <span className='item'>{inventory.length} items</span></h1>
                </div>

                <div className="inventory-grid">
                    {inventory.map((item) => (
                        <div key={item._id} className={`inventory-card ${item.isFeatured ? 'featured-highlight' : ''}`}>
                            <div className="card-image-wrapper">
                                <img src={item.imageUrl} alt={item.name} />
                                <button
                                    className={`featured-star-btn ${item.isFeatured ? 'active' : ''}`}
                                    onClick={() => toggleFeatured(item)}
                                >
                                    <Star size={16} fill={item.isFeatured ? "#FFD700" : "none"} />
                                </button>
                            </div>
                            <div className="card-details">
                                <h3>{item.name}</h3>
                                <p>₹{item.price.toLocaleString('en-IN')}</p>
                                {item.originalPrice > item.price && (
                                    <span style={{ fontSize: '12px', color: '#888', textDecoration: 'line-through' }}>
                                        ₹{item.originalPrice.toLocaleString('en-IN')}
                                    </span>
                                )}
                            </div>
                            <div className="card-actions">
                                <button className="icon-btn edit" onClick={() => { setProduct(item); setEditingId(item._id); }}>
                                    <Edit3 size={18} />
                                </button>
                                <button className="icon-btn delete" onClick={() => handleDelete(item._id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Admin;