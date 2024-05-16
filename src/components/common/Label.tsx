type Props = {
  children: string;
  required?: true | false;
};

const Label = (props: Props) => {
  const isRequired = props.required !== undefined ? props.required : true;
  return (
    <label className="text-xl text-gray-600">
      {props.children}
      {isRequired ? <span className="text-red-500">*</span> : null}
    </label>
  );
};

export default Label;
