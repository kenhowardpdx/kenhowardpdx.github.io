import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import AnalyticsLink from '../components/analytics-link';

interface IndexPageProps {
  data: any; // eslint-disable-line
}

const IndexPage = ({ data }: IndexPageProps): JSX.Element => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {data.allMarkdownRemark.edges.map(({ node: post }, i: number) => {
      const {
        fields: { slug },
        frontmatter: { title }
      } = post;
      return (
        <h1 key={i}>
          <AnalyticsLink url={slug} label={title} />
        </h1>
      );
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
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
