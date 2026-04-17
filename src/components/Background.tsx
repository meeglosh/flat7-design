export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* Amber warmth , bottom left, slow drift */}
      <div
        style={{
          position: 'absolute',
          width: '90vw',
          height: '90vw',
          top: '30%',
          left: '-30%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,160,32,0.14) 0%, rgba(232,160,32,0.04) 40%, transparent 70%)',
          animation: 'gradientDrift1 38s ease-in-out infinite',
        }}
      />
      {/* Cool teal , top right, counter drift */}
      <div
        style={{
          position: 'absolute',
          width: '75vw',
          height: '75vw',
          top: '-20%',
          right: '-20%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,160,0.11) 0%, rgba(0,200,160,0.03) 40%, transparent 70%)',
          animation: 'gradientDrift2 50s ease-in-out infinite',
        }}
      />
      {/* Warm ivory , center right, complementary pulse */}
      <div
        style={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          top: '50%',
          left: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,237,232,0.055) 0%, transparent 65%)',
          animation: 'gradientDrift3 30s ease-in-out infinite',
        }}
      />
    </div>
  );
}
