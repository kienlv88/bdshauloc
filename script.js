/**
 * DreamHome - Real Estate Website JavaScript
 * Features: Modal, Form Handling, LocalStorage, Search & Filter, Animations
 */

// ========================================
// DATA & STATE
// ========================================

// Sample property data
const sampleProperties = [
    {
        id: 1,
        title: "Đất nền thổ cư xã Hậu Lộc - Sổ đỏ chính chủ",
        location: "Xã Hậu Lộc, Hậu Lộc, Thanh Hóa",
        price: "850 Triệu VND",
        priceNum: 850,
        type: "land",
        bedrooms: 0,
        bathrooms: 0,
        area: 150,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Đất nền thổ cư sổ đỏ chính chủ, mặt tiền 6m, đường bê tông rộng 4m",
        contact: {
            name: "Nguyễn Văn Hùng",
            phone: "0912345678",
            avatar: "https://i.pravatar.cc/150?img=11"
        },
        createdAt: new Date().toISOString(),
        isHot: true
    },
    {
        id: 2,
        title: "Bán đất nền view đẹp xã Hoa Lộc",
        location: "Xã Hoa Lộc, Hậu Lộc, Thanh Hóa",
        price: "650 Triệu VND",
        priceNum: 650,
        type: "land",
        bedrooms: 0,
        bathrooms: 0,
        area: 120,
        image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Đất nền view cánh đồng, gần trục đường chính, thuận tiện xây nhà ở",
        contact: {
            name: "Trần Thị Hương",
            phone: "0923456789",
            avatar: "https://i.pravatar.cc/150?img=5"
        },
        createdAt: new Date().toISOString(),
        isHot: false
    },
    {
        id: 3,
        title: "Đất thổ cư mặt đường liên xã Triệu Lộc",
        location: "Xã Triệu Lộc, Hậu Lộc, Thanh Hóa",
        price: "1.2 Tỷ VND",
        priceNum: 1200,
        type: "land",
        bedrooms: 0,
        bathrooms: 0,
        area: 200,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Đất mặt đường liên xã, rộng 10m, lý tưởng xây nhà hoặc kinh doanh",
        contact: {
            name: "Lê Văn Cường",
            phone: "0934567890",
            avatar: "https://i.pravatar.cc/150?img=12"
        },
        createdAt: new Date().toISOString(),
        isHot: true
    },
    {
        id: 4,
        title: "Nhà cấp 4 mới xây xã Vạn Lộc",
        location: "Xã Vạn Lộc, Hậu Lộc, Thanh Hóa",
        price: "1.5 Tỷ VND",
        priceNum: 1500,
        type: "sale",
        bedrooms: 3,
        bathrooms: 2,
        area: 100,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Nhà cấp 4 mới xây 2023, đầy đủ nội thất, sân vườn rộng rãi",
        contact: {
            name: "Phạm Thị Mai",
            phone: "0945678901",
            avatar: "https://i.pravatar.cc/150?img=9"
        },
        createdAt: new Date().toISOString(),
        isHot: false
    },
    {
        id: 5,
        title: "Đất nền 2 mặt tiền xã Đông Thành",
        location: "Xã Đông Thành, Hậu Lộc, Thanh Hóa",
        price: "980 Triệu VND",
        priceNum: 980,
        type: "land",
        bedrooms: 0,
        bathrooms: 0,
        area: 180,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Đất 2 mặt tiền hẻm đường lớn, cách quốc lộ 500m, sổ đỏ sang tên nhanh",
        contact: {
            name: "Hoàng Văn Đức",
            phone: "0956789012",
            avatar: "https://i.pravatar.cc/150?img=15"
        },
        createdAt: new Date().toISOString(),
        isHot: true
    },
    {
        id: 6,
        title: "Nhà mặt tiền đường chính xã Hậu Lộc",
        location: "Xã Hậu Lộc, Hậu Lộc, Thanh Hóa",
        price: "2.5 Tỷ VND",
        priceNum: 2500,
        type: "sale",
        bedrooms: 4,
        bathrooms: 3,
        area: 150,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Nhà 2 tầng mặt tiền đường chính, kinh doanh thuận lợi, full nội thất",
        contact: {
            name: "Vũ Thị Lan",
            phone: "0967890123",
            avatar: "https://i.pravatar.cc/150?img=20"
        },
        createdAt: new Date().toISOString(),
        isHot: false
    }
];


