
export const showNotification = (message, type = 'success', duration = 5000) => {
    const NotyfClass = window.Notyf || Notyf;
 
    const notyf = new NotyfClass({
        duration,
        ripple: true,
        position: { x: 'right', y: 'top' },
        dismissible: true,
        types: [
            {
                type: 'success',
                background: '#2ED573',
                icon: {
                    className: 'fas fa-check',
                    tagName: 'span',
                    color: '#fff',
                },
            },
            {
                type: 'error',
                background: '#FA5252',
                icon: {
                    className: 'fas fa-times',
                    tagName: 'span',
                    color: '#fff',
                },
            },
        ],
    });

    notyf.open({ type, message });
};
