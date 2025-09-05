
import React from "react";


const Services = () => {
  const services = [
    {
      icon: "bi-cash-stack",
      titulo: "Money transfers",
      descripcion:
        "Send and receive money from other users and a quick and secure way, just need the account number..",
    },
    {
      icon: "bi-credit-card",
      titulo: "Payments",
      descripcion:
        "You can use your online bank to make your online purchases anywhere you are anytime you want.",
    },
    { 
      icon: "bi-bank",
      titulo: "Deposit",
      descripcion:
        "You can deposit money to your online bank using a credit card and your money will be available within just seconds.",
    },
    {
      icon: "bi-currency-exchange",
      titulo: "Withdrawal",
      descripcion:
        "You can easely withdraw your money from your online bank to your card on file, this can take 3 to 5 business days.",
    },
    {
      icon: "bi-wallet2",
      titulo: "Transaction details",
      descripcion:
        "You can easely view your transaction details by type, amount and date.",
    },
    {
      icon: "bi-shield-lock",
      titulo: "Security",
      descripcion:
        "Security is our priority, we protect your personal information in a way that only you can have access to it.",
    },
  ];

  return (
    <div className="services-container">
    <nav class="navbar dashboard-navbar">
        <div class="container-fluid">
          <a class="navbar-brand fs-1 text-light" href="/">
            AG-Bank
          </a>  
        </div>
      </nav>

    <div className="container py-5 services-content-container">
      
      <h2 className="text-center mb-5">Our services</h2>
      <div className="row">
        {services.map((service, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <i className={`bi ${service.icon} display-4 text-primary mb-3`}></i>
                <h5 className="card-title">{service.titulo}</h5>
                <p className="card-text">{service.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Services;
