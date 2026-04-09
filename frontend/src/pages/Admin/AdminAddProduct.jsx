import React, { useState } from 'react';
import { X, Plus, UploadCloud } from 'lucide-react';
import './AdminAddProduct.css';

const AdminAddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        color: '',
        isFeatured: false
    });

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        selectedFiles.forEach(file => {
            data.append('gallery', file);
        });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/add-product`, {
                method: 'POST',
                body: data 
            });

            if (response.ok) {
                alert("Product added successfully to Cloudinary and DB!"); 
                setFormData({ name: '', description: '', price: '', originalPrice: '', category: '', color: '', isFeatured: false });
                setSelectedFiles([]);
                setPreviews([]);
            }
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-add-container">
            <h2 className="admin-title">Add New <i>Collection Piece</i></h2>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-main-grid">
                    <div className="input-section">
                        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="4" />

                        <div className="row-inputs">
                            <input type="number" name="price" placeholder="Sale Price" value={formData.price} onChange={handleChange} required />
                            <input type="number" name="originalPrice" placeholder="Original Price" value={formData.originalPrice} onChange={handleChange} />
                        </div>

                        <div className="row-inputs">
                            <input type="text" name="category" placeholder="Category (e.g. Books)" value={formData.category} onChange={handleChange} required />
                            <input type="text" name="color" placeholder="Primary Color" value={formData.color} onChange={handleChange} />
                        </div>

                        <label className="checkbox-label">
                            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                            Mark as Featured (Trending)
                        </label>
                    </div>

                    <div className="image-section">
                        <label className="section-label">Gallery (Max 5 images)</label>
                        <div className="admin-preview-grid">
                            {previews.map((url, index) => (
                                <div key={index} className="admin-preview-card">
                                    <img src={url} alt="preview" />
                                    <button type="button" onClick={() => removeImage(index)}><X size={14} /></button>
                                    {index === 0 && <span className="tag">Master</span>}
                                </div>
                            ))}

                            {previews.length < 5 && (
                                <label className="admin-upload-btn">
                                    <Plus size={24} />
                                    <input type="file" multiple hidden onChange={handleFileChange} accept="image/*" />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Uploading to Cloud..." : "Finalize & Upload"}
                    <UploadCloud size={18} />
                </button>
            </form>
        </div>
    );
};

export default AdminAddProduct;