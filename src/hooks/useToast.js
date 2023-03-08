import Swal from 'sweetalert2'

export const useToast = () => {

  const smallOkToast = (msg) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: msg
    })
  }

  const bigOkToast = (msg) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 2000
    })
  }

  const bigErrorToast = (msg) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${msg}!`,
    })
  }

  return {
    smallOkToast,
    bigOkToast,
    bigErrorToast
  }
}