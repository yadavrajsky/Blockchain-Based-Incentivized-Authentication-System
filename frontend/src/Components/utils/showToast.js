import { toast } from "react-toastify";

export const showToast = (error=null, msg=null,customId="random") => {

    // if (loading)
    //     toast.loading('Loading...', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //     });
    // else 
    if (msg)
        toast.success(msg,{
            toastId:  customId
        })
    else if (error)
        toast.error(error,{
            toastId:  customId

        })

}

