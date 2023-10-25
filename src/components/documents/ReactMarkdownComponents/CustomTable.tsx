export const CustomTable = ({ children, ...props }) => (
  <table style={{ 
      borderCollapse: 'collapse', 
      width: '100%', 
      border: '1px solid white', 
      borderRadius: '8px' 
  }} {...props}>
    {children}
  </table>
);
