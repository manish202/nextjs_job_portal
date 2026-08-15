'use server';
import { getCurrentUser, deleteSessionAndSetCookie } from "@/features/auth/sessions";

const logoutAction = async (logoutType: 'current_device' | 'all_device') => {
    try{
        const {status,message,user} = await getCurrentUser();
        if(!status) return {status,message};
        await deleteSessionAndSetCookie(user?.session.session_id!,user?.id!,logoutType);
        return {status: true, message: "Logout successful"};
    }catch(error:any){
        return {status: false, message: error.message};
    }
}

export default logoutAction;