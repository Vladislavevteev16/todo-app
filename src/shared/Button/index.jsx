export const Button = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
};
