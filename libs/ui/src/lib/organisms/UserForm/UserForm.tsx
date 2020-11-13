import { Alert, Col, Form, Row } from 'react-bootstrap';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateAsync, updateLogout } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Button } from '../../atoms/Button';
import { useTemporary } from '@internship/shared/hooks';
import { Popup, PopupButton } from '../../molecules/Popup';
import { useHistory } from 'react-router-dom';
import { UserDetailResponse } from '@internship/shared/api';

type UserFormProps = {
  setEditUserInfo;
  setInEditMode;
  userInfo;
};

export const UserForm: React.FC<UserFormProps> = ({ setEditUserInfo, setInEditMode, userInfo }) => {
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(false);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isErrorRequired, isSuccessRequired } = useTemporary();

  const onSubmit = (values) => {
    if (values.email !== userInfo?.email) {
      setChangeEmail(true);
    } else {
      setChangeEmail(false);
    }
    dispatch(updateAsync.request(values));
  };

  if (isSuccessRequired !== null && !logoutPopup && !successPopup) {
    {
      changeEmail ? setLogoutPopup(true) : setSuccessPopup(true);
    }
  }

  if (isErrorRequired !== null) {
    setInEditMode(true);
  }

  const onChange = () => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    setOpen(true);
  };

  const forceLogout = () => {
    setLogoutPopup(false);
    dispatch(updateLogout());
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    history.push('/');
  };

  const successPopupFunction = () => {
    setSuccessPopup(false);
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    setInEditMode(false);
    setEditUserInfo(true);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} controlId="username">
        <Form.Label column sm={2}>
          Username
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="username" placeholder={userInfo?.username} readOnly />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="email">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="email" type="email" defaultValue={userInfo?.email} onChange={onChange}
                        ref={register({ required: true })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="name">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="name" defaultValue={userInfo?.name} onChange={onChange}
                        ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="lastname">
        <Form.Label column sm={2}>
          Last Name
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="lastname" defaultValue={userInfo?.lastName} onChange={onChange}
                        ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="age">
        <Form.Label column sm={2}>
          Age
        </Form.Label>
        <Col sm={4}>
          <Form.Control name="age" defaultValue={userInfo?.age} onChange={onChange}
                        ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="phoneNumber">
        <Form.Label column sm={2}>
          Phone Number
        </Form.Label>
        <Col sm={4}>
          <Form.Control name="phoneNumber" defaultValue={userInfo?.phoneNumber} onChange={onChange}
                        ref={register({ required: false })} />
        </Col>
      </Form.Group>
      {isErrorRequired ? (
        <>
          <Alert variant="danger">{isErrorRequired}</Alert>
        </>
      ) : null}
      <Row className="justify-content-end">
        <Button type="submit" disabled={!open}>
          Update
        </Button>
      </Row>
      {logoutPopup && (
        <>
          <Popup show={logoutPopup} onHide={forceLogout}>
            E-mail'inizi değiştirdiğiniz için çıkış yaptırılıyorsunuz.
            <br /> Lütfen yeni mailinize gelen aktivasyonu onaylayıp tekrardan giriş yapınız.
          </Popup>
          {setTimeout(forceLogout, 3000)}
        </>
      )}
      {successPopup &&  (
        <>
          <Popup show={successPopup} onHide={successPopupFunction}>
            {isSuccessRequired}
          </Popup>
          {setTimeout(successPopupFunction, 4000)}
        </>
      )}
    </Form>
  );
};
