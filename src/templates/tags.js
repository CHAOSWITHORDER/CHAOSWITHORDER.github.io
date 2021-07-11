import React from 'react'
import { Link, graphql } from 'gatsby'

import MarkerHeader from "../components/MarkerHeader"
import ArticleLink from "../components/ArticleLink"
import Layout from '../components/layout'
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title || `Title`
    const posts = data.allMarkdownRemark.nodes
    const { totalPage, currentPage, tag } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={siteTitle} />
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.fields.slug} itemProp="url">
                  <MarkerHeader itemProp="headline">
                    <ArticleLink>{title}</ArticleLink>
                  </MarkerHeader>
                </Link>
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
                <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </article>
            )
          })}
        </ol>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <div>
            {currentPage - 1 > 0 && (
              <Link
                to={`tag/${tag}/` + (currentPage - 1 === 1 ? '' : currentPage - 1)}
                rel="prev"
              >
                « 上一页
              </Link>
            )}
          </div>
          <div>
            {currentPage + 1 <= totalPage && (
              <Link to={`tag/${tag}/` + (currentPage + 1)} rel="next">
                下一页 »
              </Link>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($tag: String!,$skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`
