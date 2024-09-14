import { Clover } from "lucide-react";
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen text-green-700 bg-[#F3E9D2]">
      <Clover size={100} className="animate-spin" />
    </div>
  );
};
export default Loading;
