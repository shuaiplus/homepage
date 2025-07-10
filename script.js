document.addEventListener('DOMContentLoaded', (event) => {
    // 液态玻璃效果
    const glassEffect = document.querySelector('.glass-effect');
    const glassFilter = document.querySelector('#glass-filter');
    
    // 创建位移图像
    function createDisplacementImage() {
        // 创建SVG位移图像
        const size = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--glass-size'));
        const radius = size / 2;
        const border = size * 0.1;
        
        // 创建SVG字符串
        const svgContent = `
            <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="red-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="#0000"/>
                        <stop offset="100%" stop-color="red"/>
                    </linearGradient>
                    <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#0000"/>
                        <stop offset="100%" stop-color="blue"/>
                    </linearGradient>
                </defs>
                <!-- 背景 -->
                <rect x="0" y="0" width="${size}" height="${size}" fill="black"></rect>
                <!-- 红色线性渐变 -->
                <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" fill="url(#red-gradient)" />
                <!-- 蓝色线性渐变 -->
                <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" fill="url(#blue-gradient)" style="mix-blend-mode: difference" />
                <!-- 内部区域 -->
                <rect x="${border}" y="${border}" width="${size - border * 2}" height="${size - border * 2}" 
                      rx="${radius}" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(11px)" />
            </svg>
        `;
        
        // 转换SVG为数据URI
        const encoded = encodeURIComponent(svgContent);
        const dataUri = `data:image/svg+xml,${encoded}`;
        
        // 设置feImage的href属性
        const feImage = document.querySelector('feImage');
        if (feImage) {
            feImage.setAttribute('href', dataUri);
        }
        
        // 设置位移图参数
        const displacementMaps = document.querySelectorAll('feDisplacementMap');
        displacementMaps.forEach(map => {
            map.setAttribute('scale', '-180');
        });
        
        // 红、绿、蓝通道的不同位移
        document.querySelector('#redchannel').setAttribute('scale', '-180');
        document.querySelector('#greenchannel').setAttribute('scale', '-170');
        document.querySelector('#bluechannel').setAttribute('scale', '-160');
    }
    
    // 移动玻璃效果到指定位置
    function moveGlassEffect(x, y) {
        // 直接将玻璃效果定位到指定位置，使用transform:translate(-50%, -50%)确保居中
        glassEffect.style.left = `${x}px`;
        glassEffect.style.top = `${y}px`;
        
        // 确保效果是可见的
        if (!glassEffect.classList.contains('active')) {
            glassEffect.classList.add('active');
        }
    }
    
    // 鼠标移动事件处理
    function handleMouseMove(e) {
        moveGlassEffect(e.clientX, e.clientY);
    }
    
    // 触摸移动事件处理
    function handleTouchMove(e) {
        // 防止页面滚动
        e.preventDefault();
        
        // 获取第一个触摸点的位置
        const touch = e.touches[0];
        moveGlassEffect(touch.clientX, touch.clientY);
    }
    
    // 触摸开始事件处理
    function handleTouchStart(e) {
        // 防止页面滚动
        e.preventDefault();
        
        // 获取第一个触摸点的位置
        const touch = e.touches[0];
        moveGlassEffect(touch.clientX, touch.clientY);
    }
    
    // 触摸结束事件处理
    function handleTouchEnd() {
        // 隐藏玻璃效果
        glassEffect.classList.remove('active');
    }
    
    // 初始化
    function initGlassEffect() {
        if (!glassEffect) return;
        
        // 创建位移图像
        createDisplacementImage();
        
        // 添加鼠标移动事件 (桌面端)
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', () => {
            glassEffect.classList.remove('active');
        });
        document.addEventListener('mouseenter', (e) => {
            handleMouseMove(e);
        });
        
        // 添加触摸事件 (移动端)
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        document.addEventListener('touchcancel', handleTouchEnd);
    }
    
    // 初始化液态玻璃效果
    initGlassEffect();
    
    // GitHub按钮交互
    const githubButton = document.querySelector('.github-button');
    if (githubButton) {
        // 确保GitHub按钮可以正常点击
        githubButton.addEventListener('click', (e) => {
            // 点击事件继续传播，不需要额外处理
        });
    }
}); 