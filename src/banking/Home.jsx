import Navigation from "./Navigation"
import bankingimg4hd from "../assets/bankingimg4hd.png";
import Footer from "./Footer";
function Home(){

    return(
        <div className="hero-container">
       <Navigation />

       <div className="home-hero">
          
          <h2 className="text-center  hero-title">Your online bank</h2>
          <p className="hero-description text-center text-light">Send and receive money anywhere anytime</p>
       </div>

        <Footer></Footer>
        </div>
    )
}
export default Home