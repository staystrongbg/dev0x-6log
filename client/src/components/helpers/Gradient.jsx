const Gradient = () => {
  const THE_SHINING = {
    width: '350px',
    height: '350px',
    top: '250px',
    right: 0,
    borderRadius: '50%',
    filter: 'blur(550px)',
    zIndex: '0',
    position: 'absolute',
  };
  return <div className={`gradient-3`} style={THE_SHINING} />;
};

export default Gradient;
