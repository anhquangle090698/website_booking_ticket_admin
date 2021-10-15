import React from 'react';
import SignIn from 'features/Login/components/SignIn';

function Sign(props) {
  return (
    <div className="sign">
      <div className="sign__main">
        <h3 className="sign__title">G2 Cinema Admin</h3>
        <SignIn></SignIn>
      </div>
      <div className="sign__circle1"></div>
      <div className="sign__circle2"></div>
      <div className="sign__circle3"></div>
      <div className="sign__circle4"></div>
    </div>
  );
}

export default Sign;
