import React from "react";

const Textfield = ({ label, type, ...props }) => {
  return (
    <div className="mb-[28px]">
      <span className="block space-font font-semibold text-[10px]  mb-[10px]">
        {label}
      </span>
      {type === "textarea" ? (
        <textarea
          className="p-[13px] placeholder-[#DAD2F8] bg-white w-full space-font rounded-[10px] border border-[#D8DEE6]"
          {...props}
        />
      ) : (
        <input
         type={type}
          className={`p-[13px] placeholder-[#DAD2F8] bg-white w-full space-font rounded-[10px] border border-[#D8DEE6] ${props.error?'ring-2 ring-red-400':''}`}
          {...props}
          
        />
      )}
       <span className="block  text-red-400 space-font font-semibold text-[10px] text-right">
        {props.helperText || ''}
      </span>
    </div>
  );
};

export default Textfield;
