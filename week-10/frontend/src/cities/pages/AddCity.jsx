import { useContext, useRef } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import './AddCity.css';

import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/button/Button';

import { createCity } from '../api/cities';

import { AuthContext } from '../../shared/context/auth-context';

const AddCity = () => {
  const capitalRef = useRef();
  const countryRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();

  const createCityMutation = useMutation({
    mutationFn: createCity,
  });

  const citySubmitHandler = (event) => {
    event.preventDefault();
    createCityMutation.mutate({
      capital: capitalRef.current.value,
      country: countryRef.current.value,
      image: imageRef.current.value,
      token: auth.token,
    });
    history.push('/');
  };

  return (
    <form className="city-form" onSubmit={citySubmitHandler}>
      <Input ref={capitalRef} type="text" label="Capital" />
      <Input ref={countryRef} type="text" label="Country" />
      <Input ref={imageRef} type="text" label="Image Link" />
      <Button>Add City</Button>
    </form>
  );
};

export default AddCity;