// State
let properties = [];
let currentFilter = 'all';
let searchQuery = '';
let uploadedImages = []; // Store uploaded images as Base64

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initProperties();
    
    // Auto-cleanup expired posts (older than 10 days)
    const deletedCount = cleanupExpiredPosts();
    if (deletedCount > 0) {
        showToast(`🗑️ Đã xóa ${deletedCount} tin hết hạn (quá 10 ngày)`);
    }
    
    renderProperties();
    initScrollAnimations();
    initHeaderScroll();
    initSearchTabs();
    initFormEvents();
    initMobileNav();
    initImageUpload();
    
    // Run cleanup every hour
    setInterval(cleanupExpiredPosts, 60 * 60 * 1000);
});

// Initialize properties from localStorage or sample data
function initProperties() {
    const stored = localStorage.getItem('dreamhome_properties');
    if (stored) {
        const storedProps = JSON.parse(stored);
        // Merge with sample data, avoiding duplicates
        const storedIds = storedProps.map(p => p.id);
        const newSamples = sampleProperties.filter(p => !storedIds.includes(p.id));
        properties = [...storedProps, ...newSamples];
    } else {
        properties = [...sampleProperties];
    }
    saveProperties();
}

// Save properties to localStorage
function saveProperties() {
    localStorage.setItem('dreamhome_properties', JSON.stringify(properties));
}

// ========================================
// RENDER PROPERTIES
// ========================================

