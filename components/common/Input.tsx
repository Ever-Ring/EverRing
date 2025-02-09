// import EyeOn from "@assets/visibility_on.svg";
import EyeOff from "@assets/visibility_off.svg";

export default function Input() {
  return (
    <div className="relative flex flex-col items-start gap-2">
      <label
        htmlFor="password"
        className="w-full text-sm font-semibold text-gray-900"
      >
        password
        <input
          id="password"
          type="password"
          placeholder="Email"
          className="mt-2 h-11 w-full rounded-xl bg-gray-50 px-4 text-sm font-medium text-gray-800 hover:border-2 hover:border-mint-300 focus:border-2 focus:border-mint-600 focus:outline-none sm:text-base"
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
        >
          <EyeOff className="h-6 w-6" />
        </button>
      </label>
      <p className="text-sm font-semibold text-red">입력해주세요</p>
    </div>
  );
}
