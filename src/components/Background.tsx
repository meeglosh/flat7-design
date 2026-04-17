export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#08080F' }}>
      {/* Coral  -  large, left */}
      <div
        style={{
          position: 'absolute',
          width: '85vw',
          height: '85vw',
          top: '5%',
          left: '-30%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,61,90,0.20) 0%, rgba(255,61,90,0.06) 40%, transparent 70%)',
          animation: 'gradientDrift1 38s ease-in-out infinite',
        }}
      />
      {/* Electric blue  -  top right */}
      <div
        style={{
          position: 'absolute',
          width: '70vw',
          height: '70vw',
          top: '-20%',
          right: '-18%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,255,0.16) 0%, rgba(0,200,255,0.04) 40%, transparent 70%)',
          animation: 'gradientDrift2 50s ease-in-out infinite',
        }}
      />
      {/* Acid green  -  bottom right */}
      <div
        style={{
          position: 'absolute',
          width: '55vw',
          height: '55vw',
          bottom: '5%',
          right: '5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,255,62,0.13) 0%, rgba(168,255,62,0.03) 40%, transparent 70%)',
          animation: 'gradientDrift3 30s ease-in-out infinite',
        }}
      />
    </div>
  );
}
