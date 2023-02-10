import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useStore} from "../lib/store";
import {observer} from "mobx-react";

export async function getServerSideProps() {
  return {
    props: {
      initialState: {
        todos: [
          "Todo from server"
        ]
      }
    }
  }
}

function Home(props) {
  const store = useStore()

  return (
    <div>
      <Head>
        <title>Create Next App </title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js with MobX!</a>
        </h1>

        <div>
          <button onClick={() => store.addTodo()}>Add todo from client</button>
        </div>

        <ul>
          {store.todos.map(todo => (<li>{todo}</li>))}
        </ul>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default observer(Home)