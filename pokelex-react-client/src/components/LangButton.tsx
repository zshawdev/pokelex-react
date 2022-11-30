import React from "react";

interface LangButtonProps {
  text: string;
  onPress: () => void;
  active?: boolean;
}
const LangButton: React.FC<LangButtonProps> = ({ text, onPress, active }) => {
  const bgStyle = { backgroundColor: `rgba(43,44,44,${active ? "1" : "0.8"})` };
  return (
    <button
      onClick={onPress}
      style={bgStyle}
      className="text-white text-[1.8rem] p-4 cursor-pointer border border-accent hover:border-[#bababa] rounded-[2px]"
    >
      {text}
    </button>
  );
};

export default LangButton;
