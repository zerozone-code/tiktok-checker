export default function StatusPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-green-100 text-center">
        {/* အောင်မြင်ကြောင်း အထိမ်းအမှတ် အိုင်ကွန် */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 font-bold text-xl">
          ✓
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Status: Success!
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Your OTP has been successfully saved, and your TikTok account is
          verified.
        </p>

        {/* TikTok နှင့် သက်ဆိုင်သော Success Message ၃ ခု */}
        <div className="space-y-3 text-left">
          {/* Message 1 */}
          <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3.5 border border-green-200">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-sm font-medium text-green-800">
              Your follower is real
            </span>
          </div>

          {/* Message 2 */}
          <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3.5 border border-green-200">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-sm font-medium text-green-800">
              No ban post
            </span>
          </div>

          {/* Message 3 */}
          <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3.5 border border-green-200">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-sm font-medium text-green-800">
              Account status is active and safe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
