import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

interface BlogPostFrontmatter {
  date: string;
  slug: string;
  title: string;
}

interface BlogPostData {
  frontmatter: BlogPostFrontmatter;
  html: string;
}

interface MarkdownRemark {
  markdownRemark: BlogPostData;
}

interface BlogPostTemplateProps {
  data: MarkdownRemark;
}

const BlogPostTemplate = ({
  data: {
    markdownRemark: {
      frontmatter: { title },
      html
    }
  }
}: BlogPostTemplateProps): JSX.Element => (
  <Layout>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
);

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(
      fileAbsolutePath: { regex: "/posts/" }
      fields: { slug: { eq: $slug } }
    ) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
