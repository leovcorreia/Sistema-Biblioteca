import { useState } from 'react';
import './styles.css';
import filterImg from '../../assets/filter.svg';

type FilterOption = {
  value: string;
  label: string;
};

type Props = {
  onSearch: (text: string, filterType: string) => void;
  filterOptions: FilterOption[];
};

export default function SearchBar({ onSearch, filterOptions }: Props) {

  const [filterType, setFilterType] = useState(filterOptions[0]?.value || "");
  const [text, setText] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const currentPlaceholder =
    filterOptions.find(opt => opt.value === filterType)?.label || "Pesquisar";

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleResetClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setText("");
    onSearch("", filterOptions[0]?.value || "");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(text, filterType);
  }

  function toggleFilters() {
    setShowFilters(!showFilters);
  }

  return (
    <div className="smv-search-container">
      <form className="smv-search-bar smv-container" onSubmit={handleSubmit}>
        <button type="submit">🔎︎</button>
        <input 
          value={text}
          type="text" 
          placeholder={currentPlaceholder}
          onChange={handleChange} 
        />
        <button onClick={handleResetClick} type="reset">🗙</button>
      </form>

      <div className="smv-filter-img" onClick={toggleFilters}>
        <img src={filterImg} alt="Filtros" />
      </div>

      {showFilters && (
        <div className="smv-filter-menu">
          {filterOptions.map(option => (
            <button
              key={option.value}
              className={filterType === option.value ? "active" : ""}
              onClick={() => setFilterType(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
