import React, { Component } from "react";
import searchIcon from "./images/search-icon.svg";
import "./searchTool.css";
import debounce from "lodash/debounce";

export default class SearchTool extends Component {
    state = {
        inputValue: "",
        suggestions: []
    };

    handleInputChange = e => {
        this.setState({
            inputValue: e.target.value
        });
        this.handleSuggestion();
    };

    selectSuggestion = suggestion => {
        const { selectSuggestion } = this.props;
        selectSuggestion(suggestion);
        this.setState({
            inputValue: "",
            suggestions: []
        });
    };

    // titleCase input request because thats what api expects  

    titleCase = str => {
      return str.replace(/\w\S*/g, txt => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  };

    // handle search from input on enter
   

    onEnter = e => {
        if (e.key === "Enter") {
            this.props.selectSuggestion(this.titleCase(this.state.inputValue));
        }
    };

    // debounced half a secound so only updates when stopping typing

    handleSuggestion = debounce(() => {
        const regex = new RegExp(`^${this.state.inputValue}`, "i");
        this.state.inputValue.length === 0
            ? this.setState({ suggestions: [] })
            : this.setState({
                  suggestions: this.props.options.sort().filter(option => {
                      return regex.test(option);
                  })
              });
    }, 500);
    render() {
        const { inputValue, suggestions } = this.state;
        return (
            <div className="searchTool__container">
                <div className="searchTool__inputContainer">
                    <div className="SearchTool__icon">
                        <img src={searchIcon} alt="search icon" />
                    </div>

                    <input
                        className="searchTool__input"
                        placeholder="Enter city name"
                        onChange={this.handleInputChange}
                        value={inputValue}
                        onKeyPress={this.onEnter}
                    />
                </div>
                {suggestions.length > 0 && (
                    <div className="searchTool__suggestionsContainer">
                        {suggestions.map((option, i) => {
                            return (
                                <div
                                    className="searchTool__suggestionsItem"
                                    onClick={() =>
                                        this.selectSuggestion(option)
                                    }
                                    key={i}
                                >
                                    {option}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}
