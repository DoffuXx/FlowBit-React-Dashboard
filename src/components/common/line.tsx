interface LineProps {
  variant: "default" | "trimmed";
}
const Line: React.FC<LineProps> = ({ variant }) => {
  if (variant === "default")
    return <hr className="my-8 h-px border-0 bg-gray-200 " />;
  if (variant === "trimmed")
    return (
      <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100  md:my-10" />
    );
};

export default Line;
