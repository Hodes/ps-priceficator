import Toastify from 'toastify-js';
import alertify from 'alertifyjs';

export function useMessaging() {
    function showMessage(message, type = 'info') {
        let backgroundColor;
        switch (type) {
            case 'success':
                backgroundColor = 'linear-gradient(to right, #00b09b, #96c93d)';
                break;
            case 'error':
                backgroundColor = 'linear-gradient(to right, #ff5f6d, #ffc371)';
                break;
            case 'warning':
                backgroundColor = 'linear-gradient(to right, #f7971e, #ffd200)';
                break;
            default:
                backgroundColor = 'linear-gradient(to right, #2193b0, #6dd5ed)';
        }

        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: backgroundColor,
        }).showToast();
    }

    function confirmMessage(message, onOk, onCancel) {
        alertify.confirm('Confirmação', message,
            function () { onOk && onOk(); },
            function () { onCancel && onCancel(); }
        );
    }

    return { showMessage, confirmMessage };
}