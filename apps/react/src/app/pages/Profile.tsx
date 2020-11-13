import React, { useEffect, useState } from 'react';
import { EditProfile, ChangePassword, EditSession } from './profilePageComponents';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { api, UserDetailResponse } from '@internship/shared/api';
import { ProfileImage } from '@internship/ui';
import { useAuthentication } from '@internship/shared/hooks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export const Profile = () => {
  const [inEditMode, setInEditMode] = useState(false);
  const [inChangePassword, setInChangePassword] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState(false);
  const [sessionInfo, setSessionInfo] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [detail, setDetail] = useState<UserDetailResponse>();
  const { isAuthenticated } = useAuthentication();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    api.auth
      .userDetail()
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
    setEditUserInfo(false);
  }, [editUserInfo]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const changeValues = () => {
    setInEditMode(true);
    setInChangePassword(false);
    setSessionInfo(false);
    setShowUserInfo(false);
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };


  const editSessionInfo = () => {
    setSessionInfo(true);
    setInChangePassword(false);
    setInEditMode(false);
  };

  return (
    <Container>
      <h2>Profile Page</h2>
      <Row>
        <Col sm={6}>
          <div className="card-header">
            <h3>Welcome</h3>
            <ProfileImage width="200" height="200" alt={`${detail?.username} profile picture`}
                          image={detail?.image} />
          </div>
          <div className="card text-center">
            <Button
              className="btn  btn-success mt-2"
              disabled={showUserInfo}
              onClick={() => {
                dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                setShowUserInfo(true);
                setInEditMode(false);
                setSessionInfo(false);
                setInChangePassword(false);
              }}
            >
              My Information
            </Button>
            <Button className="btn  btn-success mt-2" disabled={inEditMode} onClick={changeValues}>
              Edit Profile
            </Button>
            <Button
              className="btn  btn-success mt-2"
              disabled={inChangePassword}
              onClick={() => {
                setInChangePassword(true);
                setInEditMode(false);
                setSessionInfo(false);
                setShowUserInfo(false);
                dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
              }}
            >
              Change Password
            </Button>
            <Button
              className="btn  btn-success mt-2"
              disabled={sessionInfo}
              onClick={() => {
                setSessionInfo(true);
                setInChangePassword(false);
                setInEditMode(false);
                setShowUserInfo(false);
                dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
              }}>
              Session Info
            </Button>
          </div>
        </Col>
        <Col sm={6}>
          {showUserInfo && (
            <h5>
              <div>
                <h4>
                  <b className="text-black-50">User Info</b>
                </h4>
                <Row>
                  <Col sm={2}><i className="text-black-50 ml-2"> Username:</i></Col>
                  <Col sm={3}><i className="text-black-50 ml-2"> {detail?.username} </i></Col>
                </Row>
                <Row>
                  <Col sm={2}><i className="text-black-50 ml-2"> Name:</i></Col>
                  <Col sm={3}><i className="text-black-50 ml-2"> {detail?.name} </i></Col>
                </Row>
                <Row>
                  <Col sm={2}><i className="text-black-50 ml-2"> Surname:</i></Col>
                  <Col sm={3}><i className="text-black-50 ml-2"> {detail?.lastName} </i></Col>
                </Row>
                <Row>
                  <Col sm={2}><i className="text-black-50 ml-2"> Age:</i></Col>
                  <Col sm={3}><i className="text-black-50 ml-2"> {detail?.age} </i></Col>
                </Row>
                <Row>
                  <Col sm={2}><i className="text-black-50 ml-2"> Phone:</i></Col>
                  <Col sm={3}><i className="text-black-50 ml-2"> {detail?.phoneNumber} </i></Col>
                </Row>
                <Row>
                  <Col sm={2}><i className="text-black-50 ml-2 "> Email:</i></Col>
                  <Col sm={3}><i className="text-black-50 ml-2"> {detail?.email} </i></Col>
                </Row>
              </div>
            </h5>
          )}
          {inEditMode && (
            <>
              <EditProfile setInEditMode={setInEditMode} setEditUserInfo={setEditUserInfo} userInfo={detail} />
            </>
          )}
          {inChangePassword && (
            <>
              <ChangePassword />
            </>
          )}
          {sessionInfo ? (
            <>
              <EditSession />
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};
