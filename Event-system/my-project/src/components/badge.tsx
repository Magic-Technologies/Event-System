export function Badge({ children, variant = 'default', className = '' }) {
  const base = 'px-2 py-1 text-xs rounded-full font-semibold';
  const variants = {
    default: 'bg-green-100 text-green-800',
    secondary: 'bg-yellow-100 text-yellow-800',
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
