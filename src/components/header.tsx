import { Link, graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Img from 'gatsby-image';

const Logo = (): JSX.Element => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid(maxWidth: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={(data) => <Img fluid={data.logo.childImageSharp.fluid} />}
  />
);

const Header = ({ siteTitle }): JSX.Element => (
  <header
    style={{
      background: `#5d205d`,
      marginBottom: `1.45rem`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0rem 1.0875rem 0.3rem`
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            fontSize: `1.5rem`,
            color: `#9bc618`,
            textDecoration: `none`
          }}
        >
          <div
            style={{
              width: `40px`,
              display: `inline-block`,
              margin: `0 10px 0 0`
            }}
          >
            <Logo />
          </div>
          <span style={{ display: `inline-block` }}>{siteTitle}</span>
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
