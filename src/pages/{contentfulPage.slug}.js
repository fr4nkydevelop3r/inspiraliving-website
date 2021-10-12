import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import RichText from '../components/RichText'
import { graphql } from 'gatsby'

export default function ContentfulPage(props) {
    console.log(props.data.contentfulPage.pageContent.references)

    return (
        <Layout>
            <SEO
                title={props.data.contentfulPage.title}
                description={props.data.contentfulPage.description}
            />
            {!!props.data.contentfulPage.pageContent && (
                <RichText
                    references={
                        props.data.contentfulPage.pageContent.references
                    }
                    raw={props.data.contentfulPage.pageContent.raw}
                />
            )}
        </Layout>
    )
}

export const query = graphql`
    query PageQuery($id: String) {
        contentfulPage(id: { eq: $id }) {
            id
            title
            description
            pageContent {
                raw
                references {
                    ... on ContentfulHero {
                        __typename
                        contentful_id
                        heading
                        subHeading
                        backgroundImage {
                            gatsbyImageData(
                                layout: FULL_WIDTH
                                placeholder: BLURRED
                            )
                        }
                    }
                    ... on ContentfulAsset {
                        contentful_id
                        title
                        gatsbyImageData(
                            layout: FULL_WIDTH
                            placeholder: BLURRED
                        )
                    }
                    ... on ContentfulPriceGroup {
                        __typename
                        contentful_id
                        priceOptions {
                            id
                            title
                            amountPerMonth
                            mostPopular
                            description {
                                raw
                            }
                        }
                    }
                }
            }
        }
    }
`
