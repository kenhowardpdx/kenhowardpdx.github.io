import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';

const KenHoward = (): JSX.Element => (
  <StaticQuery
    query={graphql`
      query {
        kenHoward: file(relativePath: { eq: "kenhoward.jpg" }) {
          childImageSharp {
            fixed(width: 125, height: 125) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data) => <Img fixed={data.kenHoward.childImageSharp.fixed} />}
  />
);

const IndexPage = (): JSX.Element => (
  <Layout>
    <SEO
      title="About Ken Howard"
      keywords={[`ken howard`, `javascript`, `enginnering`]}
    />
    <h1>Ken Howard</h1>
    <p>Stuff goes here</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <KenHoward />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default IndexPage;