function renderProperties(propsToRender = null) {
    const container = document.getElementById('propertiesGrid');
    if (!container) return;

    const displayProps = propsToRender || filterProperties();

    if (displayProps.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🏠</div>
                <h3>Không tìm thấy bất động sản nào</h3>
                <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
        `;
        return;
    }

    container.innerHTML = displayProps.map((prop, index) => {
        const daysRemaining = getDaysRemaining(prop.createdAt);
        const postDate = formatPostDate(prop.createdAt);
        
        return `
        <article class="property-card fade-in" style="animation-delay: ${index * 0.1}s" itemscope itemtype="https://schema.org/RealEstateListing">
            <div class="property-image">
                <img src="${prop.image}" alt="${prop.title}" itemprop="image" loading="lazy">
                <span class="property-badge ${prop.type === 'land' ? 'badge-sale' : prop.type === 'sale' ? 'badge-sale' : 'badge-rent'}">
                    ${prop.type === 'land' ? 'Đất nền' : prop.type === 'sale' ? 'Nhà đất' : 'Cho thuê'}
                </span>
                ${prop.isHot ? '<span class="property-badge badge-hot" style="left: auto; right: 60px;">🔥 Hot</span>' : ''}
                <button class="property-favorite" onclick="toggleFavorite(${prop.id})" aria-label="Thêm vào yêu thích">
                    ❤️
                </button>
                <div class="property-expire ${daysRemaining <= 3 ? 'expire-warning' : ''}">
                    ⏰ Còn ${daysRemaining} ngày
                </div>
            </div>
            <div class="property-content">
                <div class="property-price" itemprop="price">${prop.price}</div>
                <h3 class="property-title" itemprop="name">${prop.title}</h3>
                <div class="property-location" itemprop="address">
                    <span>📍</span>
                    <span>${prop.location}</span>
                </div>
                <div class="property-features">
                    ${prop.bedrooms > 0 ? `
                    <div class="feature-item">
                        <span>🛏️</span>
                        <span>${prop.bedrooms} PN</span>
                    </div>` : ''}
                    ${prop.bathrooms > 0 ? `
                    <div class="feature-item">
                        <span>🚿</span>
                        <span>${prop.bathrooms} WC</span>
                    </div>` : ''}
                    <div class="feature-item">
                        <span>📐</span>
                        <span>${prop.area}m²</span>
                    </div>
                    ${prop.type === 'land' ? `
                    <div class="feature-item">
                        <span>📜</span>
                        <span>Sổ đỏ</span>
                    </div>` : ''}
                </div>
            </div>
            <div class="property-seller">
                <div class="seller-info">
                    <img src="${prop.contact.avatar}" alt="${prop.contact.name}" class="seller-avatar">
                    <div class="seller-details">
                        <span class="seller-name">👤 ${prop.contact.name}</span>
                        <a href="tel:${prop.contact.phone}" class="seller-phone">📞 ${prop.contact.phone}</a>
                    </div>
                </div>
                <div class="post-date">
                    📅 ${postDate}
                </div>
            </div>
            <div class="property-footer">
                <a href="tel:${prop.contact.phone}" class="btn-call">
                    📞 Gọi ngay
                </a>
                <a href="https://zalo.me/${prop.contact.phone}" target="_blank" class="btn-zalo">
                    💬 Zalo
                </a>
            </div>
        </article>
    `}).join('');

    // Trigger animations
    setTimeout(() => {
        document.querySelectorAll('.property-card.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
}

// Calculate days remaining before auto-delete (10 days from post date)
function getDaysRemaining(createdAt) {
    const postDate = new Date(createdAt);
    const expireDate = new Date(postDate.getTime() + (10 * 24 * 60 * 60 * 1000)); // 10 days
    const now = new Date();
    const diffTime = expireDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
}

// Format post date
function formatPostDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Auto-delete expired posts (older than 10 days)
function cleanupExpiredPosts() {
    const now = new Date();
    const tenDaysAgo = new Date(now.getTime() - (10 * 24 * 60 * 60 * 1000));
    
    const originalLength = properties.length;
    properties = properties.filter(prop => {
        const postDate = new Date(prop.createdAt);
        return postDate > tenDaysAgo;
    });
    
    if (properties.length < originalLength) {
        const deletedCount = originalLength - properties.length;
        saveProperties();
        console.log(`🗑️ Đã tự động xóa ${deletedCount} tin đăng hết hạn`);
        return deletedCount;
    }
    return 0;
}

function filterProperties() {
    return properties.filter(prop => {
        // Filter by type
        if (currentFilter !== 'all') {
            if (currentFilter === 'land' && prop.type !== 'land') {
                return false;
            }
            if (currentFilter === 'sale' && prop.type === 'land') {
                return false;
            }
            if (currentFilter === 'sale' && prop.type !== 'sale') {
                return false;
            }
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const searchFields = [
                prop.title,
                prop.location,
                prop.description
            ].join(' ').toLowerCase();
            
            if (!searchFields.includes(query)) {
                return false;
            }
        }

        return true;
    });
}

// ========================================
// MODAL FUNCTIONS
// ========================================

function openModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form
        document.getElementById('listingForm')?.reset();
        // Clear uploaded images
        uploadedImages = [];
        const previewGrid = document.getElementById('imagePreviewGrid');
        if (previewGrid) {
            previewGrid.innerHTML = '';
        }
    }
}

// ========================================
// IMAGE UPLOAD FUNCTIONS
// ========================================

function initImageUpload() {
    const uploadArea = document.getElementById('imageUploadArea');
    if (!uploadArea) return;

    // Drag and drop events
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processImageFiles(files);
        }
    });
}

function handleImageUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
        processImageFiles(files);
    }
}

function processImageFiles(files) {
    const maxFiles = 5;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    // Check current count
    if (uploadedImages.length >= maxFiles) {
        showToast(`Chỉ được tải tối đa ${maxFiles} ảnh!`, 'error');
        return;
    }

    Array.from(files).forEach(file => {
        // Validate file count
        if (uploadedImages.length >= maxFiles) {
            return;
        }

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            showToast(`${file.name}: Định dạng không hỗ trợ!`, 'error');
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            showToast(`${file.name}: Ảnh quá lớn (tối đa 5MB)!`, 'error');
            return;
        }

        // Read and convert to Base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            uploadedImages.push({
                id: Date.now() + Math.random(),
                data: base64,
                name: file.name
            });
            renderImagePreviews();
        };
        reader.readAsDataURL(file);
    });
}

function renderImagePreviews() {
    const previewGrid = document.getElementById('imagePreviewGrid');
    if (!previewGrid) return;

    previewGrid.innerHTML = uploadedImages.map((img, index) => `
        <div class="preview-item ${index === 0 ? 'main' : ''}" data-id="${img.id}">
            <img src="${img.data}" alt="${img.name}">
            <button type="button" class="remove-btn" onclick="removeImage('${img.id}')" title="Xóa ảnh">×</button>
        </div>
    `).join('');

    // Update placeholder visibility
    const placeholder = document.getElementById('uploadPlaceholder');
    if (placeholder) {
        if (uploadedImages.length >= 5) {
            placeholder.style.display = 'none';
        } else {
            placeholder.style.display = 'flex';
        }
    }
}

function removeImage(id) {
    uploadedImages = uploadedImages.filter(img => img.id != id);
    renderImagePreviews();
    showToast('Đã xóa ảnh');
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========================================
// FORM HANDLING
// ========================================

function initFormEvents() {
    const form = document.getElementById('listingForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Image preview
    const imageInput = document.getElementById('propertyImage');
    if (imageInput) {
        imageInput.addEventListener('input', handleImagePreview);
    }
}

function handleImagePreview(e) {
    const url = e.target.value;
    const preview = document.getElementById('imagePreview');
    
    if (!preview) return;

    if (url && isValidUrl(url)) {
        preview.innerHTML = `<img src="${url}" alt="Preview" onerror="this.parentElement.innerHTML='<span>Không thể tải ảnh</span>'">`;
    } else {
        preview.innerHTML = '<span>Xem trước ảnh</span>';
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    // Get form values
    const formData = {
        title: document.getElementById('propertyTitle')?.value?.trim(),
        location: document.getElementById('propertyLocation')?.value?.trim(),
        price: document.getElementById('propertyPrice')?.value?.trim(),
        type: document.getElementById('propertyType')?.value,
        bedrooms: parseInt(document.getElementById('propertyBedrooms')?.value) || 0,
        bathrooms: parseInt(document.getElementById('propertyBathrooms')?.value) || 0,
        area: parseInt(document.getElementById('propertyArea')?.value) || 0,
        image: document.getElementById('propertyImage')?.value?.trim(),
        description: document.getElementById('propertyDescription')?.value?.trim(),
        contactName: document.getElementById('contactName')?.value?.trim(),
        contactPhone: document.getElementById('contactPhone')?.value?.trim()
    };

    // Validation
    if (!formData.title || !formData.location || !formData.price || !formData.contactPhone) {
        showToast('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
    }

    // Determine image source: uploaded images > URL > default
    let mainImage = getDefaultImage();
    let allImages = [];
    
    if (uploadedImages.length > 0) {
        // Use first uploaded image as main
        mainImage = uploadedImages[0].data;
        allImages = uploadedImages.map(img => img.data);
    } else if (formData.image && isValidUrl(formData.image)) {
        // Use URL if no uploaded images
        mainImage = formData.image;
        allImages = [formData.image];
    }

    // Create new property
    const newProperty = {
        id: Date.now(),
        title: formData.title,
        location: formData.location,
        price: formData.price,
        priceNum: parseFloat(formData.price.replace(/[^\d.]/g, '')) || 0,
        type: formData.type,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
        image: mainImage,
        images: allImages, // Store all images
        description: formData.description || '',
        contact: {
            name: formData.contactName || 'Chủ đất',
            phone: formData.contactPhone,
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        },
        createdAt: new Date().toISOString(),
        isHot: false
    };

    // Add to properties array
    properties.unshift(newProperty);
    saveProperties();

    // Update UI
    renderProperties();
    closeModal();
    showToast('🎉 Đăng tin thành công!');

    // Scroll to listings
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
}

function getDefaultImage() {
    const defaultImages = [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}

// ========================================
// SEARCH & FILTER
// ========================================

function initSearchTabs() {
    const tabs = document.querySelectorAll('.search-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter || 'all';
            renderProperties();
        });
    });
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const locationSelect = document.getElementById('locationSelect');
    const priceSelect = document.getElementById('priceSelect');
    const propertyTypeSelect = document.getElementById('propertyTypeSelect');

    searchQuery = searchInput?.value?.trim() || '';
    
    let filtered = [...properties];

    // Filter by current tab (type filter)
    if (currentFilter !== 'all') {
        if (currentFilter === 'land') {
            filtered = filtered.filter(p => p.type === 'land');
        } else if (currentFilter === 'sale') {
            filtered = filtered.filter(p => p.type === 'sale');
        }
    }

    // Filter by search query (keyword)
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(p => {
            const searchFields = [
                p.title,
                p.location,
                p.description,
                p.contact?.name
            ].join(' ').toLowerCase();
            return searchFields.includes(query);
        });
    }

    // Filter by location (5 communes)
    const location = locationSelect?.value;
    if (location) {
        const locationMap = {
            'hau-loc': 'Hậu Lộc',
            'hoa-loc': 'Hoa Lộc',
            'trieu-loc': 'Triệu Lộc',
            'van-loc': 'Vạn Lộc',
            'dong-thanh': 'Đông Thành'
        };
        const locationName = locationMap[location] || location;
        filtered = filtered.filter(p => 
            p.location.toLowerCase().includes(locationName.toLowerCase())
        );
    }

    // Filter by price range
    const priceRange = priceSelect?.value;
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(p => {
            if (max) {
                return p.priceNum >= min && p.priceNum <= max;
            }
            return p.priceNum >= min;
        });
    }

    // Filter by property type
    const propertyType = propertyTypeSelect?.value;
    if (propertyType) {
        if (propertyType === 'land') {
            filtered = filtered.filter(p => p.type === 'land');
        } else if (propertyType === 'residential') {
            filtered = filtered.filter(p => p.type === 'land' && p.description?.toLowerCase().includes('thổ cư'));
        } else if (propertyType === 'house') {
            filtered = filtered.filter(p => p.type === 'sale' && p.bedrooms > 0);
        } else if (propertyType === 'townhouse') {
            filtered = filtered.filter(p => p.type === 'sale' && p.title?.toLowerCase().includes('mặt tiền'));
        }
    }

    renderProperties(filtered);
    
    // Show results count
    if (filtered.length === 0) {
        showToast('Không tìm thấy kết quả phù hợp', 'error');
    } else {
        showToast(`🔍 Tìm thấy ${filtered.length} bất động sản`);
    }
}

// Reset all search filters
function resetSearch() {
    // Reset input and selects
    document.getElementById('searchInput').value = '';
    document.getElementById('locationSelect').value = '';
    document.getElementById('priceSelect').value = '';
    document.getElementById('propertyTypeSelect').value = '';
    
    // Reset state
    searchQuery = '';
    currentFilter = 'all';
    
    // Reset tabs
    document.querySelectorAll('.search-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.filter === 'all') {
            tab.classList.add('active');
        }
    });
    
    // Re-render all properties
    renderProperties();
    showToast('🔄 Đã đặt lại bộ lọc');
}

// ========================================
// ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// MOBILE NAVIGATION
// ========================================

function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function toggleFavorite(id) {
    // Simple favorite toggle (could be expanded with localStorage)
    showToast('❤️ Đã thêm vào yêu thích!');
}

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Hide toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Format Vietnamese currency
function formatCurrency(number) {
    if (number >= 1000) {
        return (number / 1000).toFixed(1).replace('.0', '') + ' Tỷ VND';
    }
    return number + ' Triệu VND';
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced search
const debouncedSearch = debounce(handleSearch, 300);

// ========================================
// GLOBAL EVENT LISTENERS
// ========================================

// Search on Enter key
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.id === 'searchInput') {
        handleSearch();
    }
});

// Update stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString() + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + '+';
            }
        };

        // Start animation when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });

        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);
