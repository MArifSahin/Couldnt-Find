import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/all';
import { useAuthentication } from '@internship/shared/hooks';
import { logoutAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Popup, PopupButton, Search } from '../../molecules';
import { getAccessToken, getRefreshToken } from '@internship/shared/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFilm, faHome } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../atoms/Button';

export const Navigation = () => {
  const { isAuthenticated } = useAuthentication();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };
  const tokens = {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken()
  };

  const handleShow = () => {
    dispatch(logoutAsync.request(tokens));
    setShow(false);
    history.push('/');
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark  navbar-dark">
      <div className="container">
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-brand nav-link">
              <NavLink exact to="/" className="nav-link"
                       onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />Home
              </NavLink>
            </li>
            <li className="navbar-brand nav-link">
              <NavLink
                to="/book"
                className="nav-link"
                onClick={() => {
                  dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                  dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                }}
              >
                <FontAwesomeIcon icon={faBook} style={{ marginRight: '10px' }} />Book
              </NavLink>
            </li>
            <li className="navbar-brand nav-link">
              <NavLink
                to="/movie"
                className="nav-link"
                onClick={() => {
                  dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                  dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                }}
              >
                <FontAwesomeIcon icon={faFilm} style={{ marginRight: '10px' }} />Movie
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <NavDropdown className="nav-link" title={<FaUserAlt />} id="basic-nav-dropdown">
                  <NavLink
                    className="dropdown-item"
                    to="/profile"
                    type="button"
                    onClick={() => {
                      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                    }}
                  >
                    Profile
                  </NavLink>
                  <NavDropdown.Item type="button" to={location.pathname} onClick={handleOpen}>
                    Logout
                  </NavDropdown.Item>
                  <Popup show={show} onHide={handleClose}>
                    Sistemden Çıkıyorsunuz Emin misiniz?
                    <PopupButton variant="secondary" onClick={handleClose}>
                      HAYIR
                    </PopupButton>
                    <PopupButton type="submit" variant="primary" onClick={handleShow}>
                      EVET
                    </PopupButton>
                  </Popup>
                </NavDropdown>
                <li className="navbar-brand nav-link">
                  <NavLink to="/becomeAnEditor">
                    <Button variant="outline-primary">Do you want to become an editor?</Button>
                  </NavLink>
                </li>

              </>
            ) : (
              <NavDropdown className="nav-link" title="Account" id="basic-nav-dropdown">
                <NavLink
                  className="mr-auto dropdown-item"
                  to="/register"
                  onClick={() => {
                    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                  }}
                >
                  Sign Up
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  to="/login"
                  onClick={() => {
                    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                  }}
                >
                  Sign In
                </NavLink>
              </NavDropdown>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
