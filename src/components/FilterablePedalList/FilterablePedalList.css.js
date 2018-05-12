import styled from "styled-components";

export const SearchLabel = styled.label`
  display: block;
  text-align: center;
  text-transform: uppercase;
  margin: 0 0 1rem;
  color: #050505;
  font-size: 1.5rem;
`;

export const SearchInputContainer = styled.fieldset`
  position: relative;
`;

export const SearchInput = styled.input`
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

export const SearchSubmit = styled.input`
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

export const SortContainer = styled.div`
  text-align: right;
`;

export const SortLabel = styled.label`
  font-weight: 700;
  font-size: .75rem;
  text-transform: uppercase;
`;

export const SortSelect = styled.select`
  font-size: .75rem;
`;

export const Separator = styled.hr`
  margin: 1rem 0;
  background: #016fb9;
  height: .125rem;
  border: 0;
`;

export const PedalList = styled.ul`
  width: 100%;
  max-width: 64rem;

  @media (min-width: 22rem) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: .5rem;
  }

  @media (min-width: 32rem) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 48rem) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Pedal = styled.li`
  border: 1px solid #016fb9;
  text-align: center;
  padding: 0 0 .5rem;
  margin: 0 0 .5rem;

  @media (min-width: 22rem) {
    margin: 0;
  }
`;

export const PedalImage = styled.img`
  width: 100%;
  display: block;
  margin: 0 0 1rem;
`;

export const PedalName = styled.h3`
  font-weight: 700;
  font-size: 1.319rem;
  line-height: 1.319;
  padding: 0 .5rem;
  margin: 0 0 .5rem;
`;

export const PedalType = styled.h4`
  font-size: 1rem;
  line-height: 1.319;
  padding: 0 .5rem;
`;
