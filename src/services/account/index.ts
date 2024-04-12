import login from './login';
import logout from './logout';
import me from './me';
import refreshToken from './refreshToken';
import generate2faSecret from './generate2faSecret';
import genTwofaQRcode from './genTwofaQRcode';
import enable2fa from './enable2fa';
import disable2fa from './disable2fa';
import verifyOtp from './verifyOtp';
import authCheck from './authCheck';
import forgotPassword from './forgotPassword';
import updateProfile from './updateProfile';
import updatePassword from './updatePassword';

export default {
    login,
    logout,
    me,
    refreshToken,
    generate2faSecret,
    genTwofaQRcode,
    enable2fa,
    disable2fa,
    verifyOtp,
    authCheck,
    forgotPassword,
    updateProfile,
    updatePassword
}