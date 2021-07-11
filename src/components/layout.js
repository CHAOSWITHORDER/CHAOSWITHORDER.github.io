import * as React from "react"
import { Link } from "gatsby"
import Bio from "./bio"

const Layout = ({ location, title, children, author, siteUrl }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.path === rootPath
  let header
  // alert("rootPath:"+rootPath+"| currentPath:"+ location.pathname + "|")
  // alert(Object.keys(location))
  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        {title}
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {header}
        {/* github-link dark-mode */}
      </header>
      <Bio />
      <hr />
      <main>{children}</main>
      <footer>
        <p>© {new Date().getFullYear()} <a href={siteUrl}>{author}</a>, Build with
        {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </p>
      </footer>
    </div>
  )
}

export default Layout
