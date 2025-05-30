import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/Buttons";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneNumber = e.currentTarget.phone.value;
    setPhone(phoneNumber);
    console.log("Sending OTP to:", phoneNumber);
    setOtpSent(true);
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = e.currentTarget.otp.value;
    console.log("Verifying OTP:", otp, "for phone:", phone);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {otpSent
              ? `Enter the OTP sent to ${phone}`
              : "Enter your phone number to receive an OTP"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
            <form onSubmit={handlePhoneSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <PrimaryButton type="submit" label="Send OTP" className="w-full" />
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter OTP"
                    required
                  />
                </div>
                <PrimaryButton type="submit" label="Login" className="w-full" />
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
