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
          ? "bg-[#06D6A0] text-white px-8 py-2 nippo z-10  rounded-[46px]"
          : variant == "outlined"
          ? "bg-transparent border-solid border-[#06D6A0] border text-[#06D6A0] px-8 py-2 nippo z-10  rounded-[46px]"
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
