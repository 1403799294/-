// 天气和时间功能的配置文件
const WeatherConfig = {
    // API配置
    API_KEY: '61354457d76949eba0f640c2851ab2d3', // 和风天气API密钥
    CITY_CODE: '101180901', // 洛阳市的城市代码
    API_VERSION: 'v7',
    API_BASE_URL: 'https://devapi.qweather.com',
    
    // 更新频率配置（毫秒）
    WEATHER_UPDATE_INTERVAL: 15 * 60 * 1000, // 15分钟更新一次天气
    TIME_UPDATE_INTERVAL: 1000, // 1秒更新一次时间
    RETRY_INTERVAL: 60 * 1000, // 错误后1分钟重试
    
    // 本地化配置
    LOCALE: 'zh-CN',
    TIME_FORMAT: {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    },
    DATE_FORMAT: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    },
    
    // 错误消息
    ERROR_MESSAGES: {
        WEATHER_LOAD_FAILED: '天气数据加载失败，点击重试',
        NETWORK_ERROR: '网络连接错误，请检查网络设置',
        API_ERROR: 'API调用失败，点击重试',
        RETRY_MESSAGE: '正在重试...'
    },

    // 天气图标映射
    WEATHER_ICONS: {
        '晴': 'fa-sun',
        '多云': 'fa-cloud-sun',
        '阴': 'fa-cloud',
        '小雨': 'fa-cloud-rain',
        '中雨': 'fa-cloud-showers-heavy',
        '大雨': 'fa-cloud-showers-heavy',
        '暴雨': 'fa-cloud-showers-heavy',
        '雷阵雨': 'fa-bolt',
        '小雪': 'fa-snowflake',
        '中雪': 'fa-snowflake',
        '大雪': 'fa-snowflake',
        '暴雪': 'fa-snowflake',
        '雨夹雪': 'fa-cloud-meatball',
        '雾': 'fa-smog',
        '霾': 'fa-smog',
        '扬沙': 'fa-wind',
        '浮尘': 'fa-wind',
        '强沙尘暴': 'fa-wind',
        '雷电': 'fa-bolt',
        '冰雹': 'fa-cloud-meatball',
        '热': 'fa-temperature-high',
        '冷': 'fa-temperature-low',
        '未知': 'fa-question',
        '默认': 'fa-cloud'
    },

    // 动画配置
    ANIMATIONS: {
        LOADING: 'icon-loading',
        ERROR: 'icon-shake',
        SUCCESS: 'icon-pulse',
        RETRY: 'icon-spin',
        HOVER: 'icon-hover-pulse'
    },

    // 动画时长（毫秒）
    ANIMATION_DURATION: {
        LOADING: 1500,
        ERROR: 500,
        SUCCESS: 1000,
        HOVER: 1000
    }
};

// 导出配置
export default WeatherConfig; 