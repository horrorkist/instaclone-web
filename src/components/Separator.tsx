interface ISeparatorProps {
  text: string;
}

function Separator({ text }: ISeparatorProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="border-t flex-1 border-gray-400" />
      <span className="mx-6 text-sm text-gray-400 font-bold">
        {text.toUpperCase()}
      </span>
      <div className="border-t flex-1 border-gray-400" />
    </div>
  );
}

export default Separator;
