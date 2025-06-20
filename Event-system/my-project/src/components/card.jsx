export function Card({ children, className = '' }) {
  return <div className={`bg-white rounded-xl shadow p-4 border border-bordergray font-sans ${ className }`}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-2 font-sans ${ className }`}>{children}</div>;
}
