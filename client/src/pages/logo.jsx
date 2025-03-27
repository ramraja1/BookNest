const Logo = () => {
    return (
      <svg width="200" height="60" viewBox="0 0 500 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Book Icons (Larger & More Spread Out) */}
        <rect x="50" y="15" width="30" height="50" rx="4" fill="#A67B5B"/>
        <rect x="100" y="15" width="30" height="50" rx="4" fill="#D1CFCF"/>
        <path d="M50 15 Q75 0, 130 15" stroke="#3A3A3A" stroke-width="3" fill="none"/>
        
        {/* Nest (Extended Curved Base) */}
        <path d="M20 65 Q200 110, 380 65" stroke="#3A3A3A" stroke-width="3" fill="none"/>
        
        {/* BookNest Text (Much Bigger for Navbar) */}
        <text x="170" y="50" font-family="Arial, sans-serif" font-size="42" fill="#3A3A3A" font-weight="bold">
          BookNest
        </text>
      </svg>
    );
  };
  
  export default Logo;
  