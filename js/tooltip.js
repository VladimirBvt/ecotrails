document.addEventListener('DOMContentLoaded', function () {
    const tooltipIcon = document.getElementById('tooltipIcon');
    const tooltip = document.getElementById('tooltip');

    // Показать тултип при наведении на иконку
    tooltipIcon.addEventListener('mouseenter', function () {
        tooltip.style.display = 'block';
        positionTooltip();
    });

    // Скрыть тултип при уходе курсора с иконки
    tooltipIcon.addEventListener('mouseleave', function () {
        tooltip.style.display = 'none';
    });

    // Показать/скрыть тултип при клике на иконку
    tooltipIcon.addEventListener('click', function (event) {
        event.stopPropagation(); // Предотвращаем всплытие события

        if (tooltip.style.display === 'block') {
            // Если тултип уже отображается, скрываем его
            tooltip.style.display = 'none';
        } else {
            // Если тултип скрыт, показываем его и позиционируем
            tooltip.style.display = 'block';
            positionTooltip();
        }
    });

    // Закрыть тултип при клике вне его области
    document.addEventListener('click', function () {
        tooltip.style.display = 'none';
    });

    // Закрыть тултип при прокрутке страницы
    window.addEventListener('scroll', function () {
        tooltip.style.display = 'none';
    });



    // Функция для позиционирования тултипа и стрелочки
    function positionTooltip() {
        const iconRect = tooltipIcon.getBoundingClientRect();
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const iconImgRect = document.querySelector('.tooltip-icon img');

        // Позиция тултипа
        let top = iconRect.bottom + window.scrollY;
        let left = iconRect.left + window.scrollX + (iconImgRect.offsetWidth / 2) - (tooltipWidth / 2);

        // Проверка, чтобы тултип не выходил за границы экрана
        if (left < 0) left = 10; // Отступ от левого края
        if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - 10; // Отступ от правого края

        // Позиция стрелочки
        const iconCenterX = iconRect.left + window.scrollX + (iconImgRect.offsetWidth / 2); // Центр иконки
        const tooltipLeft = left; // Левый край тултипа
        const arrowOffset = iconCenterX - tooltipLeft; // Смещение стрелочки относительно центра иконки

        tooltip.style.setProperty('--arrow-offset', `${arrowOffset}px`); // Передаем смещение в CSS
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
});