// 配置信息
const CONFIG = {
    WEATHER_API_KEY: '替换为您的API Key', // 替换为您在和风天气平台申请的API Key
    CITY_CODE: '101180901',  // 洛阳市的城市代码
    WEATHER_API_URL: 'https://devapi.qweather.com/v7/weather/now'
};

// 更新时间和日期
function updateDateTime() {
    const now = new Date();
    const timeElem = document.getElementById('time');
    const dateElem = document.getElementById('date');
    
    // 更新时间
    timeElem.textContent = now.toLocaleTimeString('zh-CN');
    
    // 更新日期
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateElem.textContent = now.toLocaleDateString('zh-CN', dateOptions);
}

// 获取天气信息
async function getWeather() {
    try {
        const url = `${CONFIG.WEATHER_API_URL}?location=${CONFIG.CITY_CODE}&key=${CONFIG.WEATHER_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === '200') {
            const weatherElem = document.getElementById('weather');
            const temperatureElem = document.getElementById('temperature');
            const locationElem = document.getElementById('location');
            
            weatherElem.textContent = data.now.text;
            temperatureElem.textContent = `${data.now.temp}℃`;
            
            // 更新天气图标
            const weatherIcon = document.querySelector('.weather-info i');
            updateWeatherIcon(weatherIcon, data.now.text);
        } else {
            console.error('获取天气信息失败:', data.code);
            showErrorMessage('获取天气信息失败，请稍后重试');
        }
    } catch (error) {
        console.error('获取天气信息失败:', error);
        showErrorMessage('网络错误，无法获取天气信息');
    }
}

// 根据天气状况更新图标
function updateWeatherIcon(iconElement, weatherText) {
    const weatherIcons = {
        '晴': 'sun',
        '多云': 'cloud-sun',
        '阴': 'cloud',
        '雨': 'cloud-rain',
        '雪': 'snowflake',
        '雾': 'smog',
        '霾': 'smog',
        '雷': 'bolt'
    };

    let iconClass = 'cloud-sun'; // 默认图标
    for (const [weather, icon] of Object.entries(weatherIcons)) {
        if (weatherText.includes(weather)) {
            iconClass = icon;
            break;
        }
    }

    iconElement.className = `fas fa-${iconClass}`;
}

// 显示错误信息
function showErrorMessage(message) {
    const errorElem = document.getElementById('error-message');
    if (errorElem) {
        const errorText = errorElem.querySelector('p');
        if (errorText) {
            errorText.textContent = message;
            errorElem.hidden = false;
            
            // 3秒后自动隐藏
            setTimeout(() => {
                errorElem.hidden = true;
            }, 3000);
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 立即更新一次
    updateDateTime();
    getWeather();

    // 设置定时更新
    setInterval(updateDateTime, 1000); // 每秒更新时间
    setInterval(getWeather, 1800000); // 每30分钟更新天气

    // 添加错误提示框关闭功能
    const closeErrorBtn = document.querySelector('.close-error');
    if (closeErrorBtn) {
        closeErrorBtn.addEventListener('click', () => {
            document.getElementById('error-message').hidden = true;
        });
    }
}); 