import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const SortingTableCell = ({
  active, direction, onClick, children
}) => (
  <TableCell>
    <Tooltip title="Sort" enterDelay={300}>
      <TableSortLabel active={active} direction={direction} onClick={onClick}>
        {children}
      </TableSortLabel>
    </Tooltip>
  </TableCell>
);

SortingTableCell.propTypes = {
  active: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default SortingTableCell;
