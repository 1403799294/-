// 导入配置
import WeatherConfig from './weather-config.js';

class WeatherTimeManager {
    constructor() {
        this.weatherElement = document.getElementById('weather');
        this.temperatureElement = document.getElementById('temperature');
        this.dateElement = document.getElementById('date');
        this.timeElement = document.getElementById('time');
        this.locationElement = document.getElementById('location');
        this.weatherIconElement = document.querySelector('.weather-icon');
        
        // 初始化状态
        this.isLoading = false;
        this.lastUpdateTime = null;
        this.retryCount = 0;
        this.maxRetries = 3;
        this.retryTimeout = null;
    }

    // 显示加载状态
    showLoading() {
        this.isLoading = true;
        this.weatherIconElement.classList.remove(...Object.values(WeatherConfig.WEATHER_ICONS));
        this.weatherIconElement.classList.add('fa-spinner', WeatherConfig.ANIMATIONS.LOADING);
        this.weatherElement.innerHTML = '<span class="loading-text">加载中...</span>';
    }

    // 显示错误信息
    showError(message) {
        this.weatherIconElement.classList.remove('fa-spinner', WeatherConfig.ANIMATIONS.LOADING);
        this.weatherIconElement.classList.add('fa-exclamation-circle', WeatherConfig.ANIMATIONS.ERROR);
        this.weatherElement.innerHTML = `
            <span class="error-message" title="点击重试">
                <i class="fas fa-exclamation-circle"></i>
                ${message}
            </span>
        `;
        this.temperatureElement.textContent = '--℃';

        // 自动重试
        if (this.retryCount < this.maxRetries) {
            this.retryTimeout = setTimeout(() => {
                this.retryCount++;
                this.getWeather();
            }, WeatherConfig.RETRY_INTERVAL);
        }
    }

    // 更新天气图标
    updateWeatherIcon(weatherText) {
        // 移除所有可能的天气图标类和动画类
        this.weatherIconElement.classList.remove(
            'fa-spinner',
            'fa-exclamation-circle',
            WeatherConfig.ANIMATIONS.LOADING,
            WeatherConfig.ANIMATIONS.ERROR,
            ...Object.values(WeatherConfig.WEATHER_ICONS)
        );
        
        // 获取对应的图标类名
        const iconClass = WeatherConfig.WEATHER_ICONS[weatherText] || WeatherConfig.WEATHER_ICONS['默认'];
        
        // 添加新图标类和成功动画
        this.weatherIconElement.classList.add(iconClass, WeatherConfig.ANIMATIONS.SUCCESS);
        
        // 移除成功动画
        setTimeout(() => {
            this.weatherIconElement.classList.remove(WeatherConfig.ANIMATIONS.SUCCESS);
        }, WeatherConfig.ANIMATION_DURATION.SUCCESS);

        // 重置重试计数
        this.retryCount = 0;
        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = null;
        }
    }

    // 更新时间
    updateDateTime() {
        const now = new Date();
        
        // 使用配置的格式化选项
        this.timeElement.textContent = now.toLocaleTimeString(WeatherConfig.LOCALE, WeatherConfig.TIME_FORMAT);
        this.dateElement.textContent = now.toLocaleDateString(WeatherConfig.LOCALE, WeatherConfig.DATE_FORMAT);
    }

    // 获取天气数据
    async getWeather() {
        if (this.isLoading) return;
        
        this.showLoading();
        
        try {
            const url = `${WeatherConfig.API_BASE_URL}/${WeatherConfig.API_VERSION}/weather/now?location=${WeatherConfig.CITY_CODE}&key=${WeatherConfig.API_KEY}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(WeatherConfig.ERROR_MESSAGES.API_ERROR);
            }
            
            const data = await response.json();
            
            if (data.code === '200') {
                this.weatherElement.textContent = data.now.text;
                this.temperatureElement.textContent = `${data.now.temp}℃`;
                this.updateWeatherIcon(data.now.text);
                this.lastUpdateTime = new Date();
            } else {
                throw new Error(WeatherConfig.ERROR_MESSAGES.WEATHER_LOAD_FAILED);
            }
        } catch (error) {
            this.showError(error.message);
            console.error('Weather API Error:', error);
        } finally {
            this.isLoading = false;
        }
    }

    // 初始化
    init() {
        // 立即更新时间和天气
        this.updateDateTime();
        this.getWeather();
        
        // 设置定时更新
        setInterval(() => this.updateDateTime(), WeatherConfig.TIME_UPDATE_INTERVAL);
        setInterval(() => this.getWeather(), WeatherConfig.WEATHER_UPDATE_INTERVAL);

        // 添加错误重试功能
        this.weatherElement.addEventListener('click', () => {
            if (this.weatherElement.querySelector('.error-message')) {
                this.retryCount = 0; // 重置重试计数
                this.getWeather();
            }
        });

        // 添加鼠标悬停效果
        this.weatherIconElement.addEventListener('mouseenter', () => {
            this.weatherIconElement.classList.add(WeatherConfig.ANIMATIONS.HOVER);
        });

        this.weatherIconElement.addEventListener('mouseleave', () => {
            this.weatherIconElement.classList.remove(WeatherConfig.ANIMATIONS.HOVER);
        });
    }
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const manager = new WeatherTimeManager();
    manager.init();
}); 