import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Script from "next/script";
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
    <div className="mx-auto max-w-screen-2xl">
      <Head>
        <title>Shaheer Sarfaraz</title>
        <meta
          name="description"
          content="Portfolio of Shaheer Sarfaraz, a self-taught developer from Pakistan."
        />
        <link rel="icon" href="/me.png" />

        {/* clarity analytics */}
        <Script
          strategy="afterInteractive"
          id="clarity"
          dangerouslySetInnerHTML={{
            __html: `
          <script type="text/javascript">
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nl3ag580q9");
          </script>
        `,
          }}
        />
      </Head>

      <main className="flex flex-wrap text-gray-100">
        <Sidebar />
        <MainContent hashnodeData={data.posts} />
      </main>
    </div>
  );
}

export default Home;
