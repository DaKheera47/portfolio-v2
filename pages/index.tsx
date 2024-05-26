import type {
    GetStaticProps,
    InferGetServerSidePropsType,
    InferGetStaticPropsType,
    NextPage,
} from "next";
import Head from "next/head";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

const transformResponse = (response: HashnodeResponse) => {
    // return response
    return {
        posts: response.publication.posts.edges.map((edge) => {
            return {
                brief: edge.node.subtitle ?? edge.node.brief,
                coverImage: {
                    url: edge.node.coverImage.url,
                },
                slug: edge.node.slug,
                title: edge.node.title,
                readTime: edge.node.readTimeInMinutes,
                updatedAt: edge.node.updatedAt,
                url: edge.node.url,
                views: edge.node.views,
            };
        }),
    };
};

// get static props
export const getStaticProps: GetStaticProps = async () => {
    // execute gql query
    const QUERY = `query {
        publication(host: "dakheera47.hashnode.dev") {
          posts(first: 5) {
            edges {
              node {
                title
                brief
                subtitle
                url
                updatedAt
                views
                readTimeInMinutes
                coverImage {
                  url
                }
                slug
              }
            }
          }
        }
      }`;

    const res = await fetch("https://gql.hashnode.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: QUERY,
        }),
    });

    const json = await res.json();

    return {
        props: {
            data: transformResponse(json.data),
        },
        revalidate: 120, // In seconds
    };
};

function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className="container mx-auto">
            <Head>
                <title>Shaheer Sarfaraz</title>
                <meta
                    name="description"
                    content="Portfolio of Shaheer Sarfaraz, a self-taught developer from Pakistan."
                />
                <link
                    rel="icon"
                    href="/me.png"
                />
            </Head>

            <main className="text-gray-100">
                <Sidebar />
                <MainContent hashnodeData={data.posts} />
            </main>
        </div>
    );
}

export default Home;
