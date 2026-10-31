"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Check Acc ခလုတ်နှိပ်ပါက Login Page သို့ သွားရန်
  const handleCheckAcc = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-100 text-center">
        {/* TikTok Security အထိမ်းအမှတ် အိုင်ကွန် */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 font-bold text-xl">
          🛡️
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          TikTok Security Check
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Verify your account status and security details below.
        </p>

        {/* TikTok Security နှင့် သက်ဆိုင်သော အချက်အလက် ၃ ခု */}
        <div className="space-y-3 text-left mb-6">
          {/* Security Item 1 */}
          <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3.5 border border-blue-100">
            <span className="text-blue-600 font-bold">👥</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Your follower is real
              </p>
              <p className="text-xs text-blue-700">
                All followers are organic and active.
              </p>
            </div>
          </div>

          {/* Security Item 2 */}
          <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3.5 border border-green-100">
            <span className="text-green-600 font-bold">✅</span>
            <div>
              <p className="text-sm font-semibold text-green-900">
                No ban post
              </p>
              <p className="text-xs text-green-700">
                Your posts are safe with zero restrictions.
              </p>
            </div>
          </div>

          {/* Security Item 3 */}
          <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-3.5 border border-purple-100">
            <span className="text-purple-600 font-bold">🔒</span>
            <div>
              <p className="text-sm font-semibold text-purple-900">
                Account Safety Status
              </p>
              <p className="text-xs text-purple-700">
                Security protection level is high and stable.
              </p>
            </div>
          </div>
        </div>

        {/* Check Acc Button */}
        <button
          onClick={handleCheckAcc}
          className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition duration-200 shadow-sm"
        >
          Check Acc
        </button>
      </div>
    </div>
  );
}
