import './App.css'
import Nav from './components/Nav'
import ContentBox from './components/ContentBox'

function App() {
  return (
    <div className="app">
      <Nav />
      <main className="main-content">
        <ContentBox title="Welcome">
          <p>Welcome to BW Co-op! BW Co-op is an open source project to create a cooperative (co-op) game mode for StarCraft Broodwar. </p>
        </ContentBox>

        <ContentBox title="About">
<p>BW Co-op lets you have fun playing Broodwar with your friends against the computer. You can scale the difficulty, pick your game modifiers, and have a new experience each time.</p>

<p>Broodwar has a long history and a stalwart playerbase but multiplayer PvE falls short of the co-op experience provided in StarCraft 2.</p>

<p>Co-op mode is StarCraft 2's most-played game type and Broodwar deserves a comparable experience.</p>
        </ContentBox>

        <ContentBox title="Map">
          <p>Tundra of Terror 0.3 is playable now.</p>
          <p>This is a UMS co-op map where players play standard StarCraft. Nothing about the units or abilities is changed. The goal is to fight your way through the AI, steal a crystal, and return it to the beacon before time expires.</p>
          <p>Variable difficulty is set by adjusting the limit.</p>
          <ul>
            <li>Hard(30 minute limit)</li>
            <li>Medium(45 minute limit)</li>
            <li>Easy(1 hour limit)</li>
          </ul>
        </ContentBox>
        
        <ContentBox title="Get Involved">
          <p>We are always looking for playtesters and developers to accelerate the project. Reach out if you'd like to participate.</p>
        </ContentBox>
      </main>
    </div>
  )
}

export default App
