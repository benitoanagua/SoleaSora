export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1
          className="text-6xl font-light tracking-wide"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Solea Sora
        </h1>
        <p className="text-lg text-[var(--color-muted)] font-light">
          Skincare sensorial — proximamente
        </p>
      </div>
    </div>
  );
}
