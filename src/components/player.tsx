import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { getBasicInfo } from '~/api'
import { audioUrlAtom, bvidAtom } from '~/store'

export default function Player() {
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState('')
  const [owner, setOwner] = useState('')

  const [paused, setPaused] = useState(true)

  const [bvid] = useAtom(bvidAtom)
  const [audioUrl] = useAtom(audioUrlAtom)
  const audioRef = useRef(null)

  function togglePause() {
    setPaused(prev => !prev)
    if (paused) {
      audioRef.current.play()
    }
    else {
      audioRef.current.pause()
    }
  }

  useEffect(() => {
    if (!bvid) {
      return
    }

    async function fetchBasicInfo() {
      const { title, cover, owner } = await getBasicInfo(bvid)

      setTitle(title)
      setCover(cover)
      setOwner(owner)
    }

    fetchBasicInfo()
  }, [bvid])

  return (
    <>
      {
        audioUrl && (
          <audio
            ref={audioRef}
            autoPlay
            src={audioUrl}
          />
        )
      }
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-700 rounded-t-3xl drop-shadow-[0_-8px_10px_rgba(112,122,255,0.2)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-lg"
              src={cover}
              alt="Album cover"
            />
            <div className="ml-4">
              <div className="text-sm font-bold w-48 truncate">{title}</div>
              <div className="text-xs text-gray-500 w-24 truncate">{owner}</div>
            </div>
          </div>
          <div className="flex items-center">
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
                <path d="m17 18-6-6 6-6" />
                <path d="M7 6v12" />
              </svg>
            </button>
            <button onClick={togglePause} className="text-gray-500 transition p-1 rounded hover:text-primary-700 hover:bg-primary-100">
              {paused
                ? (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                  )
                : (
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                  </svg>
                  )}
            </button>
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
                <path d="m7 18 6-6-6-6" />
                <path d="M17 6v12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="py-6 flex flex-col gap-2 items-center justify-center text-xl text-gray-300 font-bold">
          <p>強くなれる理由を知った 僕を連れて進め</p>
          <p className="text-black text-4xl">泥だらけの走馬灯に酔う こわばる心</p>
          <p>強くなれる理由を知った 僕を連れて進め</p>
        </div>
      </div>
    </>
  )
}
