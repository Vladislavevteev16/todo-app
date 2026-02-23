export const Button = ({
  children,
  className,
  onClick,
  type,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${className}`}
    >
      {children}
    </button>
  );
};
