import { Home, Tag } from "lucide-react";

const RoleSelector = ({ selectedRole, register, error }) => {
  return (
    <div className="mb-6">
      {/* Label */}
      <label className="label">I want to</label>

      {/* Role Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* BUYER Card */}
        <label
          className={`relative flex flex-col items-center 
                                justify-center gap-2 p-4 border-2 
                                rounded-xl cursor-pointer 
                                transition duration-200
                                ${
                                  selectedRole === "BUYER"
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50"
                                }`}
        >
          {/* Hidden radio input */}
          <input
            type="radio"
            value="BUYER"
            className="hidden"
            {...register("role")}
          />

          {/* Icon */}
          <div
            className={`p-3 rounded-full
                                    ${
                                      selectedRole === "BUYER"
                                        ? "bg-green-100"
                                        : "bg-gray-100"
                                    }`}
          >
            <Home
              className={`h-6 w-6 
                                         ${
                                           selectedRole === "BUYER"
                                             ? "text-green-600"
                                             : "text-gray-400"
                                         }`}
            />
          </div>

          {/* Text */}
          <div className="text-center">
            <p
              className={`font-semibold text-sm
                                       ${
                                         selectedRole === "BUYER"
                                           ? "text-green-700"
                                           : "text-gray-700"
                                       }`}
            >
              Buy / Rent
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Find your home</p>
          </div>

          {/* Selected Checkmark */}
          {selectedRole === "BUYER" && (
            <div
              className="absolute top-2 right-2 
                                        bg-green-500 rounded-full 
                                        h-5 w-5 flex items-center 
                                        justify-center"
            >
              <svg
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </label>

        {/* SELLER Card */}
        <label
          className={`relative flex flex-col items-center 
                                justify-center gap-2 p-4 border-2 
                                rounded-xl cursor-pointer 
                                transition duration-200
                                ${
                                  selectedRole === "SELLER"
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                                }`}
        >
          {/* Hidden radio input */}
          <input
            type="radio"
            value="SELLER"
            className="hidden"
            {...register("role")}
          />

          {/* Icon */}
          <div
            className={`p-3 rounded-full
                                    ${
                                      selectedRole === "SELLER"
                                        ? "bg-blue-100"
                                        : "bg-gray-100"
                                    }`}
          >
            <Tag
              className={`h-6 w-6 
                                        ${
                                          selectedRole === "SELLER"
                                            ? "text-blue-600"
                                            : "text-gray-400"
                                        }`}
            />
          </div>

          {/* Text */}
          <div className="text-center">
            <p
              className={`font-semibold text-sm
                                       ${
                                         selectedRole === "SELLER"
                                           ? "text-blue-700"
                                           : "text-gray-700"
                                       }`}
            >
              Sell / List
            </p>
            <p className="text-xs text-gray-400 mt-0.5">List your property</p>
          </div>

          {/* Selected Checkmark */}
          {selectedRole === "SELLER" && (
            <div
              className="absolute top-2 right-2 
                                        bg-blue-500 rounded-full 
                                        h-5 w-5 flex items-center 
                                        justify-center"
            >
              <svg
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </label>
      </div>

      {/* Error Message */}
      {error && <p className="error-text mt-2">{error}</p>}
    </div>
  );
};

export default RoleSelector;
