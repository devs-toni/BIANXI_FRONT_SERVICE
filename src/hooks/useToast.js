import { toast } from "react-hot-toast";


export const useToast = () => {

  const handleToast = (icon, msg) => {
    toast(msg,
      {
        icon: icon,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontSize: '2em',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }
      }
    );
  }

  return {
    handleToast
  }
}