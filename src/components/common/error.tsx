interface ErrorProps {
  error: {
    error: string;
  };
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div
      className="p-4 mb-4 text-sm  rounded-lg bg-red-50  text-red-400"
      role="alert"
    >
      <span className="font-medium">{error.error}</span>
    </div>
  );
};

export default Error;
