import React from "react";

const Button = ({
  children,
  variant,
  loading,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={
        disabled
          ? "bg-gray-500 px-8 py-2 nippo z-10 rounded-[46px] flex items-center justify-center"
          : variant == "contained"
          ? "bg-[#06D6A0] border border-[#06D6A0] rounded-[80px] text-center text-white py-[11.9531px] px-[23.9062px] w-1/2"
          : variant == "outlined"
          ? "border border-[#06D6A0] rounded-[80px] text-center text-[#06D6A0] py-[11.9531px] px-[23.9062px] w-1/2"
          : className
      }
      disabled={!!disabled}
      {...props}
    >
      {loading ? <span className="button-loader"></span> : children}
    </button>
  );
};

export default Button;
