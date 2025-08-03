import './App.css'
import Nav from './components/Nav'
import ContentBox from './components/ContentBox'

function App() {
  return (
    <div className="app">
      <Nav />
      <main className="main-content">
        <ContentBox title="Welcome">
          <p>Welcome to BW Coop! This is a cooperative platform designed to help community members connect and collaborate.</p>
        </ContentBox>
        
        <ContentBox title="Services">
          <p>We offer various services to support our cooperative community including:</p>
          <ul>
            <li>Resource sharing</li>
            <li>Community events</li>
            <li>Skill exchange</li>
            <li>Local marketplace</li>
          </ul>
        </ContentBox>
        
        <ContentBox title="Get Involved">
          <p>Join our community and start participating in cooperative activities. Connect with neighbors and build lasting relationships.</p>
        </ContentBox>
      </main>
    </div>
  )
}

export default App
