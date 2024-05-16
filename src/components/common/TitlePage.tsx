import React from "react";

interface titleProps {
  title: string;
}
// eslint-disable-next-line react/prop-types
const TitlePage = ({ title }: titleProps) => {
  return <div className="text-xl text-gray-600 mb-6">{title}</div>;
};

export default TitlePage;
