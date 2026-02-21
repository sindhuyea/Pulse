import React, { useReducer, useMemo, useState } from 'react'
import { BackgroundPaths } from './components/ui/background-paths'
import HomeScreen from './components/screens/HomeScreen'
import NameScreen from './components/screens/NameScreen'
import BodyCheckScreen from './components/screens/BodyCheckScreen'
import TarotCardScreen from './components/screens/TarotCardScreen'
import ReflectionScreen from './components/screens/ReflectionScreen'
import RecommendationScreen from './components/screens/RecommendationScreen'
import InsightsScreen from './components/screens/InsightsScreen'
import CalibrationScreen from './components/screens/CalibrationScreen'
import {
  createInitialState,
  toggleBodyArea,
  setTarotChoice,
  setPreference,
  getStressInputSummary,
} from './state/inputState'
import { getRecommendations, getStressPatternSummary } from './lib/mockAI'
import './index.css'
import './lib/animations.css'

function appReducer(state, action) {
  switch (action.type) {
    case 'START_CHECK_IN':
      return { ...state, screen: 'name' }
    case 'SET_USER_NAME':
      return { ...state, userName: action.name.trim() || state.userName, screen: 'body' }
    case 'TOGGLE_BODY_AREA':
      return toggleBodyArea(state, action.area)
    case 'CONFIRM_BODY':
      return { ...state, screen: 'reflection' }
    case 'I_DONT_KNOW':
      return { ...state, screen: 'tarot' }
    case 'SELECT_TAROT':
      return { ...state, ...setTarotChoice(state, action.cardId), screen: 'recommendations' }
    case 'SET_PREFERENCE':
      return setPreference(state, action.key, action.value)
    case 'GUIDE_ME':
      return { ...state, screen: 'recommendations' }
    case 'VIEW_INSIGHTS':
      return { ...state, screen: 'insights' }
    case 'MORE':
    case 'BACK_TO_HOME':
      return { ...state, screen: 'home' }
    default:
      return state
  }
}

export default function App() {
  const [calibrating] = useState(
    () => typeof window !== 'undefined' && window.location.search.includes('calibrate=1')
  )

  const [state, dispatch] = useReducer(appReducer, undefined, createInitialState)

  const inputSummary = useMemo(() => getStressInputSummary(state), [state])
  const recommendations = useMemo(
    () => getRecommendations(inputSummary, 3),
    [inputSummary]
  )
  const stressPatternSummary = useMemo(
    () => getStressPatternSummary(inputSummary),
    [inputSummary]
  )

  if (calibrating) {
    return (
      <div className="app-container">
        <CalibrationScreen />
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="app-background" aria-hidden>
        <BackgroundPaths backgroundOnly color="#C28AC9" />
      </div>
      {state.screen === 'home' && (
        <div key="home" className="screen-enter">
          <HomeScreen onCheckIn={() => dispatch({ type: 'START_CHECK_IN' })} />
        </div>
      )}

      {state.screen === 'name' && (
        <div key="name" className="screen-enter">
          <NameScreen
            onContinue={(name) => dispatch({ type: 'SET_USER_NAME', name })}
          />
        </div>
      )}

      {state.screen === 'body' && (
        <div key="body" className="screen-enter">
        <BodyCheckScreen
          userName={state.userName}
          bodyStressAreas={state.bodyStressAreas}
          onToggleArea={(area) => dispatch({ type: 'TOGGLE_BODY_AREA', area })}
          onConfirm={() => dispatch({ type: 'CONFIRM_BODY' })}
          onIDontKnow={() => dispatch({ type: 'I_DONT_KNOW' })}
        />
        </div>
      )}

      {state.screen === 'tarot' && (
        <div key="tarot" className="screen-enter">
          <TarotCardScreen
            onSelectCard={(cardId) => dispatch({ type: 'SELECT_TAROT', cardId })}
          />
        </div>
      )}

      {state.screen === 'reflection' && (
        <div key="reflection" className="screen-enter">
          <ReflectionScreen
            preferences={state.preferences}
            onPreferenceChange={(key, value) =>
              dispatch({ type: 'SET_PREFERENCE', key, value })
            }
            onGuideMe={() => dispatch({ type: 'GUIDE_ME' })}
          />
        </div>
      )}

      {state.screen === 'recommendations' && (
        <div key="recommendations" className="screen-enter">
          <RecommendationScreen
            recommendations={recommendations}
            stressPatternSummary={stressPatternSummary}
            onMore={() => dispatch({ type: 'MORE' })}
            onViewInsights={() => dispatch({ type: 'VIEW_INSIGHTS' })}
          />
        </div>
      )}

      {state.screen === 'insights' && (
        <div key="insights" className="screen-enter">
          <InsightsScreen onBackToHome={() => dispatch({ type: 'BACK_TO_HOME' })} />
        </div>
      )}
    </div>
  )
}
