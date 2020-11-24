import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from '../../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_KEY } from '@internship/shared/types';

type SearchProps = {
  whichPage;
  setSearchResults;
  setSearchedItem
};

export const Search : React.FC<SearchProps> = ({ whichPage, setSearchResults, setSearchedItem }) => {
  const [book, setBook]= useState("");
  const [apiKey, setApiKey] = useState(API_KEY);
  const placeholder='Search ' + whichPage.toString();
  const { handleSubmit, register } = useForm();
  const onSubmit = () => {
    event.preventDefault();
    if(whichPage === 'book'){
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}
      &key=${apiKey}&maxResults=1&orderBy=relevance&printType=books&projection=lite`)
        .then(data => {
          setSearchResults(data.data.items);
        })
    }
  };

  const handleChange = (event) => {
    const book = event.target.value;
    setBook(book);
    setSearchedItem(book);
  };
  return (
    <Form inline className="mr-sm-4" onSubmit={handleSubmit(onSubmit)}>
      <FormControl name="item" type="text" placeholder={placeholder} className="mr-sm-2" onChange={handleChange} ref={register({ required: true })}/>
      <Button variant="light" type="submit">
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />
      </Button>
    </Form>
  );
};
