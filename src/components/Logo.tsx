export function Logo() {
  return (
    <div className="flex items-center">
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-light tracking-wider text-stone-100" style={{ fontFamily: "'Montserrat', 'Inter', sans-serif", letterSpacing: '0.15em' }}>
          NIKOLAI
        </span>
        <span className="text-2xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-stone-300 to-stone-400" style={{ fontFamily: "'Montserrat', 'Inter', sans-serif", letterSpacing: '0.15em' }}>
          BOKAREV
        </span>
      </div>
    </div>
  );
}
