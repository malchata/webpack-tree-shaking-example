import regeneratorRuntime from "regenerator-runtime";
import { h, render, Component } from "preact";
import { SearchLabel, SearchInputContainer, SearchInput, SearchSubmit, SortContainer, Sort, SortLabel, SortSelectContainer, SortSelect, Separator, PedalList, Pedal, PedalImage, PedalName, PedalType } from "./FilterablePedalList.css";
import { simpleSort } from "../../utils/utils";

export default class FilterablePedalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      sortBy: "manufacturer",
      pedals: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSortOrder = this.handleSortOrder.bind(this);
  }

  async getPedalData() {
    let response = await fetch(`/api/search/${encodeURIComponent(this.state.searchQuery)}`);

    if (response.status === 200) {
      let pedals = [];
      let json = await response.json();

      if (this.state.sortBy === "model") {
        json = simpleSort(json, "model", this.state.sortOrder);
      } else if (this.state.sortBy === "type") {
        json = simpleSort(json, "type", this.state.sortOrder);
      } else {
        json = simpleSort(json, "manufacturer", this.state.sortOrder);
      }

      for (let entry in json) {
        let pedal = json[entry];

        pedals.push(<Pedal>
          <picture>
            <source srcset={`/images/${pedal.id}-2x.webp 2x, /images/${pedal.id}-1x.webp 1x`} type="image/webp"/>
            <source srcset={`/images/${pedal.id}-2x.jpg 2x, /images/${pedal.id}-1x.jpg 1x`} type="image/jpeg"/>
            <PedalImage src={`/images/${pedal.id}-1x.jpg`} alt={`${pedal.manufacturer} ${pedal.model}`} />
          </picture>
          <PedalName>{pedal.manufacturer} {pedal.model}</PedalName>
          <PedalType><strong>TYPE:</strong> {pedal.type}</PedalType>
        </Pedal>);
      }

      this.setState({
        pedals: pedals
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getPedalData();
  }

  handleSort(event) {
    this.setState({
      sortBy: event.target.value
    });

    this.getPedalData();
  }

  handleSortOrder(event) {
    this.setState({
      sortOrder: event.target.value
    });

    this.getPedalData();
  }

  handleChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  render() {
    let pedals = this.state.pedals;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <SearchLabel for="query"><strong>STOMP</strong>LIST</SearchLabel>
          <SearchInputContainer>
            <SearchInput type="text" placeholder="Search effect pedals" onChange={this.handleChange} id="query"/>
            <SearchSubmit type="submit" value="Go"/>
            <Sort>
              <SortContainer>
                <SortLabel for="sortBy">Sort by:</SortLabel>
                <SortSelectContainer>
                  <SortSelect id="sortBy" onChange={this.handleSort}>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="model">Model</option>
                    <option value="type">Type</option>
                  </SortSelect>
                </SortSelectContainer>
              </SortContainer>
              <SortContainer>
                <SortLabel for="sortOrder">in order:</SortLabel>
                <SortSelectContainer>
                  <SortSelect id="sortOrder" onChange={this.handleSortOrder}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </SortSelect>
                </SortSelectContainer>
              </SortContainer>
            </Sort>
          </SearchInputContainer>
        </form>
        <Separator/>
        <PedalList>
          {pedals.length > 0 ? pedals : "No pedals found!"}
        </PedalList>
      </div>
    );
  }
}
