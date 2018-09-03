import React from 'react';

const Footer = () => (
    <div className="footer">
        <div className="footer_top">
            <div className="footer_topLeft">
                <img className="githubIcon" src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png" />
            </div>
            <div className="footer_topRight">
                <h4 className="followMe">Follow me on GitHub</h4>
                <p className="love">Leave some Github Star Love</p>
            </div>
        </div>
        <div className="footer_bot">
            Copyright &copy; 2018 Edward Roh. All Rights Reserved.
        </div>

    </div>
);

export default Footer;