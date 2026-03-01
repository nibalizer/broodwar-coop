import ContentBox from '../components/ContentBox'

function Setup() {
  return (
    <main className="main-content">
      <ContentBox title="Download & Setup">
        <p>Get BW Co-op up and running with these step-by-step instructions.</p>
      </ContentBox>

      <ContentBox title="Prerequisites">
        <h3>What You'll Need:</h3>
        <ul>
          <li><strong>StarCraft: Brood War</strong> - Original game or Remastered version</li>
          <li><strong>Windows PC</strong> - Required for StarCraft compatibility</li>
          <li><strong>Friends to play with</strong> - Co-op is best with 2-4 players</li>
        </ul>
      </ContentBox>

      <ContentBox title="Installation Steps">
        <h3>Step 1: Download the Map</h3>
        <p>Download the latest version of Tundra of Terror 0.3 from our releases page.</p>
        
        <h3>Step 2: Install the Map</h3>
        <ol>
          <li>Locate your StarCraft installation directory</li>
          <li>Navigate to the <code>Maps</code> folder</li>
          <li>Copy the downloaded <code>.scm</code> or <code>.scx</code> file into the Maps folder</li>
        </ol>
        
        <h3>Step 3: Launch StarCraft</h3>
        <ol>
          <li>Start StarCraft: Brood War</li>
          <li>Go to <strong>Multiplayer</strong> → <strong>Local Area Network</strong></li>
          <li>Click <strong>Create Game</strong></li>
          <li>Select <strong>Use Map Settings</strong> game type</li>
          <li>Find and select <strong>Tundra of Terror 0.3</strong> from the map list</li>
        </ol>
      </ContentBox>

      <ContentBox title="Troubleshooting">
        <h3>Common Issues:</h3>
        
        <h4>Map doesn't appear in list:</h4>
        <ul>
          <li>Check that the map file is in the correct Maps folder</li>
          <li>Restart StarCraft after placing the map file</li>
          <li>Ensure the file isn't corrupted by re-downloading</li>
        </ul>
        
        <h4>Connection issues in multiplayer:</h4>
        <ul>
          <li>Make sure all players are on the same network or use Hamachi/similar VPN</li>
          <li>Check firewall settings - StarCraft may need to be allowed through</li>
          <li>Try hosting from a different player's computer</li>
        </ul>
        
        <h4>Game crashes or performance issues:</h4>
        <ul>
          <li>Update to the latest StarCraft patch</li>
          <li>Close other applications to free up memory</li>
          <li>Try running in compatibility mode (Windows XP SP3)</li>
        </ul>
      </ContentBox>

      <ContentBox title="Network Setup">
        <h3>Playing Over Internet:</h3>
        <p>There are two main ways to play StarCraft Brood War online with friends:</p>
        
        <h4>Option 1: Battle.net (Official)</h4>
        <ol>
          <li>Launch StarCraft: Brood War</li>
          <li>Select <strong>Battle.net</strong> from the main menu</li>
          <li>Create or log into your Battle.net account</li>
          <li>Join a server (US East, US West, Europe, Asia)</li>
          <li>Create a game and select "Use Map Settings"</li>
          <li>Choose Tundra of Terror from the map list</li>
          <li>Share the game name with your friends so they can join</li>
        </ol>
        
        <h4>Option 2: Shield Battery (Community Platform)</h4>
        <ol>
          <li>Download and install Shield Battery from their website</li>
          <li>Create an account on the Shield Battery platform</li>
          <li>Launch the client and connect to StarCraft</li>
          <li>Create a lobby for Tundra of Terror</li>
          <li>Invite your friends to join the lobby</li>
        </ol>
        <p><em>Shield Battery offers additional features like better matchmaking and modern networking.</em></p>
      </ContentBox>
    </main>
  )
}

export default Setup
