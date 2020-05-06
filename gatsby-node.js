/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */


// Markdown compiler (From Markdown to static HTML)
const path = require(`path`)

exports.createPages = async ({actions, graphql, reporter}) => {
  const {createPage} = actions
  const docTemplate = path.resolve(`src/templates/docTemplate.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({node}) => {
    createPage({
      path: node.frontmatter.path,
      component: docTemplate,
      context: {} // additional data can be passed via context
    })
  })
}
