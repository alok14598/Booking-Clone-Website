import "./mail.css"

const mail =() => {
    return <div className="mail">

    <h1> Save Time, Save Money!</h1>
    <span className="mailTitle">Sign Up and We'll send the best deals to you</span>
    <div className="mailContainer">
    <input type="text" placeholder="Your Email"  className="mailInput"/>
        <button className="mailbutton">Subscribe</button>
    </div>
</div>

}

export default mail;