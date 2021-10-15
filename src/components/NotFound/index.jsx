import React from 'react';
import PropTypes from 'prop-types';

function NotFound(props) {
  return (
    <div className="not-found">
      <h1 className="not-found__first-four">4</h1>
      <div className="not-found__cog-wheel">
        <div className="not-found__cog1">
          <div className="not-found__top" />
          <div className="not-found__down" />
          <div className="not-found__left-top" />
          <div className="not-found__left-down" />
          <div className="not-found__right-top" />
          <div className="not-found__right-down" />
          <div className="not-found__left" />
          <div className="not-found__right" />
        </div>
        <div className="not-found__cog2">
          <div className="not-found__top not-found__top--green" />
          <div className="not-found__down not-found__down--green" />
          <div className="not-found__left-top not-found__left-top--green" />
          <div className="not-found__left-down not-found__left-down--green" />
          <div className="not-found__right-top not-found__right-top--green" />
          <div className="not-found__right-down not-found__right-down--green" />
          <div className="not-found__left not-found__left--green" />
          <div className="not-found__right not-found__right--green" />
        </div>
      </div>
      <h1 className="not-found__second-four">4</h1>
      <p className="not-found__wrong">Uh Oh! Page not found!</p>
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;
