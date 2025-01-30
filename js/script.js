document.addEventListener('DOMContentLoaded', function () {
    const tooltipIcon = document.getElementById('tooltipIcon');
    const tooltip = document.getElementById('tooltip');

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

        let top = iconRect.bottom + window.scrollY;
        let left = iconRect.left + window.scrollX;

        // Центрирование тултипа относительно иконки
        left += (iconRect.width - tooltipWidth) / 2;

        // Позиция стрелочки
        const arrowOffset = (tooltipWidth / 2);
        tooltip.style.setProperty('--arrow-offset', `${arrowOffset}px`);

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
});