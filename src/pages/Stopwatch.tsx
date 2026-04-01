export function Stopwatch() {
  return (
    <div style={{ padding: '80px 20px', color: 'var(--ios-text)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <h1 style={{ fontSize: '72px', fontWeight: '200', margin: '0 0 20px 0' }}>00:00.00</h1>
      <div style={{ display: 'flex', gap: '80px' }}>
        <button style={{ width: '80px', height: '80px', borderRadius: '50%', border: 'none', backgroundColor: '#333', color: 'white', fontSize: '16px' }}>Lap</button>
        <button style={{ width: '80px', height: '80px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(52, 199, 89, 0.2)', color: 'var(--ios-green)', fontSize: '16px' }}>Start</button>
      </div>
    </div>
  );
}
