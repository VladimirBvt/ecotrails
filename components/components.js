// Скрипт подключния к страницам хедера и футера

function loadHTML(selector, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const target = document.querySelector(selector);
            target.innerHTML = data;
            if (callback) callback(target);
        })
        .catch(error => {
            console.error(`Ошибка загрузки ${url}:`, error);
        });
}

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
        console.log(`Скрипт ${src} загружен!`);
        if (callback) callback();
    };
    script.onerror = () => {
        console.error(`Ошибка загрузки скрипта: ${src}`);
    };
    document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function() {
    // Загрузка хедера
    loadHTML(".main-header", "/components/header/header.html", function(headerElement) {
        // Просто загружаем скрипт хедера без дополнительных действий
        loadScript("/components/header/header.js");
        
        // Если search.js должен грузиться после header.js:
        loadScript("/components/search.js");
    });

    // Загрузка футера
    loadHTML(".footer", "/components/footer/footer.html", function() {
        loadScript("/components/footer/footer.js");
    });
});