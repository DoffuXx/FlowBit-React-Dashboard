interface SuccessProps {
  success: string;
}

const Success = ({ success }: SuccessProps) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50  dark:text-green-400"
      role="alert"
    >
      <span className="font-medium">{success}</span>
    </div>
  );
};

export default Success;
