export function Timer() {
  return (
    <div style={{ padding: '80px 20px', color: 'var(--ios-text)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <p style={{ color: 'var(--ios-gray)' }}>Timer Wheel Placeholder</p>
      <div style={{ display: 'flex', gap: '80px', marginTop: '40px' }}>
        <button style={{ width: '80px', height: '80px', borderRadius: '50%', border: 'none', backgroundColor: '#333', color: 'white', fontSize: '16px' }}>Cancel</button>
        <button style={{ width: '80px', height: '80px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(52, 199, 89, 0.2)', color: 'var(--ios-green)', fontSize: '16px' }}>Start</button>
      </div>
    </div>
  );
}
