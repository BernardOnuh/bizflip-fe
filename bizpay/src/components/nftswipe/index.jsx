import Head from 'next/head'
import SwipeCard from './offermodal'

const data = [
  {
    name: 'Board Ape - #1146',
    url:
      'https://i.seadn.io/gae/c_Q3RSFYxq_mBn6xRxAMZ7ByQDRsokyui7WOncKqklQd4AbzcDlXbZzNihFmGxpYEmvhEg5YUpZ8Fb6_bnxnBmpshocVjxRmfyjkh7E?auto=format&w=512',
  },
  {
    name: 'Donald Trump',
    url:
      'https://i.seadn.io/gae/cQdJa-b13yPX_t2myOP-yTWsnivLyw2TjOebOuEmScctikEcnVJLbvUXtrb10bUdNDtYf3PKIA7zjNVXYWNdRAhDiByu3ukE0l-gkQ?auto=format&w=512',
  },
  {
    name: 'Miley Cyrus',
    url:
      'https://i.seadn.io/gcs/files/c1d278fe80b429823c38dee3babafb9f.png?w=500&auto=format',
  },
  {
    name: '459',
    url:
      'https://i.seadn.io/gae/-tibTrEXBCbLNfUxVsvqpsgLMB-mYtywZSywY1oQrFF-obqwn1JJPyNqUBWrBR2IwFuWBVxu2O0YYJVdz3Jk4FZ_pYVn0zYjccSOfQ?w=500&auto=format',
  },

  {
    name: 'DeGod #578',
    url:
      'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://metadata.degods.com/g/578-dead.png',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Tinder Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Tinder Clone</h1>

        <div className="relative w-full h-full mt-10">
          {data.map((person) => (
            <SwipeCard key={person.name} name={person.name} url={person.url} />
          ))}
        </div>
      </main>
    </div>
  )
}
