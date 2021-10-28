import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
import logoComer from "@iso/assets/images/comerLogo.png";
import logoComer2 from "@iso/assets/images/comerLogo2.png";

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
            <img style={{ width: 20, height: 35,marginTop:0 }} src={logoComer2}></img>
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
         <img style={{ width: 100, height: 35,marginTop:20 }} src={logoComer}></img>
        </h3>
      )}
    </div>
  );
};
