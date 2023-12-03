import {toast} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const success=(messege)=>toast.success(messege)

export const error=(messege)=>toast.error(messege || 'something went wrong')

export const info=(messege)=>toast.info(messege)
