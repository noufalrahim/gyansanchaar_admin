import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@/components/ui/input-otp';
import { KeyRound } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/Buttons';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import axios from 'axios';

export default function Login() {
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/auth/login`, {
                mobile: `+91${phoneNo}`,
            });
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                setToken(response.data.token);
                setShowOtpInput(true);
              }
              else if (response.status === 400) {
                console.log("An error occured");
              }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
          const success = otp.length === 6 && otp === '123456';
          if (success) {
            const tokenFromStorage = localStorage.getItem('token');
            dispatch(setUser(tokenFromStorage ? tokenFromStorage : token));
            navigate('/');
          }
        } finally {
          setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        setShowOtpInput(false);
        setOtp('');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            {showOtpInput
                                ? "Enter the OTP sent to your Phone Number"
                                : "Sign in to your account to continue"
                            }
                        </CardDescription>
                    </CardHeader>

                    {!showOtpInput ? (
                        <form onSubmit={handleSendOtp}>
                            <CardContent className="space-y-4">


                                <div className="space-y-2">
                                    <Label htmlFor="phoneNo">Phone Number</Label>
                                    <div className="relative">
                                        {/* <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /> */}
                                        <p className="absolute top-2 left-2 text-sm text-muted-foreground">+91</p>
                                        <Input
                                            id="phoneNo"
                                            type="number"
                                            value={phoneNo}
                                            onChange={(e) => setPhoneNo(e.target.value)}
                                            placeholder="Phone Number"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter>
                                <PrimaryButton
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                    label={isSubmitting ? 'Sending OTP...' : 'Send OTP'}

                                />
                            </CardFooter>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="otp">One-Time Password</Label>
                                    <div className="flex items-center justify-center py-4">
                                        <KeyRound className="h-5 w-5 mr-3 text-hospital-500" />
                                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-2">
                                <PrimaryButton
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting || otp.length !== 6}
                                    label={isSubmitting ? 'Verifying...' : 'Verify & Login'}
                                />
                                <SecondaryButton
                                    type="button"
                                    onClick={handleBack}
                                    className="w-full"
                                    label='Back'
                                />
                            </CardFooter>
                        </form>
                    )}
                </Card>
            </div>
        </div>
    )
}
