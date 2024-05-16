interface titleProps {
  title: string;
}
const TitlePage = ({ title }: titleProps) => {
  return <div className="text-xl text-gray-600 mb-6">{title}</div>;
};

export default TitlePage;
