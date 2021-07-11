import * as React from "react"
import { Link, graphql } from "gatsby"

import MarkerHeader from "../components/MarkerHeader"
import ArticleLink from "../components/ArticleLink"
import Layout from "../components/layout"
import SEO from "../components/seo"


class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const posts = data.allMarkdownRemark.nodes
    const location = this.props
    const AuthorName = data.site.siteMetadata.author.name
    const siteUrl = data.site.siteMetadata.siteUrl
    const { totalPage, currentPage } = this.props.pageContext

    if (posts.length === 0) {
      return (
        <Layout location={location} title={siteTitle} author={AuthorName} siteUrl={siteUrl}>
          <SEO title={siteTitle} />
          <p>
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
        </p>
        </Layout>
      )
    }

    return (
      <Layout location={location} title={siteTitle} author={AuthorName} siteUrl={siteUrl}>
        <SEO title={siteTitle} />
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
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
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
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
                to={'/' + (currentPage - 1 === 1 ? '' : 'page/' + currentPage - 1)}
                rel="prev"
              >
                « Prev Page
              </Link>
            )}
          </div>
          <div>
            {currentPage + 1 <= totalPage && (
              <Link to={'/page/' + (currentPage + 1)} rel="next">
                Next Page »
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
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        author {
          name
        }
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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
          description
          tags
        }
      }
    }
  }
`
