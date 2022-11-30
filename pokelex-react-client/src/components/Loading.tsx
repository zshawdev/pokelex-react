import React from "react";

// made using loading.io
const Loading: React.FC<{ size?: number }> = ({ size = 200 }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ display: 'block' }}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="28" cy="75" r="11" fill="#c8472c">
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0s"
          ></animate>
        </circle>

        <path
          d="M28 47A28 28 0 0 1 56 75"
          fill="none"
          stroke="#412a1e"
          strokeWidth="10"
        >
          <animate
            attributeName="stroke-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0.1s"
          ></animate>
        </path>
        <path
          d="M28 25A50 50 0 0 1 78 75"
          fill="none"
          stroke="#f8de3c"
          strokeWidth="10"
        >
          <animate
            attributeName="stroke-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0.2s"
          ></animate>
        </path>
      </svg>
      <div className="text-[5rem] pl-8 pt-4">Loading</div>
    </div>
  );
};

export default Loading;
