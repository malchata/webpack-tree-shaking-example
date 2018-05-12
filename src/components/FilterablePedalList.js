import regeneratorRuntime from "regenerator-runtime";
import {h, render, Component} from "preact";
import styled from "styled-components";
import _ from "lodash";

const SearchLabel = styled.label`
  display: block;
  text-align: center;
  text-transform: uppercase;
  margin: 0 0 1rem;
  color: #050505;
  font-size: 1.5rem;
`;

const SearchInputContainer = styled.fieldset`
  position: relative;
`;

const SearchInput = styled.input`
  display: block;
  width: 100%;
  border: 2px solid #016fb9;
  color: #016fb9;
  font-size: 1.5rem;
  text-align: left;
  padding: 1rem 5rem 1rem 1rem;
  transition: 333ms opacity ease-out;
  outline-color: #016fb9;
`;

const SearchSubmit = styled.input`
  display: block;
  position: absolute;
  width: 4rem;
  height: 4rem;
  right: 0;
  top: 0;
  cursor: pointer;
  background: #ff9505;
  color: #fffbfe;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.25rem;
  outline-color: #ff9505;
`;

const SortContainer = styled.div`
  text-align: right;
`;

const SortLabel = styled.label`
  font-weight: 700;
  font-size: .75rem;
  text-transform: uppercase;
`;

const SortSelect = styled.select`
  font-size: .75rem;
`;

const Separator = styled.hr`
  margin: 1rem 0;
  background: #016fb9;
  height: .125rem;
  border: 0;
`;

const PedalList = styled.ul`
  width: 100%;
  max-width: 64rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;

  @media (min-width: 32rem) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 48rem) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Pedal = styled.li`
  border: 1px solid #016fb9;
  text-align: center;
  padding: 0 0 .5rem;
`;

const PedalImage = styled.img`
  width: 100%;
  display: block;
  margin: 0 0 1rem;
`;

const PedalName = styled.h3`
  font-weight: 700;
  font-size: 1.319rem;
  line-height: 1.319;
  padding: 0 .5rem;
  margin: 0 0 .5rem;
`;

const PedalType = styled.h4`
  font-size: 1rem;
  line-height: 1.319;
  padding: 0 .5rem;
`;

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
  }

  async getPedalData() {
    let response = await fetch(`/api/search/${encodeURIComponent(this.state.searchQuery)}`);

    if (response.status === 200) {
      let pedals = [];
      let json = await response.json();

      if (this.state.sortBy === "model") {
        json = _.sortBy(json, [(o) => {return o.model;}]);
      } else if (this.state.sortBy === "type") {
        json = _.sortBy(json, [(o) => {return o.type;}]);
      } else {
        json = _.sortBy(json, [(o) => {return o.manufacturer;}]);
      }

      for (let entry in json) {
        let pedal = json[entry];
        let pedalId = pedal.id;

        pedals.push(<Pedal>
          <picture>
            <source srcset={`/images/${pedalId}-2x.webp 2x, /images/pedals/${pedalId}-1x.webp 1x`} type="image/webp"/>
            <source srcset={`/images/${pedalId}-2x.jpg 2x, /images/pedals/${pedalId}-1x.jpg 1x`} type="image/jpeg"/>
            <PedalImage src={`/images/${pedalId}-1x.jpg`} alt={`${pedal.manufacturer} ${pedal.model}`} />
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

    console.log(this.state.sortBy);

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
          <SearchLabel for="query">Search effect pedals:</SearchLabel>
          <SearchInputContainer>
            <SearchInput type="text" placeholder="e.g., BOSS CE-2" onChange={this.handleChange} id="query"/>
            <SearchSubmit type="submit" value="Go"/>
            <SortContainer>
              <SortLabel for="sortBy">Sort by: </SortLabel>
              <SortSelect id="sortBy" onChange={this.handleSort}>
                <option value="manufacturer">Manufacturer</option>
                <option value="model">Model</option>
                <option value="type">Type</option>
              </SortSelect>
            </SortContainer>
          </SearchInputContainer>
        </form>
        <Separator/>
        <PedalList>
          {pedals}
        </PedalList>
      </div>
    );
  }
}
