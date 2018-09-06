import React from 'react';

const Footer = () => (
    <div className="footer">
        <div className="footer_top">
            <div className="footer_topLeft">
                <img className="githubIcon" src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png" />
            </div>
            <div className="footer_topRight">
                <a target="_blank" className="footerGithubLink" href="https://github.com/the3ddy/Redux-Syntax-Helper"><h4 className="followMe">Check this Project out on GitHub</h4></a>
                <p className="love">Leave some Github Star love</p>
            </div>
        </div>
        <div className="footer_bot">
            Copyright &copy; 2018 Edward Roh. All Rights Reserved.
        </div>

    </div>
);

export default Footer;