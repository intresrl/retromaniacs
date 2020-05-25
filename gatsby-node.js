const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const topics = await graphql(` {
    allCardsYaml {
        nodes {
          id
      }
    }
  }`);
    const template = path.resolve(`src/components/cardTemplate.js`)

    topics.data.allCardsYaml.nodes.forEach(card => {

        actions.createPage({
                path: `cards/${card.id}`,
                component: template,
                context: { id: card.id }
            }
        )
    })
}

