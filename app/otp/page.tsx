"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OtpContent() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // ၁ မိနစ် (၆၀ စက္ကန့်)
  const [canResend, setCanResend] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const identifier = searchParams.get("identifier");

  // Countdown Timer စတင်အလုပ်လုပ်ခြင်း
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Resend OTP ပြန်လုပ်လိုပါက Timer ကို ၂ ပန်စတင်ရန်
  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setError("");
    // ဤနေရာတွင် Resend API ကို ထပ်မံခေါ်ဆိုနိုင်ပါသည်
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits");
      return;
    }

    try {
      const res = await fetch("/api/auth/update-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save OTP");
        return;
      }

      router.push("/status");
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-100 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enter OTP Code
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Please enter the 6-digit code.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleConfirm} className="space-y-6">
          <input
            type="text"
            maxLength={6}
            placeholder="------"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full rounded-xl border border-gray-300 py-3 text-center text-3xl font-extrabold tracking-widest text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          {/* Countdown Timer Display */}
          <div className="text-sm text-gray-600">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 font-semibold hover:underline"
              >
                Resend OTP Code
              </button>
            ) : (
              <p>
                Resend code in{" "}
                <span className="font-semibold text-blue-600">{timeLeft}s</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition duration-200 shadow-sm"
          >
            Confirm OTP
          </button>
        </form>
      </div>
    </div>
  );
}

// Next.js useSearchParams() အတွက် Suspense ဖြင့် အုပ်ပေးခြင်း
export default function OtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <OtpContent />
    </Suspense>
  );
}
