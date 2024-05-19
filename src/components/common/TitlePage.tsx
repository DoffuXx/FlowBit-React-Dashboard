interface titleProps {
  title: string;
}
const TitlePage = ({ title }: titleProps) => {
  return <div className="mb-6 text-xl text-gray-600">{title}</div>;
};

export default TitlePage;
