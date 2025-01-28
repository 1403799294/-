document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加/移除导航栏背景
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 移动端菜单切换
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('.nav-container');
    nav.insertBefore(menuButton, nav.firstChild);

    menuButton.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // 添加移动端菜单样式
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            color: var(--primary-color);
            cursor: pointer;
            padding: 10px;
        }

        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }

            .nav-menu {
                display: none;
                width: 100%;
            }

            .nav-menu.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);

    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 滚动动画
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.feature-item, .product-card, .news-card').forEach(el => {
        animateOnScroll.observe(el);
    });

    // 产品分类切换功能
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCategories = document.querySelectorAll('.product-category');

    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                categoryBtns.forEach(b => b.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');

                const category = this.dataset.category;
                
                // 显示或隐藏相应的产品类别
                productCategories.forEach(cat => {
                    if (category === 'all') {
                        cat.style.display = 'block';
                    } else if (cat.dataset.category === category) {
                        cat.style.display = 'block';
                    } else {
                        cat.style.display = 'none';
                    }
                });
            });
        });
    }

    // 产品图片懒加载
    const productImages = document.querySelectorAll('.product-image img');
    if (productImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        productImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 产品详情页面平滑滚动
    const detailBtns = document.querySelectorAll('.detail-btn');
    if (detailBtns.length > 0) {
        detailBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // 新闻分类切换功能
    const newsCategoryBtns = document.querySelectorAll('.news-categories .category-btn');
    const newsCategories = document.querySelectorAll('.news-category');

    if (newsCategoryBtns.length > 0) {
        newsCategoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                newsCategoryBtns.forEach(b => b.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');

                const category = this.dataset.category;
                
                // 显示或隐藏相应的新闻类别
                newsCategories.forEach(cat => {
                    if (category === 'all') {
                        cat.style.display = 'block';
                    } else if (cat.dataset.category === category) {
                        cat.style.display = 'block';
                    } else {
                        cat.style.display = 'none';
                    }
                });
            });
        });
    }

    // 表单处理
    function handleFormValidation(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('error');
            let errorMessage = field.parentElement.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('span');
                errorMessage.className = 'error-message';
                field.parentElement.appendChild(errorMessage);
            }
            errorMessage.textContent = '此字段为必填项';
            return false;
        } else {
            field.classList.remove('error');
            const errorMessage = field.parentElement.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
            return true;
        }
    }

    // 新闻订阅表单处理
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim()) {
                // 这里可以添加订阅逻辑
                alert('感谢您的订阅！');
                this.reset();
            }
        });
    }

    // 联系表单处理
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        // 表单提交处理
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 表单验证
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!handleFormValidation(field)) {
                    isValid = false;
                }
            });

            // 邮箱格式验证
            const emailField = this.querySelector('#email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('error');
                    let errorMessage = emailField.parentElement.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('span');
                        errorMessage.className = 'error-message';
                        emailField.parentElement.appendChild(errorMessage);
                    }
                    errorMessage.textContent = '请输入有效的邮箱地址';
                }
            }

            // 电话号码格式验证（如果填写了的话）
            const phoneField = this.querySelector('#phone');
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^1[3-9]\d{9}$/;
                if (!phonePattern.test(phoneField.value.trim())) {
                    isValid = false;
                    phoneField.classList.add('error');
                    let errorMessage = phoneField.parentElement.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('span');
                        errorMessage.className = 'error-message';
                        phoneField.parentElement.appendChild(errorMessage);
                    }
                    errorMessage.textContent = '请输入有效的手机号码';
                }
            }

            if (isValid) {
                // 这里可以添加表单提交逻辑
                const formData = new FormData(this);
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '提交中... <i class="fas fa-spinner fa-spin"></i>';

                // 模拟表单提交
                setTimeout(() => {
                    alert('感谢您的留言！我们会尽快与您联系。');
                    this.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '提交留言 <i class="fas fa-paper-plane"></i>';
                }, 1500);
            }
        });

        // 实时表单验证
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', function() {
                handleFormValidation(this);
            });
        });
    }

    // 加载地图（示例使用百度地图）
    const mapContainer = document.getElementById('companyMap');
    if (mapContainer) {
        // 这里可以添加地图加载逻辑
        // 例如：百度地图、高德地图等
        mapContainer.innerHTML = '<div style="padding: 20px; text-align: center;">地图加载中...</div>';
    }

    // 职位分类切换功能
    const jobCategoryBtns = document.querySelectorAll('.job-list .category-btn');
    const jobItems = document.querySelectorAll('.job-item');

    if (jobCategoryBtns.length > 0) {
        jobCategoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                jobCategoryBtns.forEach(b => b.classList.remove('active'));
                // 为当前按钮添加active类
                this.classList.add('active');

                const category = this.dataset.category;
                
                // 显示或隐藏相应的职位
                jobItems.forEach(item => {
                    if (category === 'all') {
                        item.style.display = 'block';
                    } else if (item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 简历投递表单处理
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 表单验证
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!handleFormValidation(field)) {
                    isValid = false;
                }
            });

            // 文件大小验证
            const resumeFile = this.querySelector('#resume');
            if (resumeFile.files.length > 0) {
                const fileSize = resumeFile.files[0].size;
                const maxSize = 10 * 1024 * 1024; // 10MB
                if (fileSize > maxSize) {
                    isValid = false;
                    alert('文件大小不能超过10MB');
                    return;
                }
            }

            if (isValid) {
                // 这里可以添加表单提交逻辑
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '提交中... <i class="fas fa-spinner fa-spin"></i>';

                // 模拟表单提交
                setTimeout(() => {
                    alert('简历投递成功！我们会尽快与您联系。');
                    this.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '提交申请 <i class="fas fa-paper-plane"></i>';
                }, 1500);
            }
        });

        // 实时表单验证
        resumeForm.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('blur', function() {
                handleFormValidation(this);
            });
        });
    }

    // 职位申请按钮处理
    const applyBtns = document.querySelectorAll('.apply-btn');
    if (applyBtns.length > 0) {
        applyBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const jobTitle = this.closest('.job-item').querySelector('h3').textContent;
                const positionSelect = document.querySelector('#position');
                if (positionSelect) {
                    // 滚动到表单区域
                    document.querySelector('.resume-upload').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // 设置职位选择
                    for (let i = 0; i < positionSelect.options.length; i++) {
                        if (positionSelect.options[i].text === jobTitle) {
                            positionSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
            });
        });
    }

    // 添加返回顶部按钮
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    // 控制返回顶部按钮的显示和隐藏
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // 点击返回顶部
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 优化图片加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyImageObserver.observe(img));

    // 添加页面切换动画
    document.querySelectorAll('a').forEach(link => {
        if (link.href && link.href.startsWith(window.location.origin)) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.style.opacity = 0;
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            });
        }
    });

    // 表单验证增强
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    let errorMessage = field.parentElement.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        field.parentElement.appendChild(errorMessage);
                    }
                    errorMessage.textContent = '此字段不能为空';
                } else {
                    field.classList.remove('error');
                    const errorMessage = field.parentElement.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    // 创建搜索结果容器
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    document.body.appendChild(searchResults);

    // 搜索功能
    function performSearch(query) {
        query = query.toLowerCase().trim();
        if (!query) {
            searchResults.classList.remove('active');
            return;
        }

        // 模拟搜索结果
        const results = [
            {
                title: '舞台设计服务',
                url: 'products/index.html#stage-design',
                content: '专业的舞台设计与搭建服务，为您打造完美舞台效果'
            },
            {
                title: '灯光音响服务',
                url: 'products/index.html#lighting-sound',
                content: '专业的灯光音响设计与安装，提供完美的视听体验'
            },
            {
                title: '活动策划服务',
                url: 'products/index.html#event-planning',
                content: '专业的活动策划与执行，让您的活动精彩纷呈'
            }
        ].filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
        );

        // 显示搜索结果
        if (results.length > 0) {
            searchResults.innerHTML = `
                <h3>搜索结果</h3>
                ${results.map(item => `
                    <div class="result-item">
                        <a href="${item.url}">
                            <h4>${item.title}</h4>
                            <p>${item.content}</p>
                        </a>
                    </div>
                `).join('')}
            `;
        } else {
            searchResults.innerHTML = `
                <div class="no-results">
                    <p>未找到相关结果</p>
                </div>
            `;
        }
        searchResults.classList.add('active');
    }

    // 搜索按钮点击事件
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    // 搜索输入框回车事件
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // 点击其他区域关闭搜索结果
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box') && !e.target.closest('.search-results')) {
            searchResults.classList.remove('active');
        }
    });

    // 在线客服功能
    const csButton = document.getElementById('csButton');
    const csPanel = document.getElementById('csPanel');
    const csClose = document.getElementById('csClose');
    const csInput = document.getElementById('csInput');
    const csSend = document.getElementById('csSend');
    const csMessages = document.getElementById('csMessages');

    // 更新常见问题和回答
    const commonQuestions = {
        '你们的服务范围是什么': '我们提供舞台设计、灯光音响、多媒体制作等一站式服务，服务范围包括演唱会、企业年会、展览展示等各类活动。',
        '如何联系': '您可以拨打我们的服务热线：177-6028-8419，或发送邮件至：1403799294@qq.com',
        '价格': '我们的价格根据具体项目需求制定，请联系我们的客服人员获取详细报价。',
        '服务地区': '我们主要服务于河南省洛阳市及周边地区，可根据需求提供异地服务。',
        '工作时间': '我们的工作时间是周一至周五 9:00-18:00',
        '合作流程': '1.需求沟通 2.方案制定 3.报价确认 4.签订合同 5.项目实施 6.验收完成',
        '付款方式': '我们支持多种付款方式，包括银行转账、支付宝、微信支付等。具体可与客服人员协商。',
        '售后服务': '我们提供专业的售后服务支持，确保活动顺利进行。如有任何问题，随时联系我们。'
    };

    // 智能匹配功能
    function findBestMatch(message) {
        message = message.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        for (let question in commonQuestions) {
            const keywords = question.toLowerCase().split(' ');
            let score = 0;
            
            keywords.forEach(keyword => {
                if (message.includes(keyword)) {
                    score += 1;
                }
            });

            if (score > highestScore) {
                highestScore = score;
                bestMatch = question;
            }
        }

        return highestScore > 0 ? commonQuestions[bestMatch] : null;
    }

    // 发送消息增强版
    function sendMessage() {
        const message = csInput.value.trim();
        if (!message) return;

        // 添加用户消息
        addMessage('user', message);

        // 智能回复
        setTimeout(() => {
            let reply = findBestMatch(message);
            
            if (!reply) {
                // 根据消息内容智能判断
                if (message.includes('你好') || message.includes('在吗')) {
                    reply = '您好！很高兴为您服务，请问有什么可以帮您？';
                } else if (message.includes('谢谢') || message.includes('感谢')) {
                    reply = '不客气！如果还有其他问题，随时询问我们。';
                } else if (message.includes('再见') || message.includes('拜拜')) {
                    reply = '感谢您的咨询，祝您生活愉快！';
                } else {
                    reply = '感谢您的咨询！我们会尽快处理您的问题。如需即时帮助，请拨打我们的服务热线：177-6028-8419';
                }
            }
            
            addMessage('system', reply);
        }, 800);

        // 清空输入框
        csInput.value = '';
    }

    // 优化消息显示
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        // 将链接转换为可点击的形式
        content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        
        // 将电话号码转换为可点击的形式
        content = content.replace(/(\d{3}-\d{4}-\d{4}|\d{11})/g, '<a href="tel:$1">$1</a>');
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        
        csMessages.appendChild(messageDiv);
        csMessages.scrollTop = csMessages.scrollHeight;
    }

    // 添加快捷回复按钮
    const quickReplies = [
        '你们的服务范围是什么？',
        '如何联系你们？',
        '价格是多少？',
        '服务地区有哪些？'
    ];

    const quickReplyContainer = document.createElement('div');
    quickReplyContainer.className = 'quick-replies';
    quickReplyContainer.innerHTML = quickReplies.map(reply => 
        `<button class="quick-reply-btn">${reply}</button>`
    ).join('');

    csMessages.parentElement.insertBefore(quickReplyContainer, csMessages);

    // 快捷回复点击事件
    document.querySelectorAll('.quick-reply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            csInput.value = btn.textContent;
            sendMessage();
        });
    });

    // 打开客服面板
    csButton.addEventListener('click', () => {
        csPanel.classList.add('active');
        csButton.style.display = 'none';
    });

    // 关闭客服面板
    csClose.addEventListener('click', () => {
        csPanel.classList.remove('active');
        csButton.style.display = 'flex';
    });

    // 发送按钮点击事件
    csSend.addEventListener('click', sendMessage);

    // 输入框回车事件
    csInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 新闻文章数据
    const newsData = [
        {
            id: 1,
            title: "艺峰文化传媒中心荣获'2024年度最具创新力文化传媒企业'称号",
            category: "公司动态",
            date: "2024-03-15",
            image: "company-1.jpg",
            summary: "在近日举办的2024河南文化创意产业发展大会上，我公司凭借在舞美设计领域的创新成就，荣获'年度最具创新力文化传媒企业'称号。",
            views: 1280
        },
        {
            id: 2,
            title: "艺峰文化传媒中心完成新一轮设备升级，引进国际顶尖舞台技术",
            category: "公司动态",
            date: "2024-02-28",
            image: "company-2.jpg",
            summary: "为提供更优质的服务，公司投资500万元引进最新的舞台灯光、音响设备，进一步提升舞美制作水平。",
            views: 960
        },
        {
            id: 3,
            title: "2024年舞美设计行业发展趋势分析",
            category: "行业资讯",
            date: "2024-03-10",
            image: "industry-1.jpg",
            summary: "随着科技的发展，LED显示技术、全息投影、AR/VR等新技术在舞美设计中的应用日益广泛。",
            views: 850
        },
        {
            id: 4,
            title: "数字化技术革新推动舞台艺术创新发展",
            category: "行业资讯",
            date: "2024-02-20",
            image: "industry-2.jpg",
            summary: "人工智能、大数据等数字化技术在舞台设计中的应用，正在改变传统舞台艺术的表现形式。",
            views: 720
        },
        {
            id: 5,
            title: "洛阳新年音乐盛典完美落幕",
            category: "成功案例",
            date: "2024-01-15",
            image: "case-1.jpg",
            summary: "由我公司承办的2024洛阳新年音乐盛典圆满结束，创新的舞美设计获得一致好评。",
            views: 1100
        }
    ];

    // 新闻搜索功能
    function searchNews(keyword) {
        return newsData.filter(article => 
            article.title.toLowerCase().includes(keyword.toLowerCase()) ||
            article.summary.toLowerCase().includes(keyword.toLowerCase()) ||
            article.category.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // 渲染新闻列表
    function renderNewsList(articles, container) {
        container.innerHTML = articles.map(article => `
            <article class="news-card">
                <div class="news-image">
                    <img src="../assets/images/news/${article.image}" alt="${article.title}">
                </div>
                <div class="news-content">
                    <span class="news-date">${article.date}</span>
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                    <a href="article.html?id=${article.id}" class="read-more">查看详情</a>
                </div>
            </article>
        `).join('');
    }

    // 文章分享功能
    if (document.querySelector('.share-buttons')) {
        const shareButtons = document.querySelectorAll('.share-btn');
        const currentUrl = window.location.href;
        const title = document.querySelector('.article-title').textContent;

        shareButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('weixin')) {
                    // 微信分享
                    wx.ready(function() {
                        wx.updateAppMessageShareData({ 
                            title: title,
                            desc: document.querySelector('.article-text p').textContent,
                            link: currentUrl,
                            imgUrl: document.querySelector('.article-image img').src,
                            success: function () {
                                alert('分享成功！');
                            }
                        });
                    });
                } else if (this.classList.contains('weibo')) {
                    // 微博分享
                    const weiboUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`;
                    window.open(weiboUrl, '_blank');
                } else if (this.classList.contains('qq')) {
                    // QQ分享
                    const qqUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`;
                    window.open(qqUrl, '_blank');
                } else if (this.classList.contains('link')) {
                    // 复制链接
                    navigator.clipboard.writeText(currentUrl).then(() => {
                        alert('链接已复制到剪贴板！');
                    });
                }
            });
        });
    }

    // 评论系统
    if (document.querySelector('.article-comments')) {
        const commentForm = document.querySelector('.comment-form');
        const commentsList = document.querySelector('.comments-list');
        const comments = [];

        // 提交评论
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const commentInput = document.getElementById('commentInput');
            const content = commentInput.value.trim();

            if (content) {
                const comment = {
                    author: '访客用户',
                    content: content,
                    date: new Date().toLocaleString(),
                    avatar: '../assets/images/avatar-default.jpg'
                };

                comments.unshift(comment);
                renderComments();
                commentInput.value = '';
            }
        });

        // 渲染评论列表
        function renderComments() {
            commentsList.innerHTML = comments.map(comment => `
                <div class="comment-item">
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <div class="comment-content">${comment.content}</div>
                </div>
            `).join('');
        }
    }

    // 新闻分类切换
    if (document.querySelector('.news-categories')) {
        const categoryLinks = document.querySelectorAll('.news-categories a');
        const newsContainer = document.querySelector('.news-grid');

        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('href').replace('#', '');
                
                // 更新激活状态
                categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
                this.parentElement.classList.add('active');

                // 筛选并显示文章
                const filteredArticles = category === 'all' 
                    ? newsData 
                    : newsData.filter(article => article.category.toLowerCase() === category.toLowerCase());
                
                renderNewsList(filteredArticles, newsContainer);
            });
        });

        // 初始加载所有文章
        renderNewsList(newsData, newsContainer);
    }

    // 获取URL参数
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // 文章详情页加载
    if (document.querySelector('.article-main')) {
        const articleId = getUrlParam('id');
        if (articleId) {
            const article = newsData.find(a => a.id === parseInt(articleId));
            if (article) {
                document.querySelector('.article-title').textContent = article.title;
                document.querySelector('.article-date').textContent = article.date;
                document.querySelector('.article-category').textContent = article.category;
                document.querySelector('.article-views').textContent = `${article.views}次浏览`;
                document.querySelector('.article-image img').src = `../assets/images/news/${article.image}`;
            }
        }
    }
}); 