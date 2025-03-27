const BookIcon = ({ size = 150, color = "#A67B5B" }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={size}
        height={size}
        fill={color}
      >
        <path d="M96 32C69.49 32 48 53.49 48 80V432C48 458.51 69.49 480 96 480H464V32H96Z" />
        <path d="M80 80C80 71.16 87.16 64 96 64H448V448H96C87.16 448 80 440.84 80 432V80Z" fill="white" />
        <path d="M160 64H304V224L240 192L176 224V64Z" fill="#8B5E3B" />
      </svg>
    );
  };
  
  export default BookIcon;
  