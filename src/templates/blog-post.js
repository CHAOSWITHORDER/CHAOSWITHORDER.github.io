import * as React from "react"
import { Link, graphql } from "gatsby"

import MarkerHeader from "../components/MarkerHeader"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const AuthorName = data.site.siteMetadata.author.name
  const siteUrl = data.site.siteMetadata.siteUrl
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle} author={AuthorName} siteUrl={siteUrl}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <MarkerHeader itemProp="headline">
            {post.frontmatter.title}
          </MarkerHeader>
          <div className="date-with-tag">
            <span style={{ paddingRight: "10px" }}>{post.frontmatter.date}</span>
            {post.frontmatter.tags ? (
              <React.Fragment>
                {post.frontmatter.tags.map((tag, index) => (
                  <Link
                    key={tag}
                    to={`/tag/${tag}`}
                    className="tag"
                  >
                    {`#`}{tag}
                    {index + 1 === post.frontmatter.tags.length ? null : ' '}
                  </Link>
                ))}
              </React.Fragment>
            ) : null}
          </div>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <br />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                « {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} »
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author {
          name
        }
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
