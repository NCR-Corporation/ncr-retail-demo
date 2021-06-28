import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const handleParam = (setValue) => (e) => setValue(e.target.value);
  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };
  const handleSubmit = preventDefault(() => {
    router.push({
      pathname: '/catalog',
      query: { query }
    });
  });

  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="input-group w-100">
        <input type="text" className="form-control" placeholder="Search" name="query" value={query} onChange={handleParam(setQuery)} aria-label="Search" />
        <div className="input-group-append">
          <Button className="brand-dark-primary border-0" type="submit" aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
