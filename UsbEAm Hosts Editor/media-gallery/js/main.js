// 媒体文件处理类
class MediaGallery {
    constructor() {
        this.mediaContainer = document.getElementById('mediaContainer');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.filterSelect = document.getElementById('filterSelect');
        this.viewToggles = document.querySelectorAll('.view-toggle');
        this.modal = document.getElementById('mediaModal');
        this.modalBody = this.modal.querySelector('.modal-body');
        this.closeButton = this.modal.querySelector('.close-button');
        this.prevButton = this.modal.querySelector('.prev-button');
        this.nextButton = this.modal.querySelector('.next-button');
        this.loadingSpinner = document.querySelector('.loading-spinner');
        
        this.mediaFiles = [];
        this.currentIndex = 0;
        this.currentView = 'grid';
        
        this.init();
    }

    init() {
        // 初始化事件监听
        this.bindEvents();
        // 加载媒体文件
        this.loadMediaFiles();
    }

    bindEvents() {
        // 搜索功能
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.searchButton.addEventListener('click', () => this.handleSearch());

        // 过滤功能
        this.filterSelect.addEventListener('change', () => this.handleFilter());

        // 视图切换
        this.viewToggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.toggleView(toggle.dataset.view));
        });

        // 模态框控制
        this.closeButton.addEventListener('click', () => this.closeModal());
        this.prevButton.addEventListener('click', () => this.showPrevMedia());
        this.nextButton.addEventListener('click', () => this.showNextMedia());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.showPrevMedia();
                    break;
                case 'ArrowRight':
                    this.showNextMedia();
                    break;
            }
        });
    }

    async loadMediaFiles() {
        this.showLoading(true);
        try {
            // 这里应该是从服务器获取媒体文件列表
            // 现在我们模拟一些数据
            const response = await fetch('media-list.json');
            this.mediaFiles = await response.json();
            this.renderMediaFiles(this.mediaFiles);
        } catch (error) {
            console.error('加载媒体文件失败:', error);
            this.showError('加载媒体文件失败，请刷新页面重试');
        } finally {
            this.showLoading(false);
        }
    }

    renderMediaFiles(files) {
        this.mediaContainer.innerHTML = files.map((file, index) => `
            <div class="media-card" data-index="${index}">
                <div class="media-thumbnail">
                    ${this.getMediaThumbnail(file)}
                </div>
                <div class="media-info">
                    <h3 class="media-title">${file.name}</h3>
                    <div class="media-meta">
                        <span>${this.formatFileSize(file.size)}</span>
                        <span>${this.formatDate(file.date)}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // 添加点击事件
        this.mediaContainer.querySelectorAll('.media-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                this.openModal(index);
            });
        });
    }

    getMediaThumbnail(file) {
        if (file.type.startsWith('image/')) {
            return `<img src="${file.thumbnail || file.url}" alt="${file.name}" loading="lazy">`;
        } else if (file.type.startsWith('video/')) {
            return `
                <video poster="${file.thumbnail}" preload="none">
                    <source src="${file.url}" type="${file.type}">
                </video>
                <i class="fas fa-play-circle"></i>
            `;
        }
        return '<i class="fas fa-file"></i>';
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredFiles = this.mediaFiles.filter(file => 
            file.name.toLowerCase().includes(searchTerm)
        );
        this.renderMediaFiles(filteredFiles);
    }

    handleFilter() {
        const filterValue = this.filterSelect.value;
        let filteredFiles = this.mediaFiles;

        if (filterValue !== 'all') {
            filteredFiles = this.mediaFiles.filter(file => 
                filterValue === 'images' ? file.type.startsWith('image/') : file.type.startsWith('video/')
            );
        }

        this.renderMediaFiles(filteredFiles);
    }

    toggleView(view) {
        this.currentView = view;
        this.mediaContainer.className = `media-container ${view}-view`;
        
        this.viewToggles.forEach(toggle => {
            toggle.classList.toggle('active', toggle.dataset.view === view);
        });
    }

    openModal(index) {
        this.currentIndex = index;
        const file = this.mediaFiles[index];
        
        this.modalBody.innerHTML = file.type.startsWith('image/') 
            ? `<img src="${file.url}" alt="${file.name}">`
            : `
                <video controls autoplay>
                    <source src="${file.url}" type="${file.type}">
                </video>
            `;

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        const video = this.modalBody.querySelector('video');
        if (video) video.pause();
    }

    showPrevMedia() {
        this.currentIndex = (this.currentIndex - 1 + this.mediaFiles.length) % this.mediaFiles.length;
        this.openModal(this.currentIndex);
    }

    showNextMedia() {
        this.currentIndex = (this.currentIndex + 1) % this.mediaFiles.length;
        this.openModal(this.currentIndex);
    }

    showLoading(show) {
        this.loadingSpinner.classList.toggle('active', show);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.mediaContainer.appendChild(errorDiv);
    }

    formatFileSize(bytes) {
        const sizes = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < sizes.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(1)} ${sizes[i]}`;
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// 初始化媒体库
document.addEventListener('DOMContentLoaded', () => {
    new MediaGallery();
}); 