import { useAtom } from 'jotai'
import { getCid, getVideoSourceInfo } from '~/api'
import { audioUrlAtom, bvidAtom } from '~/store'

export default function Home() {
  // BV1GE42137Cn
  const [bvid, setBvid] = useAtom(bvidAtom)
  const [_, setAudioUrl] = useAtom(audioUrlAtom)

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') {
      return
    }

    // Fetch video info
    const cid = await getCid(bvid)
    const res = await getVideoSourceInfo(bvid, cid)
    setAudioUrl(res.audioUrl)
  }

  return (
    <main className="px-8 py-4 pb-72">
      <header className="flex items-center">
        <p className="w-fit text-xl font-bold bg-gradient-to-r from-primary-700 to-secondary text-transparent bg-clip-text">
          💿 開始享受你的
          <span className="text-2xl ml-1">音樂時光!</span>
        </p>
        <div className="ml-auto flex items-center gap-2">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 outline-none"
            placeholder="輸入 bvid..."
            value={bvid}
            onChange={e => setBvid(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="text-gray-500 transition p-1 rounded hover:text-primary-700 hover:bg-primary-100">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </header>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">我的合集</h2>
        <div className="grid grid-cols-4 gap-4">
          {
            [1, 2, 3, 4, 5, 6, 7].map(item => (
              <div key={item} className="flex gap-4 items-center relative rounded-lg overflow-hidden">
                <div className="w-full h-48">
                  <img
                    className="w-full h-full object-cover"
                    src="https://picsum.photos/200"
                  />
                </div>
                <div className="absolute -bottom-2 left-2 right-2 flex flex-col justify-center px-2 py-4 rounded-lg text-white bg-white bg-opacity-10 backdrop-blur-lg">
                  <p className="text-sm">合集名稱</p>
                  <p className="text-[12px]">合集描述</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">發現</h2>
        <div className="grid grid-cols-4 gap-4">
          {
            [1, 2, 3, 4].map(item => (
              <div key={item} className="flex gap-4 items-center relative rounded-lg overflow-hidden">
                <div className="w-full h-48">
                  <img
                    className="w-full h-full object-cover"
                    src="https://picsum.photos/200"
                  />
                </div>
                <div className="absolute -bottom-2 left-2 right-2 flex flex-col justify-center px-2 py-4 rounded-lg text-white bg-white bg-opacity-10 backdrop-blur-lg">
                  <p className="text-sm">合集名稱</p>
                  <p className="text-[12px]">合集描述</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}
