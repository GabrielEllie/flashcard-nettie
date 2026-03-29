interface LoadingBarProps {
  duration?: number;
}

export function LoadingBar({ duration = 2000 }: LoadingBarProps) {
  return (
    <div className="w-full h-1 overflow-hidden rounded-full bg-white/15">
      <div
        className="h-full bg-white rounded-full animate-loadingBar"
        style={{ '--loadingBar-duration': `${duration}ms` } as React.CSSProperties}
      />
    </div>
  );
}