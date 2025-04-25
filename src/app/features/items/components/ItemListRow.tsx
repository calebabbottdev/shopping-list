import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  LeadingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import {
  ListItem,
  ListItemText,
  Box,
  Typography,
  useTheme,
} from '@mui/material';

type Props = {
  item: {
    id: string;
    name: string;
    quantity: number;
    addedBy: {
      id: string;
      name: string;
    };
  };
  isMe: boolean;
  onClick: (itemId: string) => void;
  onEdit: (itemId: string) => void;
  onDelete: (itemId: string) => void;
};

const ItemListRow = ({ item, isMe, onClick, onEdit, onDelete }: Props) => {
  const theme = useTheme();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => onEdit(item.id)}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Typography variant='button'>Edit</Typography>
        </Box>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive onClick={() => onDelete(item.id)}>
        <Box
          sx={{
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Typography variant='button'>Delete</Typography>
        </Box>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableListItem
      leadingActions={leadingActions()}
      trailingActions={isMe ? trailingActions() : null}
    >
      <ListItem
        divider
        component='button'
        onClick={() => onClick(item.id)}
        sx={{ textAlign: 'left' }}
      >
        <ListItemText
          primary={item.name}
          secondary={`Quantity: ${item.quantity} • ${
            isMe ? 'Me' : item.addedBy.name
          }`}
        />
      </ListItem>
    </SwipeableListItem>
  );
};

export default ItemListRow;
