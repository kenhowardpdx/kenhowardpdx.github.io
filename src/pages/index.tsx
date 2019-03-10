import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {data.allMarkdownRemark.edges.map(({ node: post }, i) => {
      const { title } = post.frontmatter;
      return <h1 key={i}>{title}</h1>;
    })}
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 10
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
