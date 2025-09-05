

function Footer(){
    return(
      <footer className="footer">
       
       <div className="footer-content-container row">

         

                 <div className="footer-email-container mt-4 col-12 col-lg-3 col-md-4">
                <i className="fa-solid fa-envelope text-light message-icon"></i>
                <small className="text-light"> angelgarci310@gmail.com</small>
                </div>

                <div className="footer-phone-container mt-4 col-12 col-lg-3 col-md-4">
                <i className="fa-solid fa-phone text-light fs-5"></i>
                <small className="text-light"> 829-747-0508</small>
                </div>

                 <div className="footer-web-container mt-4 col-12 col-lg-3 col-md-4">
                <i className="fa-solid fa-globe text-light fs-5"></i>
                <small className="text-light"> www.agtech.com</small>
                </div>

                <div className="footer-copyright-container mt-4 col-12 col-lg-3">
                <i class="fa-regular fa-copyright text-light fs-5"></i>
                
                <small className="text-light"> All rights reserved AG Tech Inc</small>
                </div>
       </div>
         
      </footer>
    );
}
export default Footer