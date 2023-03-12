import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';

import Card from '../../shared/components/card/Card';
import Button from '../../shared/components/button/Button';
import Modal from '../../shared/components/modal/Modal';

import { AuthContext } from '../../shared/context/auth-context';
import { deleteCity } from '../api/cities';

import './CityItem.css';

const CityItem = (props) => {
  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] =
    useState(false);
  const showConfirmationHandler = () =>
    setShowConfirmationModal(true);
  const cancelConfirmationHandler = () =>
    setShowConfirmationModal(false);

  const deleteCityMutation = useMutation({
    mutationFn: deleteCity,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    console.log('Do we get here?');
    deleteCityMutation.mutate({
      id: props.id,
      token: auth.token,
    });
  };

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelConfirmationHandler}>
              Cancel
            </Button>
            <Button delete onClick={deleteConfirmedHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      ></Modal>
      <li className="city-item">
        <Card className="city-item__content">
          <div className="city-item__image">
            <img src={props.image} alt={props.capital} />
          </div>
          <div className="city-item__info">
            <h3>
              {props.capital} - {props.country}
            </h3>
          </div>
          <div className="city-item_actions">
            {auth.isLoggedIn && (
              <Button danger onClick={showConfirmationHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default CityItem;
