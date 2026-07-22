const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://kuldeepbora.pythonanywhere.com/api' : 'http://localhost:8000/api');

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
  const response = await fetch(`${API_BASE_URL}/values/`);
  if (!response.ok) throw new Error('Failed to fetch core values');
  return response.json();
};

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects/`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const fetchProjectBySlug = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/projects/${slug}/`);
  if (!response.ok) throw new Error('Failed to fetch project details');
  return response.json();
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

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
  return `${baseUrl}${imagePath}`;
};

export const formatPrice = (price) => {
  if (!price) return '₹0';
  
  if (typeof price === 'string' && !/^\d+(\.\d+)?$/.test(price)) {
    return price.includes('₹') ? price : `₹${price}`;
  }

  const numPrice = Number(price);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numPrice);
};
