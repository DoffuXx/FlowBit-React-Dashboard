interface cardBackgroundProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const CardBackground: React.FC<cardBackgroundProps> = ({
  children,
  width,
  height,
}) => {
  return (
    <div
      className="block size-full  rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 "
      style={{ width: width, height: height }}
    >
      {children}
    </div>
  );
};

export default CardBackground;
