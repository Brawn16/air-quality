import React, { Component } from "react";
import { requestLocationData, getAllLocations } from "./api/api";
import SearchTool from "./SearchTool";
import Error from "./Error";
import DisplayContainer from "./DisplayContainer";
import "./App.css";

class App extends Component {
    state = {
        locations: [],
        selectedLocations: [],
        selectedSuggestion: "",
        hasError: false
    };

    selectSuggestion = selectedSuggestion => {
        requestLocationData(selectedSuggestion)
            .then(response => {
                response.data.results.length &&
                    this.setState({
                        selectedLocations: [
                            ...this.state.selectedLocations,
                            response.data.results[0]
                        ]
                    });
            })
            .catch(error => {
                // handle error
                this.setState({
                    hasError: true
                });
                console.error(error);
            });
    };

    removeDisplayCard = location => {
        this.setState({
            selectedLocations: this.state.selectedLocations.filter(res => {
                return res.location !== location;
            })
        });
    };

    componentDidMount() {
        getAllLocations()
            .then(response => {
                // handle success
                this.setState({
                    locations: response.data.results.map(item => item.location)
                });
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }
    render() {
        const { locations, selectedLocations } = this.state;

        return (
            <div className="App-container">
                <h1>Compare your Air</h1>
                <p>compare the air quality between cities in the UK.</p>
                <p>Select cities to compare using the search tool below. </p>
                <SearchTool
                    options={locations}
                    selectSuggestion={this.selectSuggestion}
                />
                {this.state.hasError && <Error />}
                <DisplayContainer
                    results={selectedLocations}
                    removeDisplayCard={this.removeDisplayCard}
                />
            </div>
        );
    }
}

export default App;
