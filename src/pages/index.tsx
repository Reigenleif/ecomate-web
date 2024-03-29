import styles from "./index.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PublicLayout } from "~/components/layout/PublicLayout";
import { withSession } from "~/server/auth/withSession";
import { api } from "~/utils/api";

export const getServerSideProps = withSession({force: true})

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard/news")
  }, [router])


  return (
    <>
      <PublicLayout>
        <main className={styles.main}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              Create <span className={styles.pinkSpan}>T3</span> App
            </h1>
            <div className={styles.cardRow}>
              <Link
                className={styles.card}
                href="https://create.t3.gg/en/usage/first-steps"
                target="_blank"
              >
                <h3 className={styles.cardTitle}>First Steps →</h3>
                <div className={styles.cardText}>
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </div>
              </Link>
              <Link
                className={styles.card}
                href="https://create.t3.gg/en/introduction"
                target="_blank"
              >
                <h3 className={styles.cardTitle}>Documentation →</h3>
                <div className={styles.cardText}>
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </div>
              </Link>
            </div>
            <div className={styles.showcaseContainer}>
              <AuthShowcase />
            </div>
          </div>
        </main>
      </PublicLayout>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className={styles.authContainer}>
      <button
        className={styles.loginButton}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
