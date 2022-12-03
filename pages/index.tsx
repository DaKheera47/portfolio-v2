import type { NextPage } from "next";
import Head from "next/head";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
    return (
        <div className="container mx-auto">
            <Head>
                <title>Shaheer Sarfaraz</title>
                <meta
                    name="description"
                    content="Portfolio of Shaheer Sarfaraz, a self-taught developer from Pakistan."
                />
                <link rel="icon" href="/me.png" />
            </Head>

            <main className="text-gray-100">
                <Sidebar />
                <MainContent />
            </main>
        </div>
    );
};

export default Home;
