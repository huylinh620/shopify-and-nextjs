const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccesstoken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function shopifyData(query) {
  const URL = `https://${domain}/api/2023-07/graphql.json`

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccesstoken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }

  try {
    const data = await fetch(URL, options).then(response => {
      return response.json()
    })

    return data
  } catch(error) {
    throw Error('Products not fetched')
  }
}

export async function getProductsInCollection() {
  const query = `
    {
      collection(handle: "frontpage") {
        title
        products(first:25) {
          edges {
            node {
              id
              title
              handle
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await shopifyData(query)

  const allProducts = response.data.collection.products.edges || []

  return allProducts
}

export async function getAllProducts() {
  const query = `
    {
      products(first: 250) {
        edges {
          node {
            handle
            id
          }
        }
      }
    }
  `

  const response = await shopifyData(query)

  const slugs = response.data.products.edges || []
  return slugs
}

export async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
      id
      title
      handle
      description
      images(first:5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            id
            unitPrice {
              amount
            }
          }
        }
      }
    }
  }
  `

  const response = await shopifyData(query)

  const product = response.data.product || []
  return product
}