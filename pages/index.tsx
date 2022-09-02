import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { client } from "@/libs/client";
import { Article, ArticleList } from "@/types";

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getList<Article>({
    endpoint: "article",
    queries: {
      fields: ["id", "private", "title"],
    },
  });

  return {
    props: { data },
  };
};

type Props = {
  data: ArticleList;
};

const Index: NextPage<Props> = ({ data }) => {
  const { contents } = data;

  return (
    <div>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <Link
              href={`/${content.private ? "private" : "public"}/${content.id}`}
            >
              <a>{content.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
