import IllustrationImg from '../assets/Illustration.png'
import Logo from '../assets/Logo.png'
import './Welcome.css'

const Welcome = () => {
  return (
    <div className="login-welcome-container">
      <div className='login-welcome-header'>
        <img src={Logo} alt='Logo' />
      </div>
      <div className='welcome-image'>
        <img src={IllustrationImg} alt='Illustration' />
      </div>
      <div className="welcome-text">
        <h1>Welcome aboard my friend</h1>
        <p>Just a couple of clicks and we start</p>
      </div>
    </div>
  )
}

export default Welcome
