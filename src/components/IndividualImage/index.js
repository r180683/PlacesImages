import "./index.css";

const IndividualImage = (props) => {
  const { imageDetails } = props;
  return (
    <li className="image-item-container">
      <img
        className="image-itemm"
        src={imageDetails.urls.small}
        alt="unsplash"
      />
    </li>
  );
};

export default IndividualImage;
