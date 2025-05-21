import Swal from 'sweetalert2';

// Custom styled alerts using the theme colors
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export const showSuccessToast = (message) => {
  Toast.fire({
    icon: 'success',
    title: message,
    background: '#e8f5e9',
    iconColor: '#1a237e'
  });
};

export const showErrorToast = (message) => {
  Toast.fire({
    icon: 'error',
    title: message,
    background: '#ffebee',
    iconColor: '#bf360c'
  });
};

export const showConfirmation = async (title, text, confirmButtonText = 'Yes') => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#1a237e',
    cancelButtonColor: '#bf360c',
    confirmButtonText,
    cancelButtonText: 'Cancel',
    background: '#ffffff',
    borderRadius: 12,
    focusConfirm: false,
    customClass: {
      container: 'custom-swal-container',
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      confirmButton: 'custom-swal-confirm-button',
      cancelButton: 'custom-swal-cancel-button'
    }
  });
  
  return result.isConfirmed;
};

export const showCompletionAlert = (title, message) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'success',
    confirmButtonColor: '#1a237e',
    background: '#ffffff',
    borderRadius: 12,
    customClass: {
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      confirmButton: 'custom-swal-confirm-button'
    }
  });
};
