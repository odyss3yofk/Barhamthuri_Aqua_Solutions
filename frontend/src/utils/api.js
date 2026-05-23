const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const fetchSettings = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/settings/`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

export const fetchMilestones = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/milestones/`);
    if (!res.ok) throw new Error('Failed to fetch milestones');
    const data = await res.json();
    return data.results || data;
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

export const fetchCoreValues = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/values/`);
    if (!res.ok) throw new Error('Failed to fetch core values');
    const data = await res.json();
    return data.results || data;
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

export const fetchProducts = async (category = '') => {
  try {
    const url = category && category !== 'All' 
      ? `${API_BASE_URL}/products/?category=${category.toUpperCase()}` 
      : `${API_BASE_URL}/products/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.results || data;
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}/`);
    if (!res.ok) throw new Error('Failed to fetch product details');
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

export const formatPrice = (price) => {
  if (!price) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
