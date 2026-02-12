import React, { useState, useRef, useCallback } from 'react'
import PreferenceToggles from '../PreferenceToggles'
import { Mic, Square } from 'lucide-react'
import '../styles/ReflectionScreen.css'

const PROMPT_SUGGESTIONS = [
  "What's weighing on you right now?",
  'What would feel good today?',
  "What do you wish you had more of?",
  "What's one thing that would help right now?",
  'What do you need to hear today?',
]

function getRandomPrompt() {
  return PROMPT_SUGGESTIONS[Math.floor(Math.random() * PROMPT_SUGGESTIONS.length)]
}

export default function ReflectionScreen({
  preferences,
  onPreferenceChange,
  onGuideMe,
}) {
  const [anythingElse, setAnythingElse] = useState('')
  const [displayedPrompt, setDisplayedPrompt] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [voiceNoteUrl, setVoiceNoteUrl] = useState(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const handleAskMeSomething = useCallback(() => {
    setDisplayedPrompt(getRandomPrompt())
  }, [])

  const startRecording = useCallback(() => {
    chunksRef.current = []
    if (!navigator.mediaDevices?.getUserMedia) {
      return
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setVoiceNoteUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return url
        })
      }
      recorder.start()
      setIsRecording(true)
    })
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
  }, [])

  const clearVoiceNote = useCallback(() => {
    if (voiceNoteUrl) URL.revokeObjectURL(voiceNoteUrl)
    setVoiceNoteUrl(null)
  }, [voiceNoteUrl])

  return (
    <div className="screen reflection-screen">
      <header className="screen-header">
        <h1 className="screen-title">Pulse</h1>
        <p className="screen-subtitle">what do you need right now?</p>
      </header>

      <div className="reflection-preferences">
        <PreferenceToggles preferences={preferences} onChange={onPreferenceChange} />
      </div>

      <div className="reflection-anything-else">
        <div className="reflection-anything-else-header">
          <label htmlFor="reflection-anything-else" className="reflection-anything-else-label">
            {displayedPrompt ?? 'anything else to add?'}
          </label>
          <button
            type="button"
            className="reflection-ask-prompt"
            onClick={handleAskMeSomething}
          >
            ask me something else
          </button>
        </div>
        <textarea
          id="reflection-anything-else"
          className="reflection-anything-else-input"
          placeholder="Type here..."
          value={anythingElse}
          onChange={(e) => setAnythingElse(e.target.value)}
          rows={3}
        />
      </div>

      <div className="reflection-voice-note">
        <span className="reflection-voice-note-label">or, talk it out if you prefer</span>
        {!voiceNoteUrl ? (
          <button
            type="button"
            className={`reflection-voice-btn ${isRecording ? 'recording' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? (
              <>
                <Square size={18} strokeWidth={2} aria-hidden />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Mic size={18} strokeWidth={1.5} aria-hidden />
                <span>Record</span>
              </>
            )}
          </button>
        ) : (
          <div className="reflection-voice-playback">
            <audio controls src={voiceNoteUrl} className="reflection-voice-audio" />
            <button type="button" className="reflection-voice-rerecord" onClick={clearVoiceNote}>
              Record again
            </button>
          </div>
        )}
      </div>

      <div className="reflection-cta">
        <button type="button" className="btn-pill btn-primary" onClick={onGuideMe}>
          guide me
        </button>
      </div>
    </div>
  )
}
