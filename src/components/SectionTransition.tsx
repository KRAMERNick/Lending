export function SectionTransition() {
  return (
    <div className="w-full h-4 md:h-6 relative -my-1 bg-stone-900">
      <svg 
        viewBox="0 0 1200 40" 
        preserveAspectRatio="none"
        className="w-full h-full fill-stone-900"
      >
        <path d="M0,20 Q600,25 1200,20 L1200,40 L0,40 Z" />
      </svg>
    </div>
  );
}