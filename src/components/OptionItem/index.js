import "./index.css";

const OptionItem = (props) => {
  const { optionDetails, updateActiveOption, activeOption } = props;
  const { id, display_text } = optionDetails;

  const updateOption = () => {
    updateActiveOption(id);
  };

  const activeOptionCls = activeOption === id ? "active-option" : "";

  return (
    <li className={`option-heading ${activeOptionCls}`} onClick={updateOption}>
      {display_text}
    </li>
  );
};

export default OptionItem;
