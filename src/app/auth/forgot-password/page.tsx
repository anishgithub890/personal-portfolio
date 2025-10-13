'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, ArrowLeft, Lock, RefreshCw } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Sending OTP to:', email);
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('OTP response:', { status: response.status, data });

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setSuccess('OTP sent successfully! Please check your email.');
        setStep('otp');
        startCountdown();
      }
    } catch (error) {
      console.error('OTP send error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Verifying OTP:', { email, otp });
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      console.log('OTP verification response:', { status: response.status, data });

      if (!response.ok) {
        setError(data.error || 'Invalid OTP');
      } else {
        setSuccess('OTP verified successfully!');
        // Navigate to reset password page with email
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setSuccess('OTP resent successfully!');
        startCountdown();
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${step === 'email' ? 'bg-primary' : 'bg-muted'}`} />
              <div className="w-8 h-0.5 bg-muted" />
              <div className={`w-3 h-3 rounded-full ${step === 'otp' ? 'bg-primary' : 'bg-muted'}`} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {step === 'email' ? 'Forgot Password' : 'Verify OTP'}
          </CardTitle>
          <CardDescription>
            {step === 'email' 
              ? 'Enter your email to receive a verification code' 
              : 'Enter the 4-digit code sent to your email'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Verification Code
                </label>
                <div className="flex justify-center">
                  <div className="flex gap-3">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`
                          w-12 h-12 border-2 rounded-lg flex items-center justify-center text-lg font-semibold
                          transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20
                          ${otp[index] ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'}
                        `}
                      >
                        <input
                          type="text"
                          maxLength={1}
                          value={otp[index] || ''}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            const newOtp = otp.split('');
                            newOtp[index] = value;
                            setOtp(newOtp.join(''));
                            
                            // Auto-focus next input
                            if (value && index < 3) {
                              const nextInput = (e.target as HTMLInputElement).parentElement?.nextElementSibling?.querySelector('input') as HTMLInputElement;
                              nextInput?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            // Handle backspace
                            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                              const prevInput = (e.target as HTMLInputElement).parentElement?.previousElementSibling?.querySelector('input') as HTMLInputElement;
                              prevInput?.focus();
                            }
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
                            if (pastedData.length === 4) {
                              setOtp(pastedData);
                              // Focus the last input
                              const inputs = document.querySelectorAll('input[type="text"]');
                              (inputs[inputs.length - 1] as HTMLInputElement)?.focus();
                            }
                          }}
                          className="w-full h-full text-center bg-transparent border-none outline-none text-lg font-semibold"
                          autoComplete="one-time-code"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Enter the 4-digit code sent to your email
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>

              <div className="text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Didn&apos;t receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={countdown > 0 || isLoading}
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium disabled:text-muted-foreground disabled:cursor-not-allowed"
                  >
                    {countdown > 0 ? (
                      <>
                        <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                        Resend in {countdown}s
                      </>
                    ) : (
                      'Resend OTP'
                    )}
                  </button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <ArrowLeft className="mr-1 h-3 w-3" />
                    Back to email
                  </button>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 