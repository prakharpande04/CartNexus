import PulseLoader from 'react-spinners/PulseLoader';

const Loader = ({ loading = true, size = 15, color = '#36d7b7' }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}>
      <PulseLoader
        loading={loading}
        size={size}
        color={color}
        aria-label="Pulse Loader"
        data-testid="pulse-loader"
      />
    </div>
  );
};

export default Loader;
