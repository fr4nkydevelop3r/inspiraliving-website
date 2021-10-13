import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import RichText from '../../components/RichText'
import SEO from '../../components/SEO'

const BlogPost = (props) => {
    console.log(props)
    return (
        <Layout>
            <SEO
                title={props.data.contentfulBlogPost.title}
                description={props.data.contentfulBlogPost.description}
            />
            <RichText
                raw={props.data.contentfulBlogPost.pageContent.raw}
                references={
                    props.data.contentfulBlogPost.pageContent.references
                }
            />
        </Layout>
    )
}

export const query = graphql`
    query BlogPostQuery($postId: String) {
        contentfulBlogPost(contentful_id: { eq: $postId }) {
            publishedDate(formatString: "DD MMM YYYY")
            pageContent {
                raw
                references {
                    ... on ContentfulAsset {
                        contentful_id
                        title
                        gatsbyImageData(
                            layout: FULL_WIDTH
                            placeholder: BLURRED
                        )
                    }
                }
            }
            description
            title
            contentful_id
            slug
        }
    }
`

export default BlogPost
