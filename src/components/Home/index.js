import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "react-loader-spinner";
import axios from "axios";
import { GiIndianPalace } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import OptionItem from "../OptionItem";
import IndividualImage from "../IndividualImage";
import "./index.css";

const optionsList = [
  { id: uuidv4(), name: "mountain", display_text: "Mountain" },
  { id: uuidv4(), name: "flowers", display_text: "Flowers" },
  { id: uuidv4(), name: "beaches", display_text: "Beaches" },
  { id: uuidv4(), name: "cities", display_text: "Cities" },
];

const apiStatusList = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Home extends Component {
  state = {
    searchInput: "",
    activeOption: optionsList[0].id,
    imagesData: [],
    apiStatus: apiStatusList.initial,
  };

  updateSearchValue = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  updateActiveOption = (id) => {
    this.setState({ activeOption: id });
  };

  getPlacesData = async () => {
    this.setState({ apiStatus: apiStatusList.loading });
    const { searchInput } = this.state;
    console.log(searchInput);
    const url = `https://api.unsplash.com/photos?search=${searchInput}`;
    const token = "MqPEMqTIn4V0MeZiph6ZqHZufKIQOQurGXA-DUpwr-4";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${token}`, // Client-ID prefix for Unsplash API
      },
      params: {
        query: "your search query",
        per_page: 10,
      },
    };
    console.log("hi");
    const response = await axios.get(url, options);
    console.log(response);
    if (response.status === 200) {
      const fetchedData = await response.data;
      this.setState({
        imagesData: fetchedData,
        apiStatus: apiStatusList.success,
      });
      console.log(fetchedData);
    } else {
      this.setState({ apiStatus: apiStatusList.failure });
    }
  };

  onClickSearchIcon = () => {
    this.setState({ apiStatus: apiStatusList.loading }, this.getPlacesData);
  };

  componentDidMount() {
    this.getPlacesData();
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div className="no-search-results-container">
      <img
        alt="Failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble to complete your request.
      </p>
    </div>
  );

  renderNoSearchResultsView = () => (
    <div className="no-search-results-container">
      <img
        alt="no videos"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      />
      <h1 className="failure-head">No Search results found</h1>
      <p className="failure-description">
        Try different key words or remove search filter
      </p>
    </div>
  );

  renderSuccessView = () => {
    const { imagesData } = this.state;
    return (
      <ul className="images-list-container">
        {imagesData.map((each) => (
          <IndividualImage key={each.id} imageDetails={each} />
        ))}
      </ul>
    );
  };

  renderApiStatus = () => {
    const { imagesData, apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusList.loading:
        return this.renderLoadingView();
      case apiStatusList.success:
        if (imagesData.length === 0) {
          return this.renderNoSearchResultsView();
        }
        return this.renderSuccessView();
      case apiStatusList.failure:
        return this.renderFailureView();
      default:
        return "";
    }
  };

  render() {
    const { searchInput, activeOption } = this.state;
    return (
      <div className="home-container">
        <div className="website-logo-container">
          <h1 className="website-heading">GO Trip</h1>
          <GiIndianPalace className="website-logo" />
        </div>
        <div className="search-input-container">
          <input
            placeholder="Enter Your Search"
            className="search-input"
            type="search"
            value={searchInput}
            onChange={this.updateSearchValue}
          />
          <IoSearch onClick={this.onClickSearchIcon} className="close-icon" />
        </div>
        <ul className="options-list-container">
          {optionsList.map((each) => (
            <OptionItem
              key={each.id}
              optionDetails={each}
              updateActiveOption={this.updateActiveOption}
              activeOption={activeOption}
            />
          ))}
        </ul>
        {this.renderApiStatus()}
      </div>
    );
  }
}

export default Home;
