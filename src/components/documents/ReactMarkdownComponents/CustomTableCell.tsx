export const CustomTableCell = ({ isHeader, children, ...props }) => {
    const commonStyles = {
        padding: '8px 12px'
    };
    
    const headerStyles = {
        ...commonStyles,
        borderBottom: '1px solid white'
    };
    
    const cellStyles = {
        ...commonStyles,
        borderRight: '1px solid white'
    };

    return isHeader ? (
        <th style={headerStyles} {...props}>
            {children}
        </th>
    ) : (
        <td style={cellStyles} {...props}>
            {children}
        </td>
    );
};
